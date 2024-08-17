const fs = require("fs");
const wav = require("node-wav");
const math = require("mathjs");
const DTW = require("dynamic-time-warping");

// Load WAV file and extract audio data
function loadWavFile(filePath) {
  try {
    const buffer = fs.readFileSync(filePath);
    const result = wav.decode(buffer);

    // Debugging: Print the result to understand its structure
    // console.log("WAV decode result:", result);

    if (!result || !result.channelData || !result.channelData[0]) {
      throw new Error("Invalid WAV file or unsupported format.");
    }

    return result.channelData[0]; // This should be an array of audio samples
  } catch (error) {
    console.error("Error loading WAV file:", error.message);
    return [];
  }
}

// Calculate the mean of an array of numbers
function mean(array) {
  return math.mean(array);
}

// Compare two audio arrays
function compareAudioArrays(array1, array2) {
  if (!Array.isArray(array1) || !Array.isArray(array2)) {
    console.error("Invalid audio data arrays.");
    return;
  }

  // const dtw = new DTW(array1, array2);
  // const distance = dtw.getDistance();

  // console.log(`DTW Distance between the two audio signals: ${distance}`);

  // For simplicity, just compare the mean values of the audio signal
  const mean1 = mean(array1);
  const mean2 = mean(array2);
  const distance = Math.abs(mean1 - mean2);

  console.log(`Distance between the two audio signals: ${distance}`);

  // Define a threshold to decide if the files are similar
  const threshold = 0.000025; // Adjust based on experimentation
  if (distance < threshold) {
    console.log("The audio files are likely spoken by the same person.");
  } else {
    console.log("The audio files are likely spoken by different people.");
  }
}

// Main function to compare two audio files
function compareAudioFiles(file1, file2) {
  const audio1 = loadWavFile(file1);
  const audio2 = loadWavFile(file2);
  compareAudioArrays(Array.from(audio1), Array.from(audio2));
}

// Example usage
const audioFile1 = "./timothy2.wav";
const audioFile2 = "./timothy.wav";

compareAudioFiles(audioFile1, audioFile2);
