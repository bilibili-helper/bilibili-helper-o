/**
 * Author: Ruo
 * Create: 2018-06-12
 * Description: 扩展守护脚本
 */
import 'babel-polyfill';
import {FeatureManager} from 'Libs/FeatureManager';
window.FeatureManager = new FeatureManager(); // 创建统一模块管理对象
