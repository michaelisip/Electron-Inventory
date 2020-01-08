const { ipcRenderer } = require('electron')

document.getElementById('create-product-form').addEventListener('submit', (env) => {
    env.preventDefault()
    console.log(env.target)
    ipcRenderer.send('store-product')
})
