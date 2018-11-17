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
            const {key, title, on, toggle = true, description} = entry;
            const twoLine = description !== undefined;
            return <ListItem
                key={key}
                noBorder={false}
                toggle={toggle}
                twoLine={twoLine}
                first={twoLine ? <CheckBoxTitle>{title}</CheckBoxTitle> : ''}
                second={twoLine ? <CheckBoxTitle>{description}</CheckBoxTitle> : ''}
                children={twoLine ? null : <CheckBoxTitle>{title}</CheckBoxTitle>}
                onClick={on !== undefined && toggle !== false ? () => onClick(key, !on) : null}
                operation={<Radio disable={!toggle} on={on}/>}
            />;
        })}
    </React.Fragment>;
};