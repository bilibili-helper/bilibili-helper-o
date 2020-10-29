/**
 * Author: DrowsyFlesh
 * Create: 2019/3/21
 * Description:
 */
import {Feature} from 'Libs/feature';
import {__} from 'Utils/functions';

export {NotAutoPlayUI} from './UI';

export class NotAutoPlay extends Feature {
    constructor() {
        super({
            name: 'notAutoPlay',
            kind: 'tbilibili',
            dependencies: ['language'],
            settings: {
                on: true,
                hasUI: true,
                title: __('notAutoPlay_name'),
            },
        });
    }
}
