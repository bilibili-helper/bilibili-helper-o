/**
 * Author: Ruo
 * Create: 2018-07-28
 * Description: 列表项目
 */

import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {TwoLineContainer} from 'Components';
import {theme} from 'Styles';

const {color} = theme;

/**
 * props: twoLine
 */
const ListItemView = styled.div.attrs({
    className: 'list-item',
})`
  min-height: ${props => props.theme.twoLine ? '65px' : '49px'};
  padding: 0 20px;
  display: flex;
  align-items: center;
  background-color: #fff;
  border-color: ${color('paper-grey-300')};
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  font-size: 13px;
  &:first-of-type {
    border-top: none;
  }
  .start {
    display: flex;
    flex-direction: column;
    flex: auto;
  }
`;
export const ListItem = ({children, twoLine = false}) => {
    return (
        <ThemeProvider theme={{twoLine}}>
            <ListItemView>{children}</ListItemView>
        </ThemeProvider>
    );
};

const Start = styled.div.attrs({
    className: 'list-item-start',
})`
  .icon + & {
    -webkit-padding-start: 16px;
  }
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: auto;
  h1, h2, h3, h4, h5, h6, p {
    margin: 0;
    height: 20px;
    font-size: 13px;
  }
`;

ListItem.Start = ({first, second, children}) => {
    return (
        <Start>
            <TwoLineContainer first={first} second={second}/>
            {children}
        </Start>
    );
};

ListItem.Middle = styled.div.attrs({
    className: 'list-item-middle',
})`
  -webkit-padding-start: 16px;
  align-items: center;
  flex: auto;
`;

ListItem.End = styled.div.attrs({
    className: 'list-item-end',
})`
  display: flex;
  align-items: center;
  .separator + & {
    margin: -12px;
  }
`;

/**
 * 分割线
 * 根据twoLine属性设定自适应高度
 */
ListItem.Separator = styled.div.attrs({
    className: 'separator',
})`
  height: calc(${props => props.theme.twoLine ? '65px' : '49px'} - 2 * 9px);
  -webkit-border-start: 1px solid rgba(0, 0, 0, 0.06);
  flex-shrink: 0;
  -webkit-margin-end:20px;
  -webkit-margin-start:20px;
`;
