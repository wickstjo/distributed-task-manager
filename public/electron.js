const { app, BrowserWindow } = require('electron')
const path = require("path");
const isDev = require("electron-is-dev");

// CREATE WINDOW
function createWindow () {

    // WINDOW SETTINGS
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    // LOAD ENVIRONMENT
    win.loadURL(isDev ? "http://localhost:3000" : 'file://' + __dirname + '/index.html')

    // DISABLE MENU
    win.setMenu(null)

    // ENABLE DEVTOOLS WHEN DEVING
    if (isDev) {
        win.webContents.openDevTools()
    }
}

// WHEN READY
app.whenReady().then(createWindow)

// ON CLOSE
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

// WHEN SELECTED
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})