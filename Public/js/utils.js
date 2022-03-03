function hideElements(elements) {
    for (const elementId of elements) {
        let el = document.getElementById(elementId);
        el.classList.add("hidden");
    }
}

function showElements(elements) {
    for (const elementId of elements) {
        let elem = document.getElementById(elementId);
        elem.classList.remove("hidden");
    }
}

function getValueOf(elementId) {
    return document.getElementById(elementId).value;
}