import { useState, useEffect } from "react";
import MicRecorder from "mic-recorder-to-mp3";
import axios from "axios";

export const VoiceWidget = () => {
  const [state, setState] = useState({
    isRecording: false,
    blobURL: "",
    isBlocked: false,
  });
  const [formData, setFormData] = useState();

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

  const stop = async () => {
    Mp3Recorder.stop()
      .getMp3()
      .then(async ([buffer, blob]) => {
        // Create a FormData object
        const blobData = new Blob(buffer, { type: "audio/ogg; codecs=opus" });
        const blobURL = URL.createObjectURL(blobData);
        setState({ blobURL, isRecording: false });

        const formData = new FormData();
        formData.append("recording", blobData, "please.wav");
        setFormData(formData);
      });
  };

  useEffect(() => {
    const fetchData = async (data) => {
      console.log(data);
      try {
        await axios.post("http://localhost:3000/record", data, {
          headers: {
            "Content-type": "multipart/form-data",
          },
        });
      } catch (error) {
        console.error(error);
      }
    };

    if (formData) {
      fetchData(formData);
      // const { success } = postData(formData);
    }
  }, [formData]);

  return (
    <div>
      <button onClick={start} disabled={state.isRecording}>
        Record
      </button>
      <button onClick={stop} disabled={!state.isRecording}>
        Stop
      </button>
      <audio src={state.blobURL} controls="controls" />
    </div>
  );
};
