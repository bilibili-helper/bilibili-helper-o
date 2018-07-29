/**
 * Author: Ruo
 * Create: 2018-06-12
 * Description:
 */
import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import {__, isLogin, createTab} from 'Utils';
import {Button, Body} from 'Components';
// import {Provider} from 'mobx-react';
// import createBrowserHistory from 'history/createBrowserHistory';
// import {RouterStore, syncHistoryWithStore} from 'mobx-react-router';
// import {Router} from 'react-router';

// const browserHistory = createBrowserHistory();
// const routingStore = new RouterStore();
// const history = syncHistoryWithStore(browserHistory, routingStore);
// const state = window.__INITIAL_STATE__;
import 'Styles/scss/popup.scss';

class PagePopup extends React.Component {
    constructor(props) {
        super();
        this.state = {
            hasLogin: false,
            optionPageUrl: chrome.extension.getURL('options.html'),
        };
    }

    componentWillMount() {
        const that = this;
        isLogin().then(res => that.setState({hasLogin: res}));
    }

    render() {
        const {hasLogin, optionPageUrl} = this.state;
        return (
            <Body>
                <BiliButton onClick={() => createTab('https://www.bilibili.com/')}>{__('goBili')}</BiliButton>
                <BiliButton onClick={() => createTab('https://live.bilibili.com/')}>{__('goBiliLive')}</BiliButton>
                <BiliButton disabled={!hasLogin} title={!hasLogin ? __('notLogged') : ''}>{__('goDynamic')}</BiliButton>
                <BiliButton disabled={!hasLogin} title={!hasLogin ? __('notLogged') : ''}>{__('goFavorite')}</BiliButton>
                <BiliButton onClick={() => createTab(optionPageUrl)}>{__('goOption')}</BiliButton>
            </Body>
        );
    }
}

$(document).ready(() => {
    ReactDOM.render(
        <PagePopup/>,
        document.getElementById('root'),
    );
});
