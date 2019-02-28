/* global require */
/**
 * Author: Ruo
 * Create: 2018-06-12
 * Description: 功能点打包入口
 */
import {Background} from './background';
import {DynamicCheck, DynamicCheckUI} from './dynamicCheck';
import {VideoAnchor, VideoAnchorUI} from './videoAnchor';
import {DoSign} from './doSign';
import {Treasure, TreasureUI} from './treasure';
import {GoogleAnalytics} from './googleAnalytics';
import {Debug} from './debug';
import {Danmu, DanmuUI} from './danmu';
import {PopupAnchor, PopupAnchorUI} from './PopupAnchor';
import {Menu, MenuUI} from './menu';
import {ChatFilter, ChatFilterUI} from 'Modules/chatFilter';
import {VideoDownload, VideoDownloadUI} from 'Modules/videoDownload';
import {PictureInPicture, PictureInPictureUI} from 'Modules/pictureInPicture';
import {VideoWiden, VideoWidenUI} from 'Modules/videoWiden';
import {VideoSubtitleDownload, VideoSubtitleDownloadUI} from 'Modules/videoSubtitleDownload';
import {VersionManager} from 'Modules/versionManager';
import {Silver2coin} from 'Modules/silver2coin';
import {QuickSearch} from 'Modules/quickSearch';
import {VideoHideDanmu, VideoHideDanmuUI} from 'Modules/videoHideDanmu';
import {LiveChatMode, LiveChatModeUI} from './liveChatMode';
import {VideoDarkMode, VideoDarkModeUI} from 'Modules/videoDarkMode';
import {ProxyForWebsite} from 'Modules/proxyForWebsite';

let VideoUnblock;
try {
    VideoUnblock = require('./videoUnblock').VideoUnblock;
} catch (e) {``;}

export const Features = {
    Background,
    Debug,
    PopupAnchor,
    Treasure,
    Menu,
    GoogleAnalytics,
    VideoAnchor,
    Danmu,
    DynamicCheck,
    ChatFilter,
    VideoDownload,
    DoSign,
    PictureInPicture,
    VideoWiden,
    VideoSubtitleDownload,
    VersionManager,
    Silver2coin,
    QuickSearch,
    VideoHideDanmu,
    LiveChatMode,
    VideoUnblock,
    VideoDarkMode,
    ProxyForWebsite,
};

export const UIs = {
    PopupAnchorUI,
    TreasureUI,
    MenuUI,
    VideoAnchorUI,
    DanmuUI,
    DynamicCheckUI,
    ChatFilterUI,
    VideoDownloadUI,
    PictureInPictureUI,
    VideoWidenUI,
    VideoSubtitleDownloadUI,
    VideoHideDanmuUI,
    LiveChatModeUI,
    VideoDarkModeUI,
};
