/**
 * Author: DrowsyFlesh
 * Create: 2018/10/29
 * Description:
 */
import React from 'react';
import styled from 'styled-components';
import {Icon} from 'Components';
import {theme} from 'Styles';

const {color} = theme;

const HelperView = styled(Icon)`
  margin-left: 10px;
  color: ${color('google-grey-600')};
`;

export class Helper extends React.Component {
    constructor(props) {
        super(props);
    }
    handleOnClick = (e) => {
        e.stopPropagation();
    }

    render() {
        const {type, description, ...rest} = this.props;
        return (
            <HelperView
                onClick={this.handleOnClick}
                title={description}
                iconfont={type}
                {...rest}
            />
        );
    }
}