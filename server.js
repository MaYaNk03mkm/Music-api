const express = require("express");
const app = express();
const PORT = 6767;
app.use(express.json());
let songs = [
    {
        id: 1,
        title: "Schism",
        artist: "Tool",
        album: "Lateralus",
        genre: "Progressive Metal"
    },
    {
        id: 2,
        title: "Come As You Are",
        artist: "Nirvana",
        album: "Nevermind",
        genre: "Grunge"
    },
    {
        id: 3,
        title: "Everlong",
        artist: "Foo Fighters",
        album: "The Colour and the Shape",
        genre: "Alternative Rock"
    }
];

app.get("/",(req,res)=>{
    res.json({
        message: "Music API is Running!"
    });
});
app.get("/api/songs", (req, res) => {
    res.json(songs);
});
app.get("/api/songs/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const song = songs.find(song => song.id === id);

    if (!song) {
        return res.status(404).json({
            message: "Song not found"
        });
    }
    res.json(song);
});
app.post("/api/songs" , (req,res)=>{
    const newSong={
        id:songs.length+1,
        title: req.body.title,
        artist: req.body.artist,
        album: req.body.album,
        genre: req.body.genre
    };

    songs.push(newSong);

    res.status(201).json(newSong);
});
app.put("/api/songs/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const song = songs.find(song => song.id === id);

    if (!song) {
        return res.status(404).json({
            message: "Song not found"
        });
    }

    song.title = req.body.title;
    song.artist = req.body.artist;
    song.album = req.body.album;
    song.genre = req.body.genre;

    res.json(song);
});
app.delete("/api/songs/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const songIndex = songs.findIndex(song => song.id === id);

    if (songIndex === -1) {
        return res.status(404).json({
            message: "Song not found"
        });
    }

    const deletedSong = songs.splice(songIndex, 1);

    res.json({
        message: "Song deleted successfully",
        song: deletedSong[0]
    });
});
app.listen(PORT,()=>{
    console.log(`server is running at http://localhost:${PORT}`);
});