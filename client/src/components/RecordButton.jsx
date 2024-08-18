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
      navigate('/'); // Navigate to home or another page
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
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold leading-6 text-gray-900"
                  >
                    Is this name correct?
                  </DialogTitle>

                  <input
                    id="price"
                    name="price"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full bg-white rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
<<<<<<< HEAD
                onClick={() => {
                  // send the data to DB here?
                  setOpen(false);
                  navigate("/");
                }}
                className="mt-3 inline-flex justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-green-500 sm:mt-0 sm:w-auto"
=======
                disabled={name === ''}
                onClick={handleSubmitName}
                className="mt-3 inline-flex justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  sm:mt-0 sm:w-auto"
>>>>>>> b13e9ac733947cf39e1f34a5bbdfb9b22f09e7b0
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

  const [Mp3Recorder, setMp3Recorder] = useState(
    new MicRecorder({ bitRate: 128 })
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

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
        // send the audio to backend here
        // if it's a new user, open the modal
        setIsModalOpen(true);
        // if it's an existing user, navigate to dashboard page and show the latest page
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

      {/* {isModalOpen && <Modal></Modal>} */}
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
