/**
 * Author: DrowsyFlesh
 * Create: 2018/11/10
 * Description:
 */
import $ from 'jquery';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import store from 'store';
import {Icon, CheckBoxButton} from 'Components';

const ChatFilterPanel = styled.div.attrs({className: 'chat-helper-panel ctrl-panel bilibili-chat-filter-panel'})`
  position: absolute;
  bottom: 30px;
  left: 0;
  padding: 16px;
  width: 115px;
  background-color: #fff;
  border-radius: 7px;
  box-shadow: 0 6px 12px 0 rgba(106,115,133,.22);
  z-index: 100;
  display: ${({show}) => show ? 'block' : 'none'};
`;

const ChatFilterIcon = styled(Icon)`
  margin: 0 0 0 7px;
  font-size: 20px;
  vertical-align: middle;
  color: #c8c8c8;
  transition: color .4s cubic-bezier(.22,.58,.12,.98);
  user-select: none;
  &:hover {
    color: #23ade5;
  }
`;

const FilterTitle = styled.h1`
  margin: 0 0 20px;
  font-weight: 400;
  font-size: 18px;
  color: #23ade5;
`;

const FilterItem = styled.div.attrs({className: 'filter-item'})`
  display: flex;
  margin: 0 0 10px;
  font-size: 12px;
  color: #666;
`;

const FilterItemTitle = styled.span.attrs({className: 'filter-item-title'})`
  margin-right: 34px;
`;

const FilterRadio = styled(CheckBoxButton)`
  & .radio-knob {
    top: 2px;
    left: 2px;
    width: 12px;
    height: 12px;
  }
`;

export class ChatFilter extends React.Component {
    propTypes = {
        settings: PropTypes.object,
    }

    constructor(props) {
        super(props);
        this.styleList = {
            chat: '.chat-item.danmaku-item{display:none;}',
            small: '.chat-item:not(.system-msg) > a, .chat-item .guard-icon{display:none !important;}',
            gift: '.chat-item.gift-item,.bilibili-live-player-video-area > .bilibili-live-player-video-gift{display:none !important;}',
            enterMsg: '.chat-item.welcome-msg,.chat-item.welcome-guard{display: none !important;}',
            medal: '.chat-item .fans-medal-item-ctnr{display:none !important;}',
            achievement: '.chat-item .title-label{display:none !important;}',
            level: '.chat-item .user-level-icon{display:none !important;}',
            announcement: '.chat-item.system-msg{display:none !important;}',
        };
        this.roomId = location.pathname.slice(1);
        this.storeName = 'bilibili-helper-chat-filter';
        this.store = store.get(this.storeName);
        if (_.isEmpty(this.store)) this.store = store.set(this.storeName, {});
        this.state = {
            localOption: this.store[this.roomId] || {},
        };
    }

    componentDidMount() {
        const that = this;
        $(document).on('click', function(e) {
            const target = $(e.target);
            if (target.parents('#bilibili-helper-chat-filter').length <= 0 && $(that.panel).css('display') !== 'none') {
                $(that.panel).fadeOut(200);
            }
        });
    }

    handleOnClick = () => {
        const panel = document.querySelector('.bilibili-chat-filter-panel');
        if (panel.style['display'] === 'none' || !panel.style['display']) {
            $(panel).fadeIn(200);
        } else $(panel).fadeOut(200);
    };

    handleOnClickRadio = (key, on) => {
        const globalOption = _.find(this.props.settings.subPage.options, (o) => o.key === key);
        let localOption = {...this.state.localOption};
        if (globalOption.on === on && localOption[key] !== undefined) delete localOption[key];
        else localOption[key] = on;

        chrome.runtime.sendMessage({
            commend: 'setGAEvent',
            action: 'click',
            category: 'chatFilter',
            label: key
        });
        this.store[this.roomId] = localOption;
        this.setState({localOption}, () => store.set(this.storeName, this.store));
    };

    render() {
        const {subPage} = this.props.settings;
        const options = subPage.options;
        const {localOption} = this.state;
        return (
            <React.Fragment>
                <link rel="stylesheet" type="text/css" href="//at.alicdn.com/t/font_894803_t8pireix5fq.css"/>
                <ChatFilterIcon iconfont="ban" size={22} onClick={this.handleOnClick}/>
                <ChatFilterPanel ref={i => this.panel = i}>
                    <FilterTitle>屏蔽列表</FilterTitle>
                    {_.map(options, (option) => {
                        const {key, title, on} = option;
                        const style = this.styleList[key];
                        const localOn = localOption[key];
                        const resultOn = localOn !== undefined ? localOn : on;
                        return (
                            <FilterItem key={key}>
                                <FilterItemTitle>{title}</FilterItemTitle>
                                <FilterRadio on={resultOn} onClick={() => this.handleOnClickRadio(key, !resultOn)}/>
                                {!!style && resultOn ? <style>{style}</style> : null}
                            </FilterItem>
                        );
                    })}
                </ChatFilterPanel>
            </React.Fragment>
        );
    }
}