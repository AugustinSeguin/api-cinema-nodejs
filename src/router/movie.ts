import { Router } from "express";
import { Movie } from "..";

export const movieRouter = Router();

movieRouter.get("/", async (req, res) => {
    const movie = await Movie.findAll();
    res.json(movie);
});

movieRouter.get("/:id", async (req, res) => {
    const movie = await Movie.findOne({ where: { id: req.params.id } });
    if (movie) {
        res.json(movie);
    }
    else {
        res.status(404).send("Movie not found");
    }
});

movieRouter.post("/", async (req, res) => {
    const { title, description, releaseDate, director } = req.body;
    if(!title){
        res.status(400).send("Missing required information: title");
    }
    else {
        const newMovie = await Movie.create({ title, description, releaseDate, director });
        res.json(newMovie);
    }
});

movieRouter.put("/:id", async (req, res) => {
    const { title, description, releaseDate, director } = req.body;
    const actual = await Movie.findOne({ where: { id: req.params.id } });
    if (actual) {
        const newMovie = await actual.update({ title, description, releaseDate, director });
        res.json(actual);
    }
    else {
        res.status(404).send("Movie not found");
    }
});

movieRouter.delete("/:id", async (req, res) => {
    const actual = await Movie.findOne({ where: { id: req.params.id } });
    if (actual) {
        await actual.destroy();
        res.json(actual);
    }
    else {
        res.status(404).send("Movie not found");
    }
});

