/**
 * Author: DrowsyFlesh
 * Create: 2018/11/7
 * Description:
 */

export {PopupUI} from './UI/index';
import {Feature} from 'Libs/feature';

export class Popup extends Feature {
    constructor() {
        super({
            name: 'popup',
            kind: 'popup',
            dependencies: ['debug'],
            settings: {
                on: true,
                hide: true,
                hasUI: true,
            },
        });
    }
}