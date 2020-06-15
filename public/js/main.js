const chatForm = document.getElementById('chat-form')
const msgContainer = document.querySelector('.msg-container');
const socket = io();


chatForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    let msg = e.target.elements.msg.value;
    
    socket.emit('chatMsg', msg);

    e.target.elements.msg.value ='';
})

socket.on('msg', msg => {
    console.log(msg);
    outputMsg(msg);

})

const outputMsg = (msg) => {
    const chatDiv = document.createElement('div')
    chatDiv.innerHTML =`<p>${msg}</p>`;
    msgContainer.appendChild(chatDiv);
    
}