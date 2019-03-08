/**
 * Author: Ruo
 * Create: 2018-07-28
 * Description: 全局
 */

import {injectGlobal} from 'styled-components';
import {fontFamily} from './var';

injectGlobal`
  html,body {
    -ms-text-size-adjust: 100%; // 2
    -webkit-text-size-adjust: 100%; // 2
    -webkit-font-smoothing: antialiased;
  }
  body {
    margin: 0;
    ${fontFamily()};
  }
`;

