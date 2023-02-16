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

function ShowFrontendFunctionToBeInjected() {
    console.log('Frontend Func Injected');
    const state = false;
    function ShowExtensionFrontend(url, emmission) {
        try {
            let e = document.createElement('div');
            e.id = 'myRoot';
            e.innerHTML = `This website is ${url} has ${emmission} `;
            let s = document.createElement('style');
            s.innerHTML = `#myRoot{
                position:fixed;
                left:0;
                top:0;
                z-index:2147483647 !important;
                height:100vh;
                width:30%;
                background-color:blue;
                color:white;
            }`
            document.head.appendChild(s);
            document.body.appendChild(e);
        } catch (error) {
            console.log(error);
        }
    }
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.message === 'show-extension-frontend') {
            ShowExtensionFrontend(message.url, message.emmission);
            console.log(message);
        }
        return true;

    });
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
        }
        getPreviousEmmission();

    }
    else if (message === 'hello') {
        console.log("Working");
    }

})
chrome.tabs.onUpdated.addListener((tabId, changeMessage, tab) => {
    if (tab.url !== undefined && changeMessage.status === "complete") {
        chrome.scripting.executeScript(
            {
                target: { tabId: tabId },
                func: PerformanceFunctionToBeInjected
            }
        )
    }
});
chrome.action.onClicked.addListener((tab) => {

    console.log("clicked");
    if (true) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: ShowFrontendFunctionToBeInjected
        });
        (async () => {
            const host = getHostName(tab.url);
            const ge = await chrome.storage.session.get(host);
            let emmission = ge[host];
            if (emmission === undefined) emmission = 0;
            chrome.tabs.sendMessage(tab.id, {
                message: 'show-extension-frontend',
                url: getHostName(tab.url),
                emmission: Number(emmission)
            })
        })();

    }

});



//console.log(response);
