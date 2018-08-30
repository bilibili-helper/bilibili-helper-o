/**
 * Author: Ruo
 * Create: 2018-07-26
 * Description:
 */

import $ from 'jquery';
import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {Ripple} from 'Components';
import {theme} from 'Styles/theme';

const {color} = theme;

const ButtonWrapper = styled.div.attrs({
    className: 'button-wrapper',
})`
  display: inline-block;
  justify-content: center;
  align-items: center;
  position: relative;
  ${props => props.theme.icon ? 'height: 36px' : ''};
  ${props => props.theme.icon ? 'margin-right: -12px' : ''};
  border-radius: ${props => props.theme.icon ? '50%' : '0'};
  overflow: hidden;
`;

const ButtonView = styled.button.attrs({
    className: 'button-view',
})`
  display: block;
  width: 100%;
  height: 100%;
  min-width: ${props => props.theme.icon ? '36px' : '50px'};
  ${props => props.theme.icon ? 'padding: 0' : ''};
  ${props => props.theme.normal ? 'min-height: 36px' : ''};
  font-size: 13px;
  font-weight: 500;
  background-color: transparent;
  color: ${color('paper-grey-600')};
  cursor: pointer;
  border: none;
  outline: none;
  z-index: 1;
`;

export class Button extends React.Component {
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
        const {icon} = this.props;
        const width = this.btn.clientWidth;
        const height = this.btn.clientHeight;
        const bounding = this.btn.getBoundingClientRect();
        const x = icon ? width / 2 : e.clientX - bounding.left;
        const y = icon ? height / 2 : e.clientY - bounding.top;
        const deltaX = icon ? width / 2 : Math.abs(width / 2 - x) + width / 2;
        const deltaY = icon ? height / 2 : Math.abs(height / 2 - y) + height / 2;
        this.setState({mouseDown: true, rippleRadius: Math.sqrt(deltaX * deltaX + deltaY * deltaY), x, y});
    }

    handleOnMouseUp() {
        this.setState({mouseDown: false});
    }

    render() {
        const {children, className, theme, icon = false, normal, onClick, ...rest} = this.props;
        const {mouseDown, rippleRadius, x, y} = this.state;
        return (
            <ThemeProvider theme={{...theme, radius: rippleRadius, icon, normal}}>
                <ButtonWrapper
                    className={className}
                    onClick={onClick}
                >
                    <ButtonView
                        innerRef={i => this.btn = i}
                        onMouseDown={this.handleOnMouseDown}
                        onMouseUp={this.handleOnMouseUp}
                        onMouseLeave={this.handleOnMouseUp}
                        {...rest}
                    >{children}</ButtonView>
                    <Ripple active={mouseDown} x={x} y={y}/>
                </ButtonWrapper>
            </ThemeProvider>
        );
    }
}
