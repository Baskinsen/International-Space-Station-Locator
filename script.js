
//Creation Of Map and Tiles
let firstTime = true

const map = L.map('map').setView([0, 0], 4);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 60,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Creation Of Icon and Marker
const issIcon = L.icon({
    iconUrl: 'iss200.png',
    iconSize: [50, 32],
    iconAnchor: [25, 16]
});
const marker = L.marker([0, 0], {icon: issIcon}).addTo(map)

//Declaration Of Url And Fetching Of Api
const url = 'https://api.wheretheiss.at/v1/satellites/25544'
const getApi = async () => {
    const response =await fetch(url)
    const data =  await response.json()
    //console.log(data)
    const  {latitude, longitude} = data
    if(firstTime) {
        map.setView([latitude, longitude])
        firstTime = false
    } 
    marker.setLatLng([latitude, longitude])
    //console.log(longitude, latitude)
    console.log(firstTime)    
    document.getElementById('lon').innerText = longitude.toFixed(2)
    document.getElementById('lat').innerText = latitude.toFixed(2)
   
    const recenter = document.getElementById('recenter')
    recenter.addEventListener('click',()=> {
        map.setView([latitude, longitude], 4)
    })

    return {latitude, longitude}
}

//Calling Of Api Function
getApi()
setInterval(getApi, 1000)
