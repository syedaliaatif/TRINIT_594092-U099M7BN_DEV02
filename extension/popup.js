

function AddClick() {
    const btn = document.querySelector('.close-btn');
    btn.onclick = async () => {
        window.isGoGreenInjected = false;
        const root = document.querySelector('#aatifRoot');
        root.remove();
        const res = await chrome.runtime.sendMessage({
            message: 'change-tab-status'
        });
    }
}
function doAtInjection(host, emmission) {

    const cardBackground = (Number(emmission) > 2.5 ? "bg-danger" : "bg-success");
    emmission = Math.round((emmission + Number.EPSILON) * 100) / 100
    let e = document.createElement('div');
    e.id = 'aatifRoot';
    e.innerHTML = `
        
        <nav class="navbar navbar-dark bg-dark">
        <a class="navbar-brand text-light" href="#">Go Green</a>
        <!-- Navbar content -->
        <button type="button" class="btn btn-danger close-btn rounded-circle" >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
        </svg>
        </button>
        </nav>
        <div class="card my-3 mx-1 ${cardBackground} text-wrap text-white" style="width: 18rem;">
        <div class="card-body my-2">
            <h5 class="card-title">${host}</h5>
            <hr/>
            <br/>
            <p class="card-text">CO-2 Emmission for the host is ${emmission} grams for the current browsing session.</p>
        </div>
        </div> 
        `

    document.body.appendChild(e);
    AddClick();
}



function ShowExtensionFrontend(url, emmission) {
    doAtInjection(url, emmission);
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.message === 'show-extension-frontend') {
        console.log(window.isGoGreenInjected);
        ShowExtensionFrontend(message.url, message.emmission);
        sendResponse(window.isGoGreenInjected);
        console.log(message);
    }
    return true;

});