// ==UserScript==
// @name         unraid_textfield_selection_color
// @namespace    https://github.com/dorstmedia/unraid-tampermonkey
// @version      1.0.0.0
// @description  
// @match        *://unraid-*.local/*
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @grant        GM.xmlHttpRequest
// @connect      github.com
// @downloadURL  https://github.com/dorstmedia/unraid-tampermonkey/raw/main/unraid_textfield_selection_color.user.js
// @updateURL    https://github.com/dorstmedia/unraid-tampermonkey/raw/main/unraid_textfield_selection_color.user.js
// @resource     IMPORTED_CSS https://github.com/dorstmedia/unraid-tampermonkey/raw/main/unraid_textfield_selection_color.user.css
// @run-at       document-body
// ==/UserScript==
(function() {
    'use strict';
    const my_css = GM_getResourceText("IMPORTED_CSS");
    GM_addStyle(my_css);
});
