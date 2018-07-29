/**
 * Author: Ruo
 * Create: 2018-07-27
 * Description:
 */

import $ from 'jquery';
import React from 'react';
import styled, {withTheme, keyframes} from 'styled-components';

const fadeIn = keyframes`
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`;

const RippleView = styled.div.attrs({
    className: 'ripple-box',
})`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  .ripple-item {
    user-select: none;
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 50%;
    transform: scale(0);
    background-color: rgb(40, 40, 40);
    opacity: 0.25;
    animation: 1.15s ${fadeIn} cubic-bezier(0.1, 0.3, 0, 1) forwards;
  }
  .hiding {
    transition: opacity .3s;
    opacity: 0;
  }
`;

class RippleClass extends React.Component {
    constructor() {
        super();
        this.currentRipple = null;
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const {active, theme, x, y} = nextProps;
        const {rippleRadius} = theme;
        let style = `width:${2 * rippleRadius}px;height:${2 * rippleRadius}px;margin: -${rippleRadius}px;`;
        if (x !== undefined && y !== undefined) style += `top:${y}px;left:${x}px;`
        if (active) {
            this.currentRipple = $(`<div class="ripple-item" style="${style}"/>`);
            $(this.box).prepend(this.currentRipple);
        } else if (this.currentRipple) {
            this.currentRipple.addClass('hiding');
            ((t) => {
                const c = t.currentRipple;
                setTimeout(() => c.remove(), 300);
            })(this);
        }
    }

    render() {
        return <RippleView innerRef={i => this.box = i}></RippleView>;
    }
}

export const Ripple = withTheme(RippleClass);