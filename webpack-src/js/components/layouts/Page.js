/**
 * Author: Ruo
 * Create: 2018-08-03
 * Description:
 */

import React from 'react';
import styled, {withTheme} from 'styled-components';

const PageView = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Page = withTheme(PageView);