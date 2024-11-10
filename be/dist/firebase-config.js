"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const app_1 = require("firebase/app");
const auth_1 = require("firebase/auth");
const firebaseConfig = {
    apiKey: 'AIzaSyDCraTEdoU1uNk8xAeftbYSfEs-eiCsD3U',
    authDomain: 'booking-app-1edf4.firebaseapp.com',
    projectId: 'booking-app-1edf4',
    storageBucket: 'booking-app-1edf4.appspot.com',
    messagingSenderId: '319720545675',
    appId: '1:319720545675:web:0643aa0a2da6034082e38e',
    measurementId: 'G-FK4KH759ZB',
};
const app = (0, app_1.initializeApp)(firebaseConfig);
exports.auth = (0, auth_1.getAuth)(app);
//# sourceMappingURL=firebase-config.js.map