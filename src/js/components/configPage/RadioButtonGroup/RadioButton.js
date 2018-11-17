/**
 * Author: Ruo
 * Create: 2018-08-14
 * Description: 单选按钮组
 */

import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import Color from 'color';
import {Ripple} from 'Components';
import {theme} from 'Styles';

const {color} = theme;

const RadioButtonWrapper = styled.div.attrs({
    className: 'radio-button-wrapper',
})`
  display: flex;
  align-items: center;
  margin-left: -16px;
  width: 100%;
  cursor: ${({theme = {}}) => !theme.disable ? 'pointer' : 'not-allowed'};
  filter: grayscale(${({theme = {}}) => !theme.disable ? 0 : 1});
  opacity: ${({theme = {}}) => !theme.disable ? 1 : 0.5};
`;

const RadioDisc = styled.div.attrs({
    className: props => props.active ? 'radio-button-disc active' : 'radio-button-disc',
})`
  width: 16px;
  height: 16px;
  position: relative;
  border-radius: 50%;
  box-sizing: border-box;
  border: 2px solid ${color('google-grey-700')};
  transition: all 0.3s;
  &::after {
    content: '';
    display: block;
    width: 16px;
    height: 16px;
    position: absolute;
    top: -2px;
    left: -2px;
    background-color: ${color('paper-pink-300')};
    border-radius: 50%;
    transform: scale(0);
    transition: all 0.15s;
  }
  &.checked {
    border-color: ${color('paper-pink-300')};
    &::after {
      transform: scale(0.5);
    }
    .ripple-item {
      background-color: ${Color(color('paper-indigo-500')).alpha(0.5).rgb().toString()};
    }
  }
`;

const RadioTitle = styled.div.attrs({
    className: 'radio-button-title',
})`
  margin-left: 20px;
`;

export class RadioButton extends React.Component {
    constructor() {
        super();
        this.handleOnMouseDown = ::this.handleOnMouseDown;
        this.handleOnMouseUp = ::this.handleOnMouseUp;
        this.state = {
            mouseDown: false,
        };
    }

    handleOnMouseDown(e) {
        this.setState({mouseDown: true});
    }

    handleOnMouseUp() {
        this.setState({mouseDown: false});
    }

    render() {
        const {on, title, onClick, disable = false} = this.props;
        const {mouseDown} = this.state;
        return (
            <ThemeProvider theme={{disable}}>
                <RadioButtonWrapper onClick={onClick}>
                    <RadioDisc
                        className={on ? 'checked' : ''}
                        onMouseDown={!disable ? this.handleOnMouseDown : null}
                        onMouseUp={!disable ? this.handleOnMouseUp : null}
                        onMouseLeave={!disable ? this.handleOnMouseUp : null}
                    >
                        <ThemeProvider theme={{speed: 0.5, size: 1.2}}>
                            <Ripple active={mouseDown}/>
                        </ThemeProvider>
                    </RadioDisc>
                    <RadioTitle>{title}</RadioTitle>
                </RadioButtonWrapper>
            </ThemeProvider>
        );
    }
}