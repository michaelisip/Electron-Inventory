const { ipcRenderer, ipcMain } = require('electron')

document.getElementById('create-product').addEventListener('click', () => {
    ipcRenderer.send('create-product-window')
})

document.getElementById('edit-product').addEventListener('click', () => {
    ipcRenderer.send('edit-product-window')
})

document.getElementById('create-product-form').addEventListener('submit', (env) => {
    env.preventDefault()
    ipcRenderer.send('store-product')
})

document.getElementById('edit-product-form').addEventListener('submit', (env) => {
    env.preventDefault()
    ipcRenderer.send('update-product')
})