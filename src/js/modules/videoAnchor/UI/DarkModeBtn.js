import {Button} from 'Components/common/Button';
import React from 'react';
import styled from 'styled-components';
import {VideoPlayDarkMode} from 'Modules/darkMode/UI/DarkMode';
import _ from "lodash";

/**
 * Author: DrowsyFlesh
 * Create: 2019-05-14
 * Description:
 */

export default () => {
  const DarkModeBtnBox = styled.div.attrs({
    className: 'bilibili-helper-video-dark-mode',
  })`
      position: static;
      margin: 0;
      z-index: 1;
    `;
  const VideoDarkModeButton = styled(Button).attrs({
    className: `bilibili-helper-video-dark-mode-btn`,
  })`
      position: absolute;
      right: 66px;
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

  return class DarkModeButton extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        showDark: false,
      };
      this.isOldPageOrWatchLater = !!document.querySelector('#__bofqi,.view-later-module, #bangumi_detail');
    }

    componentDidMount() {
      chrome.runtime.sendMessage({
        command: 'getSetting',
        feature: 'darkMode',
      }, (settings) => {
        if (settings.on) {
          const darkFollowSys =  _.find(settings.options, {key: 'darkFollowSys'});
          if (darkFollowSys.on) {
            const sysDark = matchMedia("(prefers-color-scheme: dark)");
            this.setState({showDark: sysDark.matches});
            sysDark.onchange = () => {
              this.setState({showDark: sysDark.matches});
            };
          } else {
            this.setState({showDark: true});
          }
        }
      });
    }

    handleOnClick = () => {
      const on = this.state.showDark;
      this.setState({showDark: !on});
    };

    render() {
      const on = this.state.showDark;
      return (
          <React.Fragment>
            <DarkModeBtnBox>
              <VideoDarkModeButton onClick={this.handleOnClick} on={on && !this.isOldPageOrWatchLater}>深色模式</VideoDarkModeButton>
              {on && !this.isOldPageOrWatchLater && <VideoPlayDarkMode/>}
            </DarkModeBtnBox>
          </React.Fragment>
      );
    }
  };
}
