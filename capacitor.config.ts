import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  // appId: 'io.ionic.starter',
  appId: 'com.visual.app',
  appName: 'Visual',
  webDir: 'www',
  plugins: {
    "SplashScreen": {
      "launchShowDuration": 2000,
      //"AutoHideSplashScreen": true,
      //"launchAutoHide": false,
      //"launchFadeOutDuration": 2000,
      // "backgroundColor": "#ffffffff",
      "backgroundColor": "#de0f17",
      // "androidSplashResourceName": "splash",
      // "androidScaleType": "CENTER_CROP",
      // "showSpinner": true,
      "showSpinner": false,
      // "androidSpinnerStyle": "large",
      "androidSpinnerStyle": "small",
      "iosSpinnerStyle": "small",
      // "spinnerColor": "#999999",
      "splashFullScreen": true,
      "splashImmersive": true,
      // "layoutName": "launch_screen",
      // "useDialog": true
    },
  },
};
export default config;
