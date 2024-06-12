/*global chrome*/
import { useEffect, useState } from 'react';

function App() {
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
        newRules[domain] = cooldown;
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
                    Object.entries(rules).map(([site, cd]) => <li key={site}> {site}: {cd} minute(s)
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

export default App;
