/**
 * Author: DrowsyFlesh
 * Create: 2018/10/10
 * Description:
 */

import React from 'react';
import styled from 'styled-components';

const Content = styled.div.attrs({
    className: 'bilibili-helper-content',
})`
  position: absolute;
  right: -160px;
  top: 35px;
  display: ${({show}) => show ? 'flex' : 'none'};
  flex-direction: column;
  justify-content: space-between;
  padding: 15px 20px 5px;
  width: 422px;
  line-height: initial;
  font-size: initial;
  color: #505050;
  background: #fff;
  border: 1px solid #e5e9ef;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.14);
  z-index: 1000;
  cursor: auto;
  & > * {
    position: relative;
    width: 100%;
    text-align: initial;
    margin-bottom: 10px;
    &:last-of-type{
      //margin-bottom: 0;
    }
  }
`;

export class ToolContent extends React.Component {
    render() {
        return (
            <Content show={this.props.show}/>
        );
    }
}