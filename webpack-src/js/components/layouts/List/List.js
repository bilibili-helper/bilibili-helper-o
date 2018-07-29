/**
 * Author: Ruo
 * Create: 2018-07-26
 * Description:
 */

import React from 'react';
import styled from 'styled-components';
import {theme} from 'Styles/theme';

const {color} = theme;

const ListWrapper = styled.div`
  margin: 3px;
`;

const ListHeader = styled.div`
  margin-bottom: 12px;
  font-size: 13px;
  margin-top: 21px;
  font-weight: 500;
  font-size: 13px;
  color: ${color('paper-grey-700')};
`;

const ListBody = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: 4px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
  overflow: hidden;
`;

export class List extends React.Component {
    render() {
        const {children, title} = this.props;
        return (
            <ListWrapper>
                {title && <ListHeader>{title}</ListHeader>}
                <ListBody>
                    {children}
                </ListBody>
            </ListWrapper>
        );

    }
}