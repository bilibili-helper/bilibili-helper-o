/**
 * Author: DrowsyFlesh
 * Create: 2018/10/23
 * Description:
 */

import $ from 'jquery';
import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import {Danmu} from './danmu';
import {UI} from 'Libs/UI';

export class DanmuUI extends UI {
    constructor() {
        super({
            name: 'danmu',
            dependencies: ['video'],
        });
    }

    load = ([container], settings) => {
        return new Promise(resolve => {
            const danmuWrapper = $('<div/>').attr('class', 'bilibili-helper-danmu-wrapper');
            container.append(danmuWrapper);
            danmuWrapper[0] && ReactDOM.render(<Danmu settings={settings}/>, danmuWrapper[0], resolve);
        });
    };
}

/*Danmu = {
   launch: (options) => {
       const {on, container, GUI} = options;
       if (on && GUI) {
           const content = container.find('.bilibili-helper-content');
           console.log(container, content);
           //ReactDOM.render(<GUI/>, content[0]);
       }
   },
   GUI: class DanmuGUI extends React.Component {
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
               feature: 'Danmu',
           }, (options) => this.setState({...options}));
       }

       addListener = () => {
           //chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
           //    if (message.commend === 'newCid' && message.cid !== undefined) {
           //        this.setState({cid: message.cid});
           //    }
           //});
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
};*/