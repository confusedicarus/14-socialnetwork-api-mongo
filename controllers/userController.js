const { User } = require("../models");

const userController = {
  getAllUsers(req, res) {
    User.find()
      .populate({ path: "thoughts", select: "-__v" })
      .populate({ path: "friends", select: "-__v" })
      .select("-__v")
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  },
  getUsersById(req, res) {
    User.findOne({ _id: req.params.id })
      .populate({ path: "thoughts", select: "-__v" })
      .populate({ path: "friends", select: "-__v" })
      .select("-__v")
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  },
  createUser(req, res) {
    User.create(req.body)
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  },
  updateUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    })
      .then((data) => {
        if (!data) {
          return res.json({
            message: "Cannot Update User: No User with this ID found",
          });
        }
        res.json(data);
      })
      .catch((err) => res.json(err));
  },
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.id }).then((data) => {
      if (!data) {
        return res.json({
          message: "Cannot Delete User: No User with this ID found",
        });
      }
      res.json(data);
    });
  },
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { friends: req.params.friendId } },
      { new: true }
    )
      .populate({ path: "friends", select: "-__v" })
      .select("-__v")
      .then((data) => {
        if (!data) {
          return res.json({ message: "Cannot Add Friend: No ID found" });
        }
        res.json(data);
      })
      .catch((err) => res.json(err));
  },
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .populate({ path: "friends", select: "-__v" })
      .then((data) => {
        if (!data) {
          return res.json({ message: "Cannot Delete Friend: ID not found" });
        }
        res.json(data);
      })
      .catch((err) => res.json(err));
  },
};
module.exports = userController;
