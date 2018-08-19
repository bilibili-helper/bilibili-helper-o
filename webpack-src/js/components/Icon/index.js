/**
 * Author: Ruo
 * Create: 2018-07-29
 * Description: 图标
 */

import React from 'react';
import styled from 'styled-components';
import {getUrl} from 'Utils';

const typeList = {
    cat128: getUrl('statics/imgs/icon-128.png'),
    arrowRight: getUrl('statics/imgs/arrow_right.svg'),
    arrowDown: getUrl('statics/imgs/arrow_down.svg'),
    arrowUp: getUrl('statics/imgs/arrow_up.svg'),
    arrowLeft: getUrl('statics/imgs/arrow_left.svg'),
};

const IconView = styled.div.attrs({
    className: 'icon',
})`
  width: 36px;
  height: 36px;
  background-image: url(${props => typeList[props.type]});
  background-position: center;
  background-repeat: no-repeat;
  background-size: ${props => props.image ? '100%' : '60%'};
  margin: ${props => props.image ? '0 12px 0 -6px' : ''};
`;

export class Icon extends React.Component {
    render() {
        const {type, image = false} = this.props;
        return <IconView type={type} image={image}></IconView>;
    }
}