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

class ClassRender extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showDark: true,
        }
    }

    componentDidMount() {
        if (this.props.darkFollowSys) {
            const sysDark = matchMedia("(prefers-color-scheme: dark)");
            this.setState({showDark: sysDark.matches});
            sysDark.onchange = () => {
                this.setState({showDark: sysDark.matches});
            };
        }
    }
}

const StyleRender = (style, withFooter = false, withoutBanner = true, withCustomTopBar = true) => {
    return (
        <React.Fragment>
            <DarkModeStyle/>{withCustomTopBar && <TopBarDarkModeStyle/>}{withoutBanner && <TopBarWithoutBanner/>}{withFooter && <FooterDarkModeStyle/>}{style}
        </React.Fragment>
    );
};

class HomeDarkMode extends ClassRender {
    render() {
        const StyleMain = StyleRender([<HomeDarkModeStyle/>], true, false);
        return this.state.showDark ? StyleMain : null
    }
}

class DynamicDarkMode extends ClassRender {
    render() {
        const StyleMain = StyleRender([<DynamicDarkModeStyle/>, <UserPopperDarkModeStyle/>]);
        return this.state.showDark ? StyleMain : null
    }
}

class ReadDarkMode extends ClassRender {
    render() {
        const StyleMain = StyleRender([<ReadDarkModeStyle/>]);
        return this.state.showDark ? StyleMain : null
    }
}

class ReadCVDarkMode extends ClassRender {
    render() {
        const StyleMain = StyleRender([<ReadCVDarkModeStyle/>, <UserPopperDarkModeStyle/>], true);
        return this.state.showDark ? StyleMain : null
    }
}

class ReadRankDarkMode extends ClassRender {
    render() {
        const StyleMain = StyleRender([<ReadRankDarkModeStyle/>], true);
        return this.state.showDark ? StyleMain : null
    }
}

class MessageDarkMode extends ClassRender {
    render() {
        const StyleMain = StyleRender([<MessageDarkModeStyle/>]);
        return this.state.showDark ? StyleMain : null
    }
}

class SpaceDarkMode extends ClassRender {
    render() {
        const StyleMain = StyleRender([<SpaceDarkModeStyle/>, <UserPopperDarkModeStyle/>]);
        return this.state.showDark ? StyleMain : null
    }
}

class WatchLaterDarkMode extends ClassRender {
    render() {
        const StyleMain = StyleRender([<WatchLaterDarkModeStyle/>, <FooterDarkModeStyle_2/>], false, false);
        return this.state.showDark ? StyleMain : null
    }
}

class HistoryDarkMode extends ClassRender {
    render() {
        const StyleMain = StyleRender([<HistoryDarkModeStyle/>, <FooterDarkModeStyle_2/>], false, false);
        return this.state.showDark ? StyleMain : null
    }
}

class VideoPlayDarkMode extends ClassRender {
    render() {
        const StyleMain = StyleRender([<VideoPlayDarkModeStyle/>, <UserPopperDarkModeStyle/>]);
        return this.state.showDark ? StyleMain : null
    }
}

class LivePlayDarkMode extends ClassRender {
    render() {
        const StyleMain = StyleRender([<LivePlayDarkModeStyle/>, <UserPopperDarkModeStyle/>], false, false, false);
        return this.state.showDark ? StyleMain : null
    }
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