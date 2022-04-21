const express = require("express");
const router = express.Router();
const {
  addItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
} = require("../controllers/items");

router.post("/", addItem);
router.get("/", getAllItems);
router.get("/:id", getItemById);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);

module.exports = router;
