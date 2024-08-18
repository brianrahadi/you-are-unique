const User = require("../models/user.model");

async function getAllUsers(request, reply) {
  try {
    const res = await User.find();
    const users = res;
    reply.send(users);
  } catch (error) {
    reply.status(500).send(error);
  }
}
async function getUserById(request, reply) {
  try {
    const user = await User.findById(request.params.id);
    reply.send(user);
  } catch (error) {
    reply.status(500).send(error);
  }
}
async function createUser(request, reply) {
  try {
    // lastVisited and timesVisited are provided only for seeding
    const { name, lastVisited, timesVisited } = request.body;
    const existingUser = await User.find({ name: name });
    if (existingUser.length === 1) {
      reply.send(`Failed! User with name ${request.body.name} already exists`);
      return;
    }
    const userObj = {
      name,
      lastVisited: lastVisited ?? new Date(),
      timesVisited: timesVisited ?? 1
    }
    const user = new User(userObj);
    const result = await user.save();
    reply.send(result);
  } catch (error) {
    reply.status(500).send(error);
  }
}
async function updateUser(request, reply) {
  try {
    const user = await User.findByIdAndUpdate(request.params.id, request.body, {
      new: true,
    });
    reply.send(user);
  } catch (error) {
    reply.status(500).send(error);
  }
}
async function deleteUser(request, reply) {
  try {
    await User.findByIdAndDelete(request.params.id);
    reply.status(203).send("");
  } catch (error) {
    reply.status(500).send(error);
  }
}
async function checkInUser(request, reply) {
  try {    
    const user = await User.findByIdAndUpdate(
      request.params.id,
      {
        $inc: { timesVisited: 1 }, // Increment the timesVisited property by 1
        $set: { lastVisited: new Date() } // Update lastVisited to the current date
      },
      { new: true }
    );
    reply.send(user);
  } catch (error) {
    reply.status(500).send(error);
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  checkInUser
};