/**
 * Author: DrowsyFlesh
 * Create: 2018/11/7
 * Description:
 */
import {Feature} from 'Libs/feature';

export class Menu extends Feature {
    constructor() {
        super({
            name: 'menu',
            kind: 'popup',
            options: {
                on: true,
                hide: true,
            },
            dependencies: ['popup'],
        });
    }
}