/**
 * Author: DrowsyFlesh
 * Create: 2018/10/23
 * Description:
 */

import _ from 'lodash';
import React from 'react';
import {DanmuGUI} from './danmu';

export class VideoGUI extends React.Component {
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

        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
           if(message.commend === 'newCid' && message.cid !== undefined) {
               this.setState({cid: message.cid});
           }
        });
    }

    addListener = () => {
    };

    render() {
        const {options, cid} = this.state;
        //console.log(this.state, options, _.find(options, {key: 'danmu'}));
        return (
            <React.Fragment>
                <DanmuGUI options={_.find(options, {key: 'danmu'}) || {}} cid={cid}/>
            </React.Fragment>
        );
    }
}