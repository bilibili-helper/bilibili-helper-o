/**
 * Author: DrowsyFlesh
 * Create: 2018/10/23
 * Description:
 */

import $ from 'jquery';
import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import {ToolBtn} from './components';
import {DanmuGUI} from './danmu';

export const Video = {
    launch: (options) => {
        const {on, container, GUI} = options;
        if (on && GUI) {
            const helperDOM = $('<span class="bilibili-helper" title="哔哩哔哩助手"/>');
            container.append(helperDOM);
            ReactDOM.render(<ToolBtn/>, container.find('.bilibili-helper')[0], () => {
                const container = $('<div/>').addClass(`bilibili-helper-${name}-wrapper`);
                const helperContentDOM = helperDOM.find('.bilibili-helper-content');
                helperContentDOM.append(container);
                ReactDOM.render(<GUI/>, container[0]);
            });
        }
    },
    GUI: class VideoGUI extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                options: {},
                cid: undefined,
            };
            this.addListener();
        }

        componentWillMount() {
            chrome.runtime.sendMessage({
                commend: 'getOption',
                feature: 'Video',
            }, (options) => this.setState({...options}));

            chrome.runtime.sendMessage({commend: 'getVideoCid'}, (cid) => {
                this.setState({cid});
            });
        }

        addListener = () => {
            chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
                if (message.commend === 'newCid' && message.cid !== undefined) {
                    this.setState({cid: message.cid});
                }
            });
        };

        render() {
            const {options, cid} = this.state;
            //console.log(this.state, options, _.find(options, {key: 'danmu'}));
            return (
                <React.Fragment>
                    <DanmuGUI options={_.find(options, {key: 'danmu'})} cid={cid}/>
                </React.Fragment>
            );
        }
    },
};