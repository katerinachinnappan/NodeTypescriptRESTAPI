import express from "express";
import controller from "../controllers/article";
const router = express.Router();

router.get("/articles", controller.getArticles);
router.get("/articles/:id", controller.getArticle);

export = router;
