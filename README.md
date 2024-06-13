# Setup
0. (Optional) Use `yarn build` to compile the React app and move the necessary files into the `extension` folder.
1. Navigate to `chrome://extensions` -> "Load unpacked" -> choose the `extension` folder.
# Example Usage
To add a 30 minute cooldown to Youtube, for example, one would create a new rule with domain `youtube` and cooldown value `30`. This creates a rule that enforces that anytime a Youtube tab is closed, the user must wait at least 30 minutes before opening Youtube again.