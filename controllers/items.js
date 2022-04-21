const Items = require("../models/Items");

// @desc fetch all items (lastest-order)
// GET api/items
exports.getAllItems = async (req, res) => {
  try {
    const lastAddedItem = await Items.find({})
      .sort({ _id: "-1" })
      .select("Id title description");

    const fectchedItems = [];
    lastAddedItem.map((item) => {
      fectchedItems.push({
        Id: item.Id,
        title: item.title,
        description: item.description,
      });
    });

    return res.status(200).json({
      items: fectchedItems,
    });
  } catch (err) {
    console.log(err);
  }
};

// @desc fetch item by id
// GET api/items/:id
exports.getItemById = async (req, res) => {
  try {
    const item = await Items.findOne({ Id: req.params.id }).select("-_id -__v");

    if (item) return res.status(200).json({ message: "FOUND", item });

    return res.status(404).json({ message: "NOT FOUND" });
  } catch (err) {
    console.log(err);
  }
};

// @desc add new item
// POST api/items
exports.addItem = async (req, res) => {
  try {
    const lastAddedItem = await Items.find({}).sort({ _id: "-1" });
    const lastId = lastAddedItem[0].Id.split("_")[1];
    const { title, description } = req.body;

    const item = Items({
      Id: `ITEM_${parseInt(lastId) + 1}`,
      title,
      description,
    });

    const addedItem = await item.save();

    return res.status(200).json({
      message: "ITEM_ADDED_SUCCESSFULLY",
      item: {
        Id: addedItem.Id,
        title: addedItem.title,
        description: addedItem.description,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "ERROR", err });
  }
};

// @desc update item with id
// PUT api/items/:id
exports.updateItem = async (req, res) => {
  const { title, description } = req.body;
  try {
    const item = await Items.findOne({ Id: req.params.id });

    if (item) {
      if (title) item.title = title;
      if (description) item.description = description;

      const updatedItem = await item.save();

      return res.status(200).json({
        message: "UPDATED SUCCESSFULLY",
        item: {
          Id: updatedItem.Id,
          title: updatedItem.title,
          description: updatedItem.description,
        },
      });
    } else {
      return res.status(400).json({ message: "NOT FOUND" });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "ERROR", err });
  }
};

// @desc delete item by id
// DELETE api/items/:id
exports.deleteItem = async (req, res) => {
  try {
    const item = await Items.findOne({ Id: req.params.id });

    if (item) {
      await Items.findOneAndDelete({ Id: req.params.id });
      return res.status(200).json({
        message: "DELETED SUCCESSFULLY",
      });
    } else {
      return res.status(400).json({ message: "NOT FOUND" });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "ERROR", err });
  }
};
