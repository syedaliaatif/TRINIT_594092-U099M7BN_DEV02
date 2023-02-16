const state = false;
function ShowExtensionFrontend(url, emmission) {
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
}

chrome.runtime.sendMessage('hello');
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.message === 'show-extension-frontend') {
        ShowExtensionFrontend(message.url, message.emmission);
        console.log(message);
    }
    return true;
});
