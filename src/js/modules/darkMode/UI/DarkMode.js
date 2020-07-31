/**
 * Author: Cotch22
 * Create: 2020/7/26
 * Description:
 */

import React from 'react';
import {DarkModeStyle, TopBarDarkModeStyle, FooterDarkModeStyle, CommentDarkModeStyle, UserPopperDarkModeStyle} from 'Modules/darkMode/UI/basicStyle';
import {DynamicDarkModeStyle} from 'Modules/darkMode/UI/pageDynamic';
import {ReadCVDarkModeStyle} from 'Modules/darkMode/UI/pageRead';
import {MessageDarkModeStyle} from 'Modules/darkMode/UI/pageMessage';
import {SpaceDarkModeStyle} from 'Modules/darkMode/UI/pageSpace';

const StyleRender = (style) => {
    return (
        <React.Fragment>
            <DarkModeStyle/><TopBarDarkModeStyle/>{style}
        </React.Fragment>
    );
};

function DynamicDarkMode() {
    return StyleRender([<DynamicDarkModeStyle/>, <UserPopperDarkModeStyle/>]);
}

function ReadCVDarkMode() {
    return StyleRender([<ReadCVDarkModeStyle/>, <CommentDarkModeStyle/>, <UserPopperDarkModeStyle/>, <FooterDarkModeStyle/>]);
}

function MessageDarkMode() {
    return StyleRender([<MessageDarkModeStyle/>]);
}

function SpaceDarkMode() {
    return StyleRender([<SpaceDarkModeStyle/>]);
}

export {
    DynamicDarkMode,
    ReadCVDarkMode,
    MessageDarkMode,
    SpaceDarkMode,
}