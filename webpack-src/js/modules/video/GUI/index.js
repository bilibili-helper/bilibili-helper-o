/**
 * Author: DrowsyFlesh
 * Create: 2018/10/23
 * Description:
 */

import _ from 'lodash';
import React from 'react';
import {DanmuGUI} from './danmu';

/**
 * 必须写在外面，写在GUI内部会来不及监听
 * @type {{}}
 */
let videoInfo = {};
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.commend === 'videoInfo') {
        videoInfo = message.videoInfo;
        console.log(videoInfo);
    }
});

export class VideoGUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: {},
        };
    }

    componentWillMount() {
        chrome.runtime.sendMessage({
            commend: 'getOption',
            feature: 'Video',
        }, (options) => {
            this.setState({...options});
        });
    }

    addListener = () => {};

    render() {
        const {options} = this.state;
        //console.log(this.state, options, _.find(options, {key: 'danmu'}));
        return (
            <React.Fragment>
                <DanmuGUI options={_.find(options, {key: 'danmu'}) || {}} cid={videoInfo.cid}/>
            </React.Fragment>
        );
    }
}