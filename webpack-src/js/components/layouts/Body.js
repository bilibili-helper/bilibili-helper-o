/**
 * Author: Ruo
 * Create: 2018-07-26
 * Description:
 */

import React from 'react';
import styled from 'styled-components';

export const Body = styled.div.attrs({
    className: props => props.extend ? 'extend' : '',
})`
  //display: flex;
  padding: 0;
  //flex-direction: column;
  transition: all 0.3s;
  &.extend {
    margin-bottom: 0;
  }
`;