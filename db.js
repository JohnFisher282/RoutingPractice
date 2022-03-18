const mongoose = require ("mongoose");
const { Schema } = mongoose;

mongoose.connect("mongodb://localhost:27017/music", {
    useNewUrlParser: true
});

const musicSchema = new Schema ({
    song: {
        type: String,
        required: true,
        minlength: 1
    },
    album: {
        type: String,
        required: true,
        minlength: 1
    },
    artist: {
        type: String,
        required: true,
        minlength: 1
    },
    releaseDate: {
        type: Number,
        require: true,
        minlength: 1
    },
    artistCountry: {
        type: String,
        require: true,
        minlength: 1
    }
});

module.exports = mongoose.model("Music", musicSchema);