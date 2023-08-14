const socket = io('http://localhost:8000' , { transports : ['websocket'] });

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");


const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}

form.addEventListener('submit' , (e) =>{
    e.preventDefault();
    const msg = messageInput.value;
    append(`You : ${msg}` , 'right');
    socket.emit('send' , msg);
    messageInput.value = '';
})

const user_name = prompt("Enter your name to join");
console.log(user_name)
socket.emit('new-user-joined', user_name);

socket.on('user-joined', user_name =>{   
    append(`${user_name} joined the chat`,'right')
})

socket.on('receive' , data =>{
    append(`${data.name} : ${data.message}` , 'left'); 
})

socket.on('left', name =>{
    append(`${name} left the chat` , 'left'); 
})