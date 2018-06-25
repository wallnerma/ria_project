
# How to get the project running

- First of all, check if and which version of node.js you have installed:
    CLI where node
        node --version
    If your version is below v7.6 (e.g. v6.11.3) you need to update it.Follow the steps below *** START: update node version - on Windows ***. 
- install npm-package sqlite3: 
    type "npm install node-gyp -g node-gyp" and afterwards "npm install sqlite3" into your CLI     
- change to the directory into which you want to put the project via the CLI, clone the source code & step into the directory: 
    "cd yourDirectoryPath"
    "git clone https://github.com/wallnerma/ria_project"
    "cd ria_project"
    "node server.js"
- if you receive the following msg, you're up and running: "Making le voodoo on port 8081! Go and check it out!"


# START: update node version - on Windows
## STEP 1: uninstall old versions of node / npm **
    https://stackoverflow.com/questions/20711240/how-to-completely-remove-node-js-from-windows
 - Uninstall from Programs & Features with the uninstaller.
 - Reboot (or you probably can get away with killing all node-related processes from Task Manager).
 - Look for these folders and remove them (and their contents) if any still exist. Depending on the version you installed, UAC settings, and CPU architecture, these may or may not exist:
    C:\Program Files (x86)\Nodejs
    C:\Program Files\Nodejs
    C:\Users\{User}\AppData\Roaming\npm (or %appdata%\npm)
    C:\Users\{User}\AppData\Roaming\npm-cache (or %appdata%\npm-cache)
    C:\Users\{User}\.npmrc (and possibly check for that without the . prefix too)
    C:\Users\{User}\AppData\Local\Temp\npm-*
 - Check your %PATH% environment variable to ensure no references to Nodejs or npm exist.
 - If it's still not uninstalled, type where node at the command prompt and you'll see where it resides -- delete that (and probably the parent directory) too.
 - Reboot, for good measure.
## STEP 2: install nvm
    https://github.com/coreybutler/nvm-windows/releases
 - download the latest nvm-setup.zip
 - unzip and run it, follow the setup wizard
 - start a new CLI and type "nvm" to check if its properly installed, you should get the running version and usage information. 
## STEP 3: install node & npm 
 - type "nvm install latest" into your CLI and restart it
 - "nvm arch" shows if node is running in 32 or 64 bit mode, "nvm list" lists the node.js installations.
 - type "nvm use yourVersionNumber", you should receive something like this: 'Now using node v10.5.0 (64-bit)'
 - check again "node --version" and go on with the installation of our project 
 ### END: update node version - on Windows
