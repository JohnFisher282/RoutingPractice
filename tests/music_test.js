const chai = require("chai"); 
const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

const { it, describe, beforeEach} = require('mocha');

const server = require("../index");

const Music = require("../db");
const { expect } = require("chai");

describe("Test Music", ()  => {
    let testMusic;

    beforeEach((done) => {

        Music.deleteMany((err) => {
            if(!err) {
                testMusic.create({
                song: "Blomp",
                album: "Blerp",
                artist: "Bluup",
                releaseDate: "2022",
                artistCountry: "Austria",
                }, (error, created) => {
                    if(!error) {
                        testMusic = created;
                    }
                    return done()
                });
            }
        });
    });

    it("Should create create a music", () => {
        chai.request(server).post("/music/create").send({
            song: "Bloop",
            album: "Bleep",
            artist: "Blomp",
            releaseDate: "2022",
            artistCountry: "Italy"
        }).end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(201);
            expect(res).to.haveOwnProperty("text", "Succesfully created");
            return done();
        });
    })

    it("Should not create a music", (done) => {
        chai.request(server).post("/music/create").send().end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(400);
            expect(res).to.haveOwnProperty("text", "Person validation failed: artistCountry: Path `artistCountry` is required., releaseDate: Path `releaseDate` is required., artist: Path `artist` is required., album: Path `album` is required., song: Path `song` is required.");
            return done();
        })
    })

    it("Should find a Music", (done) => {
        chai.request(server).get(`/music/get/${testMusic.id}`).end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.haveOwnProperty("song", "Blomp");
            expect(res.body).to.haveOwnProperty("album", "Blerp");
            expect(res.body).to.haveOwnProperty("artist", "Bluup");
            expect(res.body).to.haveOwnProperty("releaseDate", "2022");
            expect(res.body).to.haveOwnProperty("artistCountry", "Austria");
            return done();
        });
    });
});

