
const terminalForm = document.getElementById("terminal-form");
const terminalInput = document.getElementById("terminal-input");
const terminalOutput = document.getElementById("terminal-output")


const terminal = document.getElementById("terminal");

// Focus the input when clicking inside the terminal
terminal.addEventListener("click", function (event) {
    // Allow users to select text without interrupting
    // their selection
    if (window.getSelection().toString().length > 0) {
        return;
    }

    terminalInput.focus();
});


const commands = {
    help: `Available commands:
help       - Show available commands
whoami     - About me
skills     - Technical skills
projects   - List my projects
date       - Display the current date
clear      - Clear the terminal`,

    whoami: `IT Enthusiast
Linux | Networking | Cybersecurity
Homelab Builder & Automation Enthusiast`,

    skills: `Linux Administration
Windows Administration
Networking & Security
PowerShell & Bash
Docker & Git
Cloud Computing`,

    projects: `ubuntu-server/
casaos-monitor/
powershell-automation/
github-backups/`
};

function printOutput(text, className = "output") {
    const line = document.createElement("p");
    line.className = className;
    line.textContent = text;

    terminalOutput.appendChild(line);

    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

terminalForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const command = terminalInput.value.trim().toLowerCase();

    if (!command) {
        return;
    }


    const commandLine = document.createElement("p");
    commandLine.className = "command-line";

    const promptUser = document.createElement("span");
    promptUser.className = "prompt-user";
    promptUser.textContent = "visitor@portfolio";

    const promptPath = document.createElement("span");
    promptPath.className = "prompt-path";
    promptPath.textContent = "~";

    const commandText = document.createElement("span");
    commandText.textContent = " $ " + command;

    commandLine.append(
        promptUser,
        document.createTextNode(":"),
        promptPath,
        commandText
    );

    terminalOutput.appendChild(commandLine);

    // Keep the newest command visible
    terminalOutput.scrollTop = terminalOutput.scrollHeight;


    if (command === "clear") {
        terminalOutput.replaceChildren();
    } else if (command === "date") {
        printOutput(new Date().toLocaleString());
    } else if (Object.hasOwn(commands, command)) {
        printOutput(commands[command]);
    } else {
        printOutput(
            "Command not found: " + command +
            ". Type 'help' for available commands."
        );
    }

    terminalInput.value = "";
});
