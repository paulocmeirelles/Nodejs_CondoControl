import express from "express";
const router = express.Router();

// import animalController from "../controllers/animal.controller.js";

router.post("/", animalController.createAnimal);
router.get("/", animalController.getAnimals);
router.get("/:id", animalController.getAnimal);
router.delete("/:id", animalController.deleteAnimal);
router.put("/", animalController.updateAnimal);

router.use((err, req, res, next) => {
  res.status(400).send({ error: err.message });
});

export default router;
