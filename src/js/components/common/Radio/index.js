/**
 * Author: Ruo
 * Create: 2018-07-29
 * Description: 单选按钮组
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled, {ThemeProvider} from 'styled-components';
import {theme} from 'Styles/theme';
import {Ripple} from 'Components';
import Color from 'color';

const {color} = theme;

const RadioView = styled.div`
  display: block;
  position: relative;
  width: 32px;
  height: 16px;
  outline: none;
  z-index: 0;
  cursor: ${({theme = {}}) => theme.toggle !== false ? 'pointer' : 'not-allowed'};
  filter: grayscale(${({theme = {}}) => theme.toggle !== false ? 0 : 1});
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
  //opacity: 0.5;
  .checked & {
    background-color: ${color('bilibili-pink')};
    opacity: 1;
  }
`;

const Knob = styled.span.attrs({className: 'radio-knob'})`
  display: block;
  position: relative;
  width: 16px;
  height: 16px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.4);
  background-color: white;
  transition: transform linear 80ms, background-color linear 80ms;
  border-radius: 50%;
  z-index: 1;
  .ripple-item {
    //opacity: 0.125;
  }
  .checked & {
    transform: translate3d(18px, 0, 0);
    .ripple-item {
      background-color: ${Color(color('bilibili-pink')).alpha(0.5).rgb().toString()};
    }
  }
`;

export class Radio extends React.Component {
    propTypes = {
        on: PropTypes.bool,
        onClick: PropTypes.func,
        disable: PropTypes.bool,
    }

    constructor() {
        super();
        this.handleOnMouseDown = ::this.handleOnMouseDown;
        this.handleOnMouseUp = ::this.handleOnMouseUp;
        this.state = {
            mouseDown: false,
            rippleRadius: 0,
        };
    }

    handleOnMouseDown() {
        this.setState({mouseDown: true});
    }

    handleOnMouseUp() {
        this.setState({mouseDown: false});
    }

    render() {
        const {on, onClick, disable} = this.props;
        const {mouseDown} = this.state;
        return (
            <RadioView className={on ? 'checked' : ''} onClick={onClick}>
                <Bar/>
                <Knob
                    ref={i => this.btn = i}
                    onMouseDown={!disable ? this.handleOnMouseDown : null}
                    onMouseUp={!disable ? this.handleOnMouseUp : null}
                    onMouseLeave={!disable ? this.handleOnMouseUp : null}
                >
                    <ThemeProvider theme={{radius: 17, speed: 0.75, size: 1.2}}>
                        <Ripple active={mouseDown}/>
                    </ThemeProvider>
                </Knob>
            </RadioView>
        );
    }
};
