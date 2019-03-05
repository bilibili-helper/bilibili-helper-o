/**
 * Author: Ruo
 * Create: 2018-08-15
 * Description:
 */

import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {ListItem} from '../List';
import {theme} from 'Styles';

const {color} = theme;

const UpdateListItem = styled.div.attrs({className: 'update-list-item'})`
    margin-left: -20px;
    font-size: 13px;
    line-height: 26px;
    list-style: none;
    padding: 10px 0;
    &.serious {
      color: ${color('paper-red-500')};
      font-weight: bold;
    }
    i {
      margin: 4px;
      padding: 1px 6px;
      border-radius: 3px;
      font-size: 12px;
      font-style: normal;
      letter-spacing: 0.3px;
      background-color: ${color('paper-pink-50')};
      color: ${color('bilibili-pink')};
      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        background-color: ${color('paper-pink-50')};
      }
    }
    a {
      color: ${color('bilibili-pink')};
    }
`;

export class UpdateList extends React.Component {
    propTypes = {
        data: PropTypes.any,
        title: PropTypes.string,
        hide: PropTypes.bool,
    }
    render() {
        const {data, title, hide = true, ...rest} = this.props;
        return <ListItem
            extend
            twoLine
            first={title}
            second={`包含 ${data.length} 条内容`}
            subList={{
                hide: hide,
                children: _.map(data, (title, i) => {
                    return <ListItem
                        key={i}
                        noBorder={false}
                        {...rest}
                    ><UpdateListItem dangerouslySetInnerHTML={{__html: title}}/></ListItem>;
                }),
            }}
        />;
    }
}
