import React from "react";
import { useLeopard } from "@picovoice/leopard-react";

export const VoiceWidget = () => {
  const {
    result,
    isLoaded,
    error,
    init,
    processFile,
    startRecording,
    stopRecording,
    isRecording,
  } = useLeopard();

  const initEngine = async () => {
    await init(
      "GQAsnpiXQz2Ru8lY/3DQy8em9/SBWlDfWlIbJ10oUL0dSo/a8AHADg==",
      { publicPath: "" },
      { enableAutomaticPunctuation: true }
    );
  };

  const toggleRecord = async () => {
    if (isRecording) {
      await stopRecording();
    } else {
      await startRecording();
    }
  };

  return (
    <div>
      {error && <p className="error-message">{error.toString()}</p>}
      <br />
      <button onClick={initEngine} disabled={isLoaded}>
        Initialize Leopard
      </button>
      <br />
      <br />
      <label htmlFor="audio-file">Choose audio file to transcribe:</label>
      <input
        id="audio-file"
        type="file"
        accept="audio/*"
        disabled={!isLoaded}
        onChange={async (e) => {
          if (!!e.target.files?.length) {
            await processFile(e.target.files[0]);
          }
        }}
      />
      <br />
      <label htmlFor="audio-record">Record audio to transcribe:</label>
      <button id="audio-record" disabled={!isLoaded} onClick={toggleRecord}>
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>
      <h3>Transcript:</h3>
      <p>{result?.transcript}</p>
    </div>
  );
};
