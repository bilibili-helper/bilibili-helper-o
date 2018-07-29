/**
 * Author: Ruo
 * Create: 2018-07-28
 * Description: 全局
 */

import styled, {injectGlobal} from 'styled-components';
import {fontFamily} from './var';
import {theme} from './theme';
const {color} = theme;

injectGlobal`
  html,body {
    font-family: sans-serif; // 1
    -ms-text-size-adjust: 100%; // 2
    -webkit-text-size-adjust: 100%; // 2
    -webkit-font-smoothing: antialiased;
    font-size: ${theme.baseFontSize}px;
  }
  body {
    margin: 0;
    ${fontFamily()};
  }
`;

