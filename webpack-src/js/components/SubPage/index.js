/**
 * Author: Ruo
 * Create: 2018-08-16
 * Description:
 */
import React from 'react';
import styled, {ThemeProvider, keyframes} from 'styled-components';
import {Button, Icon} from 'Components';
import {theme} from 'Styles';

const ContainerEnterKeyFrame = keyframes`
  0% {
    top: ${({theme}) => theme.top ? theme.top + 'px' : ''};
    height: ${({theme}) => theme.height ? theme.height + 'px': ''};
    overflow: hidden;
  }
  99.99% {
    top: 0;
    height: ${({theme}) => theme.height ? theme.height + 'px': ''};
    overflow: hidden;
  }
  100% {
    top: 0;
    margin: 0 auto;
    height: max-content;
    min-height: 100%;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2);
    overflow: unset;
  }
`;
const ContainerLeaveKeyFrame = keyframes`
  0% {
    top: 0;
    min-height: 100%;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2);
  }
  100% {
    top: ${({theme}) => theme.top ? theme.top + 'px' : ''};
    height: ${({theme}) => theme.height ? theme.height + 'px': ''};
    min-height: ${({theme}) => theme.height ? theme.height + 'px': ''};
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2);
  }
`;

const Wrapper = styled.div.attrs({
    className: ({theme}) => theme.on ? 'sub-page-wrapper on' : 'sub-page-wrapper off',
})`
  position: fixed;
  top: ${theme.headerHeight}px;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  width: 100%;
  transition: z-index 0.3s;
  background-color: transparent;
  transition: background-color 0.5s;
  pointer-events: none;
  z-index: 100;
  &.on {
    overflow: auto;
    background-color: ${theme.color('google-grey-50')};
  }
  &.off {
    
  }
`;

const Container = styled.div.attrs({
    className: ({theme}) => theme.on ? 'sub-page-container will-enter' : 'sub-page-container will-leave',
})`
  display: flex;
  flex-direction: column;
  position: absolute;
  max-width: 600px;
  top: ${({theme}) => theme.top ? theme.top + 'px' : ''};
  left: ${({theme}) => theme.left ? theme.left + 'px': ''};
  height: ${({theme}) => theme.height ? theme.height + 'px': ''};
  width: ${({theme}) => theme.width ? theme.width + 'px' : ''};
  min-height: ${({theme}) => theme.height ? theme.height + 'px': ''};
  margin: 0;
  opacity: 0;
  background-color: #fff;
  pointer-events: auto;
  &.will-enter {
    opacity: 1;
    visibility: visible;
    border-radius: 0;
    transition: opacity 0.2s;
    animation-name: ${ContainerEnterKeyFrame};
    animation-delay: 0.05s;
    animation-duration: 0.2s;
    animation-fill-mode: forwards;
    animation-timing-function: ease-in-out;
  }
  &.will-leave {
    transition: all 0s 0.4s,border-radius 0.3s,opacity 0.15s 0.15s cubic-bezier(0.34, 0.72, 0.34, 0.72);
    opacity: 0;
    //background-color: transparent;
    visibility: hidden;
    border-radius: 4px;
    animation-name: ${ContainerLeaveKeyFrame};
    animation-delay: 0s;
    animation-duration: 0.2s;
    animation-fill-mode: forwards;
    animation-timing-function: ease-in-out;
    & > * {
      opacity: 0;
      transition: opacity 0.2s;
    }
  }
`;

const Header = styled.div.attrs({
    className: 'sub-page-header',
})`
  display: flex;
  padding: 16px 6px;
  flex-grow: 0;
  flex-shrink: 0;
`;

const Title = styled.h5.attrs({
    className: 'sub-page-title',
})`
  margin: auto 0 auto 24px;
`;

const Body = styled.div.attrs({
    className: 'sub-page-body',
})`
  flex-grow: 1;
  & .list-body {
    box-shadow: none;
  }
`;

export class SubPage extends React.Component {
    constructor() {
        super();
        this.state = {
            top: null,
            left: null,
            height: null,
            width: null,
        };
    }

    componentWillReceiveProps(nextProps, nextContent) {
        const {parent = null} = nextProps;
        if (parent) {
            const {top, left, height, width} = parent.getBoundingClientRect();
            this.setState({top: top - theme.headerHeight, left, height, width});
        }
    }

    render() {
        const {on = false, title = '无标题', children, onClose, theme} = this.props;
        const {top, left, height, width} = this.state;
        return (
            <ThemeProvider theme={{...theme, on, top, left, height, width}}>
                <Wrapper>
                    <Container innerRef={i => this.containerRef = i}>
                        <Header>
                            <Button icon onClick={onClose}><Icon type="arrowLeft"/></Button>
                            <Title>{title}</Title>
                        </Header>
                        <Body>{children}</Body>
                    </Container>
                </Wrapper>
            </ThemeProvider>
        );
    }
}