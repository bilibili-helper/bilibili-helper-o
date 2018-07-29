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
  max-width: 544px;
  min-width: 350px;
  margin: 56px auto 64px;
`;

class PageOptions extends React.Component {
    constructor(){
        super();
        this.state = {
            active: true,
        }
        this.handleOnClick = ::this.handleOnClick;
    }

    handleOnClick() {
        const {active} = this.state;
        this.setState({active: !active});
    }

    render() {
        const {active} = this.state;
        return [
            <Header key="header" title="设置"/>,
            <OptionBody key="body">
                <List title="主站">
                    <ListItem twoLine>
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
                <List title="直播">
                    <ListItem>
                        <Radio on={active} onClick={this.handleOnClick}/>
                    </ListItem>
                </List>
                <List title="其他">
                    <ListItem></ListItem>
                </List>
                <List title="关于助手">
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

