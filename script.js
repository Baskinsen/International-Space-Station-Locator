
//Creation Of Map and Tiles
let firstTime = true

const map = L.map('map').setView([0, 0], 4);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 60,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Creation Of Icon and Marker With Popup
const issIcon = L.icon({
    iconUrl: 'iss200.png',
    iconSize: [50, 32],
    iconAnchor: [25, 16]
});
const marker = L.marker([0, 0], {icon: issIcon}).addTo(map)
const myMarker = L.marker([0, 0]).addTo(map)
marker.bindPopup("<b>International Space Station").openPopup()


//Declaration Of Url And Fetching Of Api
const url = 'https://api.wheretheiss.at/v1/satellites/25544'

const getApi = async () => {
    const response =await fetch(url)
    const data =  await response.json()
    const  {latitude, longitude} = data
    if(firstTime) {
        map.setView([latitude, longitude])
        firstTime = false
    } 
    marker.setLatLng([latitude, longitude])
      
    document.getElementById('lon').innerText = longitude.toFixed(2)
    document.getElementById('lat').innerText = latitude.toFixed(2)
   
    const recenter = document.getElementById('recenter')
    recenter.addEventListener('click',()=> {
        map.setView([latitude, longitude], 4)
    })

   const position = navigator.geolocation.getCurrentPosition((pos) => {
    let posLat = pos.coords.latitude
    let posLon = pos.coords.longitude
    myMarker.setLatLng([posLat, posLon])
    document.getElementById('mylon').innerText = posLon.toFixed(2)
    document.getElementById('mylat').innerText = posLat.toFixed(2)
   // console.log(myMarker)
   })
  
   
    return {latitude, longitude}
}

//Calling Of Api Function
getApi()
setInterval(getApi, 1000)
