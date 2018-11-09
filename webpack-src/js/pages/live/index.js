/**
 * Author: Ruo
 * Create: 2018-06-12
 * Description: 直播区功能脚本
 */
import {UIManager} from 'Libs/UIManager';
import {inLiveRoom} from 'Utils';

inLiveRoom() && new UIManager('live');