const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express:server,
    autoescape: false,
    noCache: true
})

server.get("/", function(req, res){
    const about = {
        avatar_url: "https://avatars2.githubusercontent.com/u/49372916?s=460&u=bd27c6460ee4bbf9119a847c8894626bc2f45914&v=4",
        name: "Gabi Fioranelli",
        role: "Estudante - Rocketseat",
        description: 'Bióloga, estudante de programação pela <a href="Https://rocketseat.com.br" target="_blank">Rocketseat</a>',
        links: [
            { name: "GitHub", url: "https://github.com/gabifioranelli" },
            { name: "Twitter", url: "http://www.twitter.com/gabigeek" },
            { name: "LinkedIn", url: "https://www.linkedin.com/in/gabriellefioranelli/" }
        ]
    }
    return res.render("about", { about })
})

server.get("/videos", function(req, res){
    return res.render("videos", {items: videos})
})

server.get("/video", function(req, res) {
    const id = req.query.id

    const video = videos.find(function(video) {
        return video.id == id
    })

    if (!video) {
        return res.send("Video not found!")
    }

    return res.render("video", { item: video })
})

server.listen(5000, function(){
    console.log("server is running")
})