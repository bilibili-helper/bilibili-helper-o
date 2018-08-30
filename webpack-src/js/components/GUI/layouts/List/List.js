/**
 * Author: Ruo
 * Create: 2018-07-26
 * Description:
 */

import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {theme} from 'Styles/theme';

const {color, headerHeight} = theme;

const ListWrapper = styled.div.attrs({
    className: 'list-wrapper',
})`
  flex-shrink: 0;
  margin: 0 auto;
  position: relative;
  width: 100%;
  max-width: 600px;
  min-height: 0;
  min-width: 500px;
  transition: min-height 0.3s;
  visibility: visible;
  opacity: 1;
  &:last-of-type {
    margin-bottom: ${headerHeight}px;
  }
`;

const ListHeader = styled.div.attrs({
    className: 'list-header',
})`
  margin-bottom: 6px;
  font-size: 13px;
  margin-top: 21px;
  font-weight: 500;
  font-size: 13px;
  max-height: 18px;
  color: ${color('paper-grey-700')};
  overflow: hidden;
  transition: all 0.2s;
  opacity: 1;
`;

const BodyWrapper = styled.div.attrs({
    className: 'list-body-wrapper',
})`
  position: relative;
  top: 0;
  transition: top 0.5s;
  .extended & {
    border-radius: 0;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
  }
`;

const ListBody = styled.div.attrs({
    className: 'list-body',
})`
  display: flex;
  flex-direction: column;
  position: relative;
  max-height: 100%;
  opacity: 1;
  transition: all 0.3s;
  //border-radius: 4px;
  //box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2);
  //background-color: whitesmoke;
  overflow: hidden;
  //padding-left: 40px;
  //background-color: white;
  .extended & {
    display: none;
  }
`;

export class List extends React.Component {
    constructor() {
        super();
        this.top = 0;
    }

    render() {
        const {children, title, theme, hidden} = this.props;
        return (
            <ThemeProvider theme={{...theme}}>
                <ListWrapper innerRef={i => this.ListWrapper = i} hidden={hidden}>
                    {title && <ListHeader>{title}</ListHeader>}
                    <ListBody>{children}</ListBody>
                </ListWrapper>
            </ThemeProvider>
        );

    }
}