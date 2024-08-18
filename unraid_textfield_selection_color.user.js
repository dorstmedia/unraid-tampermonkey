// ==UserScript==
// @name         unraid_textfield_selection_color
// @namespace    https://github.com/dorstmedia/unraid-tampermonkey
// @version      1.0.0.1
// @description  
// @match        *://unraid-nuc.local/*
// @match        *://unraid-itx.local/*
// @match        *://unraid-xeon.local/*
// @match        *://unraid-epyc.local/*
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @grant        GM.xmlHttpRequest
// @connect      github.com
// @downloadURL  https://raw.githubusercontent.com/dorstmedia/unraid-tampermonkey/master/unraid_textfield_selection_color.user.js
// @updateURL    https://raw.githubusercontent.com/dorstmedia/unraid-tampermonkey/master/unraid_textfield_selection_color.user.js
// @resource     IMPORTED_CSS https://raw.githubusercontent.com/dorstmedia/unraid-tampermonkey/master/unraid_textfield_selection_color.user.css
// @run-at       document-body
// ==/UserScript==
(function() {
    'use strict';
    const my_css = GM_getResourceText("IMPORTED_CSS");
    GM_addStyle(my_css);
});
