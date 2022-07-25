const express = require("express");
const router = express.Router();

const articlesCtrl = require("../controllers/articles");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post("/", auth, multer, articlesCtrl.createArticles);
router.put("/:id", auth, multer, articlesCtrl.modifyArticles);
router.post("/:id/like", auth, articlesCtrl.like);
router.delete("/:id", auth, articlesCtrl.deleteArticles);
router.get("/", auth, articlesCtrl.getAllArticles);
router.get("/:id", auth, articlesCtrl.getOneArticles);

module.exports = router;
