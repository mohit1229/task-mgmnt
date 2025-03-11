const express = require("express");
const Task = require("../models/Task");

const router = express.Router();

// Create task (POST)
router.post("/", async (req, res) => {
  try {
    const newtask = new task(req.body);
    await newtask.save();
    res.status(201).json(newtask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read All tasks (GET)
router.get("/", async (req, res) => {
  try {
    const tasks = await task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read Single task (GET by ID)
router.get("/:id", async (req, res) => {
  try {
    const task = await task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "task not found" });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update task (PUT)
router.put("/:id", async (req, res) => {
  try {
    const updatedtask = await task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedtask) return res.status(404).json({ error: "task not found" });
    res.json(updatedtask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete task (DELETE)
router.delete("/:id", async (req, res) => {
  try {
    const deletedtask = await task.findByIdAndDelete(req.params.id);
    if (!deletedtask) return res.status(404).json({ error: "task not found" });
    res.json({ message: "task deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
