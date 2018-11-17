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
    font-family: Cereal, "PingFang SC", Roboto, system-ui, STHeiti, "Microsoft YaHei", system, -apple-system, ".SFNSDisplay-Regular", HelveticaNeue, LucidaGrande, "Hiragino Sans GB", sans-serif;
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

