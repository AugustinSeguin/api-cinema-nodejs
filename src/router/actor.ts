import { Router } from "express";
import { Actor, Movie } from "..";
import { checkToken } from "../middlewares/checkToken";

export const actorRouter = Router();

actorRouter.get("/", checkToken, async (req, res) => {
    const actor = await Actor.findAll();
    res.json(actor);
});

actorRouter.get("/:id", checkToken, async (req, res) => {
    const actor = await Actor.findOne({
        where: { id: req.params.id },
        include: Movie,
    });
    if (actor) {
        res.json(actor);
    }
    else {
        res.status(404).send("Actor not found");
    }
});

actorRouter.post("/", checkToken, async (req, res) => {
    const { firstname, lastname, email } = req.body;
    if (!firstname || !lastname) {
        res.status(400).send("Missing required information: firstname or lastname");
    }
    else {
        const newActor = await Actor.create({ firstname, lastname, email });
        res.json(newActor);
    }
});

actorRouter.put("/:id", checkToken, async (req, res) => {
    const { firstname, lastname, email } = req.body;
    const actual = await Actor.findOne({ where: { id: req.params.id } });
    if (actual) {
        Actor
        const newActor = await actual.update({ firstname, lastname, email });
        res.json(newActor);
    }
    else {
        res.status(404).send("Actor not found");
    }
});

actorRouter.delete("/:id", checkToken, async (req, res) => {
    const actual = await Actor.findOne({ where: { id: req.params.id } });
    if (actual) {
        await actual.destroy();
        res.send("deleted");
    }
    else {
        res.status(404).send("Actor not found");
    }
});