/* eslint-disable no-unused-vars */
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

import "../css/options.css";

document.addEventListener("DOMContentLoaded", load);
function load() {
    linearProgress.close();
    hideSave();
    chrome.storage.sync.get({
        appendTerm: "",
        redirectEnabled: false
    }, function(storage) {
        document.getElementById("append_term").value = storage.appendTerm;
        document.getElementById("redirect_enabled").checked = storage.redirectEnabled;
    });
}

document.getElementById("save").addEventListener("click", save);
function save() {
    var term = document.getElementById("append_term").value;
    var enabled = document.getElementById("redirect_enabled").checked;

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

document.getElementById("append_term").addEventListener("input", showSave);
document.getElementById("redirect_enabled").addEventListener("change", showSave);

function showSave() {
    document.getElementById("save").style.visibility = "visible";
    console.log("Show");
}

function hideSave() {
    document.getElementById("save").style.visibility = "hidden";
    console.log("Hide");
}
