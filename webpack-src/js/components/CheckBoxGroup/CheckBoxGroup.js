/**
 * Author: Ruo
 * Create: 2018-08-14
 * Description:
 */

import _ from 'lodash';
import React from 'react';
import styled from 'styled-components';
import {ListItem, Radio} from 'Components';
const CheckBoxTitle = styled.div`
  margin-left: -20px;
`;

export const CheckBoxGroup = ({data, value, onClick}) => {
    return <React.Fragment>
        {_.map(data, (entry, i) => {
            const {key, name} = entry;
            return <ListItem
                key={key}
                children={<CheckBoxTitle>{name}</CheckBoxTitle>}
                onClick={() => {
                    value[key] = !value[key];
                    onClick(value);
                }}
                operation={<Radio on={value[key]}/>}
            />;
        })}
    </React.Fragment>;
};