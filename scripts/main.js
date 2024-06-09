let url = window.location.href;

if (websiteMatches(url)) {
    let root = document.querySelector("html");
    if (root) {
        root.innerHTML = getReplacementPage();
    }
}

function websiteMatches(url) {
    return url.includes("youtube");
}

function getReplacementPage() {
    return `<h2>This website is currently on cooldown.</h2>
    `
}