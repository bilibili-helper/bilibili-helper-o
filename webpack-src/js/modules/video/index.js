/**
 * Author: DrowsyFlesh
 * Create: 2018/10/9
 * Description:
 */

import URL from 'url-parse';
import {wrapper} from 'Utils';
import {VideoFeature} from './feature';

export const Video = wrapper({
    requireModules: ['debug'],
    featureClass: VideoFeature,
    requiredUIs: [],
    UIClass: null,
});
