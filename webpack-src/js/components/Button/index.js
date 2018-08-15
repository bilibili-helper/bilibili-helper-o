/**
 * Author: Ruo
 * Create: 2018-07-26
 * Description:
 */

import $ from 'jquery';
import React from 'react';
import styled, {withTheme, ThemeProvider} from 'styled-components';
import {Ripple} from 'Components/Ripple';
import {theme} from 'Styles/theme';

const {color} = theme;

const ButtonWrapper = styled.div.attrs({
    className: 'button-wrapper',
})`
  display: inline-block;
  justify-content: center;
  align-items: center;
  position: relative;
  ${props => props.isIcon ? 'height: 36px' : ''};
  ${props => props.isIcon ? 'margin: -12px' : ''};
  border-radius: ${props => props.isIcon ? '50%' : '2px'};
  overflow: hidden;
`;

const ButtonView = styled.button.attrs({
    className: 'button-view',
})`
  display: block;
  width: 100%;
  height: 100%;
  min-width: ${props => props.isIcon ? '36px' : '50px'};
  ${props => props.isIcon ? 'padding: 0' : ''};
  ${props => props.normal ? 'min-height: 36px' : ''};
  font-size: 13px;
  font-weight: 500;
  background-color: transparent;
  color: ${color('paper-grey-600')};
  cursor: pointer;
  border: none;
  outline: none;
  z-index: 1;
`;

class ButtonClass extends React.Component {
    constructor() {
        super();
        this.handleOnMouseDown = ::this.handleOnMouseDown;
        this.handleOnMouseUp = ::this.handleOnMouseUp;
        this.state = {
            mouseDown: false,
            rippleRadius: null,
            x: undefined,
            y: undefined,
        };
    }

    handleOnMouseDown(e) {
        const {isIcon} = this.props;
        const width = this.btn.clientWidth;
        const height = this.btn.clientHeight;
        const bounding = this.btn.getBoundingClientRect();
        const x = isIcon ? width / 2 : e.clientX - bounding.left;
        const y = isIcon ? height / 2 : e.clientY - bounding.top;
        const deltaX = isIcon ? width / 2 : Math.abs(width / 2 - x) + width / 2;
        const deltaY = isIcon ? height / 2 : Math.abs(height / 2 - y) + height / 2;
        this.setState({mouseDown: true, rippleRadius: Math.sqrt(deltaX * deltaX + deltaY * deltaY), x, y});
    }

    handleOnMouseUp() {
        this.setState({mouseDown: false});
    }

    render() {
        const {children, className, theme, isIcon = false, onClick, ...rest} = this.props;
        const {mouseDown, rippleRadius, x, y} = this.state;
        return (
            <ButtonWrapper
                isIcon={isIcon}
                className={className}
                onClick={onClick}
            >
                <ButtonView
                    innerRef={i => this.btn = i}
                    onMouseDown={this.handleOnMouseDown}
                    onMouseUp={this.handleOnMouseUp}
                    onMouseLeave={this.handleOnMouseUp}
                    isIcon={isIcon}
                    {...rest}
                >{children}</ButtonView>
                <ThemeProvider theme={{...theme, radius: rippleRadius}}>
                    <Ripple active={mouseDown} x={x} y={y}/>
                </ThemeProvider>
            </ButtonWrapper>
        );
    }
}

export const Button = withTheme(ButtonClass);