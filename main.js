const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./db/inventory.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the chinook database.');
});

const createProductsTableSql = `CREATE TABLE IF NOT EXISTS products(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price FLOAT);`
db.run(createProductsTableSql,
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, 
    (err) => {
  const insertProductSql = `INSERT INTO products (name, price) VALUES ('Test', 12.123);`
  db.run(insertProductSql, (err) => {
    if (err) {
      return console.error(err)
    }
  })
})

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

  // Open the DevTools.
  win.webContents.openDevTools()

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
    createProductWindow.webContents.openDevTools()
    createProductWindow.loadFile('./src/pages/products/create.html')
  })
  ipcMain.on('edit-product-window', () => {
    createProductWindow = new BrowserWindow({
      parent: win,
    })

    createProductWindow.loadFile('./src/pages/products/edit.html')
  })
  ipcMain.on('store-product', (name, price) => {
    console.log(name, price)
    db.run(`INSERT INTO products (name, price) VALUES (${name}, ${price})`)
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