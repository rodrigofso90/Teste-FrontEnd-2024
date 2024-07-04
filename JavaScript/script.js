var express = require("express");
const cors = require('cors');
app = express();
app.use(cors());

const {google} = require('googleapis');

app.get("/searchVideos", function(req,response){

    const youtube = google.youtube({
        version: 'v3',
    auth: 'AIzaSyBNOeVRPnqFKhrxOBiZOt5F01jCJEx9d_c'
    });
    
    let searchString = req.query.searchString;

    youtube.search.list({
        part: 'id,snippet',
        q: searchString,
    }).then(res => {
        console.log(res.data);
        let videos = []
        for(data of res.data.items){
            //console.log(JSON.stringify(data.snippet))
        let video = {
            title: data.snippet.title,
            img: data.snippet.thumbnails.default.url,
        }
        videos.push(video);
        }
        response.send(videos);
    })
    .catch(error => {
        console.error(error);
    });
})

app.listen(4000, () => {
console.log("Server running on port 3000");
});


/*Script*/

function pesquisar(){
    let searchString = document.querySelector("#searchString").value;
    fetch('http://localhost:4000/searchVideos?searchString=' + searchString, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        document.querySelector("#imgVideo1").src = data[0].img;
        document.querySelector("#texto1").innerText = data[0].title;

        document.querySelector("#imgVideo2").src = data[1].img;
        document.querySelector("#texto2").innerText = data[1].title;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}