const {app, BrowserWindow, shell} = require('electron')
const fs = require('fs')
const path = require('path')
let mainWindow


function updateBadge(title) {
	if (title.indexOf('Messenger') === -1) return
	const messageCount = (/\(([0-9]+)\)/).exec(title)
	app.dock.setBadge(messageCount ? messageCount[1] : '')
}


function createWindow () {
  mainWindow = new BrowserWindow({
    'title': app.getName(),
    width: 900,
    height: 700,
    webPreferences: {
      nodeIntegration: false,
      'web-security': false,
      preload: path.join(__dirname, 'renderer.js'),
      'plugins': true
    }
  })
  mainWindow.loadURL('https://www.messenger.com/login/')
  // Open the DevTools.
  mainWindow.webContents.openDevTools()


  mainWindow.on('closed', () => mainWindow = null)
  mainWindow.on('page-title-updated', (e, title) => {
    e.preventDefault()
    updateBadge(title)
  })
  return mainWindow
}

// app.on('ready', createWindow)

app.on('ready', () => {
  const main = createWindow()
  const page = main.webContents
  page.on('dom-ready', () => {
    page.insertCSS(fs.readFileSync(path.join(__dirname, 'dark.css'), 'utf8'))
    main.show()
  })
  page.on('new-window', (e, url) => {
    e.preventDefault()
    shell.openExternal(url)
  })
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
	mainWindow.show()
});
