/**
 * Author: DrowsyFlesh
 * Create: 2018/10/21
 * Description:
 */

import {Radio} from 'Components/Radio';
import _ from 'lodash';
import {Feature} from 'Modules';
import React from 'react';
import {Radio, ListItem, RadioButtonGroup} from 'Components';

export class NewWatchPage extends Feature {
    constructor() {
        super({
            name: 'newWatchPage',
            title: '关注页面跳转',
            kind: 'other',
            GUI: null,
            permission: {},
            options: {
                on: true,
                optionType: 'radio',
                options: [
                    {key: 'new', title: '新页面'},
                    {key: 'old', title: '旧页面'},
                ],
                value: 'new', // default
            },
        });
        this.state = {
            on: this.options.on,
            value: this.options.value,
        };
        this.optionDOM = <ListItem
            onClick={() => this.setOption(this.state)}
            operation={<Radio on={this.state.on}/>}
            subList={{
                hide: !this.state.on,
                theme: {twoLine: false},
                children: <RadioButtonGroup
                    value={this.state.value}
                    data={this.options.options}
                    onClick={(value) => this.handleSetOption(this.name, value)}
                />,
            }}
        >{this.title}</ListItem>;
    }

    launch = () => {

    };
}