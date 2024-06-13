/*global chrome*/
let tabIdToUrl = new Map();

chrome.runtime.onInstalled.addListener(({reason}) => {
    if (reason === 'install') {
        chrome.tabs.create({
            url: "./index.html"
        });
    }
});

chrome.tabs.onCreated.addListener(function(tab) {
    if (tab.url) {
        tabIdToUrl.set(tab.id, tab.url);
    }
});

chrome.tabs.onUpdated.addListener(function(tabid, updatedInfo, tab) {
    if (tab.url) {
        tabIdToUrl.set(tabid, tab.url);
    }
});

chrome.tabs.onRemoved.addListener(async function(tabid, removedInfo) {
    let closedTabUrl = tabIdToUrl.get(tabid);
    if (!closedTabUrl) {
        return;
    }
    tabIdToUrl.delete(tabid);
    let rules = (await chrome.storage.local.get("rules")).rules ?? {};
    let maybeMatchingRule = getMatchingRuleOrNull(rules, closedTabUrl.toLowerCase());
    if (!maybeMatchingRule) {
        return;
    }
    maybeMatchingRule.lastClosed = Date.now();
    await chrome.storage.local.set({"rules": rules});
});

function getMatchingRuleOrNull(rules, url) {
    for (let site in rules) {
        if (url.includes(site)) {
            return rules[site];
        }
    }
    return null;
}