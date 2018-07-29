/**
 * Author: Ruo
 * Create: 2018-07-29
 * Description: 单选按钮组
 */

import React from 'react';
import styled from 'styled-components';
import {theme} from 'Styles/theme';

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
  .checked & {
    background-color: ${color('google-blue-600')};
    transform: translate3d(18px, 0, 0);
  }
`;

export const Radio = ({on, onClick}) => {
    return (
        <RadioView className={on ? 'checked' : ''}>
            <Bar/>
            <Knob onClick={onClick}/>
        </RadioView>
    );
};
