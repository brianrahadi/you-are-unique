"use strict";
const userController = require("../controllers/user.controller");

const fs = require("node:fs");
const util = require("node:util");
const { pipeline } = require("node:stream");
const pump = util.promisify(pipeline);

const OpenAI = require("openai");
const apiKey = process.env.OPENAI_API_KEY; // Replace with your actual API key
const openai = new OpenAI({ apiKey });

module.exports = async function (fastify, opts) {
  fastify.get("/", async function (request, reply) {
    return { root: true };
  });

  fastify.post("/", async function (request, reply) {
    console.log("HAHAH", request);
    return { root: 123 };
  });

  fastify.get("/user", userController.getAllUsers);
  fastify.get("/user/:id", userController.getUserById);
  fastify.post("/user", userController.createUser);
  fastify.put("/user/:id", userController.checkInUser);
  fastify.delete("/user/:id", userController.deleteUser);

  fastify.post("/record", async function (request, reply) {
    const data = await request.file();

    try {
      // Create new .wav file
      await pump(data.file, fs.createWriteStream(data.filename));
    } catch (error) {
      console.error("Error creating new audio file: ", error);
    }

    try {
      const { text: extractedName } = await openai.audio.transcriptions.create({
        file: fs.createReadStream(data.filename),
        model: "whisper-1",
        language: "en", // this is optional but helps the model
      });

      // Format name to firstname_lastname.wav
      const filenameWithExtractedName = extractedName
        .toLowerCase()
        .split(" ")
        .join("_");
      // Rename the file
      fs.rename(data.filename, `${filenameWithExtractedName}.wav`, (err) => {
        if (err) {
          console.error("Error renaming file:", err);
        } else {
          console.log("File renamed successfully");
        }
      });
    } catch (error) {
      console.error("Error extracting name from audio: ", error);
    }

    return { status: 200 };
  });
};
