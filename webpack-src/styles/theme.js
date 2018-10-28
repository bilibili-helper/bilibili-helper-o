/**
 * Author: Ruo
 * Create: 2018-07-28
 * Description: 主题配置
 */
import {
    color, opacity,
    fontFamily, fontSize, rem,
    boxShadow, transition, textOverflow, marginTrim,
    hideScrollbar,
} from './var';


const bodyMinWidth = 1000;
const sidebarWidth = 204;
export const baseFontSize = 12;

export const theme =  {
    /* 颜色相关 */
    color,                                         // fn, 格式化颜色函数,

    /* 布局相关尺寸 */
    logoHeight: 50,                                // num, logo高度
    bodyMinWidth,                                  // num, 网页最小宽度
    headerHeight: 0,                              // num, 导航栏高度
    sidebarWidth,                                  // num, 侧边栏宽度
    mainWidth: bodyMinWidth - sidebarWidth,        // num, 正文宽度

    /* 字体相关 */
    baseFontSize,                                  // num, 全局基础字号
    fontFamily,                                    // fn, 设置字体函数
    fontSize,                                      // fn, 设置字号
    rem,                                           // fn, 转换为rem单位的大小
    textOverflow,                                  // fn, 设置多行移除显示省略号

    /* 动画相关 */
    transition,                                    // fn, 设置动画

    /* 阴影 */
    boxShadow,                                     // fn, 阴影生成函数

    /* 布局相关 */
    marginTrim,                                    // fn, 根据参数去除头部和尾部的margin

    /* 其他 */
    hideScrollbar,                                 // css, 隐藏滚动条
    opacity,                                       // css, 不透明度
};
