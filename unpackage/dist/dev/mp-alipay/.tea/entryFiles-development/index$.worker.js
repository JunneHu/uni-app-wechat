/**! __APPX-TRACE_START__ */ 
      !(function() {
        false && console.log('APPXTRACE INJECT');
        const GLOBAL =  typeof window !== 'undefined' ? window : typeof globalThis !== 'undefined' ? globalThis : new Function('return this')();
        GLOBAL.__traceStartupParams={"env":"simulator","biz":"performance"};
      }());
      !function(){"use strict";
/*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */var t=function(){return(t=Object.assign||function(t){for(var a,n=1,e=arguments.length;n<e;n++)for(var r in a=arguments[n])Object.prototype.hasOwnProperty.call(a,r)&&(t[r]=a[r]);return t}).apply(this,arguments)};function a(){for(var t=0,a=0,n=arguments.length;a<n;a++)t+=arguments[a].length;var e=Array(t),r=0;for(a=0;a<n;a++)for(var o=arguments[a],i=0,_=o.length;i<_;i++,r++)e[r]=o[i];return e}var n=null;try{n||(n="undefined"!=typeof window?window:"undefined"!=typeof self?self:"undefined"!=typeof globalThis?globalThis:new Function("return this")())}catch(t){console.log(t)}var e=n,r=Date.now(),o="undefined"!=typeof __traceStartupParams?__traceStartupParams:e.__traceStartupParams?e.__traceStartupParams:{},i={scriptTimeBegin:r,global:e,startupParams:t(t({},{env:"device",biz:"performance"}),o),hook:{},appx:{}},_=i.global,f=i.startupParams,l=f.biz;if("simulator"===f.env);else if("performance"===l)if(null==_?void 0:_.__APPX_DEVTOOLS_GLOBAL_HOOK__){var p=_.__APPX_DEVTOOLS_GLOBAL_HOOK__.onSetData;_.__APPX_DEVTOOLS_GLOBAL_HOOK__.onSetData=function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];u.apply(void 0,a([i.hook.onSetData],t)),"function"==typeof p&&p.apply(void 0,t)}}else _.__APPX_DEVTOOLS_GLOBAL_HOOK__={onSetData:function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];u.apply(void 0,a([i.hook.onSetData],t))}};function u(t){for(var a=[],n=1;n<arguments.length;n++)a[n-1]=arguments[n];if("function"==typeof t)return t.apply(void 0,a)}}();

       /**! __APPX-TRACE_END__ */
if(!self.__appxInited) {
self.__appxInited = 1;


require('./config$');
require('./importScripts$');

      if( navigator.userAgent && (navigator.userAgent.indexOf('LyraVM') > 0 || navigator.userAgent.indexOf('AlipayIDE') > 0) ) {
        var AFAppX = self.AFAppX.getAppContext ? self.AFAppX.getAppContext().AFAppX : self.AFAppX;
      } else {
        importScripts('https://appx/af-appx.worker.min.js');
        var AFAppX = self.AFAppX;
      }
      self.getCurrentPages = AFAppX.getCurrentPages;
      self.getApp = AFAppX.getApp;
      self.Page = AFAppX.Page;
      self.App = AFAppX.App;
      self.my = AFAppX.bridge || AFAppX.abridge;
      self.abridge = self.my;
      self.Component = AFAppX.WorkerComponent || function(){};
      self.$global = AFAppX.$global;
      self.requirePlugin = AFAppX.requirePlugin;
    

if(AFAppX.registerApp) {
  AFAppX.registerApp({
    appJSON: appXAppJson,
  });
}



function success() {
require('../../app');
require('../../components/eiml-flow-layout/eiml-flow-layout?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../components/tabs/tabs?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../components/chose-city/chose-city?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../components/my-share/my-share?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../components/imt-audio/imt-audio?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../components/c-calendar/c-calendar?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../pages/luckDraw/luckDraw?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/index/index?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/list/list?hash=98229118b13f3ff1571c1f6f6322c5d81f6651b0');
require('../../pages/orderList/orderList?hash=7964978c4d753d29be1c1fb425715550bed13f8d');
require('../../pages/choseCity/choseCity?hash=f27416683263a34064a7257429894c70750e794f');
require('../../pages/createCard/createCard?hash=e1672ae00340c21b66e5a95a2537894c8c501175');
require('../../pages/player/player?hash=e1c32d2e3f61963a835e20c9d55e18937f0a40b7');
require('../../pages/calendar/calendar?hash=cb339e7dcb95e1db9d386cbe59fb5bf12ff30d8f');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}