/**
 * Author: Cotch22
 * Create: 2020/7/26
 * Description:
 */

import React from 'react';
import {DarkModeStyle, TopBarWithoutBanner, TopBarDarkModeStyle, FooterDarkModeStyle, FooterDarkModeStyle_2, UserPopperDarkModeStyle} from 'Modules/darkMode/UI/basicStyle';
import {HomeDarkModeStyle, WatchLaterDarkModeStyle, HistoryDarkModeStyle} from 'Modules/darkMode/UI/pageHome';
import {DynamicDarkModeStyle} from 'Modules/darkMode/UI/pageDynamic';
import {ReadDarkModeStyle, ReadCVDarkModeStyle, ReadRankDarkModeStyle} from 'Modules/darkMode/UI/pageRead';
import {MessageDarkModeStyle} from 'Modules/darkMode/UI/pageMessage';
import {SpaceDarkModeStyle} from 'Modules/darkMode/UI/pageSpace';
import {VideoPlayDarkModeStyle} from 'Modules/darkMode/UI/pageVideo';
import {LivePlayDarkModeStyle} from 'Modules/darkMode/UI/pageLive';

const StyleRender = (style, withFooter = false, withoutBanner = true, withCustomTopBar = true) => {
    return (
        <React.Fragment>
            <DarkModeStyle/>{withCustomTopBar && <TopBarDarkModeStyle/>}{withoutBanner && <TopBarWithoutBanner/>}{withFooter && <FooterDarkModeStyle/>}{style}
        </React.Fragment>
    );
};

function HomeDarkMode() {
    return StyleRender([<HomeDarkModeStyle/>], true, false);
}

function DynamicDarkMode() {
    return StyleRender([<DynamicDarkModeStyle/>, <UserPopperDarkModeStyle/>]);
}

function ReadDarkMode() {
    return StyleRender([<ReadDarkModeStyle/>]);
}

function ReadCVDarkMode() {
    return StyleRender([<ReadCVDarkModeStyle/>, <UserPopperDarkModeStyle/>], true);
}

function ReadRankDarkMode() {
    return StyleRender([<ReadRankDarkModeStyle/>], true);
}

function MessageDarkMode() {
    return StyleRender([<MessageDarkModeStyle/>]);
}

function SpaceDarkMode() {
    return StyleRender([<SpaceDarkModeStyle/>, <UserPopperDarkModeStyle/>]);
}

function WatchLaterDarkMode() {
    return StyleRender([<WatchLaterDarkModeStyle/>, <FooterDarkModeStyle_2/>], false, false);
}

function HistoryDarkMode() {
    return StyleRender([<HistoryDarkModeStyle/>, <FooterDarkModeStyle_2/>], false, false);
}

function VideoPlayDarkMode() {
    return StyleRender([<VideoPlayDarkModeStyle/>]);
}

function LivePlayDarkMode() {
    return StyleRender([<LivePlayDarkModeStyle/>], false, false, false);
}

export {
    HomeDarkMode,
    DynamicDarkMode,
    ReadDarkMode,
    ReadCVDarkMode,
    ReadRankDarkMode,
    MessageDarkMode,
    SpaceDarkMode,
    WatchLaterDarkMode,
    HistoryDarkMode,
    VideoPlayDarkMode,
    LivePlayDarkMode,
}