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

        this.options = {
            video: {
                title: '主站',
                optionMap: {},
            },
            live: {
                title: '直播',
                optionMap: {},
            },
            other: {
                title: '其他',
                optionMap: {},
            },
        };
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
            ...this.options,
            debug: false,
        });
    }

    componentWillMount() {
        chrome.runtime.sendMessage({commend: 'getOptions'}, (options) => {
            // 以kind字段来将设置分类到不同list
            _.forEach(options, (option, featureName) => {
                const {kind} = option;
                this.options[kind].optionMap[featureName] = option.options;
            });
            this.setState(this.options);
        });

        // 监听配置更新
        chrome.runtime.onMessage.addListener(((message, sender, sendResponse) => {
            if (message.commend === 'debugMode' && message.value !== undefined) {
                this.setState({debug: message.value});
            }
        }));
        // 获取调试模式
        chrome.runtime.sendMessage({commend: 'getOption', feature: 'Debug'}, (options) => {
            this.setState({debug: options.on});
        });
    }

    /**
     * 设置配置
     */
    handleSetOption = ({kind = '', feature, optionName, on}) => {
        const thisKindOfFeatures = this.state[kind];
        if (!!thisKindOfFeatures.optionMap[feature]) { // find it (*≧∪≦)
            const optionObject = thisKindOfFeatures.optionMap[feature]; // one feature in this kind of list
            if (!optionName && !on) { // 一级开关
                optionObject.on = !optionObject.on;
            } else if (optionName && optionObject.optionType) { // 二级开关
                if (optionObject.optionType === 'checkbox' && on !== undefined) { // 多选组的值存于选项数组中 (￣.￣)
                    const optionIndex = _.findIndex(optionObject.options, {key: optionName});
                    optionObject.options[optionIndex].on = on;
                } else if (optionObject.optionType === 'radio') { // 单选组的值存于选项数组外 (￣.￣)
                    optionObject.value = optionName;
                } else {
                    console.error(`Undefined optionType: ${optionObject.optionType} (⊙ˍ⊙)!`);
                    return;
                }
            } else {
                console.error(`Error Option object Σ(oﾟдﾟoﾉ)!`);
                return;
            }
            thisKindOfFeatures.optionMap[feature] = optionObject;
            chrome.runtime.sendMessage({
                commend: 'setOption',
                feature, options: optionObject,
            }, () => this.setState({[kind]: thisKindOfFeatures}));
        } else console.error(`Not find kind[${kind}]'s option (*ﾟДﾟ*)!`);
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
        return _.map(this.options, (e, kind) => {
            const list = this.state[kind];
            return <List key={kind} title={list.title} ref={i => this[`${kind}Ref`] = i}>
                {_.map(list.optionMap, (info, feature) => {
                    let SubListChildren = this.createSubListComponent({kind, feature, info});
                    const toggle = info.toggle === undefined ? true : info.toggle;
                    return <ListItem
                        key={feature}
                        toggle={toggle}
                        onClick={info.on !== undefined && toggle !== false ? () => this.handleSetOption({
                            kind, feature,
                        }) : null}
                        operation={info.on !== undefined ? <Radio disable={!toggle} on={info.on}/> : null}
                        subList={SubListChildren ? {
                            hide: info.on === undefined ? false : !info.on,
                            children: SubListChildren,
                        } : null}
                    >{info.title}</ListItem>;
                })}
            </List>;
        });
    };

    createSubListComponent = ({kind = '', feature = '', info = {}}) => {
        let SubListChildren = null;
        if (!!info.options && !!info.optionType) {
            switch (info.optionType) {
                case 'checkbox':
                    SubListChildren = <CheckBoxGroup
                        data={info.options}
                        onClick={(optionName, on) => this.handleSetOption({kind, feature, optionName, on})}
                    />;
                    break;
                case 'radio':
                    SubListChildren = <RadioButtonGroup
                        value={info.value}
                        data={info.options}
                        onClick={(optionName) => this.handleSetOption({kind, feature, optionName})}
                    />;
                    break;
            }
        }
        return SubListChildren;
    };

    render() {
        const {
            // feature options
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
            debug,
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
                {/*
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
*/}
                {/*<List title="直播" ref={i => this.liveList = i}>*/}
                {/*<ListItem*/}
                {/*onClick={() => this.handleSetOption('sign')}*/}
                {/*operation={<Radio on={sign.on}/>}*/}
                {/*>自动签到</ListItem>*/}
                {/*<ListItem*/}
                {/*onClick={() => this.handleSetOption('treasure')}*/}
                {/*operation={<Radio on={treasure.on}/>}*/}
                {/*>辅助领瓜子</ListItem>*/}
                {/*<ListItem*/}
                {/*onClick={() => this.handleSetSubPage({title: '高级屏蔽设置', parent: this.liveList})}*/}
                {/*operation={<Button icon="arrowRight"/>}*/}
                {/*>聊天信息屏蔽设置</ListItem>*/}
                {/*</List>*/}
                <List title="关于" ref={i => this.aboutList = i}>
                    {/*<ListItem
                        onClick={() => this.handleSetSubPage({title: '通知设置', parent: this.aboutList})}
                        operation={<Button icon="arrowRight"/>}
                    >通知屏蔽设置</ListItem>*/}
                    <ListItem
                        //icon={<Icon icon="catSvg" image/>}
                        twoLine
                        first={chrome.i18n.getMessage('extName')}
                        second={`版本 ${version}（${debug ? '测试' : '正式'}版）`}
                        separator
                        operation={<Button disable normal>检查更新</Button>}
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

