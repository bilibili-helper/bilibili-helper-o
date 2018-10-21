/**
 * Author: Ruo
 * Create: 2018-06-12
 * Description: 设置页面
 */

import $ from 'jquery';
import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import {getURL, PERMISSION_TYPE} from 'Utils';
import {
    __,
    isLogin,
    createTab,
    version,
    setOption,
    getOptions,
} from 'Utils';
import {
    Button,
    Icon,
    Modal,
    Radio,
} from 'Components';
import {
    Body,
    List,
    //Header,
    SubPage,
    ListItem,
    RadioButtonGroup,
    CheckBoxGroup,
    UpdateList,
} from 'Components/optionPageComponents';
import {theme} from 'Styles';
import 'Styles/scss/options.scss';
import updateData from 'Statics/json/update.json';

//const {notifications} = PERMISSION_TYPE;

const OptionBody = styled(Body).attrs({className: 'option-body'})`
  position: absolute;
  top: ${theme.headerHeight}px;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  
`;

const Cat = styled.div`
  position: fixed;
  top: -60px;
  right: 0;
  bottom: -60px;
  left: 0;
  background-image: url(${getURL('/statics/imgs/cat.svg')});
  background-repeat: no-repeat;
  background-size: auto 100%;
  background-position: calc(50% + 320px) center;
  opacity: 0.04;
  user-select: none;
  pointer-events: none;
`;

const FilterSubPageBody = ({title, filterName, filter, handleSetOption}) => {
    return (
        <List>
            <ListItem
                onClick={() => handleSetOption(filterName)}
                operation={<Radio on={filter.on}/>}
                subList={{
                    children: <CheckBoxGroup
                        data={filter.types}
                        value={filter.value}
                        onClick={(value) => handleSetOption(filterName, value)}
                    />,
                }}
            >{title}</ListItem>
        </List>
    );
};

class PageOptions extends React.Component {
    constructor(props) {
        super(props);
        /**
         * ! important ! 将配置导入state
         * 此处的getOption会返回当前配置和默认配置来合并的对象
         */
        this.state = Object.assign({}, getOptions(), {
            modalTitle: null,
            modalBody: null,
            modalButtons: null,
            modalOn: false,
            // sub page state
            parent: null,
            subPageOn: false,
            subPageTitle: null,
            subPageBody: null,

            options: {
                video: {
                    title: '主站',
                    optionMap: {},
                },
            },
        });
    }

    componentWillMount() {
        const {options} = this.state;
        const o = Object.assign({}, options);
        chrome.runtime.sendMessage({commend: 'getOptions'}, (options) => {
            // 以kind字段来将设置分类到不同list
            _.forEach(options, (option, featureName) => o[option.kind].optionMap[featureName] = option.info);
            this.setState({options: o});
        });
    }

    handleOnClick = (type) => {
        const {active} = this.state;
        this.setState({active: active === type ? '' : type});
    };

    /**
     * 设置配置
     * @param key 配置名
     * @param value 配置的值
     */
    handleSetOption = ({kind, feature, optionName, value}) => {
        const {options} = this.state;
        if (!!options[kind].optionMap[feature]) { // find it (*≧∪≦)
            const optionObject = {...options[kind].optionMap[feature]}; // one feature in this kind of list
            if (!optionName && !value) { // 一级开关
                optionObject.on = !optionObject.on;
            } else if (optionName && value !== undefined) { // 二级开关
                if (optionObject.optionType === 'checkbox') { // 多选组的值存于选项数组中 (￣.￣)
                    const optionIndex = _.findIndex(optionObject.options, {key: optionName});
                    optionObject.options[optionIndex].value = value;
                } else if (optionObject.optionType === 'radio') { // 单选组的值存于选项数组外 (￣.￣)
                    optionObject.value = value;
                }
            }
            options[kind].optionMap[feature] = optionObject;
            chrome.runtime.sendMessage({
                commend: 'setOption',
                feature, options: optionObject,
            }, () => {
                this.setState({options});
            });
            //setOption(key, optionObject);
        }
    };

    handleSetSubPage = ({title = null, parent = null, body = null}) => {
        const {subPageOn, parent: currentParent} = this.state;
        const newState = {
            subPageOn: !subPageOn,
            subPageTitle: title,
            subPageBody: body,
            parent: currentParent !== parent && parent ? parent.ListWrapper.querySelector('.list-body') : null,
        };

        this.setState(newState);
    };

    createOptionDOM = () => {
        return _.map(this.state.options, (list, kind) => {
            return <List key={kind} title={list.title} ref={i => this[`${kind}Ref`] = i}>
                {_.map(list.optionMap, (info, feature) => {
                    const {options = null, optionType, on, title} = info;
                    let SubListChildren;
                    if (options) {
                        switch (optionType) {
                            case 'checkbox':
                                SubListChildren = <CheckBoxGroup
                                    data={options}
                                    onClick={(optionName, value) => this.handleSetOption({
                                        kind, feature, optionName, value,
                                    })}
                                />;
                                break;
                            case 'radio':
                                SubListChildren = <RadioButtonGroup
                                    value={info.value}
                                    data={info.options}
                                    onClick={(optionName, value) => this.handleSetOption({
                                        kind, feature, optionName, value,
                                    })}
                                />;
                                break;
                        }
                    }
                    return <ListItem
                        key={feature}
                        onClick={() => this.handleSetOption({kind, feature})}
                        operation={<Radio on={on}/>}
                        subList={options ? {
                            hide: !on,
                            theme: {twoLine: false},
                            children: SubListChildren,
                        } : {}}
                    >{title}</ListItem>;
                })}
            </List>;
        });
    };

    render() {
        const {
            // feature options
            newWatchPage,
            dynamicCheck,
            downloadType,
            videoPlayerWidenType,
            sign,
            treasure,
            chatFilter,
            // modal state
            modalOn,
            modalTitle,
            modalBody,
            modalButtons,
            // sub page state
            subPageOn,
            subPageTitle,
            subPageBody,
            parent,
        } = this.state;
        return <React.Fragment>
            {/*<Header title="设置"/>*/}
            <OptionBody>
                <Cat/>
                <SubPage
                    title={subPageTitle}
                    on={subPageOn}
                    parent={parent}
                    onClose={() => {
                        this.handleSetSubPage(parent);
                    }}
                >
                    {subPageTitle === '高级屏蔽设置' && <FilterSubPageBody
                        title="打开屏蔽功能"
                        filter={chatFilter}
                        filterName="chatFilter"
                        handleSetOption={this.handleSetOption}
                    />}
                    {subPageTitle === '通知栏设置' && <FilterSubPageBody
                        title="打开通知栏控制"
                        filter={chatFilter}
                        filterName="chatFilter"
                        handleSetOption={this.handleSetOption}
                    />}
                </SubPage>
                {this.createOptionDOM()}
                <List title="主站" ref={i => this.mainList = i}>
                    <ListItem
                        children="Sub Page 测试"
                        operation={<Button icon="arrowRight"
                                           onClick={() => this.handleSetSubPage({parent: this.mainList})}/>}
                    />
                    <ListItem
                        onClick={() => this.setState({
                            modalOn: !modalOn,
                            modalTitle: 'Modal 测试标题',
                            modalBody: <div>Modal 测试 body</div>,
                            modalButtons: <Button normal
                                                  onClick={() => this.setState({modalOn: modalOn})}>关闭</Button>,
                        })}
                        operation={<Radio on={modalOn}/>}
                    >Modal 测试</ListItem>
                    <ListItem
                        onClick={() => this.handleSetOption('newWatchPage')}
                        operation={<Radio on={newWatchPage.on}/>}
                    >新版关注页面跳转</ListItem>
                    <ListItem
                        onClick={() => this.handleSetOption('dynamicCheck')}
                        operation={<Radio on={dynamicCheck.on}/>}
                    >视频动态推送</ListItem>
                    <ListItem
                        onClick={() => this.handleSetOption('downloadType')}
                        operation={<Radio on={downloadType.on}/>}
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
                        }}
                    >视频下载</ListItem>
                    <ListItem
                        onClick={() => this.handleSetOption('videoPlayerWidenType')}
                        operation={<Radio on={videoPlayerWidenType.on}/>}
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
                        }}
                    >播放器宽屏</ListItem>
                </List>
                <List title="直播" ref={i => this.liveList = i}>
                    <ListItem
                        onClick={() => this.handleSetOption('sign')}
                        operation={<Radio on={sign.on}/>}
                    >自动签到</ListItem>
                    <ListItem
                        onClick={() => this.handleSetOption('treasure')}
                        operation={<Radio on={treasure.on}/>}
                    >辅助领瓜子</ListItem>
                    <ListItem
                        onClick={() => this.handleSetSubPage({title: '高级屏蔽设置', parent: this.liveList})}
                        operation={<Button icon="arrowRight"/>}
                    >聊天信息屏蔽设置</ListItem>
                </List>
                <List title="其他" ref={i => this.otherList = i}>
                    <ListItem
                        onClick={() => this.handleSetSubPage({title: '通知设置', parent: this.otherList})}
                        operation={<Button icon="arrowRight"/>}
                    >通知屏蔽设置</ListItem>
                    <ListItem
                        //icon={<Icon icon="catSvg" image/>}
                        twoLine
                        first={chrome.i18n.getMessage('extName')}
                        second={`版本 ${version}（正式版）`}
                        separator
                        operation={<Button normal>检查更新</Button>}
                    />
                    {_.map(updateData, (data, i) => <UpdateList key={i} title={`版本 ${data.title}`} data={data.list}/>)}
                </List>
            </OptionBody>
            <Modal on={modalOn} title={modalTitle} body={modalBody} buttons={modalButtons}/>
        </React.Fragment>;
    }
}

$(document).ready(() => {
    ReactDOM.render(
        <PageOptions/>,
        document.getElementById('root'),
    );
});

