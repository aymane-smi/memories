const mongoose          = require("mongoose"),
      postMessageSchema = new mongoose.Schema({
          title: String,
          message: String,
          creator: String,
          tags: [String],
          selectedFile: String,
          likeCount:{
              type: Number,
              default: 0
          },
          createAt:{
              type: Date,
              default: Date.now()
          }
      });

const model = mongoose.model("Post", postMessageSchema);

module.exports = model;