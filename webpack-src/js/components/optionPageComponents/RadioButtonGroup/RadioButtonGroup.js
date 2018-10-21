/**
 * Author: Ruo
 * Create: 2018-08-14
 * Description:
 */
import _ from 'lodash';
import React from 'react';
import {ListItem} from '../List';
import {RadioButton} from './RadioButton';

export const RadioButtonGroup = ({data, value, onClick}) => {
    if (data instanceof Array) {
        return <React.Fragment>
            {_.map(data, (entry, index) => {
                const {title, value: v} = entry;
                return <ListItem
                    noBorder={false}
                    key={index}
                    children={<RadioButton title={title} on={v === value}/>}
                    onClick={() => onClick(v)}
                />;
            })}
        </React.Fragment>;
    } else {
        return null;
    }
};