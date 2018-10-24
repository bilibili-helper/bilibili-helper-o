/**
 * Author: Ruo
 * Create: 2018-07-26
 * Description:
 */

import React from 'react';
import styled, {
    css,
    ThemeProvider,
} from 'styled-components';
import {
    Icon,
    Ripple,
} from 'Components';
import {theme} from 'Styles/theme';

const {color} = theme;

const iconStyle = css`
  height: 36px;
  margin-right: -12px;
  border-radius: 50%;
`;

const ButtonWrapper = styled.div.attrs({
    className: 'button-wrapper',
})`
  display: inline-block;
  justify-content: center;
  align-items: center;
  position: relative;
  ${({theme}) => theme.icon && iconStyle};
  overflow: hidden;
`;

const ButtonView = styled.button.attrs({
    className: 'button-view',
})`
  display: block;
  width: 100%;
  height: 100%;
  min-width: ${({theme}) => theme.icon ? '36px' : '50px'};
  ${({theme}) => theme.icon ? 'padding: 0' : ''};
  ${({theme}) => theme.normal ? 'min-height: 36px' : ''};
  font-size: 13px;
  font-weight: 500;
  background-color: transparent;
  color: ${color('paper-grey-600')};
  cursor: ${({theme = {}}) => !theme.disable ? 'pointer' : 'not-allowed'};
  filter: grayscale(${({theme = {}}) => !theme.disable ? 0 : 1});
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
        const {children, className, theme, icon, normal, onClick, disable, ...rest} = this.props;
        const {mouseDown, rippleRadius, x, y} = this.state;
        return (
            <ThemeProvider theme={{...theme, radius: rippleRadius, icon, normal, disable}}>
                <ButtonWrapper
                    className={className}
                    onClick={onClick}
                >
                    <ButtonView
                        innerRef={i => this.btn = i}
                        onMouseDown={!disable ? this.handleOnMouseDown : null}
                        onMouseUp={!disable ? this.handleOnMouseUp : null}
                        onMouseLeave={!disable ? this.handleOnMouseUp : null}
                        {...rest}
                    >
                        {icon && <Icon icon={icon}/>}
                        {children}
                    </ButtonView>
                    <Ripple active={mouseDown} x={x} y={y}/>
                </ButtonWrapper>
            </ThemeProvider>
        );
    }
}
