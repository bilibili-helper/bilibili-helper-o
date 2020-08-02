/**
 * Author: Cotch22
 * Create: 2020/7/26
 * Description:
 */

import React from 'react';
import {DarkModeStyle, TopBarWithoutBanner, TopBarDarkModeStyle, FooterDarkModeStyle, FooterDarkModeStyle_2, UserPopperDarkModeStyle} from 'Modules/darkMode/UI/basicStyle';
import {HomeDarkModeStyle, WatchLaterDarkModeStyle} from 'Modules/darkMode/UI/pageHome';
import {DynamicDarkModeStyle} from 'Modules/darkMode/UI/pageDynamic';
import {ReadDarkModeStyle, ReadCVDarkModeStyle} from 'Modules/darkMode/UI/pageRead';
import {MessageDarkModeStyle} from 'Modules/darkMode/UI/pageMessage';
import {SpaceDarkModeStyle} from 'Modules/darkMode/UI/pageSpace';

const StyleRender = (style, withBanner = true) => {
    return (
        <React.Fragment>
            <DarkModeStyle/><TopBarDarkModeStyle/>{withBanner && <TopBarWithoutBanner/>}{style}
        </React.Fragment>
    );
};

function HomeDarkMode() {
    return StyleRender([<HomeDarkModeStyle/>, <FooterDarkModeStyle/>], false);
}

function DynamicDarkMode() {
    return StyleRender([<DynamicDarkModeStyle/>, <UserPopperDarkModeStyle/>]);
}

function ReadDarkMode() {
    return StyleRender([<ReadDarkModeStyle/>]);
}

function ReadCVDarkMode() {
    return StyleRender([<ReadCVDarkModeStyle/>, <UserPopperDarkModeStyle/>, <FooterDarkModeStyle/>]);
}

function MessageDarkMode() {
    return StyleRender([<MessageDarkModeStyle/>]);
}

function SpaceDarkMode() {
    return StyleRender([<SpaceDarkModeStyle/>]);
}

function WatchLaterDarkMode() {
    return StyleRender([<WatchLaterDarkModeStyle/>, <FooterDarkModeStyle_2/>], false);
}

export {
    HomeDarkMode,
    DynamicDarkMode,
    ReadDarkMode,
    ReadCVDarkMode,
    MessageDarkMode,
    SpaceDarkMode,
    WatchLaterDarkMode,
}