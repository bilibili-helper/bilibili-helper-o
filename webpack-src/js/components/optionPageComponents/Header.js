/**
 * Author: Ruo
 * Create: 2018-07-27
 * Description:
 */

import React from 'react';
import styled from 'styled-components';
import {theme} from 'Styles/theme';

const {color, headerHeight} = theme;

const View = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  min-height: ${headerHeight}px;
  background-color: ${color('google-blue-700')};
  color: white;
  z-index: 1000;
`;

const Start = styled.div`
  -webkit-margin-start: 12px;
  position: relative;
  flex: auto;
  transition: opacity 100ms;
`;

const End = styled.div`
  -webkit-margin-end: 12px;
`;

const Title = styled.h1`
  -webkit-margin-start: 6px;
  -webkit-padding-end: 12px;
  flex: 1;
  font-size: 16px;
  //font-weight: 400;
  line-height: normal;
`;

export const Header = ({title, ...rest}) => {
    return (
        <View {...rest}>
            <Start>
                <Title>{title}</Title>
            </Start>
            <End/>
        </View>
    )
}