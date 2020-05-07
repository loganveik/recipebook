const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./recipeModel");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/recipebook", { useNewUrlParser: true });

app.get("/all", (req, res) => {
    db.find({})
        .then(dbRecipe => {
            res.json(dbRecipe);
        })
        .catch(err => {
            res.json(err);
        });
});

app.post("/submit", ({ body }, res) => {
    db.create(body)
        .then(dbRecipe => {
            res.json(dbRecipe);
        })
        .catch(err => {
            res.json(err);
        });
});

app.get("/find/:id", (req, res) => {
    db.findOne({
        _id: req.params.id
    })
        .then(dbRecipe => {
            res.json(dbRecipe);
        })
        .catch(err => {
            res.json(err);
        });
});

app.post("/update/:id", ({body, params}, res) => {
    db.findByIdAndUpdate(params.id, {
        $set: body
    })
        .then(dbRecipe => {
            res.json(dbRecipe);
        })
        .catch(err => {
            res.json(err);
        });
});

app.delete("/delete/:id", (req, res) => {
    db.remove({
        _id: req.params.id
    })
        .then(dbRecipe => {
            res.json(dbRecipe);
        })
        .catch(err => {
            res.json(err);
        });
});

app.delete("/clearall", (req, res) => {
    db.remove({})
        .then(dbRecipe => {
            res.json(dbRecipe);
        })
        .catch(err => {
            res.json(err);
        });
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});
