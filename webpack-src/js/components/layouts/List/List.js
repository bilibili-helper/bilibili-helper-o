/**
 * Author: Ruo
 * Create: 2018-07-26
 * Description:
 */

import React from 'react';
import styled from 'styled-components';
import {theme} from 'Styles/theme';

const {color, headerHeight} = theme;

const ListWrapper = styled.div.attrs({
    className: 'list-wrapper',
})`
  //margin: 3px;
  display: flex;
  flex-direction: column;
  min-width: 560px;
  min-height: 0;
  transition: all 0.4s;
  &.extend {
    min-height: 100%;
    z-index: 1;
  }
  &.hidden {
    visibility: hidden;
    //margin: 0 3px;
    opacity: 0;
  }
`;

const ListHeader = styled.div.attrs({
    className: 'list-header',
})`
  margin-bottom: 12px;
  font-size: 13px;
  margin-top: 21px;
  font-weight: 500;
  font-size: 13px;
  max-height: 18px;
  color: ${color('paper-grey-700')};
  overflow: hidden;
  //transition: all 0.15s;
  .extend & {
    margin: 0;
    max-height: 0;
  }
  .hidden {
    visibility: hidden;
  }
`;

const BodyWrapper = styled.div.attrs({
    className: 'list-body-wrapper',
})`
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
  top: 0;
  border-radius: 4px;
  background-color: white;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2);
  overflow: hidden;
  transition: top 0.3s;
  .extend & {
    border-radius: 0;
  }
`;

const ListBody = styled.div.attrs({
    className: 'list-body',
})`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  opacity: 1;
  .extend & {
  }
`;

const ExtendBody = styled.div.attrs({
    className: 'list-extend',
})`
  visibility: hidden;
  border-radius: 0;
  background-color: white;
  opacity: 0;
  max-height: 0;
  transition: all 0.3s;
  .extend & {
    //visibility: visible;
    //opacity: 1;
    //height: 100%;
    //box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.4);
  }
`;

export class List extends React.Component {
    constructor() {
        super();
        this.top = 0;
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps, nextContent) {
        const {extend} = nextProps;
        if (extend) {
            this.listWrapper = this.listWrapper.getBoundingClientRect();
            this.top = this.listWrapper.top - headerHeight;
            console.log(this.top);
        }else {
            this.top = 0;
        }
    }

    render() {
        const {children, extendChildren, title, extend, hidden} = this.props;
        return (
            <ListWrapper
                className={`list-wrapper ${extend ? 'extend' : ''} ${hidden ? 'hidden' : ''}`}
                innerRef={i => this.listWrapper = i}
            >
                {title && <ListHeader>{title}</ListHeader>}
                <BodyWrapper style={{top: -this.top}}>
                    <ListBody>
                        {children}
                    </ListBody>
                    <ExtendBody>
                        {extendChildren}
                    </ExtendBody>
                </BodyWrapper>
            </ListWrapper>
        );

    }
}