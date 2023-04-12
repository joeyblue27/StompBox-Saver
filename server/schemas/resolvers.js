const { PedalState, User } = require("../models");
const { signToken } = require("../utils/auth"); // Import the signToken function
const { AuthenticationError } = require("apollo-server-express");
const mongoose = require("mongoose");

const resolvers = {
  Query: {
    pedalsettings: async (parent, { userId }, context) => {
      try {
        const { user } = context;
        if (!user) {
          throw new AuthenticationError("You need to be logged in!");
        }
        const pedalsettings = await PedalState.find({ userId: userId });
        return pedalsettings;
      } catch (error) {
        console.error("Error fetching", error);
        throw new Error("Error fetching");
      }
    },

    pedalsetting: async (parent, { pedalsettingId }, context) => {
      try {
        const { user } = context;
        if (!user) {
          throw new AuthenticationError("You need to be logged in!");
        }
        return PedalState.findOne({ _id: pedalsettingId, userId: user._id });
      } catch (error) {
        console.error("Error fetching pedalsetting:", error);
        throw new Error("Error fetching pedalsetting.");
      }
    },

    me: async (parent, args, context) => {
      try {
        const { user } = context;
        if (!user) {
          throw new AuthenticationError("You need to be logged in!");
        }
        return User.findOne({ _id: user._id });
      } catch (error) {
        console.error("Error fetching user:", error);
        throw new Error("Error fetching user.");
      }
    },
  },

  Mutation: {
    addUser: async (parent, { email, username, password }) => {
      const user = await User.create({
        email,
        username,
        password,
      });
      const token = signToken(user);

      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user with this email found!");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }

      const token = signToken(user);
      return { token, user };
    },

    

    addpedalInfo: async (parent, { preset, userId }, context) => {
      try {
        const { user } = context;
        if (!user) {
          throw new AuthenticationError("You need to be logged in!");
        }
        const pedalsetting = await PedalState.create({ preset, userId });
        await User.findOneAndUpdate(
          { _id: userId },
          { $addToSet: { pedalsettings: pedalsetting._id } }
        );
        return pedalsetting;
      } catch (error) {
        console.error("Error adding pedalsetting:", error);
        throw new Error("Error adding pedalsetting.");
      }
    },

    updatepedalInfo: async (
      parent,
      { pedalsettingId, preset, knobs, userId },
      context
    ) => {
      try {
        const { user } = context;
        if (!user && !userId) {
          throw new AuthenticationError(
            "log in"
          );
        }

        const pedalsetting = await PedalState.findOne({
          _id: pedalsettingId,
          userId: userId || user._id,
        });

        if (!pedalsetting) {
          throw new Error(
            "not found! "
          );
        }

        console.log("Before update:", knobs); 
        const update = { ...(preset && { preset }), ...(knobs && { knobs }) };
        console.log("After update:", update.knobs); 

        const updatedpedalInfo = await PedalState.findOneAndUpdate(
          { _id: pedalsettingId },
          { $set: update },
          { new: true }
        );

        return updatedpedalInfo;
      } catch (error) {
        console.error("Not found", error);
        throw new Error("Not found");
      }
    },

    deletepedalInfo: async (parent, { pedalsettingId, userId }, context) => {
      try {
        const { user } = context;
        if (!user) {
          throw new AuthenticationError(
            "log in"
          );
        }
        const pedalsetting = await PedalState.findOne({
          _id: pedalsettingId,
          userId: userId,
        });

        if (!pedalsetting) {
          throw new Error(
            "not found"
          );
        }
        return PedalState.findOneAndDelete({ _id: pedalsettingId });
      } catch (error) {
        console.error("not found", error);
        throw new Error("not found");
      }
    },
  },

  User: {
    pedalsettings: async (parent) => {
      try {
        return await PedalState.find({ user: parent._id });
      } catch (error) {
        console.error("not found", error);
        throw new Error("not found");
      }
    },
  },
};

module.exports = resolvers;
