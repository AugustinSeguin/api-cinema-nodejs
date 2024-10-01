import { Router } from "express";
import { Actor, Movie , MovieActorModel}  from "..";

export const movieRouter = Router();

movieRouter.get("/", async (req, res) => {
    const movie = await Movie.findAll();
    res.json(movie);
});

movieRouter.get("/:id", async (req, res) => {
    const movie = await Movie.findOne({
        where: { id: req.params.id },
        include: Actor,
    });
    if (movie) {
        res.json(movie);
    }
    else {
        res.status(404).send("Movie not found");
    }
});

movieRouter.post("/", async (req, res) => {
    const { title, description, releaseDate, director } = req.body;
    if (!title) {
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

movieRouter.post("/:movieId/actors/:actorId", async (req, res) => {
    const { movieId, actorId } = req.body;
    const movieActor = await MovieActorModel.findOne({ where: { movieId: movieId, actorId: actorId } });

    if (movieActor) {
        res.status(400).send("Actor already in movie");
    }
    else {
        const newMovie = await MovieActorModel.create({ movieId, actorId });
        res.json(newMovie);
    }
});

movieRouter.delete("/:movieId/actors/:actorId", async (req, res) => {
    const movieActor = await MovieActorModel.findOne({ where: { movieId: req.params.movieId, actorId: req.params.actorId } });

    if (movieActor) {
        await movieActor.destroy();
        res.json("deleted");
    }
    else {
        res.status(404).send("Movie actor not found");
    }
});