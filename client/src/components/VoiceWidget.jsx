import { useState, useEffect } from "react";
import MicRecorder from "mic-recorder-to-mp3";

export const VoiceWidget = () => {
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

// import MicRecorder from "mic-recorder-to-mp3";
// import { useEffect } from "react";
// import { useState } from "react";

// export const VoiceWidget = () => {
//   const [isRecording, setIsRecording] = useState(false);
//   const [canRecord, setCanRecord] = useState(false);
//   const [MP3Recorder, setMP3Recorder] = useState(
//     new MicRecorder({ bitRate: 128 })
//   );

//   useEffect(() => {
//     navigator.getUserMedia(
//       { audio: true },
//       () => {
//         console.log("Permission Granted");
//         setCanRecord(true);
//         // this.setState({ isBlocked: false });
//       },
//       () => {
//         console.log("Permission Denied");
//         setCanRecord(false);
//       }
//     );
//   });

//   const onClickStartRecording = () => {
//     MP3Recorder.start()
//       .then(() => {
//         console.log("RECORDING");
//         // button.textContent = "Stop recording";
//         // button.classList.toggle("btn-danger");
//         // button.removeEventListener("click", startRecording);
//         // button.addEventListener("click", stopRecording);
//       })
//       .catch((e) => {
//         console.error(e);
//       });
//   };

//   const onClickStopRecording = () => {
//     MP3Recorder.stop()
//       .getMp3()
//       .then(([buffer, blob]) => {
//         console.log(buffer, blob);
//         setIsRecording(false);
//         const file = new File(buffer, "music.mp3", {
//           type: blob.type,
//           lastModified: Date.now(),
//         });

//         // const li = document.createElement("li");
//         // const player = new Audio(URL.createObjectURL(file));
//         // player.controls = true;
//         // li.appendChild(player);
//         // document.querySelector("#playlist").appendChild(li);

//         // button.textContent = "Start recording";
//         // button.classList.toggle("btn-danger");
//         // button.removeEventListener("click", stopRecording);
//         // button.addEventListener("click", startRecording);
//       })
//       .catch((e) => {
//         console.error(e);
//       });
//   };

//   return (
//     <article>
//       <button
//         onClick={isRecording ? onClickStartRecording : onClickStopRecording}
//         style={{ backgroundColor: isRecording ? "red" : "green" }}
//       >
//         {isRecording ? "Stop" : "Start"}
//       </button>
//       <p>
//         {canRecord
//           ? "You have permission to record"
//           : "You don't have permission to record"}
//       </p>
//     </article>
//   );
// };

// // const button = document.querySelector("button");

// // button.addEventListener("click", startRecording);

// // function startRecording() {}

// // function stopRecording() {

// // }
