import express from "express";
import {
  reviewWithModel1,
  reviewWithModel2,
  reviewWithModel3,
  reviewWithModel4,
} from "../controllers/ai.controllers.js";

const router = express.Router();

router.post("/model-1", reviewWithModel1);
router.post("/model-2", reviewWithModel2);
router.post("/model-3", reviewWithModel3);
router.post("/model-4", reviewWithModel4);

export default router;