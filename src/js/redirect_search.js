console.log("Subjectify - New Google search page loaded.");

chrome.storage.sync.get({
    appendTerm: "",
    redirectEnabled: false
}, runAppend);

function runAppend(storage) {
    var appendTerm = storage.appendTerm;
    var redirectEnabled = storage.redirectEnabled;

    var currURL = new URL(window.location.href);
    var currQuery = currURL.searchParams.get("q");

    if((!currQuery.includes(appendTerm)) && (appendTerm.trim() != "") && redirectEnabled) {
        console.log(`Subjectify - Appending term ${appendTerm} to search and redirecting.`);
        currURL.searchParams.set("q", currQuery + " " + appendTerm);

        console.log(currURL.href);

        window.location.replace(currURL.href);
    } else {
        if((appendTerm.trim() == "")) {
            console.log("Subjectify - Append term is empty. Not redirecting.");
        } else if(!redirectEnabled) {
            console.log("Subjectify - Redirect disabled. Not redirecting.");
        } else {
            console.log(`Subjectify - Append term ${appendTerm} already appended. Not redirecting.`);
        }
    }
}
