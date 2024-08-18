import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import MicRecorder from "mic-recorder-to-mp3";
import iconMic from "../assets/icon_mic.svg";
import iconAudio from "../assets/icon_audio.svg";
import { useNavigate } from "react-router-dom";
import useCreateUser from "../hooks/create-user";
import axios from "axios";

const RecordingModal = (props) => {
  const { open, stop } = props;

  return (
    <Dialog open={open} onClose={() => {}} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-100 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />
      <button
        className={`rounded-full h-24 w-24 bg-green-600 outline-8 outline-green-300 outline fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex justify-center items-center`}
        onClick={stop}
      >
        <img src={iconAudio} alt="record"></img>
      </button>
    </Dialog>
  );
};

const Modal = (props) => {
  const { open, setOpen, namePassed, allUsersName } = props;
  const [name, setName] = useState(namePassed);
  const [submitted, setSubmitted] = useState(false);
  const { success, loading, error, createUser } = useCreateUser();
  // const [open, setOpen] = useState(true);

  const navigate = useNavigate();
  const handleSubmitName = async (e) => {
    e.preventDefault();
    await createUser(name);
    if (success) {
      setOpen(false);
      navigate("/"); // Navigate to home or another page
    }
  };

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold leading-6 text-gray-900 text-center"
                  >
                    Is this name correct?
                  </DialogTitle>

                  <input
                    id="price"
                    name="price"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                  />
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 grid grid-cols-2 sm:px-6 gap-4">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
              <button
                type="button"
                data-autofocus
                disabled={name === ""}
                onClick={handleSubmitName}
                className="mt-3 inline-flex justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300  sm:mt-0 sm:w-auto"
              >
                Confirm
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

const RecordButton = ({ allUsersName }) => {
  const [state, setState] = useState({
    isRecording: false,
    blobURL: "",
    isBlocked: false,
  });
  const [formData, setFormData] = useState();

  const [Mp3Recorder, setMp3Recorder] = useState(
    new MicRecorder({ bitRate: 128 })
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    navigator.getUserMedia(
      { audio: true },
      () => {
        console.log("Permission Granted");
        setState((prevState) => ({ ...prevState, isBlocked: false }));
      },
      () => {
        console.log("Permission Denied");
        setState((prevState) => ({ ...prevState, isBlocked: true }));
      }
    );
  }, []);

  const start = () => {
    if (state.isBlocked) {
      console.log("Permission Denied");
    } else {
      Mp3Recorder.start()
        .then(() => {
          setState((prevState) => ({ ...prevState, isRecording: true }));
        })
        .catch((e) => console.error(e));
    }
  };

  const stop = () => {
    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobData = new Blob(buffer, { type: "audio/ogg; codecs=opus" });
        const blobURL = URL.createObjectURL(blobData);
        setState((prevState) => ({
          ...prevState,
          blobURL,
          isRecording: false,
        }));

        // send the audio to backend here
        const formData = new FormData();
        formData.append("recording", blobData, "newRecording.wav");
        setFormData(formData);

        // Backend should respond with extracted name from audio
        // and other information like time of recording
        // If it's a new user, open the modal and confirm name and spelling
        setIsModalOpen(true);

        // if it's an existing user, navigate to dashboard page and show the latest person to checkin
      })
      .catch((e) => console.log(e));
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
    <>
      <button
        className={`rounded-full fixed bottom-4 right-4 h-24 w-24 bg-red-600 flex justify-center items-center`}
        onClick={start}
      >
        <img src={iconMic} alt="record"></img>
      </button>

      <RecordingModal open={state.isRecording} stop={stop} />

      <Modal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        allUsersName={allUsersName}
        namePassed="name"
      ></Modal>
    </>
  );
};

export default RecordButton;
