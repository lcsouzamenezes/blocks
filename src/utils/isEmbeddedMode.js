// Derived from: https://stackoverflow.com/questions/326069/how-to-identify-if-a-webpage-is-being-loaded-inside-an-iframe-or-directly-into-t

let embedded = true;
try {
    embedded = window.self !== window.top;
}
catch(e) {
}

export default function isEmbeddedMode() {
    return embedded;
}
