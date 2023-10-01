const canvas = document.getElementById('canvas')
const url = window.location.href
let isHide = true


function Share() {
    return `
        <div>
            <canvas>
            
            </canvas>
            <a href=${url}>link</a>
        </div>
    `
}




QRCode.toCanvas(canvas, url, (error) => {
    if (error) console.error(error)
})