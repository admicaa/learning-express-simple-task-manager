import tasksModel from "../models/tasks.model.js";

class TasksController {
  async store(req, res) {
    try {
      var task = await tasksModel.create({
        name: req.body.name,
      });
      return res.json({ task });
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }

  async index(req, res) {
    var tasks = await tasksModel.find({});
    return res.json({ tasks });
  }
  async show(req, res) {
    try {
      var task = await tasksModel.findById(req.params.id);
      return res.json({ task });
    } catch (error) {
      res.error(500).json({ message: "Something went wrong" });
    }
  }
  async update(req, res) {
    try {
      var task = await tasksModel.findById(req.params.id);
      task.name = req.body.name ? req.body.name : task.name;
      task.completed = req.body.completed;
      await task.save();
      return res.json({ task });
    } catch (error) {
      res.error(500).json({ message: "Something went wrong" });
    }
  }

  async destroy(req, res) {
    try {
      var task = await tasksModel.deleteOne({ _id: req.params.id });
      return res.json({ task });
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
}

export default new TasksController();
