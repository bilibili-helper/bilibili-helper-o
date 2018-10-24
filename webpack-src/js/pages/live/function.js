/**
 * Author: DrowsyFlesh
 * Create: 2018/10/24
 * Description:
 */

export const inLiveRoom = () => /^\/(\d+)$/.exec(window.location.pathname) ? true : false;
