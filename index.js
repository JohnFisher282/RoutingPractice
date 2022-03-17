const express = require("express");

const parser = require("body-parser");

const app = express();

app.use(parser.json());

const musicRoutes = require("./musicRoutes");

app.use("/music", musicRoutes);

app.use((req, res, next) => {
    const logEntry = `host: ${req.host}
    ip: ${req.ip}
    method: ${req.method}
    path: ${req.path}
    time: ${new Date()}`;
    console.log(logEntry);
    next();
});

app.use((err, req, res, next) => {
    res.status(err.status).send(err.message);
})

const server = app.listen(4494, () =>{
    console.log("Server succesfully started on port", server.address().port);
});