chrome.runtime.onInstalled.addListener(() => {
    // default state goes here
    // this runs ONE TIME ONLY (unless the user reinstalls your extension)
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

    // Inject foreground script into active tab on loading
    if (changeInfo.status === 'complete' && /^http/.test(tab.url)) {
        chrome.tabs.executeScript(null, { 
            file: './foreground.js' 
        }, () => console.log('i injected'))
    }
});

// Receiving messages from front end js files

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request);

    // When it's a fact check process the fact and decide if it's reliable or not
    if (request.message === 'fact check') {

        console.log(request.fact);

        // Send the fact to the python function to the cloud link, return its claim and sources etc etc

        fetch("https://northamerica-northeast1-fact-checker-369.cloudfunctions.net/memes_dreams")
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })

        sendResponse({message: "success"});

        return true;
    }
});

