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

  return totalCarbonemissions;
  chrome.runtime.sendMessage({ message: 'emmission-calculated', emmission: totalCarbonemissions });


}

function AddClick() {
  const btn = document.querySelector('.aatif-clsx-btn');
  btn.onclick = async () => {
    window.isGoGreenInjected = false;
    const root = document.querySelector('#aatifRoot');
    root.remove();
    console.log(`Button Clicked`);

  }
}
function doAtInjection(data) {

  const cardBackground = (Number(data.averageEmmission) > 2.5 ? "bg-danger" : "bg-success");
  const averageEmmision = Math.round((data.averageEmmission + Number.EPSILON) * 100) / 100;
  const totalEmmission = Math.round((data.totalEmmission + Number.EPSILON) * 100) / 100;
  const host = data.host;
  const totalHits = data['totalHits'];
  let e = document.createElement('div');
  e.id = 'aatifRoot';
  e.innerHTML = `
    <div class="aatif-chrome-extension">
    <div class="aatif-navbar">
      <ul class="aatif-navbar-ul">
        <li class="aatif-navbrand">
          <a href="#">Go Green</a>
        </li>

        <li >
          <button class="aatif-close-btn aatif-clsx-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="50"
              fill="currentColor"
              class="bi bi-x-lg"
              viewBox="0 0 16 16"
            >
              <path
                d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
              />
            </svg>
          </button>
        </li>
      </ul>
    </div>
    <div class="aatif-card ${cardBackground}">
      <div class="aatif-card-header">
        ${host}
      </div>
      <div class="aatif-card-body">
        <ul>
          <li><b>Total Emmission:</b> ${totalEmmission}</li>
          
          <li><b>Avg Emmission:</b> ${averageEmmision}</li>
          
          <li><b>Total hits: </b> ${totalHits}</li>
        </ul>
      </div>
    </div>
  </div>
        
        `
  /*
  `<nav class="navbar navbar-dark bg-dark">
  <a class="navbar-brand text-light" href="#">Go Green</a>
  <!-- Navbar content -->
  <button type="button" class="btn btn-danger clsx-btn rounded-circle" >
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
  </svg>
  </button>
  </nav>
  
  <div class="container">
  <div class="card ${cardBackground} my-3"  >
  <div class="card-header text-white h5">
      ${host}
  </div>
  <ul class="list-group list-group-flush ${cardBackground}">
      <li class="list-group-item"><b>Total Emmission:</b> ${totalEmmission}</li>
      <li class="list-group-item"><b>Avg Emmission:</b> ${averageEmmision}</li>
      <li class="list-group-item"><b>Total hits: </b> ${totalHits}</li>
  </ul>
  </div>
  </div>
  
  `*/

  document.body.appendChild(e);
  AddClick();
}



function ShowExtensionFrontend(data) {
  doAtInjection(data);
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.message === 'show-extension-frontend') {
    ShowExtensionFrontend(message);
    console.log(message);
    sendResponse('Frontend is being shown');
  }

  else if (message.message === 'get-tab-status') {
    const root = document.querySelector('#aatifRoot');
    console.log(root);
    if (root) {
      sendResponse(true);
    }
    else {
      sendResponse(false);
    }
  }
  else if (message.message === 'get-emmission') {
    const val = PerformanceFunctionToBeInjected();
    console.log(val);
    sendResponse({
      message: 'emmission-calculated',
      emmission: Number(val)
    })
  }
  return true;


});

