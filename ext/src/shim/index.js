"use strict";

import cast  from "./cast";
import media from "./media";

import { onMessage, sendMessage } from "./messageBridge";


if (!window.chrome) {
	window.chrome = {};
}

window.chrome.cast = cast;
window.chrome.cast.media = media;


onMessage(message => {
    switch (message.subject) {
        case "shim:initialized": {
            const bridgeInfo = message.data;

            // Call page's API loaded function if defined
            const readyFunction = window.__onGCastApiAvailable;
            if (readyFunction && typeof readyFunction === "function") {
                readyFunction(bridgeInfo && bridgeInfo.isVersionCompatible);
            }
            break;
        };
    }
});

// Trigger bridge mDNS discovery
sendMessage({
    subject: "main:initialize"
});
