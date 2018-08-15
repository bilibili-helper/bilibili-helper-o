/**
 * Author: Ruo
 * Create: 2018-08-15
 * Description:
 */

import _ from 'lodash';
import React from 'react';
import styled from 'styled-components';
import {ListItem} from 'Components';

const UpdateListItem = styled.div.attrs({
    className: 'update-list-item',
})`
    margin-left: -20px;
    font-size: 14px;
    line-height: 24px;
    list-style: none;
    &.serious {
      color: red;
      font-weight: bold;
    }
`;

export class UpdateList extends React.Component {
    render() {
        const {data, title, ...rest} = this.props;
        return <ListItem
            extend
            twoLine
            first={title}
            second={`包含 ${data.length} 条内容`}
            subList={{
                hide: true,
                children: _.map(data, (entry, i) => {
                    const {type = 'normal', title} = entry;
                    return <ListItem
                        key={i}
                        children={<UpdateListItem className={type}>{title}</UpdateListItem>}
                        {...rest}
                    />
                })
            }}
        />
    }
}