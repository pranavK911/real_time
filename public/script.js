const socket=io();
console.log(socket);


if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition((postion)=>{
        // console.log(postion.coords);
        const {latitude,longitude}=postion.coords
       socket.emit("send-location",{longitude,latitude})        
    },(Error)=>{
        console.log("error ",Error);
        
    },{
        enableHighAccuracy:true,
        maximumAge:0,
        timeout:5000
    })
}
const map=L.map("map").setView([0,0],16)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Map created by <strong>pranavkumar</strong>'
}).addTo(map);

const markers={}
socket.on("recived-location",(data)=>{
    console.log(data);
    const {id,latitude,longitude}=data
    map.setView([latitude,longitude])
    if(markers[id]){
        markers[id].setLatLng([latitude,longitude])
    }else{
        markers[id]=L.marker([latitude,longitude]).addTo(map)
    }
})
