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
import {getURL, PERMISSION_TYPE, consoleLogo} from 'Utils';
import {
    __,
    isLogin,
    createTab,
    version,
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
    SubPage,
    ListItem,
    RadioButtonGroup,
    CheckBoxGroup,
    UpdateList,
} from 'Components/configPage';
import {theme} from 'Styles';
import updateData from 'Statics/json/update.json';
import 'Styles/scss/config.scss';
import feedJson from 'Statics/json/feed.json';

//const {notifications} = PERMISSION_TYPE;

const ConfigBody = styled(Body).attrs({className: 'config-body'})`
  position: absolute;
  top: ${theme.headerHeight}px;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
`;

const Cat = styled.div`
  width: 32px;
  height: 30px;
  display: inline-block;
  vertical-align: sub;
  background-image: url(${getURL('/statics/imgs/cat.svg')});
  background-repeat: no-repeat;
  background-size: auto 100%;
  user-select: none;
  pointer-events: none;
`;

const Header = styled.div`
  padding: 50px 0;
  background-color: #e66788;
  color: #fff;
  & > * {
    display: block;
    margin: 0 auto;
    padding: 0 10px;
    max-width: 800px;
  }
`;

const Footer = styled.div`
  max-width: 800px;
  margin: 20px auto;
  color: #8c8c8c;
  a {
    color: #8c8c8c;
  }
`;

class PageConfig extends React.Component {
    constructor(props) {
        super(props);
        this.settings = {
            video: {title: '主站', map: {}},
            live: {title: '直播', map: {}},
            popup: {title: '菜单栏', map: {}},
            other: {title: '其他', map: {}},
        };
        this.state = {
            modalTitle: null,
            modalBody: null,
            modalButtons: null,
            modalOn: false,
            // sub page state
            subPageTitle: null,
            subPageParent: null,
            subPageOn: false,
            subPageSettings: null,
            subPageList: false, // 标记子页面是否为纯展示列表，目前用于显示投喂列表
            ...this.settings,

            debug: false,
        };
    }

    componentWillMount() {
        chrome.runtime.sendMessage({commend: 'getSettings', checkHide: true}, (settings) => {
            // 以kind字段来将设置分类到不同list
            _.forEach(settings, (setting) => {
                const {kind, name} = setting;
                this.settings[kind].map[_.upperFirst(name)] = setting;
            });
            this.setState(this.settings);
        });

        // 监听配置更新
        chrome.runtime.onMessage.addListener(((message) => {
            if (message.commend === 'debugMode' && message.value !== undefined) {
                this.setState({debug: message.value});
            }
        }));
        // 获取调试模式
        chrome.runtime.sendMessage({commend: 'getSetting', feature: 'Debug'}, (setting) => {
            this.setState({debug: setting.on});
        });
    }

    /**
     * 设置配置
     */
    handleSetSetting = ({kind = '', featureName, settingName, subPage = false, on}) => {
        const name = _.upperFirst(featureName);
        const thisKindOfFeatures = this.state[kind];
        if (!!thisKindOfFeatures.map[name]) { // find it (*≧∪≦)
            const settingObject = thisKindOfFeatures.map[name]; // one feature in this kind of list
            if (!settingName && !on) { // 一级开关
                settingObject.on = !settingObject.on;
            } else if (settingName && settingObject.type && !subPage) { // 二级开关
                if (settingObject.type === 'checkbox' && on !== undefined) { // 多选组的值存于选项数组中 (￣.￣)
                    const index = _.findIndex(settingObject.options, {key: settingName});
                    settingObject.options[index].on = on;
                } else if (settingObject.type === 'radio') { // 单选组的值存于选项数组外 (￣.￣)
                    settingObject.value = settingName;
                } else {
                    console.error(`Undefined type: ${settingObject.type} (⊙ˍ⊙)!`);
                    return;
                }
            } else if (settingName && settingObject.subPage && subPage) { // 二级页面
                const index = _.findIndex(settingObject.subPage.options, {key: settingName});
                settingObject.subPage.options[index].on = on;
            } else {
                console.error(`Error Setting Object Σ(oﾟдﾟoﾉ)!`);
                return;
            }
            chrome.runtime.sendMessage({
                commend: 'setSetting',
                feature: name,
                settings: settingObject,
            }, (res) => {
                if (res) {
                    chrome.runtime.sendMessage({
                        commend: 'setGAEvent',
                        action: 'click',
                        category: 'config',
                        label: `${featureName} ${settingName !== undefined ? `${settingName} ${on}` : ''}`,
                    });
                    thisKindOfFeatures.map[name] = settingObject;
                    this.setState({[kind]: thisKindOfFeatures});
                }
            });
        } else console.error(`Not find kind[${kind}]'s setting (*ﾟДﾟ*)!`);
    };

    createSettingDOM = () => {
        return _.map(this.settings, (e, kind) => {
            const list = this.state[kind];
            return !_.isEmpty(list.map) ? <List key={kind} title={list.title} ref={i => this[`${kind}Ref`] = i}>
                {_.map(list.map, (settings, featureName) => {
                    const {on, description, title, subPage, toggle} = settings;
                    const SubListChildren = this.createSubListComponent({kind, featureName, settings});
                    const toggleMode = toggle === undefined || subPage ? true : toggle;
                    const twoLine = description !== undefined;
                    const mainClickCallback = !subPage ? () => this.handleSetSetting({kind, featureName}) : null;
                    const operation = !!subPage
                                      ? <Button icon="arrowRight"
                                                onClick={() => this.handleSetSubPage({
                                                    parent: this[`${kind}Ref`],
                                                    settings,
                                                })}
                                      />
                                      : <Radio disable={!toggleMode} on={on}/>;
                    return <ListItem
                        key={featureName}
                        toggle={toggleMode}
                        onClick={on !== undefined && toggleMode !== false ? mainClickCallback : null}
                        operation={on !== undefined ? operation : null}
                        subList={SubListChildren ? {
                            hide: on === undefined ? false : !on,
                            children: SubListChildren,
                        } : null}
                        twoLine={twoLine}
                        first={twoLine ? title : ''}
                        second={twoLine ? description : ''}
                        children={twoLine ? null : title}
                    />;
                })}
            </List> : null;
        });
    };

    createSubListComponent = ({kind = '', featureName = '', settings = {}}) => {
        let SubListChildren = null;
        const {options, type, value} = settings;
        if (!!options && !!type) {
            switch (settings.type) {
                case 'checkbox':
                    SubListChildren = <CheckBoxGroup
                        data={options}
                        onClick={(settingName, on) => this.handleSetSetting({kind, featureName, settingName, on})}
                    />;
                    break;
                case 'radio':
                    SubListChildren = <RadioButtonGroup
                        value={value}
                        data={options}
                        onClick={(settingName) => this.handleSetSetting({kind, featureName, settingName})}
                    />;
                    break;
            }
        }
        return SubListChildren;
    };

    handleSetSubPage = ({parent = null, settings = null, subPageList = false, subPageTitle = null}) => {
        const {subPageOn, parent: currentParent} = this.state;
        const newState = {
            subPageOn: !subPageOn,
            subPageTitle: settings ? settings.title : subPageTitle,
            subPageParent: (currentParent !== parent && parent && parent.ListWrapper) ? parent.ListWrapper.querySelector('.list-body') : null,
            subPageSettings: settings,
            subPageList,
        };

        this.setState(newState);
    };

    createSubPage = () => {
        const {subPageSettings, subPageList} = this.state;
        if (!subPageList) {
            const {kind, name: featureName, on, toggle, subPage} = subPageSettings;
            const {options, title} = subPage;
            return <ListItem
                toggle={toggle}
                onClick={() => this.handleSetSetting({kind, featureName})}
                operation={<Radio on={on}/>}
                subList={{
                    children: <CheckBoxGroup
                        data={options}
                        onClick={(settingName, on) => this.handleSetSetting({
                            kind, featureName, settingName, on, subPage: true,
                        })}
                    />,
                }}
            >{title}</ListItem>;
        } else return _.map(subPageList, (feedData, index) => {
            const [time, name, num, ps] = feedData;
            return (
                <ListItem
                    key={index}
                    operation={`￥${(+num).toFixed(2)}`}
                    twoLine={true}
                    first={name}
                    second={`${time} - ${ps || '没有留言'}`}
                />
            );
        });
    };

    handleOpenFeedList = () => {
        this.handleSetSubPage({
            parent: this.aboutRef,
            subPageList: feedJson,
            subPageTitle: '用户投喂列表',
        });
    };

    render() {
        const {
            // modal state
            modalOn,
            modalTitle,
            modalBody,
            modalButtons,
            // sub page state
            subPageOn,
            subPageTitle,
            subPageParent,
            debug,
        } = this.state;
        return <React.Fragment>
            {/*<Header title="设置"/>*/}
            <ConfigBody>
                <Header>
                    <h1>{/*<Cat/>*/}BIlBILI HELPER</h1>
                    <sub>{`Version ${version}（${debug ? '测试' : '正式'}版）`}</sub>
                </Header>
                <SubPage
                    on={subPageOn}
                    title={subPageTitle}
                    parent={subPageParent}
                    onClose={() => this.handleSetSubPage(subPageParent)}
                >
                    <List>{subPageOn && this.createSubPage()}</List>
                </SubPage>
                {this.createSettingDOM()}
                <List title="关于" ref={i => this.aboutRef = i}>
                    <ListItem
                        icon={<Icon icon="catSvg" image/>}
                        twoLine
                        first={chrome.i18n.getMessage('extName')}
                        second={`版本 ${version}（${debug ? '测试' : '正式'}版）`}
                        //separator
                        //operation={<Button disable normal>检查更新</Button>}
                    />
                    <ListItem
                        twoLine={true}
                        first={`投喂列表 - ${feedJson.length}条`}
                        second="手动更新，仅为肉肉收到的投喂，可能包含生活中的非投喂信息"
                        operation={<Button icon="arrowRight" onClick={this.handleOpenFeedList}></Button>}
                    />
                    {_.map(updateData, (list, title) => <UpdateList key={title} title={title} data={list}/>)}
                </List>
                <Footer>Copyright (c) 2018 <a href="mailto:me@zacyu.com">Zac Yu</a>, Google LLC, <a
                    href="mailto:jjj201200@gmail.com">Drowsy Flesh</a></Footer>
            </ConfigBody>
            <Modal on={modalOn} title={modalTitle} body={modalBody} buttons={modalButtons}/>
        </React.Fragment>;
    }
}

$(document).ready(() => {
    ReactDOM.render(
        <PageConfig/>,
        document.getElementById('root'),
        consoleLogo,
    );
});

