const socket = io()

let bodyColor = '#000000';

socket.on('colorChanged', function(color){
    setBodyColor(color)
})

function setBodyColor(color){
    const body = document.querySelector('body')

    bodyColor = color
    body.style.background = bodyColor
}