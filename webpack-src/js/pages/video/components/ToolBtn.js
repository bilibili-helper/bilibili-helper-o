/**
 * Author: DrowsyFlesh
 * Create: 2018/10/10
 * Description:
 */

import React from 'react';
import {Icon} from 'Components';
import styled from 'styled-components';
import {ToolContent} from './index';
import {b} from 'Utils';

const BtnIcon = styled(Icon)`
  vertical-align: sub;
`;

const HelperBtn = styled.span`
  display: block;
  width: 90px;
  padding: 0 15px;
  border: 1px solid #e5e9ef;
  border-radius: 4px;
  transition: all 0.3s;
  &:hover, &.show {
    color: rgb(0, 161, 214);
    border-color: rgb(0, 161, 214);
  }
`;

export class ToolBtn extends React.Component {
    state = {
        show: false,
    };

    handleClick = (e) => {
        e.preventDefault();
        this.setState({show: !this.state.show});
    };

    render() {
        const {show} = this.state;
        return (
            <React.Fragment>
                <link href="//at.alicdn.com/t/font_862696_227xf8jklcw.css" type="text/css" rel="stylesheet"/>
                <HelperBtn onClick={this.handleClick} className={show ? 'show' : ''}>
                    <BtnIcon iconfont="icon-cat" size={24} image/>
                    <span>哔哩哔哩助手</span>
                </HelperBtn>
                <ToolContent show={show}/>
            </React.Fragment>
        );
    }
}