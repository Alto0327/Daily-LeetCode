const { app, BrowserWindow } = require('electron')
const fs = require('fs')

const leetCodeQuestion = fs.readFileSync('LeetcodeData.json')
const data = JSON.parse(leetCodeQuestion)

const createWindow = () => {
    win = new BrowserWindow({
      width: 1200,
      height: 800,
      webPreferences: {
        nodeIntegration: false,  
        contextIsolation: true,  
      }
    });
  
    win.loadURL(randomLeetCode());
  
   win.setFullScreen(true)
  }


  function randomLeetCode(){
    const randomQuestion = data[Math.floor(Math.random()*data.length)].link
    return `${randomQuestion}`
  }

app.whenReady().then(() => {
  createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })