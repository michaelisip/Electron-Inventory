const { ipcRenderer, ipcMain } = require('electron')

document.getElementById('create-product').addEventListener('click', () => {
    ipcRenderer.send('create-product-window')
})

