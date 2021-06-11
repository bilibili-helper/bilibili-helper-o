/* global process */
/**
 * Author: Ruo
 * Create: 2018-06-12
 * Description: 设置页面
 */

import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import styled, {createGlobalStyle} from 'styled-components';
import {consoleLogo, createTab, version, __, initI18n} from 'Utils';
import {Button, Icon, CheckBoxButton, Modal} from 'Components';
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
//import announcementList from 'Statics/json/announcement.json';
import store from 'store';
import 'Styles/scss/config.scss';
import {PrivatePolicy} from './privatePolicy';

const {color} = theme;

const GlobalStyleSheet = createGlobalStyle`
  body{
    margin: 0;
    font-family: -apple-system, Helvetica Neue, Helvetica, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif;
    //font-size: 75%;
  }
`;

const ConfigBody = styled(Body).attrs({className: 'config-body'})`
  //position: absolute;
  //top: ${theme.headerHeight}px;
  //right: 0;
  //bottom: 0;
  //left: 0;
  //overflow: auto;
  background-color: #f2f3f5;
`;

const Figure = styled.figure`
  position: absolute;
  left: calc(50% + 380px);
  bottom: 22px;
  z-index: 0;
  figcaption {
    text-align: center;
    font-size: 12px;
  }
`;
const Alipay = styled.img`
  width: 100px;
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
  margin: 0 auto;
  padding: 20px 10px;
  box-sizing: border-box;
  color: #8c8c8c;
  & a {
    font-size: 12px;
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
  margin: 16px auto 0;
  padding: 0px 10px;
  font-size: 12px;
  text-align: left;
  color: ${color('bilibili-pink')};
  a {
    color: #00aeeb;
  }
`;
const PermissionTag = styled.span.attrs({
    title: ({title}) => title,
})`
  margin-left: 4px;
  padding: 0 2px;
  border-radius: 2px;
  font-size: 12px;
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
            video: {title: __('config_type_main'), map: {}},
            live: {title: __('config_type_live'), map: {}},
            popup: {title: __('config_type_menu'), map: {}},
            other: {title: __('config_type_other'), map: {}},
        };
        this.defaultBroadcast = '';
        const showPrivatePolicy = store.get('show-private-policy');
        this.state = {
            //modalTitle: null,
            //modalBody: null,
            //modalButtons: null,
            modalOn: showPrivatePolicy === undefined ? true : showPrivatePolicy,
            // sub page state
            subPageTitle: null,
            subPageParent: null,
            subPageOn: false,
            subPageSettings: null,
            subPageList: false, // 标记子页面是否为纯展示列表，目前用于显示投喂列表
            ...this.settings,

            broadcast: this.defaultBroadcast, // header下的通知条

            permissionMap: {},
            permissionStatusTextObject: {},

            checkingVersion: false,
        };
    }

    componentDidMount() {
        chrome.runtime.sendMessage({command: 'getSettings', checkHide: true}, (settings) => {
            // 以kind字段来将设置分类到不同list
            _.forEach(settings, (setting) => {
                const {kind, name} = setting;
                if (this.settings[kind]) { this.settings[kind].map[name] = setting; } else { this.settings.other.map[name] = setting; }
            });
            this.setState(this.settings);
        });

        chrome.runtime.sendMessage({command: 'getPermissionStatusText'}, (permissionStatusTextObject) => {
            this.setState({permissionStatusTextObject});
        });

        chrome.runtime.sendMessage({command: 'inIncognitoContext'}, (inIncognitoContext) => {
            if (inIncognitoContext) {
                this.setState({broadcast: '您正在使用隐身模式，该模式下部分功能将无法正常启用'});
            } else {
                this.setState({broadcast: this.defaultBroadcast});
            }
        });
        chrome.runtime.sendMessage({command: 'getPermissionMap'}, (permissionMap) => {
            this.setState({permissionMap});
        });
    }

    /**
     * 设置配置
     */
    handleSetSetting = ({kind = '', featureName, settingName, subPage = false, on}) => {
        const thisKindOfFeatures = this.state[kind] || this.state.other;
        if (thisKindOfFeatures.map[featureName]) { // find it (*≧∪≦)
            const settingObject = thisKindOfFeatures.map[featureName]; // one feature in this kind of list
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
                command: 'setSetting',
                feature: featureName,
                settings: settingObject,
            }, (res) => {
                if (res) {
                    chrome.runtime.sendMessage({
                        command: 'setGAEvent',
                        action: 'click',
                        category: 'config',
                        label: `${featureName} ${settingName !== undefined ? `${settingName} ${settingObject.on}` : settingObject.on}`,
                    });
                    thisKindOfFeatures.map[featureName] = settingObject;
                    this.setState({[kind]: thisKindOfFeatures});
                }
            });
        } else { console.error(`Not find kind[${kind}]'s setting (*ﾟДﾟ*)!`); }
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

        this.setState(newState, () => {
            document.body.style.overflow = subPageOn ? '' : 'hidden';
        });
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

    //handleOpenFeedList = () => {
    //    this.handleSetSubPage({
    //        parent: this.aboutRef,
    //        subPageList: feedJson,
    //        subPageTitle: '用户投喂列表',
    //        pageType: 'feed',
    //    });
    //};

    //handleOpenUpdateList = () => {
    //this.handleSetSubPage({
    //    parent: this.aboutRef,
    //    subPageList: updateList,
    //    subPageTitle: '版本更新日志',
    //    pageType: 'update',
    //});
    //};

    handleOpenWebsite = () => {
        createTab('https://bilibilihelper.com/');
    };

    handleOpAnnouncement = () => {
        createTab('https://bilibilihelper.com/#announcement');
    };

    handleCheckVersion = () => {
        const {checkingVersion} = this.state;
        if (checkingVersion) { return; } else { this.setState({checkingVersion: true}); }
        chrome.runtime.sendMessage({
            command: 'checkVersion',
        }, () => {
            setTimeout(() => this.setState({checkingVersion: false}), 500);
        });
    };
    renderSettingDOM = () => {
        const {permissionMap, permissionStatusTextObject} = this.state;
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
                    let hasError = false;
                    const permissionList = _.map(permissions, (nameStr) => {
                        const nameMap = nameStr.split('?');
                        if (nameMap.length > 0) {
                            const name = nameMap[0];
                            const description = (permissionStatusTextObject[name] && permissionStatusTextObject[name].description) || (permissionMap[name] && permissionStatusTextObject[name][permissionMap[name].type].description);
                            if ((name in permissionMap && permissionMap[name].pass === false) || permissionMap[name] === undefined) {
                                errorDescription.push(
                                    <PermissionErrorDescription>{description}</PermissionErrorDescription>,
                                );
                            }
                            return process.env.DEBUG ? <PermissionTag title={description}>
                                Permission: {_.upperFirst(name)}
                            </PermissionTag> : null;
                        }
                    });
                    const twoLine = description !== undefined || errorDescription.length > 0;
                    let second = '';
                    if (twoLine) {
                        if (errorDescription.length > 0) {
                            hasError = true;
                            second = errorDescription;
                        } else { second = description; }
                    }
                    return <ListItem
                        key={featureName}
                        toggle={toggleMode && !hasError}
                        onClick={on !== undefined && (toggleMode && !hasError) ? onClick : null}
                        operation={on !== undefined ? operation : null}
                        subList={SubListChildren ? {
                            hide: on === undefined ? false : !on,
                            children: SubListChildren,
                        } : null}
                        twoLine={twoLine}
                        first={twoLine ? <React.Fragment>{title}{permissionList}</React.Fragment> : ''}
                        second={second}
                    >{twoLine ? null : title}{permissionList}</ListItem>;
                })}
            </List> : null;
        });
    };

    renderAboutList = () => {
        const {checkingVersion} = this.state;
        return (
            <List title={__('config_type_about')} ref={i => this.aboutRef = i}>
                <ListItem
                    icon={<Icon iconfont="cat2" image/>}
                    twoLine
                    first={chrome.i18n.getMessage('extensionName')}
                    second={`${__('config_version')} ${version}（${process.env.DEBUG === true ? __('extensionVersionTypeTestVersion') : __('extensionVersionTypeOfficialVersion')}）`}
                    separator
                    operation={
                        <Button loading={checkingVersion} normal onClick={this.handleCheckVersion}>{__('config_checking')}</Button>
                    }
                />
                <ListItem
                    onClick={this.handleOpAnnouncement}
                    operation={<Button icon="arrowRight"></Button>}
                >查看功能调整记录</ListItem>
                <ListItem
                    onClick={this.showPrivatePolicy}
                    operation={<Button icon="arrowRight"></Button>}
                >查看隐私条款</ListItem>
                <ListItem
                    onClick={this.handleOpenWebsite}
                    operation={<Button icon="arrowRight"></Button>}
                >前往官网查看更新日志 和 投喂记录</ListItem>
            </List>
        );
    };

    isEdge = () => window.navigator.userAgent.indexOf('Edg') > -1;

    agreePrivatePolicy = () => {
        this.setState({modalOn: false}, () => {
            store.set('show-private-policy', false);
        });
    };

    showPrivatePolicy = () => {
        this.setState({modalOn: true});
    };

    render() {
        const {
            // modal state
            modalOn,
            //modalTitle,
            //modalBody,
            //modalButtons,
            // sub page state
            subPageOn,
            subPageTitle,
            subPageParent,
            pageType,
            broadcast,
        } = this.state;
        return <React.Fragment>
            <GlobalStyleSheet/>
            {/*<Header title="设置"/>*/}
            <ConfigBody>
                <Header>
                    <h1>BILIBILI HELPER</h1>
                    <sub>{`version ${version}（${process.env.DEBUG === true ? __('extensionVersionTypeTestVersion') : __('extensionVersionTypeOfficialVersion')}）`}</sub>
                    {/*<Cat iconfont="cat"/>*/}
                </Header>
                <Broadcast>
                    <div>{__('config_commonNotify')}</div>
                    <p>{__('config_websiteNotify')}<a href="https://bilibilihelper.com/" target="_blank"
                                                      rel="noopener noreferrer">https://bilibilihelper.com/</a></p>
                    {broadcast && (<React.Fragment>{broadcast}<br/></React.Fragment>)}
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
                {this.renderSettingDOM()}
                {this.renderAboutList()}
                <Footer>
                    <a href="https://github.com/zacyu/bilibili-helper">Github</a>
                    <a href="https://bilibilihelper.com/">Website</a>
                    {!this.isEdge() && <a href="https://chrome.google.com/webstore/detail/kpbnombpnpcffllnianjibmpadjolanh">Chrome
                        WebStore</a>}
                    <span>
                        Copyright (c) 2018 <a href="mailto:me@zacyu.com">Zac Yu</a>, Google LLC, <a
                        href="mailto:jjj201200@gmail.com">Drowsy Flesh</a>
                    </span>
                    <Figure>
                        <Alipay src="./statics/imgs/alipay-df.png" alt="alipay"/>
                        <figcaption>{__('config_thank')}</figcaption>
                    </Figure>
                </Footer>
            </ConfigBody>
            <Modal on={modalOn} title={'扩展程序隐私协议'} body={<PrivatePolicy/>} buttons={<React.Fragment>
                <Button onClick={this.agreePrivatePolicy}>同意并开始使用</Button>
            </React.Fragment>}/>
        </React.Fragment>;
    }
}

initI18n().then(() => {
    ReactDOM.render(
        <PageConfig/>,
        document.getElementById('root'),
        consoleLogo,
    );
});

