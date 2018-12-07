/**
 * Author: Ruo
 * Create: 2018-08-14
 * Description:
 */

import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {CheckBoxButton} from 'Components';
import {ListItem} from '../List';

const CheckBoxTitle = styled.div`
  margin-left: -20px;
`;

export const CheckBoxGroup = (props) => {
    const {data, onClick} = props;
    return <React.Fragment>
        {_.map(data, (entry) => {
            const {key, title, on, toggle = true, description} = entry;
            const twoLine = description !== undefined;
            return <ListItem
                key={key}
                noBorder={false}
                toggle={toggle}
                twoLine={twoLine}
                first={twoLine ? <CheckBoxTitle>{title}</CheckBoxTitle> : ''}
                second={twoLine ? <CheckBoxTitle>{description}</CheckBoxTitle> : ''}
                onClick={on !== undefined && toggle !== false ? () => onClick(key, !on) : null}
                operation={<CheckBoxButton disable={!toggle} on={on}/>}
            >{twoLine ? null : <CheckBoxTitle>{title}</CheckBoxTitle>}</ListItem>;
        })}
    </React.Fragment>;
};
CheckBoxGroup.propTypes = {
    data: PropTypes.any,
    onClick: PropTypes.func,
}