/**
 * Author: DrowsyFlesh
 * Create: 2020/4/25
 * Description:
 */
import {getURL} from 'Utils/functions';
import {loadLayersModel, train, tensor2d} from '@tensorflow/tfjs';

const [IMAGE_WIDTH, IMAGE_HEIGHT] = [120, 40, 1];

const [WORD_WIDTH, WORD_HEIGHT] = [26, 26];
const WORD_SIZE = WORD_WIDTH * WORD_HEIGHT;
const IMAGE_SIZE = IMAGE_WIDTH * IMAGE_HEIGHT;
const DICTIONARY = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-'];

// 将context转为灰度
const getGrayScaleMap = (context, rate = 245, width = IMAGE_WIDTH, height = IMAGE_HEIGHT) => {
    const pixelMap = context.getImageData(0, 0, width, height).data;
    const map = [];
    for (let y = 0; y < height; y++) { // line y
        for (let x = 0; x < width; x++) { // column x
            const index = (y * width + x) * 4;
            const pixel = pixelMap.slice(index, index + 4);
            const gray = pixel ? (77 * pixel[0] + 150 * pixel[1] + 29 * pixel[2] + 128) >> 8 : 0;
            map.push(gray > rate ? gray : 0);
        }
    }
    return map;
};

const getGrayScaleMapByMap = (map, rate = 245) => {
    const length = map.length;
    for (let i = 0; i < length; i++) { // line y
        const gray = map[i];
        map[i] = gray < rate ? gray : 255;
    }
    return map;
};

// 滤波函数，n为返回层级
const orderFilter2In3x3 = (grayscaleMap, n = 9, width = IMAGE_WIDTH/*, height = 40*/) => {
    const gray = (x, y) => (x + y * width >= 0) ? grayscaleMap[x + y * width] : 255;
    const map = [];
    const length = grayscaleMap.length;
    const catchNumber = n - 1;
    for (let i = 0; i < length; ++i) {
        const [x, y] = [i % width, Math.floor(i / width)];
        const matrix = new Array(9);
        matrix[0] = gray(x - 1, y - 1);
        matrix[1] = gray(x + 0, y - 1);
        matrix[2] = gray(x + 1, y - 1);
        matrix[3] = gray(x - 1, y + 0);
        matrix[4] = gray(x + 0, y + 0);
        matrix[5] = gray(x + 1, y + 0);
        matrix[6] = gray(x - 1, y + 1);
        matrix[7] = gray(x + 0, y + 1);
        matrix[8] = gray(x + 1, y + 1);
        matrix.sort((a, b) => a - b);
        map.push(matrix[catchNumber]);
    }
    return map;
};

const position = (x, y) => `${x},${y}`;
const xArray = [-1, 0, 1, -1, 1, -1, 0, 1];
const yArray = [-1, -1, -1, 0, 0, 1, 1, 1];
// 查询单个字符相关的点
const searchWordFromPoint = (map, foundPointMap, targetMap, x, y, width = IMAGE_WIDTH, height = IMAGE_HEIGHT) => {
    targetMap = targetMap || new Set();
    foundPointMap = foundPointMap || new Set();
    foundPointMap.add(position(x, y));

    const color = (x, y) => map[x + y * width];

    const currentTargetMap = new Set();

    xArray.forEach((checkX, index) => {
        checkX = x + checkX;
        const checkY = y + yArray[index];
        const positionStr = position(checkX, checkY);
        const c = color(checkX, checkY);
        if (c && c !== 255 && !foundPointMap.has(positionStr) && !targetMap.has(positionStr) && !currentTargetMap.has(positionStr)) {
            if (checkX < 0 || checkY < 0 || checkX > width || checkY > height) {
                return;
            } // 过滤掉超出边界的点
            targetMap.add(positionStr);
            currentTargetMap.add(positionStr);
        }
    });
    currentTargetMap.forEach((str) => {
        const [x, y] = str.split(',');
        searchWordFromPoint(map, foundPointMap, targetMap, +x, +y);
    });
    return targetMap;
};

const searchWords = (map, width = IMAGE_WIDTH, height = IMAGE_HEIGHT) => {
    let length = map.length;
    let wordArray = [];
    let targetPointMap = new Set();
    for (let i = 0; i < length; ++i) {
        // 字符搜索原理很简单，由于原数据集已经竟可能分离各个字符，所以从一个不为白色的像素开始在周围8格查询，然后依次扩散
        if (map[i] !== 255) { // 找到一个目标像素点
            const [x, y] = [i % width, Math.floor(i / width)];
            if (!targetPointMap.has(position(x, y))) {
                const targetMap = searchWordFromPoint(map, undefined, undefined, x, y); // 指定要从这个点开始查找他所在文字的所有有效像素点
                targetMap.forEach((p) => {
                    targetPointMap.add(p);
                });
                wordArray.push(Array.from(targetMap));
            }
        }
    }
    return Array.from(wordArray).filter((a) => a.length > 0);
};

const createSquareImg = (map, size = WORD_SIZE) => {
    // 算出中点
    let sX = [];
    let sY = [];
    map = map.map((position) => {
        let [x, y] = position.split(',');
        x = +x;
        y = +y;
        if (!sX.includes(x)) {
            sX.push(x);
        }
        if (!sY.includes(y)) {
            sY.push(y);
        }
        return [x, y];
    });
    sX = Math.floor(sX.reduce((sum, n) => sum + n, 0) / sX.length);
    sY = Math.floor(sY.reduce((sum, n) => sum + n, 0) / sY.length);

    // 目标中心
    const [tX, tY] = [size / 2, size / 2];

    // 计算得出每个坐标需要移动的相对距离
    let [dX, dY] = [sX - tX, sY - tY];
    map = map.map(([x, y]) => [x - dX, y - dY]);

    return {center: [sX, sY], map};
};

// 清除落在边界处的点
const BOUND_WIDTH = 4; // 边界区域宽度
const BOUND_SIZE = 5; // 离散点大小
const filterBoundDot = (mapData) => {
    // 先剔除首位和末位可能存在的大小小于5的点
    for (let i = mapData.length - 1; i >= 0; --i) { // 过滤掉所有大小为2的点
        if (mapData[i].map.length < 2) {
            mapData[i] = false;
        }
    }
    mapData = mapData.filter(Boolean);

    for (let i = 0; i < mapData.length; ++i) { // 过滤前面的点
        if (mapData[i].map.length < BOUND_SIZE) {
            mapData[i] = false;
        } else {
            break;
        }
    }
    mapData = mapData.filter(Boolean);

    for (let i = mapData.length - 1; i >= 0; --i) { // 过滤后面的点
        if (mapData[i].map.length < BOUND_SIZE) {
            mapData[i] = false;
        } else {
            break;
        }
    }
    mapData = mapData.filter(Boolean);

    return mapData.map(({center, map}) => {
        let sY = [];
        map = map.map(([x, y]) => {
            if (!sY.includes(y)) {
                sY.push(y);
            }
            return [x, y];
        });
        sY = Math.floor(sY.reduce((sum, n) => sum + n, 0) / sY.length);

        if (sY > BOUND_WIDTH && sY < (IMAGE_HEIGHT - BOUND_WIDTH)) {
            return {center, map};
        }
    }).filter(Boolean);
};

const loadModel = async () => {
    let model = await loadLayersModel(getURL('/statics/tf/treasure-captcha.json'));

    const optimizer = train.adam();
    model.compile({
        optimizer: optimizer,
        loss: 'categoricalCrossentropy',
        metrics: ['accuracy'],
    });
    window.model = model;
    return model;
};

let [canvas, context] = [null, null];
const getCanvas = (clean = false, width = 120, height = 40) => {
    if (!clean && canvas && context) {
        return {canvas, context};
    }
    if (canvas) {
        //canvas.remove();
    }
    canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    //canvas.style.display = 'none';
    document.body.appendChild(canvas);
    context = canvas.getContext('2d');
    context.clearRect(0, 0, width, height);
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    context.font = '26px agencyFB';
    context.save();

    return {canvas, context};
};

// 绘制字符
const drawCharactor = (map, width, height) => {
    const {context} = getCanvas(true, width, height);
    context.fillStyle = 'black';
    map.forEach(([x, y]) => {
        context.fillRect(x, y, 1, 1);
    });
};
let model = null;


export const calc = async (context) => {
    if (!model) {
        model = await loadModel();
    }
    // 滤波过程
    const grayScaleMap = getGrayScaleMap(context, 0);
    let filterMap = orderFilter2In3x3(grayScaleMap, 6); // 经过滤波器
    filterMap = orderFilter2In3x3(filterMap, 5);
    filterMap = getGrayScaleMapByMap(filterMap, 50); // 过滤出低通像素

    // 查询字符
    const wordArray = searchWords(filterMap);

    // 将字符坐标处理到size指定的方格内
    const wordData = wordArray.map((map) => createSquareImg(map, WORD_WIDTH));

    // 根据中心位置的横坐标对数据从左到右排序，为了能够和question中的字符正确映射
    const sortedWordData = wordData.sort(({center: center1}, {center: center2}) => center1[0] > center2[0] ? 1 : -1);

    // 由于倾斜倒是有可能会出现落在边界上的点，该步骤清除这些离散点，落在中间的运算符点不去掉
    const correctWordMap = filterBoundDot(sortedWordData);

    // 绘制滤波后的结果
    const filteredCanvas = getCanvas(true);
    for (let i = 0; i < filterMap.length; ++i) {
        let gray = filterMap[i];
        filteredCanvas.context.fillStyle = `rgb(${gray}, ${gray}, ${gray})`;
        filteredCanvas.context.fillRect(i % IMAGE_WIDTH, Math.round(i / IMAGE_WIDTH), 1, 1);
    }
    // 绘制单个字符
    correctWordMap.forEach(({map}) => {
        drawCharactor(map, 26, 26);
    });
    return await Promise.all(correctWordMap.map(async ({map}) => {
        const data = new Float32Array(WORD_WIDTH * WORD_HEIGHT);
        map.forEach(([x, y]) => data.set([1], x + y * WORD_WIDTH));
        const d = tensor2d(data, [1, WORD_SIZE]).reshape([1, WORD_WIDTH, WORD_HEIGHT, 1]);
        return await model.predict(d, [1, WORD_WIDTH * WORD_HEIGHT]).array().then(e => {
            const res = e[0].map((v, i) => [i, Math.round(v * 100)]).sort(([i1, v1], [i2, v2]) => v1 > v2 ? -1 : 1);
            const [targetIndex] = res.shift();
            d.dispose();
            return DICTIONARY[targetIndex];
        });
    })).then((array) => array.join(''));
};
