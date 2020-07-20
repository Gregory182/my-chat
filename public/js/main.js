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
    outputMsg(msg);
    msgContainer.scrollTop = msgContainer.scrollHeight;
    //Scroll down

})

const outputMsg = (msg) => {
    const chatDiv = document.createElement('div')
    chatDiv.classList.add('message')
    chatDiv.innerHTML =`
    <p class="meta">${msg.username} <span>${msg.time}</span></p>
    <p>${msg.text}</p>`;
    msgContainer.appendChild(chatDiv);
    
}