/**
 * Author: Ruo
 * Create: 2018-07-29
 * Description: 单选按钮组
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {theme} from 'Styles/theme';

const {color} = theme;

const View = styled.div`
  display: block;
  position: relative;
  width: 32px;
  height: 16px;
  outline: none;
  z-index: 0;
  cursor: ${({theme = {}}) => theme.toggle !== false ? 'pointer' : 'not-allowed'};
  filter: grayscale(${({theme = {}}) => theme.toggle !== false ? 0 : 1});
`;
const Bar = styled.div`
  width: 32px;
  height: 16px;
  border-radius: 2px;
  background-color: ${color('google-grey-400')};
  transition: background-color linear 80ms;
  //opacity: 0.5;
  .checked & {
    background-color: ${color('bilibili-pink')};
    opacity: 1;
  }
`;

const Knob = styled.span.attrs({className: 'checkbox-knob'})`
  display: block;
  width: 14px;
  height: 14px;
  
  border-radius: 2px;
  //box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.4);
  background-color: white;
  border: 1px solid ${color('google-grey-400')};
  transition: transform linear 80ms, background-color linear 80ms;
  z-index: 1;
  .checked & {
    transform: translate3d(16px, 0, 0);
    border-color: ${color('bilibili-pink')};
  }
`;

export class CheckBoxButton extends React.Component {
    propTypes = {
        on: PropTypes.bool,
        onClick: PropTypes.func,
        disable: PropTypes.bool,
    };

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
        //const {mouseDown} = this.state;
        return (
            <View className={on ? 'checked' : ''} onClick={onClick}>
                <Bar>
                    <Knob
                        onMouseDown={!disable ? this.handleOnMouseDown : null}
                        onMouseUp={!disable ? this.handleOnMouseUp : null}
                        onMouseLeave={!disable ? this.handleOnMouseUp : null}
                    />
                </Bar>
            </View>
        );
    }
};
