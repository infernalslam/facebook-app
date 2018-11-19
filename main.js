const {app, BrowserWindow} = require('electron')
let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    'title': app.getName(),
    width: 900,
    height: 700,
    webPreferences: {
      nodeIntegration: false,
      'web-security': false,
      'plugins': true
    }
  })
  mainWindow.loadURL('https://www.messenger.com/login/')
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()


  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
