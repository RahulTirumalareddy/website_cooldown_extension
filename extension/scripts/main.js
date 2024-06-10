/*global chrome*/
let url = window.location.href;

(async function main() {
    if (await shouldBlock(url)) {
        let root = document.querySelector("html");
        if (root) {
            root.innerHTML = getReplacementPage();
        }
    }
})();


async function shouldBlock(url) {
    let rules = (await chrome.storage.local.get("rules")).rules ?? [];
    alert(`rules are ${JSON.stringify(rules)}`);
    let matchedWebsite = null;
    for (let rule in rules) {
        let site = rule.site;
        if (site && site.length && url.includes(site)) {
            matchedWebsite = site;
        }
    }
    if (matchedWebsite == null) {
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