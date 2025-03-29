const { app, BrowserWindow } = require('electron')
const fs = require('fs')
const path = require('path')

let data;

function readDataFile() {
    let filePath;
    if (app.isPackaged) {
        // If the app is packaged, use the path inside the app's resources
        filePath = path.join(process.resourcesPath, 'LeetcodeData.json');
    } else {
        // If running from source, assume the file is in the current directory
        filePath = path.join(__dirname, 'LeetcodeData.json');
    }

    try {
        const leetCodeQuestion = fs.readFileSync(filePath, 'utf8');
        if (!leetCodeQuestion) {
            console.error('LeetcodeData.json is empty.');
            app.quit();  // Exit the app if the file is empty
        }
        data = JSON.parse(leetCodeQuestion);
    } catch (error) {
        console.error('Error reading or parsing LeetcodeData.json:', error);
        app.quit();  // Quit the app if there's a critical error
    }
}

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
        }
    });

    win.loadURL(randomLeetCode());

    win.setFullScreen(true);
}

function randomLeetCode() {
    const randomQuestion = data[Math.floor(Math.random() * data.length)].link;
    return `${randomQuestion}`;
}

app.whenReady().then(() => {
    readDataFile();
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
