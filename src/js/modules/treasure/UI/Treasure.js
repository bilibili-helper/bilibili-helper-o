/**
 * Author: DrowsyFlesh
 * Create: 2018/10/27
 * Description:
 */
import $ from 'jquery';
import _ from 'lodash';
import React from 'react';
import styled from 'styled-components';
import {treasureCloseImg, treasureOpenImg} from './imgUrls';

const Box = styled.div.attrs({className: 'bilibili-helper-treasure-box'})`
  position: relative;
  top: -4px;
  width: 48px;
  height: 48px;
  background-position: center bottom;
  background-image: url(${({open}) => open ? treasureOpenImg : treasureCloseImg});
  background-size: cover;
  overflow: hidden;
  cursor: pointer;
`;

const Counter = styled.div.attrs({className: 'bilibili-helper-treasure-counter'})`
  width: 100%;
  height: 18px;
  line-height: 18px;
  margin: 25px 0 0;
  border-radius: 4px;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.7);
  text-align: center;
  font-size: 10px;
  color: #fff;
  user-select: none;
  pointer-events: none;
`;

const PanelView = styled.div.attrs({
    className: 'bilibili-heloer-treasure-panel a-scale-in-ease',
})`
  width: 170px;
  box-sizing: border-box;
  padding: 16px;
  position: absolute;
  bottom: 48px;
  left: 14px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 6px 12px 0 rgba(106,115,133,.22);
  transform-origin: 0px 100% 0px;
  display: none;
  img, canvas {
    display: none;
  }
`;

const Title = styled.h2`
  margin: 0;
  font-size: 14px;
  font-weight: 400;
  color: #23ade5;
`;

export class Treasure extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false, // 宝箱倒计时结束可以打开的状态
            max_times: NaN, // 可领取最大轮次，每轮有3波
            times: NaN, // 表示当前是第几轮
            minute: NaN, // 当前波次倒计时时长 分钟数
            silver: NaN, // 当前波次奖励银瓜子数
            time_end: NaN,
            time_start: NaN,
            counterComplete: true, // 计时器结束状态
            permissionMap: {},
        };
        this.retryTime = 0;
        this.maxRetryTime = 10;
        this.correctStr = {
            'i': 1, 'I': 1, '|': 1, 'l': 1,
            'o': 0, 'O': 0, 'D': 0,
            'S': 6, 's': 6, 'b': 6,
            'R': 8, 'B': 8,
            'z': 2, 'Z': 2,
            '.': '-',
            '_': 4,
            'g': 9,
        };
        $(document).on('click', (e) => {
            const panelClass = 'treasure-box';
            if ($(e.target).hasClass(panelClass) || $(e.target).parents(`.${panelClass}`).length === 0) {
                this.setState({open: false});
            }
        });
    }

    componentDidMount() {
        chrome.runtime.sendMessage({
            commend: 'getSetting',
            feature: 'treasure',
        }, (settings) => {
            this.settings = settings;
        });
        this.counter = $(this.counterDOM);
        this.imgDOM.crossOrigin = 'Anonymous';
        chrome.runtime.sendMessage({
            commend: 'inIncognitoContext',
        }, (inIncognitoContext) => {
            if (!inIncognitoContext) this.getCurrentTask();
        });
        chrome.runtime.sendMessage({
            commend: 'getPermissionMap',
        }, (permissionMap) => {
            this.setState({permissionMap})
        });
    }

    /**
     * 宝箱点击事件
     */
    handleOnClickTreasure = () => {
        this.setState({open: !this.state.open});
    };

    /**
     * 图片数据载入完毕事件
     */
    handleOnLoadImg = () => {
        const context = this.canvasDOM.getContext('2d');
        context.clearRect(0, 0, 120, 40);
        context.drawImage(this.imgDOM, 0, 0);
        const grayScaleMap = this.getGrayScaleMap(context);
        const filterMap = this.orderFilter2In3x3(grayScaleMap);
        for (let i = 0; i < filterMap.length; ++i) {
            let gray = filterMap[i];
            context.fillStyle = `rgb(${gray}, ${gray}, ${gray})`;
            context.fillRect(i % 120, Math.round(i / 120), 1, 1);
        }
        try {
            const question = this.adjustQuestion(window.OCRAD(context.getImageData(0, 0, 120, 40)));
            const answer = new Function('return ' + question)();
            this.getAward(answer);
        } catch (e) {
            setTimeout(() => {
                this.getCaptcha();
            }, 1000);
        }
    };
    /**
     * 显示弹出面板
     */
    showPanel = () => {
        const panel = $(this.panel);
        if (panel.css('display') === 'block') return;
        panel.css({'display': 'block'}).addClass('v-enter-active', 'v-enter-to');
        setTimeout(() => {
            panel.removeClass('v-enter-active', 'v-enter-to');

        }, 300);
    };

    /**
     * 隐藏弹出面板
     */
    hidePanel = () => {
        const panel = $(this.panel);
        if (panel.css('display') === 'none') return;
        panel.addClass('a-scale-out-ease', 'v-leave-to');
        setTimeout(() => {
            panel.removeClass('a-scale-out-ease', 'v-leave-to').css({'display': 'none'});
        }, 300);
    };

    /**
     * 启动计时器
     * @param minutes
     */
    setCounter = (minutes) => {
        const {counterComplete} = this.state;
        if (counterComplete && minutes) {
            this.setState({counterComplete: false});
            const endTime = Date.now() + minutes * 60 * 1000;
            const intervalNum = setInterval(() => {
                const seconds = Number.parseInt((endTime - Date.now()) / 1000);
                if (seconds <= 0) {
                    clearInterval(intervalNum);
                    this.setState({counterComplete: true}, () => this.getCaptcha());
                }
                const second = String(seconds % 60).padStart(2, '0');
                const minute = String(Math.floor(seconds / 60)).padStart(2, '0');
                this.counter.text(`${minute}:${second}`);
            }, 1000);
        } else return;
    };

    /**
     * 获取当前波次数据
     */
    getCurrentTask = () => {
        $.ajax({
            method: 'get',
            url: 'https://api.live.bilibili.com/lottery/v1/SilverBox/getCurrentTask',
            success: (res) => {
                if (this.retryTime) this.retryTime = 0;
                if (res.code === 0) {
                    const {max_times, times, minute, silver, time_end, time_start} = res.data;
                    this.setState({max_times, times, minute, silver, time_end, time_start});
                    this.setCounter(minute);
                } else if (res.code === -10017) {
                    this.counter.text('已领完');
                }
            },
            error: (res) => {
                if (this.retryTime < this.maxRetryTime) {
                    ++this.retryTime;
                    console.error(res);
                } else this.counter.text('网络错误');
            },
        });
    };

    /**
     * 获取验证码
     */
    getCaptcha = () => {
        $.ajax({
            method: 'get',
            url: 'https://api.live.bilibili.com/lottery/v1/SilverBox/getCaptcha',
            data: {
                ts: Date.now(),
            },
            success: (res) => {
                if (this.retryTime) this.retryTime = 0;
                if (res.code === 0) {
                    this.counter.text('领取中');
                    this.imgDOM.setAttribute('src', res.data.img);
                } else if (res.code === -500) { // 稍后登录？还不知道为什么会有这个错误
                    if (this.retryTime < this.maxRetryTime) {
                        ++this.retryTime;
                        setTimeout(this.getCaptcha, 2000);
                    }
                }
            },
            error: (res) => {
                if (this.retryTime < this.maxRetryTime) {
                    ++this.retryTime;
                    console.error(res);
                    setTimeout(this.getCaptcha, 2000);
                } else this.counter.text('网络错误');
            },
        });
    };

    /**
     * 校验验证码获取奖励
     * @param captcha
     * @param time_start
     * @param time_end
     */
    getAward = (captcha) => {
        const {time_start, time_end} = this.state;
        $.ajax({
            method: 'get',
            url: 'https://api.live.bilibili.com/lottery/v1/SilverBox/getAward',
            data: {time_start, time_end, captcha},
            success: (res) => {
                if (this.retryTime) this.retryTime = 0;
                switch (res.code) {
                    case 0:
                        if (!res.data.isEnd) { // 没有全部领完
                            this.sendNotification();
                            this.getCurrentTask();
                            this.counter.text('领取成功');
                        } else this.counter.text('已领完');
                        break;
                    case -902: // 验证码错误
                    case -901: // 验证码过期
                    case -500: // 稍后登录？还不知道为什么会有这个错误
                        setTimeout(this.getCaptcha, 500);
                        break;
                    default:
                    // TODO 其他情况
                }
            },
            error: (res) => {
                if (this.retryTime < this.maxRetryTime) {
                    ++this.retryTime;
                    console.error(res);
                } else this.counter.text('网络错误');
            },
        });
    };

    // 弹出推送通知窗口
    sendNotification = () => {
        const notificationState = _.find(this.settings.options, {key: 'notification'});
        if (notificationState && notificationState.on) {
            const {silver, time_start} = this.state;
            chrome.runtime.sendMessage({
                commend: 'sendNotification',
                type: 'treasure',
                time_start,
                silver,
            });
        }

    };

    getGrayScaleMap = (context, rate = 235, width = 120, height = 40) => {
        const getGrayscale = (x, y) => {
            const pixel = context.getImageData(x, y, 1, 1).data;
            return pixel ? (77 * pixel[0] + 150 * pixel[1] + 29 * pixel[2] + 128) >> 8 : 0;
        };
        const map = [];
        for (let y = 0; y < height; y++) { // line y
            for (let x = 0; x < width; x++) { // column x
                const gray = getGrayscale(x, y);
                map.push(gray > rate ? gray : 0);
            }
        }
        return map;
    };

    orderFilter2In3x3 = (grayscaleMap, n = 9, width = 120/*, height = 40*/) => {
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

    adjustQuestion = (originQuestion) => {
        let q = '';
        let question = originQuestion.trim();
        for (let i in question) {
            let a = this.correctStr[question[i]];
            q += (a !== undefined ? a : question[i]);
        }
        if (q[2] === '4') q[2] = '+';
        return q;
    };

    render() {
        const {
            open,
            max_times,
            times,
            minute,
            counterComplete,
            permissionMap,
        } = this.state;
        open ? this.showPanel() : this.hidePanel();
        return (
            <React.Fragment>
                <Box open={counterComplete} onClick={!!times ? this.handleOnClickTreasure : null}>
                    <Counter innerRef={i => this.counterDOM = i}>{permissionMap.login ? '载入中' : '未登录'}</Counter>
                </Box>
                <PanelView innerRef={i => this.panel = i}>
                    <Title>宝箱 - 第{times}/{max_times}轮 - 第{minute / 3}次</Title>
                    <img ref={i => this.imgDOM = i} onLoad={this.handleOnLoadImg}/>
                    <canvas ref={i => this.canvasDOM = i}/>
                </PanelView>
            </React.Fragment>
        );
    }
}