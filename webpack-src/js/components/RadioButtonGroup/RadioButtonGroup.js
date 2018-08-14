/**
 * Author: Ruo
 * Create: 2018-08-14
 * Description:
 */
import _ from 'lodash';
import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {ListItem} from 'Components';
import {RadioButton} from './RadioButton';
import {theme} from 'Styles';

const {color} = theme;

const RadioButtonGroupWrapper = styled.div.attrs({
    className: 'radio-button-group-wrapper',
})`
`;
export const RadioButtonGroup = ({data, value, onClick}) => {
    if (data instanceof Array) {
        return <React.Fragment>
            {_.map(data, (entry, index) => {
                const {title, value: v} = entry;
                return <ListItem key={index} noBorder children={
                    <RadioButton title={title} on={v === value}/>
                } onClick={() => onClick(v)}/>;
            })}
        </React.Fragment>;
    } else {
        return null;
    }
};