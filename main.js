const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const { db } = require('./config/db')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('index.html')

  // remove toolbars
  win.setMenu(null)

  // Load database
  let db = require('./config/db')

  // Open the DevTools.
  // win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })

  // 
  // IPC Listeners
  // 

  // Products
  ipcMain.on('create-product-window', () => {
    createProductWindow = new BrowserWindow({
      parent: win,
      webPreferences: {
        nodeIntegration: true
      }
    })
    createProductWindow.setMenu(null)
    // createProductWindow.webContents.openDevTools()
    createProductWindow.loadFile('./src/pages/products/create.html')
  })

  ipcMain.on('edit-product-window', () => {
    editProductWindow = new BrowserWindow({
      parent: win,
      webPreferences: {
        nodeIntegration: true
      }
    })
    editProductWindow.setMenu(null)
    // editProductWindow.webContents.openDevTools()
    editProductWindow.loadFile('./src/pages/products/edit.html')
  })

  ipcMain.on('store-product', (name, price) => {
    // Here
  })
  ipcMain.on('update-product', () => {
    // Here
  })
  ipcMain.on('delete-product', () => {
    // Here
  })

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.