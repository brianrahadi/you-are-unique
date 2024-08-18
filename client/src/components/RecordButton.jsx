import React, { useEffect, useState } from "react";
import MicRecorder from "mic-recorder-to-mp3";
import iconMic from "../assets/icon_mic.svg";
import iconAudio from "../assets/icon_audio.svg";

const RecordButton = () => {
  const [state, setState] = useState({
    isRecording: false,
    blobURL: "",
    isBlocked: false,
  });

  const [Mp3Recorder, setMp3Recorder] = useState(
    new MicRecorder({ bitRate: 128 })
  );

  useEffect(() => {
    navigator.getUserMedia(
      { audio: true },
      () => {
        console.log("Permission Granted");
        setState({ isBlocked: false });
      },
      () => {
        console.log("Permission Denied");
        setState({ isBlocked: true });
      }
    );
  }, []);

  const start = () => {
    if (state.isBlocked) {
      console.log("Permission Denied");
    } else {
      Mp3Recorder.start()
        .then(() => {
          setState({ isRecording: true });
        })
        .catch((e) => console.error(e));
    }
  };

  const stop = () => {
    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob);
        setState({ blobURL, isRecording: false });
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      {/* <audio src={state.blobURL} controls="controls" /> */}

      <button
        className={`rounded-full fixed bottom-4 right-4 h-24 w-24 ${
          state.isRecording
            ? "bg-green-600 outline-8 outline-green-300 outline"
            : "bg-red-600"
        }`}
        onClick={state.isRecording ? stop : start}
      >
        <img src={state.isRecording ? iconAudio : iconMic} alt="record"></img>
      </button>
    </>
  );
};

export default RecordButton;
