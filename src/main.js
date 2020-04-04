
const {app, BrowserWindow, Menu} = require('electron')
const path = require('path')

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 830,
    height: 440,
    icon: __dirname + '/res/logo.ico'
    //resizable: false 
  })
  mainWindow.loadFile('index.html')
  mainWindow.removeMenu()
  //mainWindow.webContents.openDevTools()
}

app.whenReady().then(createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
