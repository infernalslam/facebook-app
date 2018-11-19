// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

// const { ipcRenderer } = require('electron')

// init ()

// function init () {
//   setDarkMode()
//   document.addEventListener('DOMContentLoaded', () => {
//     const style = document.createElement('style')
//     document.body.appendChild(style)
//   })
// }

// function setDarkMode() {
//   // document.documentElement.classList.toggle('dark-mode', true)
//   document.documentElement.style.backgroundColor = '#192633'
// }



const { ipcRenderer: ipc, remote } = require('electron')

init()

function init() {

  window.Bridge = {
    setDarkMode
  }
  
  // we get this message from the main process
  ipc.on('markAllComplete', () => {
    // the todo app defines this function
    window.Bridge.setDarkMode()
  })
}


function setDarkMode() {
  // document.documentElement.classList.toggle('dark-mode', true)
  document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style')
    document.body.appendChild(style)
  })
  document.documentElement.style.backgroundColor = '#192633'
}
