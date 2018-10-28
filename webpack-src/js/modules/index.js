/**
 * Author: Ruo
 * Create: 2018-06-12
 * Description: 功能点打包入口
 */
// 父类必须先加载
export {Feature} from './feature';

// 然后再加载子类
export * from './dynamicCheck';
export * from './video';
export * from './newWatchPage';
export * from './doSign';
export * from './treature';
export * from './googleAnalytics';
export * from './debug';
