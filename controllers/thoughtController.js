const { Thought, User } = require("../models");

const thoughtController = {
  getAllThoughts(req, res) {
    Thought.find()
      .populate({ path: "reaction", select: "-__v" })
      .select("-__v")
      .then((data) => res.json(data))
      .catch((err) => json(err));
  },
  getThoughtsById(req, res) {
    Thought.findOne({ _id: req.params.id })
      .populate({ path: "reaction", select: "-__v" })
      .select("-__v")
      .then((data) => res.json(data))
      .catch((err) => json(err));
  },
  createThoughts(req, res) {
    Thought.create(req.body)
      .then((data) => {
        return User.findOneAndUpdate(
          { _id: res.params.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((data) => {
        if (!data) {
          return res.json({ message: "No Thoughts recorded: no User ID" });
        }
        res.json(data);
      })
      .catch((err) => res.json(err));
  },
  updateThoughts(req, res) {
    Thought.findOneAndUpdate({ _id: params.id }),
      req.body,
      { new: true, runValidators: true }
        .populate({ path: "reactions", select: "-__v" })
        .select("-__v")
        .then((data) => {
          if (!data) {
            return res.json({ message: "No Thought Updated: no ID Found" });
          }
          res.json(data);
        })
        .catch((err) => res.json(err));
  },
  deleteThoughts(req, res) {
    Thought.findOneAndDelete({ _id: req.params.id })
      .then((data) => {
        if (!data) {
          return res.json({ message: "Could not Delete Thought: no ID found" });
        }
        res.json(data);
      })
      .catch((err) => res.json(err));
  },
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { reactions: req.body } },
      { new: true, runValidators: true }
    )
      .populate({ path: "reactions", select: "-__v" })
      .select("-__v")
      .then((data) => {
        if (!data) {
          return res.json({ message: "Could not add a Reaction: No ID found" });
        }
        res.json(data);
      })
      .catch((err) => res.json(err));
  },
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoghtId },
      { $pull: { reaction: { reactionId: req.params.reactionId } } },
      { new: true, runValidators: true }
    )
      .populate({ path: "reactions", select: "-__v" })
      .select("-__v")
      .then((data) => {
        if (!data) {
          return res.json({
            message: "Could not Delete Reaction: No ID found",
          });
        }
        res.json(data);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;
