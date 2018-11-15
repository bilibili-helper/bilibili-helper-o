/**
 * Author: Ruo
 * Create: 2018-06-12
 * Description: 功能点打包入口
 */
// 然后再加载子类
import {DynamicCheck, DynamicCheckUI} from './dynamicCheck';
import {VideoAnchor, VideoAnchorUI} from './videoAnchor';
import {DoSign} from './doSign';
import {Treasure, TreasureUI} from './treasure';
import {GoogleAnalytics} from './googleAnalytics';
import {Debug} from './debug';
import {Danmu, DanmuUI} from './danmu';
import {Popup, PopupUI} from './popup';
import {Menu, MenuUI} from './menu';
import {ChatFilter, ChatFilterUI} from 'Modules/chatFilter';
import {VideoDownload, VideoDownloadUI} from 'Modules/videoDownload';
import {VideoQualitySelect} from './videoQualitySelect';
import {PictureInPicture, PictureInPictureUI} from 'Modules/pictureInPicture';
import {QuickSearch} from './quickSecrch';
import {VideoWiden, VideoWidenUI} from 'Modules/videoWiden';

export const Features = {
    Debug,
    Popup,
    Treasure,
    Menu,
    GoogleAnalytics,
    VideoAnchor,
    Danmu,
    DynamicCheck,
    ChatFilter,
    VideoDownload,
    DoSign,
    VideoQualitySelect,
    PictureInPicture,
    QuickSearch,
    VideoWiden,
};

export const UIs = {
    PopupUI,
    TreasureUI,
    MenuUI,
    VideoAnchorUI,
    DanmuUI,
    DynamicCheckUI,
    ChatFilterUI,
    VideoDownloadUI,
    PictureInPictureUI,
    VideoWidenUI,
};