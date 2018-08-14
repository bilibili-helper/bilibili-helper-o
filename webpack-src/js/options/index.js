/**
 * Author: Ruo
 * Create: 2018-06-12
 * Description:
 */

import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import {__, isLogin, createTab, version, setOption, getOptions} from 'Utils';
import {Button, Body, List, ListItem, Header, Icon, Radio, RadioButtonGroup} from 'Components';

import 'Styles/scss/options.scss';

const {Fragment} = React;
const OptionBody = styled(Body).attrs({
    className: 'option-body',
})`
  position: absolute;
  margin: 0 auto 0;
  padding: 0 3px 56px;
  top: 56px;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
`;

class PageOptions extends React.Component {
    constructor() {
        super();
        this.state = Object.assign(getOptions());
        this.handleOnClick = ::this.handleOnClick;
        this.handleSetOption = ::this.handleSetOption;
    }

    componentWillMount() {

    }

    handleOnClick(type) {
        const {active} = this.state;
        this.setState({active: active === type ? '' : type});
    }

    handleSetOption(key, value) {
        if (this.state[key]) {
            const optionObject = this.state[key];
            if (value == undefined) {
                optionObject.on = !optionObject.on;
            } else {
                optionObject.value = value;
            }
            setOption(key, optionObject);
            this.setState({key: optionObject});
        }
    }

    render() {
        const {
            newWatchList,
            dynamicCheck,
            downloadType,
            videoPlayerWidenType,
            sign,
            treasure,
        } = this.state;
        return <Fragment>
            <Header title="设置"/>
            <OptionBody>
                <List title="主站">
                    <ListItem
                        onClick={() => this.handleSetOption('newWatchList')}
                        operation={<Radio
                            on={newWatchList.on}
                        />}>新版关注页面跳转</ListItem>
                    <ListItem
                        onClick={() => this.handleSetOption('dynamicCheck')}
                        operation={<Radio
                            on={dynamicCheck.on}
                        />}>更新“我的关注”</ListItem>
                    <ListItem
                        onClick={() => this.handleSetOption('downloadType')}
                        operation={<Radio
                            on={downloadType.on}
                        />}
                        subList={{
                            hide: !downloadType.on,
                            theme: {twoLine: false},
                            children: <RadioButtonGroup
                                value={downloadType.value}
                                data={[
                                    {title: 'FLV优先', value: 'flv'},
                                    {title: 'MP4优先', value: 'mp4'},
                                ]}
                                onClick={(value) => this.handleSetOption('downloadType', value)}
                            />,
                        }}>视频下载格式</ListItem>
                    <ListItem
                        onClick={() => this.handleSetOption('videoPlayerWidenType')}
                        operation={<Radio
                            on={videoPlayerWidenType.on}
                        />}
                        subList={{
                            hide: !videoPlayerWidenType.on,
                            theme: {twoLine: false},
                            children: <RadioButtonGroup
                                value={videoPlayerWidenType.value}
                                data={[
                                    {title: '一般宽屏', value: 'wide'},
                                    {title: '网页全屏', value: 'web'},
                                    {title: '屏幕全屏', value: 'full'},
                                ]}
                                onClick={(value) => this.handleSetOption('videoPlayerWidenType', value)}
                            />,
                        }}>主站播放器宽屏类型</ListItem>
                </List>
                <List title="直播区">
                    <ListItem
                        onClick={() => this.handleSetOption('sign')}
                        operation={<Radio
                            on={sign.on}
                        />}>自动签到</ListItem>
                    <ListItem
                        onClick={() => this.handleSetOption('treasure')}
                        operation={<Radio
                            on={treasure.on}
                        />}>辅助领瓜子</ListItem>
                </List>
                <List title="关于助手">
                    <ListItem
                        icon={<Icon type="cat128" isImage/>}
                        twoLine
                        first={chrome.i18n.getMessage('extName')}
                        second={`版本 ${version}（正式版）`}
                        separator
                        operation={<Button>检查更新</Button>}
                    />
                </List>
            </OptionBody>
        </Fragment>;
    }
}

$(document).ready(() => {
    ReactDOM.render(
        <PageOptions/>,
        document.getElementById('root'),
    );
});

