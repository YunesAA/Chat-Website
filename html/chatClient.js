//const socket = io('http://' + window.document.location.host)
const socket = io() //by default connects to same server that served the page
var currentUser = ''



socket.on('serverSays', function(message) {
  //makes sure only to recieve messages once fully connected.
  if (currentUser === ''){
    return null
  } 

  //console.log(currentUser)
  //console.log(message)
  if (message === `${currentUser} HAS CONNECTED`) {
    let msgDiv = document.createElement('div')
  /*
  What is the distinction among the following options to set
  the content? That is, the difference among:
  .innerHTML, .innerText, .textContent
  */
  //msgDiv.innerHTML = message
  //msgDiv.innerText = message
    msgDiv.textContent = message
    document.getElementById('messages').appendChild(msgDiv)
    return
  }

    //PRIVATE MESSAGING
    //console.log(message.replace(":",""))
  if(message.replace(":","").includes(":")){
    let originalMessage = (message.split(': '))
    let multipleUsers = originalMessage[1].trim().split(',').map(item =>item.trim())
    //console.log("Multiple Users: "+multipleUsers)

    //console.log("originalMessage[0]: "+originalMessage[0])
    //console.log("originalMessage[1]: "+originalMessage[1])
    //console.log("originalMessage[2]: "+originalMessage[2])
    //originalMessage[0]= sender
    //originalMessage[1]= reciver(s)
    //originalMessage[2]= message


    //go through every username that was mentioned and send them a message 
      for (let i = 0; i < multipleUsers.length; i++) {

        if(originalMessage[0] === currentUser||multipleUsers[i] === currentUser) {//a === a
          let msgDiv = document.createElement('div')
          msgDiv.textContent = originalMessage[0] +": "+  originalMessage[2]//printed text
          let sender=originalMessage[0]
          let content=originalMessage[2]
          //console.log("message sent from: "+sender)
          //console.log("message content: "+content)    

          if (sender === currentUser) {
            // css styliong for messages sent by the user
            msgDiv.className = 'private-message-sent'
          } else {
            // css styliong for messages received from user
            msgDiv.className = 'private-message-received'
          }
          
          document.getElementById('messages').appendChild(msgDiv)
          return
        }
      }
      return
    }

  //check if incoming message is meant for socket user.
  let msgDiv = document.createElement('div')
  msgDiv.textContent = message

  //console.log("message contents"+message)
  currentMessage=message.split(':')
  let sender = currentMessage[0]
  let content = currentMessage[1]

  //console.log("message sent from: "+sender)
  //console.log("message content: "+content)
  if (sender === currentUser) {
    // Message sent by the current user
    msgDiv.className = 'message-sent'
  } else {
    //Message received from another user
    msgDiv.className = 'message-received'
  }
  
  document.getElementById('messages').appendChild(msgDiv)
})



function sendMessage() {
  let message = document.getElementById('msgBox').value.trim()
  if(message === '') return //do nothing
  socket.emit('clientSays', message)
  document.getElementById('msgBox').value = ''
}


function handleKeyDown(event) {
  const ENTER_KEY = 13 //keycode for enter key
  if (event.keyCode === ENTER_KEY) {
    sendMessage()
    return false //don't propogate event
  }
}



//function which allows username to be entered and sent.
function connectAsButton() {
  let username = document.getElementById('usernameInput').value.trim()

  if (username === '') {
    document.getElementById('usernameInput').value = ''
    return
  }

    //check if starts with letter and has name has only numbers and letters
    let regex = /^[A-Z a-z][A-Z a-z 0-9]*$/ //first part of the 'regex' is is to make sure the first character is a letter
                                            //the second part is making sure we only have either or letters and numbers
    if (!regex.test(username)) {
      document.getElementById('usernameInput').value = '' //re-input a valid username
      document.getElementById('error').style.display = 'block' //display error message
      return

    } else{ 

    //once the username is valid show chat server
    //hide
    document.getElementById('test').style.display = 'none'   //hide the welcome prompt 
    document.getElementById('usernameInput').style.display = 'none' 
    document.getElementById('connect_as_button').style.display = 'none' 
    document.getElementById('error').style.display = 'none'  //hide error (if any)   

    //show
    document.getElementById('messages').style.display = 'block'
    document.getElementById('msgBox').style.display = 'block'
    document.getElementById('send_button').style.display = 'block'
    document.getElementById('clear_button').style.display = 'block'


    currentUser = username // update currentUser with the provided username
    //console.log("USERNAME: " + currentUser + " CONNECTED")
    document.getElementById('usernameInput').value = ''
    socket.emit('clientSays', 'USERNAME' , currentUser)
    }
  }


  function clearButton() {
    //clear all chat messages
    document.getElementById('messages').innerHTML = ''
  }



//Add event listeners
document.addEventListener('DOMContentLoaded', function() {
  //This function is called after the browser has loaded the web page

  //add listener to buttons
  document.getElementById('send_button').addEventListener('click', sendMessage)
  document.getElementById('connect_as_button').addEventListener('click', connectAsButton)
  document.getElementById('clear_button').addEventListener('click', clearButton)
  
  //add keyboard handler for the document as a whole, not separate elements.
  document.addEventListener('keydown', handleKeyDown)
  //document.addEventListener('keyup', handleKeyUp)
})
