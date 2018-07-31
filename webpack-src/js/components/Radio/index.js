/**
 * Author: Ruo
 * Create: 2018-07-29
 * Description: 单选按钮组
 */

import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {theme} from 'Styles/theme';
import {Ripple} from 'Components';
import Color from 'color';

const {color} = theme;

const RadioView = styled.div`
  display: block;
  position: relative;
  width: 34px;
  height: 16px;
  outline: none;
  z-index: 0;
`;
const Bar = styled.span`
  width: 28px;
  height: 12px;
  position: absolute;
  left: 3px;
  top: 2px;
  border-radius: 8px;
  background-color: ${color('google-grey-400')};
  transition: background-color linear 80ms;
  .checked & {
    background-color: ${color('google-blue-600')};
    opacity: 0.5;
  }
`;

const Knob = styled.span`
  display: block;
  position: relative;
  width: 16px;
  height: 16px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.4);
  background-color: white;
  transition: transform linear 80ms, background-color linear 80ms;
  border-radius: 50%;
  z-index: 1;
  cursor: pointer;
  .ripple-item {
    //opacity: 0.125;
  }
  .checked & {
    background-color: ${color('google-blue-600')};
    transform: translate3d(18px, 0, 0);
    .ripple-item {
      background-color: ${Color(color('paper-indigo-500')).alpha(0.5).rgb().toString()};
    }
  }
`;

export class Radio extends React.Component {
    constructor() {
        super();
        this.handleOnMouseDown = ::this.handleOnMouseDown;
        this.handleOnMouseUp = ::this.handleOnMouseUp;
        this.state = {
            mouseDown: false,
        };
    }

    handleOnMouseDown(e) {
        this.setState({mouseDown: true, rippleRadius: 12 * Math.sqrt(2)});
    }

    handleOnMouseUp() {
        this.setState({mouseDown: false});
    }

    render() {
        const {on, onClick} = this.props;
        const {mouseDown, rippleRadius} = this.state;
        return (
            <RadioView className={on ? 'checked' : ''} onClick={onClick}>
                <Bar/>
                <Knob
                    innerRef={i => this.btn = i}
                    onMouseDown={this.handleOnMouseDown}
                    onMouseUp={this.handleOnMouseUp}
                    onMouseLeave={this.handleOnMouseUp}
                >
                    <ThemeProvider theme={{radius: rippleRadius, speed: 0.75, size: 1.2}}>
                        <Ripple active={mouseDown}/>
                    </ThemeProvider>
                </Knob>
            </RadioView>
        );
    }
};
