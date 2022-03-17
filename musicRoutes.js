const router = require("express").Router();

const Music = require("./db");

const music = [];

router.get("/getAll", (req, res, next) => {
    Music.find().then((results) => {
        return res.json(results);
    }).catch(err => next({status: 400, message: err.message}));
});

router.get("/get/:song", (req, res, next) => {
    Music.find().then((results) => {
        return res.json(results);
    }).catch(err => next({status: 400, message: err.message}));
});

router.post("/create", (req, res, next) => {
    const music = req.body;

    new Music(music).save().then(() => {
    res.status(201).send("Created")
    }).catch(err => next({status:400, message: err.message}));
});

router.put("/replace/:id", (req, res, next) => {
    const newMusic = req.query;
    const id = Number.parseInt(req.params.id);

    if (id === null || undefined || id === NaN)
        return next({ status: 400, message: "Invalid ID"});
        else if (id > music.length)
        return next({status: 404, message: "No music found by this ID" + id});
        music.splice(id, 1, newMusic);
        res.status(202).json(data[id]);
});

router.delete("/remove/:id", (req, res, next) => {
    const id = Number.parseInt(req.params.id);
    if (id === null || undefined || id === NaN)
    return next({ status: 400, message: "Invalid ID"});
        else if (id > music.length)
        return next({status: 404, message: "No music found by this ID" + id});

        music.splice(id, 1);
        res.sendStatus(204);
});

module.export = router;