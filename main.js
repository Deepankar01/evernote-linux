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

function createWindow () {
  // Create the browser window.
  mainApplicationWindow = new BrowserWindow({
    width: config.width,
    height: config.height,
    fullscreenable: true,
    title: config.name,
    show: false
  })
  splashWindow          = new BrowserWindow({
    parent: mainApplicationWindow,
    frame: config.isBorder,
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
