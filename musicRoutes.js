const router = require("express").Router();

const Music = require("./db");

router.get("/getAll", (req, res, next) => {
    // Music.find().then((results) => {
    //     return res.json(results);
    // }).catch(err => next({status: 400, message: err.message}));
    Music.find((err, music) => {
        if (err)
            return next({status: 400, message: err.message});
        else
            return res.json(music);
    })
});

router.get("/find", ({query}, res, next) => {
    Music.find(query, (err, music) => {
        if (err)
        return next({status: 400, message: err.message});
    else
        return res.json(music);
    })
});

router.post("/create", ({body: music}, res, next) => {
    // const music = req.body;

    new Music(music).save()
    .then(() => res.status(201).send("Created"))
    .catch(err => next ({status: 400, message: err.message}));
});
    

router.put("/replace/:id", ({query: newMusic, params: {id}}, res) => {
    // const newMusic = req.query;
    // const id = Number.parseInt(req.params.id);

    Music.findByIdAndUpdate(id, newMusic, (err, replaced) => {
        if (err)
            return next({status: 400, message: err.message});
        else
            Music.findById(id, (err, updatedMusic) => {
                if (err)
                    return next({status: 400, message: err.message});
                else
                    return res.status(202).send(updatedMusic);
            });
        //Music.findById(id, (err, updatedMusic) => {
            //if (err)
            //return next({status:400, message: err.message});
            //else
            //return res.status(202).send(found);
        //})
    })
});

router.delete("/remove/:id", ({params: {id}}, res) => {
    // const id = req.params.id;
    Music.findByIdAndDelete(id, (err) => {
        if (err)
            return next({status: 400, message: err.message});
        else
            return res.sendStatus(204);
    })
});

module.exports = router;