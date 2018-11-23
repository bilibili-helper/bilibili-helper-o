/**
 * Author: Ruo
 * Create: 2018-07-26
 * Description:
 */

import styled from 'styled-components';

export const Body = styled.div.attrs({
    className: props => props.extend ? 'extend' : '',
})`
  display: flex;
  flex-direction: column;
  padding: 0;
  transition: all 0.3s;
  &.extend {
    margin-bottom: 0;
  }
  &::-webkit-scrollbar {
    //display: none;
    //visibility: hidden;
  }
`;