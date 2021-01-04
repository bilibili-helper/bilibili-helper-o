import React from 'react';
import store from 'store';
import styled from 'styled-components';
import {Button} from 'Components/common/Button';
import {VideoPlayDarkMode} from 'Modules/darkMode/UI/DarkMode';

/**
 * Author: DrowsyFlesh
 * Create: 2019-05-14
 * Description:
 */

export default () => {
    const VideoDarkModeButton = styled(Button).attrs({
        className: `bilibili-helper-video-dark-mode-btn`,
    })`
      position: absolute;
      right: 64px;
      top: 14px;
      border-radius: 4px;
      button {
        padding: 0 4px;
        min-width: unset;
        font-size: 12px;
        border: 1px solid #fb7299;
        border-radius: 4px;
        color: ${({on}) => on ? '#fff' : '#fb7299'};
        background-color: ${({on}) => on ? '#fb7299' : '#fff'};
        cursor: pointer;
      }
    `;

    return class VideoBtn extends React.Component {
        constructor(props) {
            super(props);
            this.darkStore = store.get('videoDark');
            this.darkTwoFactor = store.get('videoDarkTwoFactor');
            this.state = {
                showDark: this.darkStore,
            };
            this.isOldPageOrWatchLater = !!document.querySelector('#__bofqi,.view-later-module, #bangumi_detail');
        }

        componentDidMount() {
            chrome.runtime.sendMessage({
                command: 'getSetting',
                feature: 'darkMode',
            }, (settings) => {
                this.darkGlobal = settings.on;
                if (settings.on && !this.darkTwoFactor) {
                    const darkFollowSys = settings.options.filter((item) => item.key === 'darkFollowSys')[0];
                    if (darkFollowSys.on) {
                        const sysDark = matchMedia("(prefers-color-scheme: dark)");
                        this.setState({showDark: sysDark.matches});
                        sysDark.onchange = () => {
                            this.setState({showDark: sysDark.matches});
                        };
                    } else {
                        this.setState({showDark: true});
                    }
                    if (this.darkStore === false) {
                        let time = store.get('videoDarkTime');
                        time = time !== undefined ? ++time : 1;
                        if (time > 3) {
                            store.remove('videoDark');
                            store.remove('videoDarkTime');
                        } else {
                            store.set('videoDarkTime', time);
                        }
                    }
                }
            });
        }

        handleOnClick = () => {
            const on = !this.state.showDark;
            this.setState({showDark: on});
            store.set('videoDark', on);
            if (!on && this.darkStore === false && this.darkGlobal && !this.darkTwoFactor) {
                store.set('videoDarkTwoFactor', true);
            }
            if (on && !this.darkGlobal && this.darkTwoFactor) {
                store.set('videoDarkTwoFactor', false);
            }
        };

        render() {
            const on = this.state.showDark;
            return (
                <React.Fragment>
                    <VideoDarkModeButton onClick={this.handleOnClick}
                                         on={on && !this.isOldPageOrWatchLater}>深色模式</VideoDarkModeButton>
                    {on && !this.isOldPageOrWatchLater && <VideoPlayDarkMode/>}
                </React.Fragment>
            );
        }
    };
}
