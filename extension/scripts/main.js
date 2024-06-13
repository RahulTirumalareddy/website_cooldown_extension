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
    let rules = (await chrome.storage.local.get("rules")).rules ?? {};
    let matchingRule = getMatchingRuleOrNull(rules, url);
    if (!matchingRule) {
        return false;
    }
    return isOnCooldown(matchingRule);
}

function isOnCooldown(rule) {
    let currentTime = Date.now();
    if (!rule.lastClosed) {
        return false;
    }
    let siteLastClosedEpochMillis = rule.lastClosed;
    let cooldownInMillis = parseInt(rule.cooldownPeriod) * 60 * 1000;
    let minValidOpenTime = siteLastClosedEpochMillis + cooldownInMillis;
    return currentTime < minValidOpenTime;
}

function getReplacementPage() {
    return `<h2>This website is currently on cooldown.</h2>
    `
}

function getMatchingRuleOrNull(rules, url) {
    for (let site in rules) {
        if (url.includes(site)) {
            return rules[site];
        }
    }
    return null;
}