/*global chrome*/
import { useEffect, useState } from 'react';

function App() {
    // Object where key is site, value is Rule
    const [rules, setRules] = useState({});

    useEffect(() => {
        (async () => {
            let loadedRules = (await chrome.storage.local.get("rules")).rules ?? {};
            setRules(loadedRules);
        })();
    }, []);

    async function addRule(event) {
        event.preventDefault();
        let form = document.getElementById("new_rule_form");
        let domain = form.new_rule_domain.value;
        let cooldown = parseInt(form.new_rule_cooldown.value);
        let newRules = {...rules}
        newRules[domain] = new Rule(domain, cooldown);
        setRules(newRules);
        await chrome.storage.local.set({"rules": newRules});
        form.reset();
    }

    async function deleteRule(site) {
        let newRules = {...rules};
        delete newRules[site];
        setRules(newRules);
        await chrome.storage.local.set({"rules": newRules});
    }

    return (
        <div>
            <h1>Website Cooldown Settings</h1>
            <h2>Current rules</h2>
            <ul>
                {
                    Object.entries(rules).map(([site, v]) => <li key={site}> {site}: {v.cooldownPeriod} minute(s)
                        <button onClick={() => deleteRule(site)}>Delete?</button> </li>)
                }
            </ul>
            <h2>Create new rule</h2>
            <span>
                <form id="new_rule_form" onSubmit={addRule}>
                    <input type="text" name="new_rule_domain" placeholder="Domain" required={true}></input>
                    <input type="number" min="1" name="new_rule_cooldown" placeholder="Cooldown (minutes)" required={true}></input>
                    <input type="submit" value="Create rule"></input>
                </form>
            </span>
        </div>
    );
}

class Rule {
    constructor(site, cooldownPeriod) {
        // Ex: "youtube"
        this.site = site;
        // Ex: 60 (minutes)
        this.cooldownPeriod = cooldownPeriod;
        // Ex: 1718250562434 (Epoch millis)
        this.lastClosed = null;
    }
}

export default App;
