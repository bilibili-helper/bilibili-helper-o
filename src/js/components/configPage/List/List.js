/**
 * Author: Ruo
 * Create: 2018-07-26
 * Description:
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled, {ThemeProvider} from 'styled-components';
import {theme} from 'Styles/theme';

const {color} = theme;

const ListWrapper = styled.div.attrs({
    className: 'list-wrapper',
})`
  flex-shrink: 0;
  margin: 0 auto;
  padding: 0 10px;
  position: relative;
  width: calc(100% - 20px);
  max-width: 800px;
  min-height: 0;
  min-width: 400px;
  transition: min-height 0.3s;
  visibility: visible;
  opacity: 1;
  &:last-of-type {
    margin-bottom: 56px;
  }
`;

const ListHeader = styled.div.attrs({
    className: 'list-header',
})`
  margin: 21px 0 12px;
  padding: 8px 0 4px;
  max-height: 18px;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: .25px;
  color: ${color('paper-grey-900')};
  overflow: hidden;
  transition: all 0.2s;
  opacity: 1;
`;

/*const BodyWrapper = styled.div.attrs({
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
`;*/

const ListBody = styled.div.attrs({
    className: 'list-body',
})`
  display: flex;
  flex-direction: column;
  position: relative;
  max-height: 100%;
  opacity: 1;
  transition: all 0.2s;
  //border-radius: 4px;
  border-radius: 3px;
  //box-shadow: 0 0px 1px 0 rgba(0,0,0,0.1);
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2);
  //background-color: whitesmoke;
  overflow: hidden;
  //padding-left: 40px;
  //background-color: white;
  .extended & {
    display: none;
  }
`;

export class List extends React.Component {
    propTypes = {
        children: PropTypes.any,
        title: PropTypes.string,
        theme: PropTypes.object,
        hidden: PropTypes.bool,
    };

    constructor() {
        super();
        this.top = 0;
    }

    render() {
        const {children, title, theme, hidden} = this.props;
        return (
            <ThemeProvider theme={{...theme}}>
                <ListWrapper ref={i => this.ListWrapper = i} hidden={hidden}>
                    {title && <ListHeader>{title}</ListHeader>}
                    <ListBody>{children}</ListBody>
                </ListWrapper>
            </ThemeProvider>
        );

    }
}