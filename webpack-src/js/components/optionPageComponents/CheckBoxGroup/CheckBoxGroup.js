/**
 * Author: Ruo
 * Create: 2018-08-14
 * Description:
 */

import _ from 'lodash';
import React from 'react';
import styled from 'styled-components';
import {Radio} from 'Components';
import {ListItem} from '../List';

const CheckBoxTitle = styled.div`
  margin-left: -20px;
`;

export const CheckBoxGroup = ({data, onClick}) => {
    return <React.Fragment>
        {_.map(data, (entry, i) => {
            const {key, title, value} = entry;
            return <ListItem
                key={key}
                noBorder={false}
                children={<CheckBoxTitle>{title}</CheckBoxTitle>}
                onClick={() => onClick(key, !value)}
                operation={<Radio on={value}/>}
            />;
        })}
    </React.Fragment>;
};