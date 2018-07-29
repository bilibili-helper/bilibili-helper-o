/**
 * Author: Ruo
 * Create: 2018-07-29
 * Description: 列表项目中两行样式容器
 */
import React from 'react';
import styled from 'styled-components';

const TwoLineContainerView = styled.div.attrs({
    className: 'two-line-container',
})`
  display: flex;
  flex-direction: column;
  flex: auto;
  h1, h2, h3, h4, h5, h6, p {
    margin: 0;
    height: 20px;
    font-size: 13px;
  }
`;
const Secondary = styled.div`
  height:20px;
  color: #757575;
  font-weight: 400;
`;

export const TwoLineContainer = ({first, second}) => {
    return (
        <TwoLineContainerView>
            {first && <h3>{first}</h3>}
            {second && <Secondary>{second}</Secondary>}
        </TwoLineContainerView>
    );
};