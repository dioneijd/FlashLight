const socket = io()

let bodyColor = '#000000';


socket.on('colorChanged', function(color){
    setBodyColor(color)
})

function updateClientList(clients = []){
    const ul = document.querySelector('ul')
    ul.innerHTML = ''

    clients.forEach((client)=>{
        ul.innerHTML += `<li>${client}</li>`
    })
}

function changeTheColor(color){
    setBodyColor(color)
    socket.emit('colorChanged', color)
}

function setBodyColor(color){
    const body = document.querySelector('body')

    bodyColor = color
    body.style.background = bodyColor
}
