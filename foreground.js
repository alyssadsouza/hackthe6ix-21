console.log("foreground injected");

// check to see foreground js is working

chrome.runtime.sendMessage({
    message: "foreground_init"
}, response => {
    console.log(response.message)
});