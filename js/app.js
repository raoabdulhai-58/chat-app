var firebaseConfig = {
  apiKey: "AIzaSyDkGmP1FlVij6dcKPtJCzgV8zWwqX4lxj0",
  authDomain: "chatapp-b9494.firebaseapp.com",
  databaseURL: "https://chatapp-b9494.firebaseio.com",
  projectId: "chatapp-b9494",
  storageBucket: "chatapp-b9494.appspot.com",
  messagingSenderId: "787221277946",
  appId: "1:787221277946:web:ea8ff25bab1c6fe0c6ed43"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);





const db = firebase.database();
const msgref = db.ref("/messages");
const id = msgref.push().key;
 const inpBox = document.getElementById('inp-box');
 const msgs = document.getElementById('msgs');
 const inp_name = document.getElementById('inp-name')
 const inp_form = document.getElementById("inp-form")
 const chatbox = document.getElementById('chat-box')
 let name ;

//  name = inp_name.value;


//  localStorage.setItem("name",name)




 let timeformate = () => { 
  const date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var currnetTime = hours + ':' + minutes + ' ' + ampm;
  return currnetTime
}
 
let submitdata = () => {

  
  const messages = {
    id,
    name,
    text: inpBox.value,
    ctime: timeformate()
  }
  msgref.push(messages);
   inpBox.value = ""
} 

msgref.on('child_added',(data)=>{

 const{id: userid,name,text,ctime}= data.val()
  msgs.innerHTML += `<li class="msg ${id == userid && "sec"}" id="message-${data.key}">
  <span onclick = "del(this)" data-id = ${data.key}><i class="fas fa-user icon"></i>
  <i class="name">${name}: </i>${text} <i class="time">${ctime}</i></span>
</li>`
})

let del = (self) => {
  var messageId = self.getAttribute("data-id")
 msgref.child(messageId).remove()
}


msgref.on("child_removed",(data) => {
  document.getElementById("message-"+data.key).innerHTML = "message has been removed";
  document.getElementById("message-"+data.key).style.color = "black"
  document.getElementById("message-"+data.key).style.padding = "15px"
})



let entername = ()=>{
    if (!inp_name.value.trim()) {
       alert("plz enter your name")
    }
    else{
      inp_form.style.display = 'none';
      chatbox.style.display = 'block'
      return name = inp_name.value;
      
    }  
}

inpBox.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("send-btn").click();
    document.getElementById("enter-btn").click();
  }
});
inp_name.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("enter-btn").click();
  }
});





