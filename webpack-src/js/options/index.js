/**
 * Author: Ruo
 * Create: 2018-06-12
 * Description:
 */

import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import {__, isLogin, createTab, version} from 'Utils';
import {Button, Body, List, ListItem, Header, Icon, Radio} from 'Components';

import 'Styles/scss/options.scss';

const {Start, End, Separator} = ListItem;
const OptionBody = styled(Body)`
  position: relative;
  //max-width: 544px;
  //min-width: 350px;
  margin: 0 auto;
  //flex: 1;
  padding: 0 3px;
  top: 56px;
  right: 0;
  bottom: 0;
  left: 0;
`;

class PageOptions extends React.Component {
    constructor() {
        super();
        this.state = {
            active: '',
        };
        this.handleOnClick = ::this.handleOnClick;
    }

    handleOnClick(type) {
        const {active} = this.state;
        this.setState({active: active === type ? '' : type});
    }

    render() {
        const {active} = this.state;
        console.log(active, active !== 'live' && active !== '');
        return [
            <Header key="header" title="设置"/>,
            <OptionBody key="body">
                <List title="直播" extend={active === 'live'} hidden={active !== 'live' && active !== ''}>
                    <ListItem>
                        <Radio on={active === 'main'} onClick={() => this.handleOnClick('main')}/>
                    </ListItem>
                </List>
                <List title="其他" extend={active === 'other'} hidden={active !== 'other' && active !== ''}>
                    <ListItem></ListItem>
                </List>
                <List title="关于助手" extend={active === 'about'} hidden={active !== 'about' && active !== ''}>
                    <ListItem twoLine>
                        <Icon type="cat128" isImage/>
                        <Start
                            first={chrome.i18n.getMessage('extName')}
                            second={`版本 ${version}（正式版）`}
                        />
                        <Separator/>
                        <End>
                            <Button>检查更新</Button>
                        </End>
                    </ListItem>
                </List>
                <List
                    title="主站"
                    extend={active === 'main'}
                    hidden={active !== 'main' && active !== ''}
                    extendChildren={<div>
                        <ListItem twoLine>
                            <Start>关注页面跳转</Start>
                            {/*<Separator/>*/}
                            <End>
                                <Button
                                    isIcon={true}
                                    onClick={() => this.handleOnClick('main')}
                                ><Icon type="arrowRight"/></Button>
                                {/*<Button isIcon={true}><Icon type="arrowRight"/></Button>*/}
                                {/*<Button>aaaaaaaaaaaaaaaaaa</Button>*/}
                            </End>
                        </ListItem>
                        <ListItem twoLine>
                            <Start>关注页面跳转</Start>
                            {/*<Separator/>*/}
                            <End>
                                <Button
                                    isIcon={true}
                                    onClick={() => this.handleOnClick('main')}
                                ><Icon type="arrowRight"/></Button>
                                {/*<Button isIcon={true}><Icon type="arrowRight"/></Button>*/}
                                {/*<Button>aaaaaaaaaaaaaaaaaa</Button>*/}
                            </End>
                        </ListItem>
                        <ListItem twoLine>
                            <Start>关注页面跳转</Start>
                            {/*<Separator/>*/}
                            <End>
                                <Button
                                    isIcon={true}
                                    onClick={() => this.handleOnClick('main')}
                                ><Icon type="arrowRight"/></Button>
                                {/*<Button isIcon={true}><Icon type="arrowRight"/></Button>*/}
                                {/*<Button>aaaaaaaaaaaaaaaaaa</Button>*/}
                            </End>
                        </ListItem>
                        <ListItem twoLine>
                            <Start>关注页面跳转</Start>
                            {/*<Separator/>*/}
                            <End>
                                <Button
                                    isIcon={true}
                                    onClick={() => this.handleOnClick('main')}
                                ><Icon type="arrowRight"/></Button>
                                {/*<Button isIcon={true}><Icon type="arrowRight"/></Button>*/}
                                {/*<Button>aaaaaaaaaaaaaaaaaa</Button>*/}
                            </End>
                        </ListItem>
                        <ListItem twoLine>
                            <Start>关注页面跳转</Start>
                            {/*<Separator/>*/}
                            <End>
                                <Button
                                    isIcon={true}
                                    onClick={() => this.handleOnClick('main')}
                                ><Icon type="arrowRight"/></Button>
                                {/*<Button isIcon={true}><Icon type="arrowRight"/></Button>*/}
                                {/*<Button>aaaaaaaaaaaaaaaaaa</Button>*/}
                            </End>
                        </ListItem>
                        <ListItem twoLine>
                            <Start>关注页面跳转</Start>
                            {/*<Separator/>*/}
                            <End>
                                <Button
                                    isIcon={true}
                                    onClick={() => this.handleOnClick('main')}
                                ><Icon type="arrowRight"/></Button>
                                {/*<Button isIcon={true}><Icon type="arrowRight"/></Button>*/}
                                {/*<Button>aaaaaaaaaaaaaaaaaa</Button>*/}
                            </End>
                        </ListItem>
                        <ListItem twoLine>
                            <Start>关注页面跳转</Start>
                            {/*<Separator/>*/}
                            <End>
                                <Button
                                    isIcon={true}
                                    onClick={() => this.handleOnClick('main')}
                                ><Icon type="arrowRight"/></Button>
                                {/*<Button isIcon={true}><Icon type="arrowRight"/></Button>*/}
                                {/*<Button>aaaaaaaaaaaaaaaaaa</Button>*/}
                            </End>
                        </ListItem>
                        <ListItem twoLine>
                            <Start>关注页面跳转</Start>
                            {/*<Separator/>*/}
                            <End>
                                <Button
                                    isIcon={true}
                                    onClick={() => this.handleOnClick('main')}
                                ><Icon type="arrowRight"/></Button>
                                {/*<Button isIcon={true}><Icon type="arrowRight"/></Button>*/}
                                {/*<Button>aaaaaaaaaaaaaaaaaa</Button>*/}
                            </End>
                        </ListItem>
                        <ListItem twoLine>
                            <Start>关注页面跳转</Start>
                            {/*<Separator/>*/}
                            <End>
                                <Button
                                    isIcon={true}
                                    onClick={() => this.handleOnClick('main')}
                                ><Icon type="arrowRight"/></Button>
                                {/*<Button isIcon={true}><Icon type="arrowRight"/></Button>*/}
                                {/*<Button>aaaaaaaaaaaaaaaaaa</Button>*/}
                            </End>
                        </ListItem>
                        <ListItem twoLine>
                            <Start>关注页面跳转</Start>
                            {/*<Separator/>*/}
                            <End>
                                <Button
                                    isIcon={true}
                                    onClick={() => this.handleOnClick('main')}
                                ><Icon type="arrowRight"/></Button>
                                {/*<Button isIcon={true}><Icon type="arrowRight"/></Button>*/}
                                {/*<Button>aaaaaaaaaaaaaaaaaa</Button>*/}
                            </End>
                        </ListItem>
                        <ListItem twoLine>
                            <Start>关注页面跳转</Start>
                            {/*<Separator/>*/}
                            <End>
                                <Button
                                    isIcon={true}
                                    onClick={() => this.handleOnClick('main')}
                                ><Icon type="arrowRight"/></Button>
                                {/*<Button isIcon={true}><Icon type="arrowRight"/></Button>*/}
                                {/*<Button>aaaaaaaaaaaaaaaaaa</Button>*/}
                            </End>
                        </ListItem>
                        <ListItem twoLine>
                            <Start>关注页面跳转</Start>
                            {/*<Separator/>*/}
                            <End>
                                <Button
                                    isIcon={true}
                                    onClick={() => this.handleOnClick('main')}
                                ><Icon type="arrowRight"/></Button>
                                {/*<Button isIcon={true}><Icon type="arrowRight"/></Button>*/}
                                {/*<Button>aaaaaaaaaaaaaaaaaa</Button>*/}
                            </End>
                        </ListItem>
                        <ListItem twoLine>
                            <Start>关注页面跳转</Start>
                            {/*<Separator/>*/}
                            <End>
                                <Button
                                    isIcon={true}
                                    onClick={() => this.handleOnClick('main')}
                                ><Icon type="arrowRight"/></Button>
                                {/*<Button isIcon={true}><Icon type="arrowRight"/></Button>*/}
                                {/*<Button>aaaaaaaaaaaaaaaaaa</Button>*/}
                            </End>
                        </ListItem>
                        <ListItem twoLine>
                            <Start>关注页面跳转</Start>
                            {/*<Separator/>*/}
                            <End>
                                <Button
                                    isIcon={true}
                                    onClick={() => this.handleOnClick('main')}
                                ><Icon type="arrowRight"/></Button>
                                {/*<Button isIcon={true}><Icon type="arrowRight"/></Button>*/}
                                {/*<Button>aaaaaaaaaaaaaaaaaa</Button>*/}
                            </End>
                        </ListItem>
                    </div>}
                >
                    <ListItem twoLine onClick={() => this.handleOnClick('main')}>
                        <Start
                            first="查看所有设置"
                            second="6项设置生效"
                        />
                        {/*<Separator/>*/}
                        <End>
                            <Button isIcon={true}><Icon type="arrowRight"/></Button>
                            {/*<Button>aaaaaaaaaaaaaaaaaa</Button>*/}
                        </End>
                    </ListItem>
                </List>
            </OptionBody>,
        ];
    }
}

$(document).ready(() => {
    ReactDOM.render(
        <PageOptions/>,
        document.getElementById('root'),
    );
});

