/* eslint-disable no-unused-vars */
import "../css/options.css";
import {MDCRipple} from "@material/ripple";
import {MDCTextField} from "@material/textfield";
import {MDCFormField} from "@material/form-field";
import {MDCCheckbox} from "@material/checkbox";
import { MDCLinearProgress } from "@material/linear-progress";

const buttonRipple = new MDCRipple(document.querySelector(".mdc-button"));
const textField = new MDCTextField(document.querySelector(".mdc-text-field"));
const checkbox = new MDCCheckbox(document.querySelector(".mdc-checkbox"));
const formField = new MDCFormField(document.querySelector(".mdc-form-field"));
formField.input = checkbox;
const linearProgress = new MDCLinearProgress(document.querySelector(".mdc-linear-progress"));

document.addEventListener("DOMContentLoaded", load);
function load() {
    linearProgress.close();
    hideSave();
    chrome.storage.sync.get({
        appendTerm: "",
        redirectEnabled: false
    }, function(storage) {
        document.getElementById("subject-input").value = storage.appendTerm;
        document.getElementById("redirect-checkbox").checked = storage.redirectEnabled;
    });
}

document.getElementById("save-button").addEventListener("click", save);
function save() {
    var term = document.getElementById("subject-input").value;
    var enabled = document.getElementById("redirect-checkbox").checked;

    chrome.storage.sync.set({
        appendTerm: term,
        redirectEnabled: enabled
    }, postSave);
}

function postSave() {
    linearProgress.determinate = false;
    linearProgress.open();

    setTimeout(function () {
        linearProgress.close();
        hideSave();
    }, 400);
}

document.getElementById("subject-input").addEventListener("input", showSave);
document.getElementById("redirect-checkbox").addEventListener("change", showSave);

function showSave() {
    document.getElementById("save-button").style.visibility = "visible";
}

function hideSave() {
    document.getElementById("save-button").style.visibility = "hidden";
}
