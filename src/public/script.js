const controllers = document.querySelector('#controllers')
const socket = io()


let state = {
    color: 'tomate',
    clients: []
}


if (location.hash === '#mng'){
    controllers.style.display = 'block'
} else {
    controllers.style.display = 'none'
}


const input = document.querySelector('input[type="color"]')

input.addEventListener('change', () => {
    console.log(input.value)

    state.color = input.value
    setBodyColor(state.color)
    changeState(state.color)
})



socket.on('stateUpdate', function(data){
    state = {...state, ...data}
    setBodyColor(state.color) 
    updateClientList(state.clients)
    console.log(state)   
})

function setBodyColor(color){
    const body = document.querySelector('body')
    body.style.background = color
}

function updateClientList(clients = []){
    const ul = document.querySelector('ul')
    ul.innerHTML = ''

    clients.forEach((client)=>{
        ul.innerHTML += `<li>${client}</li>`
    })
}

function changeState(color){
    const data = {
        color
    }

    socket.emit('changeState', data)
}