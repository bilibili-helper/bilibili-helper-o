/**
 * Author: Ruo
 * Create: 2018-08-15
 * Description:
 */

import React from 'react';
import styled from 'styled-components';
import {theme} from 'Styles';

const Wrapper = styled.div.attrs({
    className: props => props.on ? 'model-wrapper on' : 'model-wrapper',
})`
  position: fixed;
  top: ${theme.headerHeight}px;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: -1000;
  visibility: hidden;
  opacity: 0;
  transition: all 0.2s, z-index 0.2s 0.1s;
  &.on {
    z-index: 1000;
    visibility: visible;
    opacity: 1;
    transition: opacity 0.3s;
  }
`;

const Container = styled.div.attrs({
    className: 'model-container',
})`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 560px;
  min-width: 300px;
  user-select: initial;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.12), 0 16px 16px rgba(0, 0, 0, 0.24);
  transition: transform 0.12s;
  transfrom: scale(1);
`;

const Title = styled.div.attrs({
    className: 'model-title',
})`
  flex: 0;
  padding: 16px;
  font-size: 14px;
`;

const Body = styled.div.attrs({
    className: 'model-bdoy',
})`
  flex: 1;
  padding: 16px;
  min-height: 50px;
  max-height: 600px;
`;

const ButtonContainer = styled.div.attrs({
    className: 'model-button-container',
})`
  display: flex;
  flex-direction: row-reverse;
  flex: 0;
  padding: 16px;
`;

export class Modal extends React.Component {
    constructor() {
        super();
        this.handleMaskClick = ::this.handleMaskClick;
    }

    componentDidUpdate() {
        const height = this.container.getBoundingClientRect().height;
        this.container.style.top = `calc(50% - ${height / 2}px)`;
    }

    handleMaskClick(e) {
        if (e.target.className.search('model-wrapper') !== -1) { // 仅仅 wrapper 被点击
            this.container.style.transform = 'scale(1.02)';
            setTimeout(() => this.container.style.transform = 'scale(1)', 80);
        }
    }

    render() {
        const {on, title, body, buttons} = this.props;
        return <Wrapper on={on} onMouseDown={this.handleMaskClick}>
            <Container innerRef={i => this.container = i}>
                {title && <Title>{title}</Title>}
                <Body>{body}</Body>
                <ButtonContainer>{buttons}</ButtonContainer>
            </Container>
        </Wrapper>;
    }
}