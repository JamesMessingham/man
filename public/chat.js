firebase.auth().onAuthStateChanged(user => {
 if(user){
   //const port = window.location.hostname;
   const port = 'localhost:5000';
   const socket = io.connect(port);

   const message = document.getElementById('message'),
         btn = document.getElementById('send'),
         output = document.getElementById('output'),
         feedback = document.getElementById('feedback'),
         chat = document.getElementById('chat-window');
         handle = user['displayName'];

   function sendMessage(){
     if(message.value.replace(/^\s+|\s+$/gm,'').length != 0){
       socket.emit('chat', {
         message: message.value,
         handle: handle
       });
    }
    message.value='';
   }

   function gotoBottom(el){
     el.scrollTop = el.scrollHeight - el.clientHeight;
   }

   btn.addEventListener('click', () => {
     sendMessage();
   });

   message.addEventListener('keyup', e => {
     socket.emit('typing', {
       message: message.value,
       handle: handle
     });
     if(e.keyCode === 13){
       sendMessage();
     }
   });

   socket.on('chat', (data) => {
     feedback.innerHTML = '';
     output.innerHTML += `<p><strong>${data.handle}:</strong>${data.message}</p>`;
     gotoBottom(chat);
   });

   socket.on('typing', (data) => {
     data.message ?
     feedback.innerHTML = `<p><em>${data.handle} is typing</em></p>` :
     feedback.innerHTML = '';
     gotoBottom(chat);
   });
 }
});
