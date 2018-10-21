/**
 * Author: Ruo
 * Create: 2018-07-29
 * Description: 图标
 */

import React from 'react';
import styled from 'styled-components';
import {getURL} from 'Utils';

const iconList = {
    cat128: getURL('statics/imgs/icon-128.png'),
    catSvg: getURL('statics/imgs/cat.svg'),
    arrowRight: getURL('statics/imgs/arrow_right.svg'),
    arrowDown: getURL('statics/imgs/arrow_down.svg'),
    arrowUp: getURL('statics/imgs/arrow_up.svg'),
    arrowLeft: getURL('statics/imgs/arrow_left.svg'),
    options: getURL('statics/imgs/options.svg'),
};

const IconView = styled.div.attrs({
    className: ({iconfont}) => iconfont ? 'iconfont ' + iconfont : 'icon',
})`
  display: inline-block;
  width: ${props => props.size || 36}px;
  height: ${props => props.size || 36}px;
  font-size: ${props => props.size || 36}px !important;
  background-image: url(${({icon}) => iconList[icon]});
  background-position: center;
  background-repeat: no-repeat;
  background-size: ${props => props.image ? '100%' : '60%'};
  margin: ${props => props.image ? '0 12px 0 0' : ''};
  -webkit-font-smoothing: antialiased;
`;

export class Icon extends React.Component {
    render() {
        const {icon, image = false, size = 36, ...rest} = this.props;
        return <IconView icon={icon} image={image} size={size} {...rest}></IconView>;
    }
}