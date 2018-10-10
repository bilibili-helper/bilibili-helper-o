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

export class ToolBtn extends React.Component {
    state = {
        show: false,
    };

    handleClick = (e) => {
        e.preventDefault();
        this.setState({show: !this.state.show});
    };

    render() {
        return (
            <React.Fragment>
                <link href="//at.alicdn.com/t/font_862696_227xf8jklcw.css" type="text/css" rel="stylesheet"/>
                <span onClick={this.handleClick}>
                    <BtnIcon iconfont="icon-cat" size={24} image/>
                    <span>哔哩哔哩助手</span>
                </span>
                {this.state.show && <ToolContent/>}
            </React.Fragment>
        );
    }
}