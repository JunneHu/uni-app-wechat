if(!self.__appxInited) {
self.__appxInited = 1;


require('./config$');


      function getUserAgentInPlatformWeb() {
        return typeof navigator !== 'undefined' ? navigator.swuserAgent || navigator.userAgent || '' : '';
      }
      if(getUserAgentInPlatformWeb() && (getUserAgentInPlatformWeb().indexOf('LyraVM') > 0 || getUserAgentInPlatformWeb().indexOf('AlipayIDE') > 0) ) {
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
require('../../components/wfalls-flow/wfalls-flow?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../components/imt-audio/imt-audio?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../components/my-share/my-share?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../components/c-calendar/c-calendar?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../pages/list/list?hash=af98a06c2154f7ed5794c6894fdf5f4151b63d7f');
require('../../pages/player/player?hash=e1c32d2e3f61963a835e20c9d55e18937f0a40b7');
require('../../pages/index/index?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/createCard/createCard?hash=e1672ae00340c21b66e5a95a2537894c8c501175');
require('../../pages/calendar/calendar?hash=cb339e7dcb95e1db9d386cbe59fb5bf12ff30d8f');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}