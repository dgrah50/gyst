import { checkIfCurrentPageIsBlocked } from "./timetracker";

// Run checkIfBlocked on page load
checkIfCurrentPageIsBlocked();

// Check if the webpage should be blocked again if the user focuses on the tab
window.addEventListener('focus', checkIfCurrentPageIsBlocked);
