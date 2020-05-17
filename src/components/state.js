let data = {
    color: 'gray',
    clients: []
}

function UpdateState(newData){
    data.color = newData.color
}

function teste(){
    data.color = 'red'
}


function AddClient(socketId){
    data.clients.push(socketId)
}

function RemoveClient(socketId){
    const clientIndex = data.clients.findIndex(c => c == socketId)

    if (clientIndex >= 0){        
        data.clients.splice(clientIndex, 1)
    }
}

module.exports = {
    data,
    UpdateState,
    AddClient,
    RemoveClient,
    teste
}