import React, { useState } from 'react';
import Police from '../assets/Police.png';
import Ambulance from '../assets/Ambulance.png';
import Fireman from '../assets/Fireman.png';
import Animal from '../assets/Animal.png';
import Roadwork from '../assets/Roadwork.png';
import { auth } from '@/utils/firebase-config';

export default function Feed({ showEvent, setShowEvent }) {
  const [selectedEvent, setSelectedEvent] = useState('');
  const [info, setInfo] = useState('');
  const [inputDisabled, setInputDisabled] = useState(true);

  async function retrieveUserCurrentCoordinates() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  async function handleSendOutAlert(event, { latitude, longitude }, token) {
    try {
      return await fetch(import.meta.env.VITE_ALERT_SERVICE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          event,
          coordinates: { long: longitude, lang: latitude },
          info: info,
        }),
      });
    } catch (e) {
      console.log(e);
    }
  }

  async function handlePlotMapViaService(
    event,
    { latitude, longitude },
    token
  ) {
    try {
      return await fetch(import.meta.env.VITE_MAP_SERVICE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          event,
          coordinates: { long: longitude, lang: latitude },
          info: info,
        }),
      });
    } catch (e) {
      console.log(e);
    }
  }

  async function handleAlertAndMap(event) {
    try {
      const { coords } = await retrieveUserCurrentCoordinates();
      const user = auth.currentUser;
      if (!user) alert('Please login');
      if (!coords) alert('Please enable location');
      const token = await auth.currentUser.getIdToken();
      return await Promise.all([
        handlePlotMapViaService(event, coords, token),
        handleSendOutAlert(event, coords, token),
      ]);
    } catch (e) {
      throw new Error(e);
    }
  }

  return (
    <div className="h-[23dvh] w-[30rem] absolute  bottom-5 right-[37.5%] z-[99999] bg-slate-100 rounded-3xl shadow-xl">
      <div className="h-1/4 p-1 bg-[#005DCA] rounded-l-3xl rounded-r-3xl rounded-br-none rounded-bl-none">
        <div className="h-full flex items-center justify-center">
          <h1 className="text-white text-2xl text-center  font-normal w-[90%] ps-4">
            Please Select Event
          </h1>
          <svg
            onClick={() => setShowEvent(false)}
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 16 16"
            className="cursor-pointer "
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
          </svg>
        </div>
      </div>
      <div className="h-3/4 flex flex-col p-4 ">
        <div className="grid grid-cols-5 gap-4 mb-2">
          <div
            className={`cursor-pointer ${
              selectedEvent === 'police' ? 'border-red-500' : ''
            }`}
            onClick={() => {
              setSelectedEvent('police');
              setInputDisabled(false);
            }}
          >
            <img src={Police} alt="Police" />
          </div>
          <div
            className={`cursor-pointer ${
              selectedEvent === 'fire' ? 'border-red-500' : ''
            }`}
            onClick={() => {
              setSelectedEvent('fire');
              setInputDisabled(false);
            }}
          >
            <img src={Fireman} alt="Fireman" />
          </div>
          <div
            className={`cursor-pointer ${
              selectedEvent === 'medical' ? 'border-red-500' : ''
            }`}
            onClick={() => {
              setSelectedEvent('medical');
              setInputDisabled(false);
            }}
          >
            <img src={Ambulance} alt="Ambulance" />
          </div>
          <div
            className={`cursor-pointer ${
              selectedEvent === 'construction' ? 'border-red-500' : ''
            }`}
            onClick={() => {
              setSelectedEvent('construction');
              setInputDisabled(false);
            }}
          >
            <img src={Roadwork} alt="Roadwork" />
          </div>
          <div
            className={`cursor-pointer ${
              selectedEvent === 'animal' ? 'border-red-500' : ''
            }`}
            onClick={() => {
              setSelectedEvent('animal');
              setInputDisabled(false);
            }}
          >
            <img src={Animal} alt="Animal" />
          </div>
        </div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (!selectedEvent) {
              alert('Please select an event');
              return;
            }
            if (!info) {
              alert('Please provide a short description');
              return;
            }
            await handleAlertAndMap(selectedEvent);
          }}
        >
          <div className="relative w-full">
            <input
              type="search"
              id="search-dropdown"
              disabled={inputDisabled}
              className="z-20 block w-full rounded-xl border border-l-2 p-2.5 text-sm bg-white text-gray-900 focus:outline-none disabled:bg-slate-200 disabled:cursor-not-allowed"
              placeholder="Short description of what happened"
              required
              value={info}
              onChange={(e) => setInfo(e.target.value)}
            />
            <button
              type="submit"
              disabled={!selectedEvent || !info}
              className="absolute right-0 top-0 h-full rounded-r-xl border border-[#005DCA] bg-[#005DCA] p-2.5 text-sm font-medium text-white  focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:cursor-not-allowed"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="h-4 w-4"
                viewBox="0 0 16 16"
              >
                <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
