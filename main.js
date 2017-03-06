/*
 This file is the main thread for electron
 */

const {app, BrowserWindow} = require('electron')
const path                 = require('path')
const url                  = require('url')
const config               = require('./src/app/app.config.json')

/**
 * mainApplicationWindow is the parent of the application
 * splashWindow is the child of the above
 */
let mainApplicationWindow
let splashWindow


//initiates the windows
function createWindow () {
  // Create the browser window.
  mainApplicationWindow = new BrowserWindow({
    width: config.mainApplication.width,
    height: config.mainApplication.height,
    fullscreenable: config.mainApplication.isFullscreenable,
    title: config.mainApplication.name,
    show: false
  })
  
  splashWindow          = new BrowserWindow({
    parent: mainApplicationWindow,
    width: config.splash.width,
    height: config.splash.height,
    frame: config.splash.isBorder,
    modal: true,
    show: false
  })
  
  // and load the index.html of the app.
  splashWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'public/index.html'),
    protocol: 'file:',
    slashes: true
  }))
  
  // Open the DevTools.
  //splash.webContents.openDevTools()
  
  // Emitted when the window is closed.
  mainApplicationWindow.on('closed', () => {
    mainApplicationWindow = null
  })
  
  splashWindow.on('closed', () => {
    splashWindow = null
  })
  
  splashWindow.once('ready-to-show', () => {
    splashWindow.show()
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
  if (mainApplicationWindow === null) {
    createWindow()
  }
})
