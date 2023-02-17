function getHostName(url) {
    const newURL = new URL(url);
    return newURL.host;
}

function PerformanceFunctionToBeInjected() {
    const entriess = performance.getEntries();
    let totalTransferSize = 0;

    for (const entry of entriess) {
        if (entry.transferSize > 0) {
            totalTransferSize += entry.transferSize;
        }
    }

    console.log(`Total transfer size: ${totalTransferSize} bytes`);

    const entries = performance.getEntriesByType("resource");
    let totalResourcesSize = 0;

    for (const entry of entries) {
        if (entry.encodedBodySize > 0) {
            totalResourcesSize += (entry.transferSize + entry.decodedBodySize);
        }
    }

    console.log(`Total resources size: ${totalResourcesSize} bytes`);
    let totalCarbonemissions = ((totalResourcesSize + totalTransferSize) * 0.81 * 0.75 * 442) / 1000000000;
    console.log(`Total carbon emissions per visit : ${totalCarbonemissions} grams`);

    chrome.runtime.sendMessage({ message: 'emmission-calculated', emmission: totalCarbonemissions });
}

async function sendPostRequest(emmission, url, numRetries) {
    try {
        const res = await fetch('http://localhost:3001/api', {
            method: 'POST',
            body: JSON.stringify({
                emmission: emmission,
                url: url

            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        });
        console.log(res);

    } catch (error) {
        if (numRetries === 0) {
            console.log(error);
            return;
        }
        sendPostRequest(emmission, url, numRetries - 1);
    }
    return;
}
function getTabId(tabId) {
    return JSON.stringify(tabId);
}
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.message === 'emmission-calculated') {
        const url = new URL(sender.tab.url);
        console.log(url.host);
        console.log(`Emmission value calculated in ${sender.tab.id} to be ${message.emmission}`);
        console.log(`URL for the website is ${url.host}`);
        sendPostRequest(message.emmission, url.host, 3);

        async function getPreviousEmmission() {
            const ge = await chrome.storage.session.get(url.host);
            let value = await ge[url.host];
            console.log(`Value: ${value}`);
            if (value === undefined) value = 0;

            const previousEmmission = Number(value);
            console.log(`previous emmission is ${previousEmmission}`);
            console.log(`Current Emmision is ${message.emmission}`);
            const newEmmission = previousEmmission + Number(message.emmission);
            console.log(`New emmission is ${newEmmission}`)
            chrome.storage.session.set({ [url.host]: newEmmission });
            sendResponse('Emmission Calculation Done')
        }
        getPreviousEmmission();


    }

    else if (message.message === 'change-tab-status') {

        (async () => {
            const tabStatus = await chrome.storage.session.get(JSON.stringify(sender.tab.id));
            console.log(`Previous tab status: ${tabStatus}`);
            chrome.storage.session.set({ [getTabId(sender.tab.id)]: 3 - tabStatus[getTabId(sender.tab.id)] });
            console.log(`New Tab Status : ${3 - tabStatus[getTabId(sender.tab.id)]}`);

        })();
        sendResponse('Changed tab status')
    }

})
chrome.tabs.onUpdated.addListener((tabId, changeMessage, tab) => {
    if (tab.url !== undefined && changeMessage.status === "complete") {
        chrome.scripting.executeScript(
            {
                target: { tabId: tabId },
                func: PerformanceFunctionToBeInjected
            });
        (async () => {
            chrome.storage.session.remove(getTabId(tab.id));


        })();

    }
});




chrome.action.onClicked.addListener((tab) => {

    console.log("clicked");
    let isGoGreenInjected = false;
    (async () => {

        const injectedStatus = await chrome.storage.session.get([JSON.stringify(tab.id)]);
        if (injectedStatus[JSON.stringify(tab.id)] === undefined) isGoGreenInjected = false;
        else isGoGreenInjected = true;

    })().then(() => {
        if (isGoGreenInjected === true) {
            console.log(`Already Injected for this tab`);
            return;
        }
        chrome.storage.session.set({ [getTabId(tab.id)]: 1 });
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['popup.js']
        });

    }).then(() => {
        (async () => {

            let tabStatus = await chrome.storage.session.get(getTabId(tab.id));
            if (tabStatus[getTabId(tab.id)] === 1) {
                const host = getHostName(tab.url);
                const ge = await chrome.storage.session.get(host);
                let emmission = ge[host];
                if (emmission === undefined) emmission = 0;
                const response = await chrome.tabs.sendMessage(tab.id, {
                    message: 'show-extension-frontend',
                    url: getHostName(tab.url),
                    emmission: Number(emmission)
                })


                const tabStatus = await chrome.storage.session.get(JSON.stringify(tab.id));
                console.log(`Previous tab status: ${tabStatus}`);
                chrome.storage.session.set({ [getTabId(tab.id)]: 3 - tabStatus[getTabId(tab.id)] });
                console.log(`New Tab Status : ${3 - tabStatus[getTabId(tab.id)]}`);



            }

        })()

    })





});



//console.log(response);
