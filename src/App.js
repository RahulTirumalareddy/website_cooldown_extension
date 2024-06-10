import { useState } from 'react';

function App() {
    const [rules, setRules] = useState(JSON.parse(localStorage.getItem("rules")) ?? []);
    
    function addRule(event) {
        event.preventDefault();
        let form = document.getElementById("new_rule_form");
        let domain = form.new_rule_domain.value;
        let cooldown = parseInt(form.new_rule_cooldown.value);
        let newRules = [...rules, new Rule(domain, cooldown)];
        setRules(newRules);
        localStorage.setItem("rules", JSON.stringify(newRules));
        form.reset();
    }
    for (let rule in localStorage.getItem("rules")) {
        console.log(`rule domain ${rule.site}, cooldown ${rule.cooldownPeriod}`);
    }
    return (
        <div>
            <h1>Website Cooldown Settings</h1>
            <h2>Current rules</h2>
            <ul>
                {
                    rules.map(rule => <li key={rule.site}> {rule.site}: {rule.cooldownPeriod} minute(s) </li>)
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
        // domain (ex: "youtube")
        this.site = site;
        // minutes (ex: 10)
        this.cooldownPeriod = cooldownPeriod;
      }
}

export default App;
