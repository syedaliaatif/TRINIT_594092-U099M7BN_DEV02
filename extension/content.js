// 1. Send the background a message requesting the user's data
const user = { username: 'demo-user' };
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // 2. A page requested user data, respond with a copy of `user`
    if (message === 'get-user-data') {
        sendResponse(user);
        console.log(sender);
    }
    //return true;

});
// function getEmmission() {
//     let entries = performance.getEntriesByType('resource');
//     let totalEmmission = 0;
//     entries.forEach((entry) => {
//         let transferSize = 0;
//         let decodedBodySize = 0;
//         if (entry.decodedBodySize) decodedBodySize = entry.decodedBodySize;
//         if (entry.transferSize) transferSize = entry.transferSize;

//         const totalSize = transferSize + decodedBodySize;
//         const emmission = (totalSize * 0.81 * 0.75 * 442) / 1e9
//         totalEmmission += emmission;
//     })

//     return totalEmmission;
// }

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     // 2. A page requested user data, respond with a copy of `user`
//     if (message == 'TTT') {
//         console.log(`Emmission is ${getEmmission()}`)
//         sendResponse('done');
//     }
// });

// // function perfObserver(list, observer) {

// //     list.getEntries().forEach((entry) => {
// //         console.log(entry);
// //         let transferSize = 0;
// //         let decodedBodySize = 0;
// //         if (entry.decodedBodySize) decodedBodySize = entry.decodedBodySize;
// //         if (entry.transferSize) transferSize = entry.transferSize;

// //         const totalSize = transferSize + decodedBodySize;
// //         const emmission = (totalSize * 0.81 * 0.75 * 442) / 1e9
// //         totalEmmission += emmission;
// //         console.log(emmission, entry.name, entry.transferSize, entry.decodedBodySize);

// //     });
// //     console.log(totalEmmission);
// // }
// // const observer = new PerformanceObserver(perfObserver);
// // observer.observe({ entryTypes: ['resource', 'measure'] });
// // chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
// //     try {
// //         console.log(message);
// //         if (message.message === 'show-url-data') {
// //             let e = document.createElement('div');
// //             e.id = 'myRoot';
// //             e.innerHTML = `This website has ${message.url}  and the transfer size ${message.value} is `;
// //             let s = document.createElement('style');
// //             s.innerHTML = `#myRoot{
// //                 position:fixed;
// //                 left:0;
// //                 top:0;
// //                 z-index:2147483647 ;
// //                 height:100vh;
// //                 width:100%;
// //                 background-color:blue;
// //                 color:white;
// //             }`
// //             document.head.appendChild(s);
// //             document.body.appendChild(e);
// //         }
// //         sendResponse("done");
// //     }
// //     catch (error) {
// //         console.log(error);
// //     }
// // });

// // let e = document.createElement('div');
// // e.id = 'myRoot';
// // e.innerHTML = `This website has  and the transfer size is `;
// // let s = document.createElement('style');
// // s.innerHTML = `#myRoot{
// //                 position:fixed;
// //                 left:0;
// //                 top:0;
// //                 z-index:2147483647 ;
// //                 height:100vh;
// //                 width:100%;
// //                 background-color:blue;
// //                 color:white;
// //             }`
// // document.head.appendChild(s);
// // document.body.appendChild(e);
