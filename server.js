const server = require('http').createServer(handler)
const io = require('socket.io')(server) //wrap server app in socket io capability
const fs = require('fs') //file system to server static files
const url = require('url'); //to parse url strings
const PORT = process.argv[2] || process.env.PORT || 3000 //useful if you want to specify port through environment variable
                                                         //or command-line arguments

const ROOT_DIR = 'html' //dir to serve static files from

const MIME_TYPES = {
  'css': 'text/css',
  'gif': 'image/gif',
  'htm': 'text/html',
  'html': 'text/html',
  'ico': 'image/x-icon',
  'jpeg': 'image/jpeg',
  'jpg': 'image/jpeg',
  'js': 'application/javascript',
  'json': 'application/json',
  'png': 'image/png',
  'svg': 'image/svg+xml',
  'txt': 'text/plain'
}

function get_mime(filename) {
  for (let ext in MIME_TYPES) {
    if (filename.indexOf(ext, filename.length - ext.length) !== -1) {
      return MIME_TYPES[ext]
    }
  }
  return MIME_TYPES['txt']
}

server.listen(PORT) //start http server listening on PORT

function handler(request, response) {
  //handler for http server requests including static files
  let urlObj = url.parse(request.url, true, false)
  console.log('\n============================')
  console.log("PATHNAME: " + urlObj.pathname)
  console.log("REQUEST: " + ROOT_DIR + urlObj.pathname)
  console.log("METHOD: " + request.method)

  let filePath = ROOT_DIR + urlObj.pathname
  if (urlObj.pathname === '/') filePath = ROOT_DIR + '/index.html'

  fs.readFile(filePath, function(err, data) {
    if (err) {
      //report error to console
      console.log('ERROR: ' + JSON.stringify(err))
      //respond with not found 404 to client
      response.writeHead(404);
      response.end(JSON.stringify(err))
      return
    }
    response.writeHead(200, {
      'Content-Type': get_mime(filePath)
    })
    response.end(data)
  })

}


let users=[];

//Socket Server
io.on('connection', function(socket) {
  console.log('client connected')
  //console.dir(socket)
  socket.emit('serverSays', 'You are connected to CHAT SERVER')
  var USERNAME = '';

  //listen for messages from the client
  socket.on('clientSays', function(message, data) {
    if (USERNAME === "") {
      USERNAME = data;
      //console.log(`USER ' ${data} ' CONNECTED!`)
      users.push(data) // add new user to users list
      socket.emit('exportedData', users) //to send the updated users list to client
      //acknowledgement from the server when a client has successfully connected as a user
      socket.emit('serverSays', `USER "${USERNAME}" HAS BEEN CONNECTED SUCCESSFULLY`)
  }
    console.log('USER: ' + USERNAME)
    console.log('MESSAGE: ' + message)

  //emit message to everyone
    if (message != 'USERNAME') {
      io.emit('serverSays', USERNAME +": " + message) // "username": 'message'
    }
  })
  socket.on('disconnect', function(message) {
    //event emitted when a client disconnects
    console.log('client: "'+ USERNAME +'" disconnected')
    socket.emit('exportedData', users)// Broadcast updated users list
    //console.log("users "+ users)
  })
})

console.log(`Server Running at port ${PORT}  CNTL-C to quit`)
console.log(`To Test:`)
console.log(`Open several browsers to: http://localhost:${PORT}/chatClient.html`)

