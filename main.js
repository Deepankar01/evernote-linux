/*
 This file is the main thread for electron
 */

const {app, BrowserWindow} = require('electron')
const path                 = require('path')
const url                  = require('url')
const config               = require('./src/app/app.config.json')
const _                    = require('lodash')
const fs                   = require('fs')
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
  
  splashWindow = new BrowserWindow({
    parent: mainApplicationWindow,
    width: config.splash.width,
    height: config.splash.height,
    frame: config.splash.isBorder,
    modal: true,
    show: false
  })
  
  splashWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'public/splash.html'),
    protocol: 'file',
    slashes: true
  }))
  // and load the index.html of the app.
  mainApplicationWindow.loadURL(url.format({
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
  
  mainApplicationWindow.once('ready-to-show', () => {
    let credentialLocation = url.format({
      pathname: path.join(app.getPath('userData'), config.credentials.location),
      protocol: 'file',
      slashes: true
    })
    if (fs.existsSync(credentialLocation)) {
      //then load the credentials
      let credentials = fs.readFileSync(credentialLocation)
      console.log('we have credentials')
    }
    else {
      console.log('We don\'t have credentials')
      
      splashWindow.show()
      
    }
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
