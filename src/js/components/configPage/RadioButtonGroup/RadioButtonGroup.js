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
            {_.map(data, (entry, i) => {
                const {key, title, disable} = entry;
                return <ListItem
                    key={i}
                    noBorder={false}
                    children={<RadioButton disable={disable} title={title} on={key === value}/>}
                    onClick={!disable ? () => onClick(key) : null}
                />;
            })}
        </React.Fragment>;
    } else {
        return null;
    }
};