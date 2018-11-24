/**
 * Author: Ruo
 * Create: 2018-08-28
 * Description:
 */

import React from 'react';
import {ThemeProvider} from 'styled-components';
import {Button, Icon} from 'Components';

export const IconButton = ({type, theme, ...rest}) => {
    return (
        <ThemeProvider theme={{...theme}}>
            <Button icon {...rest}><Icon type={type}/></Button>
        </ThemeProvider>
    );
};