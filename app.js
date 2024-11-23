const express=require('express')
const http=require('http')
const path = require('path')
const socketio=require('socket.io')
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const app=express()
const server=http.createServer(app)
const io = new socketio.Server(server);

app.set("view engine","ejs")
app.use(express.static(path.join(__dirname,"public")))


io.on("connection",(socket)=>{
  socket.on("send-location",(data)=>{
    // console.log(data);
    // console.log("connected",socket.id);
    io.emit("recived-location",{id:socket.id,...data})
    
  }) 
})



app.get('/',(req,res)=>{
    res.render('index')
})
server.listen(PORT,()=>{
    console.log("server is running on port ",PORT);
    
})