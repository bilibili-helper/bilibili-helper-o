/**
 * Author: Ruo
 * Create: 2018-06-12
 * Description: 设置页面
 */

import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import {consoleLogo} from 'Utils';
import {Button, Icon, CheckBoxButton, Modal} from 'Components';
import {PERMISSION_STATUS} from 'Libs/permissionManager';
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
import updateList from 'Statics/json/update.json';
import announcementList from 'Statics/json/announcement.json';
import 'Styles/scss/config.scss';
import feedJson from 'Statics/json/feed.json';

const {color} = theme;

const ConfigBody = styled(Body).attrs({className: 'config-body'})`
  position: absolute;
  top: ${theme.headerHeight}px;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  background-color: #f2f3f5;
`;

const Figure = styled.figure`
  position: absolute;
  left: calc(50% + 380px);
  bottom: 4px;
  z-index: 0;
  figcaption {
    text-align: center;
  }
`;
const Alipay = styled.img`
  width: 60px;
`;

const Header = styled.div`
  position: relative;
  flex-shrink: 0;
  padding: 50px 0;
  background-color: ${color('bilibili-pink')};
  color: #fff;
  overflow: hidden;
  & > * {
    display: block;
    margin: 0 auto;
    padding: 0 10px;
    max-width: 800px;
  }
`;

/*const Cat = styled(Icon)`
  position: absolute;
  margin: 0 auto;
  top: 56px;
  left: calc(50% + 190px);
  font-size: 200px!important;
  color: #f2f3f5;
  user-select: none;
  pointer-events: none;
`*/

const Footer = styled.div`
  position: relative;
  max-width: 800px;
  width: 100%;
  margin: 20px auto;
  padding: 0 10px;
  box-sizing: border-box;
  color: #8c8c8c;
  & a {
    color: #8c8c8c;
  }
  & > a {
    margin-right: 16px;
  }
  span {
    float: right;
  }
`;

const Broadcast = styled.p`
  width: 100%;
  line-height: 30px;
  max-width: 800px;
  margin: 16px auto;
  padding: 0px 10px;
  text-align: left;
  color: ${color('bilibili-pink')};
`;
const PermissionTag = styled.span.attrs({
    title: ({title}) => title,
})`
  margin: 0 4px;
  padding: 0 3px;
  border-radius: 4px;
  font-size: 10px;
  background-color: ${color('bilibili-blue')};
  color: #fff;
`;

const PermissionErrorDescription = styled.span`
  padding: 0 6px;
  color: ${color('bilibili-pink')};
  &:first-of-type {
    padding-left: 0;
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
        this.defaultBroadcast = '如果您的版本显示为测试版或者出现了问题，请尝试卸载本扩展后重新安装';
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

            broadcast: this.defaultBroadcast, // header下的通知条

            permissionMap: {},

            checkingVersion: false,

            version: null,
        };
        // 监听配置更新
        chrome.runtime.onMessage.addListener(((message) => {
            if (message.commend === 'debugMode') {
                this.setState({debug: message.value});
            }
        }));
    }

    componentDidMount() {
        chrome.runtime.sendMessage({commend: 'getSettings', checkHide: true}, (settings) => {
            // 以kind字段来将设置分类到不同list
            _.forEach(settings, (setting) => {
                const {kind, name} = setting;
                this.settings[kind].map[_.upperFirst(name)] = setting;
            });
            this.setState(this.settings);
        });
        // 获取调试模式
        chrome.runtime.sendMessage({commend: 'getSetting', feature: 'Debug'}, (setting) => {
            this.setState({debug: setting.on});
        });

        chrome.runtime.sendMessage({commend: 'inIncognitoContext'}, (inIncognitoContext) => {
            if (inIncognitoContext) {
                this.setState({broadcast: '您正在使用隐身模式，该模式下部分功能将无法正常启用'});
            } else {
                this.setState({broadcast: this.defaultBroadcast});
            }
        });
        chrome.runtime.sendMessage({commend: 'getPermissionMap'}, (permissionMap) => {
            this.setState({permissionMap});
        });
        chrome.runtime.sendMessage({commend: 'getFeatureStore', feature: 'versionManager'}, (featureStore) => {
            this.setState({version: featureStore.version});
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
                    console.error(`Undefined type: ${settingObject.type} (⊙ˍ⊙)!`);
                    return;
                }
            } else if (settingName && settingObject.subPage && subPage) { // 二级页面
                if (settingObject.subPage.type === 'checkbox') {
                    const index = _.findIndex(settingObject.subPage.options, {key: settingName});
                    settingObject.subPage.options[index].on = on;
                } else if (settingObject.subPage.type === 'radio') {
                    settingObject.subPage.value = settingName;
                } else {
                    console.error(`Undefined type: ${settingObject.subPage.type} (⊙ˍ⊙)!`);
                    return;
                }
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
                        label: `${featureName} ${settingName !== undefined ? `${settingName} ${settingObject.on}` : settingObject.on}`,
                    });
                    thisKindOfFeatures.map[name] = settingObject;
                    this.setState({[kind]: thisKindOfFeatures});
                }
            });
        } else console.error(`Not find kind[${kind}]'s setting (*ﾟДﾟ*)!`);
    };

    createSettingDOM = () => {
        const {permissionMap, debug} = this.state;
        return _.map(this.settings, (e, kind) => {
            const list = this.state[kind];
            return !_.isEmpty(list.map) ? <List key={kind} title={list.title} ref={i => this[`${kind}Ref`] = i}>
                {_.map(list.map, (settings, featureName) => {
                    const {on, description, title, subPage, toggle, permissions} = settings;
                    const SubListChildren = this.createSubListComponent({kind, featureName, settings});
                    const toggleMode = toggle === undefined || subPage ? true : toggle;

                    const handleOpenSubPage = () => this.handleSetSubPage({parent: this[`${kind}Ref`], settings});
                    const onClick = subPage ? handleOpenSubPage : () => this.handleSetSetting({kind, featureName});
                    const operation = subPage ? <Button icon="arrowRight"/> : <CheckBoxButton disable={!toggleMode}
                                                                                              on={on}/>;

                    let errorDescription = [];
                    const permissionList = _.map(permissions, (name) => {
                        if (name in permissionMap && !permissionMap[name]) {
                            errorDescription.push(
                                <PermissionErrorDescription>{PERMISSION_STATUS[name].description}</PermissionErrorDescription>,
                            );
                        }
                        return debug ? <PermissionTag title={PERMISSION_STATUS[name].description}>
                            {_.upperFirst(name)}
                        </PermissionTag> : null;
                    });
                    const twoLine = description !== undefined || errorDescription.length > 0;
                    return <ListItem
                        key={featureName}
                        toggle={toggleMode}
                        onClick={on !== undefined && toggleMode !== false ? onClick : null}
                        operation={on !== undefined ? operation : null}
                        subList={SubListChildren ? {
                            hide: on === undefined ? false : !on,
                            children: SubListChildren,
                        } : null}
                        twoLine={twoLine}
                        first={twoLine ? <React.Fragment>{title}{permissionList}</React.Fragment> : ''}
                        second={twoLine ? errorDescription.length > 0 ? errorDescription : description : ''}
                    >{twoLine ? null : title}{permissionList}</ListItem>;
                })}
            </List> : null;
        });
    };

    createSubListComponent = ({kind = '', featureName = '', settings = {}, subPage = false}) => {
        let SubListChildren = null;
        const {options, type, value} = settings;
        if (!!options && !!type) {
            switch (settings.type) {
                case 'checkbox':
                    SubListChildren = <CheckBoxGroup
                        data={options}
                        onClick={(settingName, on) => this.handleSetSetting({
                            kind, featureName, settingName, on, subPage,
                        })}
                    />;
                    break;
                case 'radio':
                    SubListChildren = <RadioButtonGroup
                        value={value}
                        data={options}
                        onClick={(settingName) => this.handleSetSetting({kind, featureName, settingName, subPage})}
                    />;
                    break;
            }
        }
        return SubListChildren;
    };

    handleSetSubPage = ({parent = null, settings = null, subPageList = false, subPageTitle = null, pageType}) => {
        const {subPageOn, parent: currentParent} = this.state;
        const newState = {
            subPageOn: !subPageOn,
            subPageTitle: settings ? settings.title : subPageTitle,
            subPageParent: (currentParent !== parent && parent && parent.ListWrapper) ? parent.ListWrapper.querySelector('.list-body') : null,
            subPageSettings: settings,
            subPageList,
            pageType,
        };

        this.setState(newState);
    };

    createSubPage = (pageType) => {
        const {subPageSettings, subPageList} = this.state;
        switch (pageType) {
            case 'feed':
                return _.map(subPageList, (feedData, index) => {
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
            case 'update':
                return _.map(subPageList, (list, title) => <UpdateList key={title} title={title} data={list}/>);
            default: {
                const {kind, name: featureName, on, toggle, subPage} = subPageSettings;
                const subList = this.createSubListComponent({kind, featureName, settings: subPage, subPage: true});
                const twoLine = subPage.description !== undefined;
                return <ListItem
                    toggle={toggle}
                    onClick={() => this.handleSetSetting({kind, featureName})}
                    operation={<CheckBoxButton on={on}/>}
                    twoLine={twoLine}
                    first={twoLine ? subPage.title : ''}
                    second={twoLine ? subPage.description : ''}
                    subList={{
                        hide: on === undefined ? false : !on,
                        children: subList,
                    }}
                >{twoLine ? null : subPage.title}</ListItem>;
            }
        }
    };

    handleOpenFeedList = () => {
        this.handleSetSubPage({
            parent: this.aboutRef,
            subPageList: feedJson,
            subPageTitle: '用户投喂列表',
            pageType: 'feed',
        });
    };
    handleOpenUpdateList = () => {
        this.handleSetSubPage({
            parent: this.aboutRef,
            subPageList: updateList,
            subPageTitle: '版本更新日志',
            pageType: 'update',
        });
    };

    handleCheckVersion = () => {
        const {checkingVersion} = this.state;
        if (checkingVersion) return;
        else this.setState({checkingVersion: true});
        chrome.runtime.sendMessage({
            commend: 'checkVersion',
        }, () => {
            setTimeout(() => this.setState({checkingVersion: false}), 500);
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
            pageType,
            debug,
            broadcast,
            checkingVersion,

            version,
        } = this.state;
        return <React.Fragment>
            {/*<Header title="设置"/>*/}
            <ConfigBody>
                <Header>
                    <h1>BILIBILI HELPER</h1>
                    <sub>{`version ${version}（${debug === true ? '测试' : '正式'}版）`}</sub>
                    {/*<Cat iconfont="cat"/>*/}
                </Header>
                <Broadcast>
                    {broadcast}<br/>
                    {/*调试模式下会显示该标志<PermissionTag>Name</PermissionTag>，代表功能需要拥有的相关权限或浏览器特性*/}
                </Broadcast>
                <SubPage
                    on={subPageOn}
                    title={subPageTitle}
                    parent={subPageParent}
                    onClose={() => this.handleSetSubPage(subPageParent)}
                >
                    <List>{subPageOn && this.createSubPage(pageType)}</List>
                </SubPage>
                {this.createSettingDOM()}
                <List title="关于" ref={i => this.aboutRef = i}>
                    <ListItem
                        icon={<Icon iconfont="cat" image/>}
                        twoLine
                        first={chrome.i18n.getMessage('extensionName')}
                        second={`版本 ${version}（${debug ? '测试' : '正式'}版）`}
                        separator
                        operation={
                            <Button loading={checkingVersion} normal onClick={this.handleCheckVersion}>检查更新</Button>
                        }
                    />
                    {_.map(announcementList, (list, title) => <UpdateList key={title} title={title} data={list}/>)}
                    <ListItem
                        twoLine={true}
                        first="更新日志"
                        second={`包含 ${Object.keys(updateList).length} 次更新`}
                        onClick={this.handleOpenUpdateList}
                        operation={<Button icon="arrowRight"></Button>}
                    ></ListItem>
                    <ListItem
                        twoLine={true}
                        first={`投喂列表 - ${feedJson.length}条`}
                        second="手动更新，仅为肉肉收到的投喂，可能包含生活中的非投喂信息"
                        onClick={this.handleOpenFeedList}
                        operation={<Button icon="arrowRight"></Button>}
                    />
                </List>
                <Footer>
                    <a href="https://github.com/zacyu/bilibili-helper">Github</a>
                    <a href="https://bilihelper.guguke.net">Website</a>
                    <a href="https://chrome.google.com/webstore/detail/kpbnombpnpcffllnianjibmpadjolanh">Chrome
                        WebStore</a>
                    <span>
                        Copyright (c) 2018 <a href="mailto:me@zacyu.com">Zac Yu</a>, Google LLC, <a
                        href="mailto:jjj201200@gmail.com">Drowsy Flesh</a>
                    </span>
                    <Figure>
                        <Alipay src="./statics/imgs/alipay-df.png" alt="alipay"/>
                        <figcaption>感谢支持</figcaption>
                    </Figure>
                </Footer>
            </ConfigBody>
            <Modal on={modalOn} title={modalTitle} body={modalBody} buttons={modalButtons}/>
        </React.Fragment>;
    }
}

ReactDOM.render(
    <PageConfig/>,
    document.getElementById('root'),
    consoleLogo,
);

