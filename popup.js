document.addEventListener("DOMContentLoaded", () => {

    // When ready, return the text that's selected on the tab
    function getSelectedText() {
        var text = "";
        if (typeof window.getSelection != "undefined") {
            text = window.getSelection().toString();
        } else if (typeof document.selection != "undefined" && document.selection.type == "Text") {
            text = document.selection.createRange().text;
        }
        console.log(text);
        return text;
    }
    
    // Send the selected text to the back end fact checker
    function checkFact() {
        var selectedText = getSelectedText();
        console.log(selectedText);
    
        chrome.runtime.sendMessage({
            message: "fact check",
            fact: selectedText
        }, response => {
            console.log(response.message)
        });
        
    }

    var checkFact = document.querySelector("#checkFact");
    var fact = document.getElementById("fact");

    // When the "Let's Go" button is pressed, send fact in input bar to back end
    checkFact.addEventListener("click", () => {
        
        chrome.runtime.sendMessage({
            message: "fact check",
            fact: fact.value
        })
        
    })
    
    document.getElementById("check_fact").addEventListener("click", () => {
        checkFact();
    })


})