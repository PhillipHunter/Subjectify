import "../css/options.css";

document.getElementById("save").addEventListener("click", save);

function save() {
    var term = document.getElementById("append_term").value;
    var enabled = document.getElementById("redirect_enabled").checked;

    chrome.storage.sync.set({
        appendTerm: term,
        redirectEnabled: enabled
    }, displaySavedMessage);
}

function displaySavedMessage() {
    var status = document.getElementById("status");
    status.textContent = "Settings saved.";

    setTimeout(function () {
        status.textContent = "";
    }, 2000);
}

document.addEventListener("DOMContentLoaded", load);

function load() {
    chrome.storage.sync.get({
        appendTerm: "",
        redirectEnabled: false
    }, function(storage) {
        document.getElementById("append_term").value = storage.appendTerm;
        document.getElementById("redirect_enabled").checked = storage.redirectEnabled;
    });
}
