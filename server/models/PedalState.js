const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const knobSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    position: {
      type: Number,
      required: true,
    },
    knobType: {
      type: String,
      required: false,
    },
    knobValue: {
      type: [String],
      validate: {
        validator: function (values) {
          return values.every((val) => !mongoose.Types.ObjectId.isValid(val));
        },
         },
      default: [],
    },
  },
  { _id: false }
); 

const pedalSchema = new Schema({
  preset: {
    type: String,
    required: true,
    unique: false,
    trim: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  knobs: [knobSchema],
});

const PedalState = model("PedalState", pedalSchema);

module.exports = PedalState;
