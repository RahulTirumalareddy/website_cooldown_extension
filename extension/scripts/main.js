let url = window.location.href;

if (shouldBlock(url)) {
    let root = document.querySelector("html");
    if (root) {
        root.innerHTML = getReplacementPage();
    }
}

function shouldBlock(url) {
    let rules = localStorage.getItem("rules");
    alert(`rules are ${rules}`);
    let matchedWebsite = null;
    for (let rule in rules) {
        if (url.includes(rule.site)) {
            matchedWebsite = rule.site;
        }
    }
    if (!matchedWebsite) {
        return false;
    }
    return isOnCooldown(matchedWebsite);
}

function isOnCooldown(site) {
    return true;
}

function getReplacementPage() {
    return `<h2>This website is currently on cooldown.</h2>
    `
}