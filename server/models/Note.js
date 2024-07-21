const mongoose = require ("mongoose");

const NoteSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    color:String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const NoteModel = mongoose.model("Note", NoteSchema);

module.exports = NoteModel;
