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
  margin: 0 auto;
  position: relative;
  max-width: 650px;
  min-height: 0;
  min-width: 580px;
  transition: all 0.5s;
  &.extend {
    //transition: transform 0.5s 0.01s;
    //position: absolute;
    //top: 0;
    //bottom: 0;
    //min-height: 100%;
    z-index: 1;
  }
  &.hidden {
    //transition: all 0.3s;
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
  transition: all 0s;
  opacity: 1;
  .extend & {
    opacity: 0;
    visibility: hidden;
    margin: 0;
    //margin: 0;
    //max-height: 0;
  }
  .hidden & {
    //margin: 0;
    //max-height: 0;
    //visibility: hidden;
    //opacity: 0;
    //dispaly: none;
  }
`;

const BodyWrapper = styled.div.attrs({
    className: 'list-body-wrapper',
})`
  display: flex;
  flex-direction: column;
  position: relative;
  top: 0;
  //border-radius: 4px;
  //background-color: white;
  //box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2);
  //overflow: hidden;
  transition: top 0.5s;
  .extend & {
    border-radius: 0;
    //position: absolute;
    //bottom: 0px;
    //top: 0;
    //width: 100%;
  }
  .hidden & {
    //transition: all 0s;
    //margin: 0;
    //max-height: 0;
    //visibility: hidden;
    //opacity: 0;
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
  border-radius: 4px;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2);
  overflow: hidden;
  background-color: white;
`;

/*
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
    visibility: visible;
    opacity: 1;
    overflow: auto;
    width: 582px;
    max-height: inherit;
    //position: relative;
    //bottom: 0px;
    //top: 0;
    transition: transform 0.3s;
    //padding-bottom: ${headerHeight}px;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2);
    &::-webkit-scrollbar {
      display: none;
      //visibility: hidden;
    }
    //height: 100%;
    //box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.4);
  }
`;
*/

export class List extends React.Component {
    constructor() {
        super();
        this.top = 0;
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps, nextContent) {
        // const {extend} = nextProps;
        // if (extend) {
        //     this.BodWrapperBounding = this.BodWrapper.getBoundingClientRect();
        //     this.top = this.BodWrapperBounding.top - headerHeight - this.ListWrapper.parentNode.scrollTop;
        //     console.log(this.top, this.BodWrapper.clientTop);
        //     // this.ListWrapper.parentNode.scrollTop = 0;
        // } else {
        //     this.top = 0;
        // }
    }

    render() {
        const {children, extendChildren, title, extend, hidden} = this.props;
        return (
            <ListWrapper className={'list-wrapper'}>
                {title && <ListHeader>{title}</ListHeader>}
                <ListBody>
                    {children}
                </ListBody>
            </ListWrapper>
        );

    }
}