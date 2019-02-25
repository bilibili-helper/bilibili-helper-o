/**
 * Author: DrowsyFlesh
 * Create: 2018/10/10
 * Description:
 */
import React from 'react';
import styled from 'styled-components';
import {ToolContent} from './ToolContent';

const HelperBtn = styled.span`
  display: inline-block;
  padding: 0 15px;
  border-radius: 4px;
  transition: all 0.3s;
  width: 48px;
  .func-module & {
    width: 90px;
    border: 1px solid #e5e9ef;
    &:hover {
      border-color: rgb(0, 161, 214);
    }
  }
  &:hover, &.show {
    color: rgb(0, 161, 214);
  }
  .entry-old .bilibili-helper &, #entryOld .bilibili-helper & {
    display: block;
    position: relative;
    margin-top: 8px;
    padding: 8px 0;
    line-height: 16px;
    background-color: #fb7299;
    font-size: 12px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
    text-align: center;
    -webkit-box-shadow: 0 2px 10px 0 rgba(251,114,153,.4);
    box-shadow: 0 2px 10px 0 rgba(251,114,153,.4);
    z-index: 2;
    user-select: none;
    &:hover {
      background-color: #ff85ad;
    }
  }
`;

const Mask = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export class ToolBtn extends React.Component {
    constructor(props) {
        super(props);
        this.show = false;
    }

    handleClick = (e) => {
        e.preventDefault();
        const content = document.querySelector('.bilibili-helper-content');
        if (this.show) {
            this.show = false;
            content && content.setAttribute('style', 'visibility: hidden;');
        } else {
            this.show = true;
            content && content.setAttribute('style', 'visibility: visible;');
        }
    };

    render() {
        return (
            <React.Fragment>
                <link href="//at.alicdn.com/t/font_862696_227xf8jklcw.css" type="text/css" rel="stylesheet"/>
                <HelperBtn onClick={this.handleClick} title="哔哩哔哩助手">哔哩<br/>助手</HelperBtn>
                <ToolContent/>
            </React.Fragment>
        );
    }
}
