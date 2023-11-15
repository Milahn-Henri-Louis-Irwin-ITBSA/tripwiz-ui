import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db, auth } from '@/utils/firebase-config';
import Logo from '@/icons/SidebarLogo.png';
import pinFire from '../icons/MapLocFire.png';
import pinAmbulance from '../icons/MapLocAmbulance.png';
import pinAnimal from '../icons/MapLocAnimal.png';
import pinPolice from '../icons/MapLocPolice.png';
import pinConstruction from '../icons/MapLocConstruction.png';

export default function Sidebar({
  showSidebar,
  setShowSidebar,
  setStart,
  setEnd,
}) {
  const [kmValues, setKmValues] = useState({
    kmValue: 1,
    kmValueFlights: 1,
  });
  const [eventCounts, setEventCounts] = useState({
    fire: 0,
    medical: 0,
    animal: 0,
    police: 0,
    construction: 0,
  });

  const [data, setData] = useState(null);

  async function retrieveUserCurrentCoordinates() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  const handleRangeChange = (e) => {
    setKmValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const fetchTourismData = async (service, radius) => {
    try {
      const position = await retrieveUserCurrentCoordinates();
      const { latitude, longitude } = position.coords;
      const token = await auth.currentUser.getIdToken();
      const response = await fetch(import.meta.env.VITE_MAP_SERVICE_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          coordinates: {
            latitude,
            longitude,
          },
          radius: radius * 1000,
          services: [service],
        }),
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        setData(jsonResponse.data);
      } else {
        throw new Error('Network response was not ok.');
      }
    } catch (error) {
      console.error('Fetch operation:', error.message);
    }
  };

  useEffect(() => {
    const collectionRef = collection(db, 'map');
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const counts = {
        fire: 0,
        medical: 0,
        animal: 0,
        police: 0,
        construction: 0,
      };
      snapshot.docs.forEach((doc) => {
        const eventData = doc.data();
        if (eventData.event) {
          counts[eventData.event]++;
        }
      });
      setEventCounts(counts);
    });

    return () => unsubscribe();
  }, []);

  if (!showSidebar) {
    return null;
  }

  const { kmValue, kmValueFlights } = kmValues;

  return (
    <div className="h-[95vh] w-[20rem] absolute left-5 top-5 z-[99999] bg-slate-100 rounded-3xl shadow-xl">
      <div className="h-1/5 pt-5 px-5 mb-6">
        <div className="h-[10px] pt-2 flex items-center justify-start">
          <svg
            onClick={() => setShowSidebar(false)}
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 16 16"
            className="cursor-pointer"
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
          </svg>
        </div>
        <div className="h-36 flex items-center justify-center ">
          <img
            id="logo"
            src={Logo}
            alt="logo"
            className=" rounded-full aspect-sqaure w-60"
          />
        </div>
      </div>
      <div className="h-4/5 flex flex-col justify-start items-center pb-4 px-2 font-bold">
        <div className="flex gap-5">
          <div className="text-center">
            <img src={pinFire} alt="Fire" className="w-9 mb-1" />
            <p className="text-blue-500 font-semibold text-lg">
              {eventCounts.fire}
            </p>
          </div>
          <div className=" text-center">
            <img src={pinAmbulance} alt="Fire" className="w-9 mb-1" />
            <p className="text-blue-500 font-semibold text-lg">
              {eventCounts.medical}
            </p>
          </div>
          <div className=" text-center">
            <img src={pinAnimal} alt="Fire" className="w-9 mb-1" />
            <p className="text-blue-500 font-semibold text-lg">
              {eventCounts.animal}
            </p>
          </div>
          <div className=" text-center">
            <img src={pinPolice} alt="Fire" className="w-9 mb-1" />
            <p className="text-blue-500 font-semibold text-lg">
              {eventCounts.police}
            </p>
          </div>
          <div className=" text-center">
            <img src={pinConstruction} alt="Fire" className="w-9 mb-1" />
            <p className="text-blue-500 font-semibold text-lg">
              {eventCounts.construction}
            </p>
          </div>
        </div>
        <div className="inline-flex items-center justify-center w-full mb-2">
          <hr className="w-64 h-1 my-8 bg-gray-600 border-0 rounded "></hr>
          <div className="absolute px-3 -translate-x-1/2 bg-slate-100 left-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="bi bi-globe-americas w-7 text-gray-600"
              viewBox="0 0 16 16"
            >
              <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM2.04 4.326c.325 1.329 2.532 2.54 3.717 3.19.48.263.793.434.743.484-.08.08-.162.158-.242.234-.416.396-.787.749-.758 1.266.035.634.618.824 1.214 1.017.577.188 1.168.38 1.286.983.082.417-.075.988-.22 1.52-.215.782-.406 1.48.22 1.48 1.5-.5 3.798-3.186 4-5 .138-1.243-2-2-3.5-2.5-.478-.16-.755.081-.99.284-.172.15-.322.279-.51.216-.445-.148-2.5-2-1.5-2.5.78-.39.952-.171 1.227.182.078.099.163.208.273.318.609.304.662-.132.723-.633.039-.322.081-.671.277-.867.434-.434 1.265-.791 2.028-1.12.712-.306 1.365-.587 1.579-.88A7 7 0 1 1 2.04 4.327Z" />
            </svg>
          </div>
        </div>

        <div className="flex mb-4">
          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-[#005DCA] border-2 border-[#005DCA] rounded-e-0  rounded-s-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="bi bi-geo w-4 text-white"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.319 1.319 0 0 0-.37.265.301.301 0 0 0-.057.09V14l.002.008a.147.147 0 0 0 .016.033.617.617 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.619.619 0 0 0 .146-.15.148.148 0 0 0 .015-.033L12 14v-.004a.301.301 0 0 0-.057-.09 1.318 1.318 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465-1.281 0-2.462-.172-3.34-.465-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411z"
              />
            </svg>
          </span>
          <input
            onInput={(e) => setStart(e.target.value)}
            type="text"
            id="starting-location"
            className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900  block flex-1 min-w-0 w-full text-sm p-2.5  focus:outline-none "
            placeholder="Starting Location"
          />
        </div>
        <div className="flex mb-4">
          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-[#005DCA] border-2 border-[#005DCA] rounded-e-0  rounded-s-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="bi bi-geo-fill w-4 text-white"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.319 1.319 0 0 0-.37.265.301.301 0 0 0-.057.09V14l.002.008a.147.147 0 0 0 .016.033.617.617 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.619.619 0 0 0 .146-.15.148.148 0 0 0 .015-.033L12 14v-.004a.301.301 0 0 0-.057-.09 1.318 1.318 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465-1.281 0-2.462-.172-3.34-.465-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411z"
              />
            </svg>
          </span>
          <input
            onInput={(e) => setEnd(e.target.value)}
            type="text"
            id="ending-location"
            className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900  block flex-1 min-w-0 w-full text-sm p-2.5  focus:outline-none "
            placeholder="Destination Location"
          />
        </div>
        <button className="bg-[#005DCA] text-white p-3  rounded-md flex items-center justify-center w-[16.25rem]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="bi bi-globe-americas w-5 me-2"
            viewBox="0 0 16 16"
          >
            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM2.04 4.326c.325 1.329 2.532 2.54 3.717 3.19.48.263.793.434.743.484-.08.08-.162.158-.242.234-.416.396-.787.749-.758 1.266.035.634.618.824 1.214 1.017.577.188 1.168.38 1.286.983.082.417-.075.988-.22 1.52-.215.782-.406 1.48.22 1.48 1.5-.5 3.798-3.186 4-5 .138-1.243-2-2-3.5-2.5-.478-.16-.755.081-.99.284-.172.15-.322.279-.51.216-.445-.148-2.5-2-1.5-2.5.78-.39.952-.171 1.227.182.078.099.163.208.273.318.609.304.662-.132.723-.633.039-.322.081-.671.277-.867.434-.434 1.265-.791 2.028-1.12.712-.306 1.365-.587 1.579-.88A7 7 0 1 1 2.04 4.327Z" />
          </svg>
          <span className="text-sm">Start Navigation</span>
        </button>

        <div className="inline-flex items-center justify-center w-full">
          <hr className="w-64 h-1 my-8 bg-gray-600 border-0 rounded "></hr>
          <div className="absolute px-3 -translate-x-1/2 bg-slate-100 left-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="bi bi-building-fill w-7 text-gray-600"
              viewBox="0 0 16 16"
            >
              <path d="M3 0a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h3v-3.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V16h3a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1H3Zm1 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3.5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5ZM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM7.5 5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5Zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM4.5 8h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5Zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3.5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5Z" />
            </svg>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="km-range" className="block text-gray-700 mb-1">
            Select a KM Range:{' '}
            <span className="text-blue-500 font-semibold ms-1">
              {kmValue} km
            </span>
          </label>
          <input
            type="range"
            id="km-range"
            name="kmValue"
            min="1"
            max="100"
            value={kmValues.kmValue}
            onChange={handleRangeChange}
            className="w-full h-4 bg-gray-300 rounded-full appearance-none focus:outline-none"
          />
        </div>

        <button
          className="bg-[#005DCA] text-white p-3 rounded-md flex items-center justify-center w-[16.25rem]"
          onClick={() => fetchTourismData('hotel')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="bi bi-building-fill w-5 text-white me-2"
            viewBox="0 0 16 16"
          >
            <path d="M3 0a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h3v-3.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V16h3a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1H3Zm1 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3.5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5ZM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM7.5 5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5Zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM4.5 8h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5Zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3.5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5Z" />
          </svg>
          <span className="text-sm">Show Hotels</span>
        </button>

        <div className="inline-flex items-center justify-center w-full">
          <hr className="w-64 h-1 my-8 bg-gray-600 border-0 rounded "></hr>
          <div className="absolute px-3 -translate-x-1/2 bg-slate-100 left-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="bi bi-airplane-fill w-6 text-gray-600"
              viewBox="0 0 16 16"
            >
              <path d="M6.428 1.151C6.708.591 7.213 0 8 0s1.292.592 1.572 1.151C9.861 1.73 10 2.431 10 3v3.691l5.17 2.585a1.5 1.5 0 0 1 .83 1.342V12a.5.5 0 0 1-.582.493l-5.507-.918-.375 2.253 1.318 1.318A.5.5 0 0 1 10.5 16h-5a.5.5 0 0 1-.354-.854l1.319-1.318-.376-2.253-5.507.918A.5.5 0 0 1 0 12v-1.382a1.5 1.5 0 0 1 .83-1.342L6 6.691V3c0-.568.14-1.271.428-1.849Z" />
            </svg>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="km-range" className="block text-gray-700 mb-1">
            Select a KM Range:{' '}
            <span className="text-blue-500 font-semibold ms-1">
              {kmValueFlights} km
            </span>
          </label>
          <input
            type="range"
            id="km-range-flights"
            name="kmValueFlights"
            min="1"
            max="100"
            value={kmValues.kmValueFlights}
            onChange={handleRangeChange}
            className="w-full h-4 bg-gray-300 rounded-full appearance-none focus:outline-none"
          />
        </div>

        <button
          className="bg-[#005DCA] text-white p-3 rounded-md flex items-center justify-center w-[16.25rem] "
          onClick={() => fetchTourismData('airport')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="bi bi-airplane-fill w-5 text-white me-2"
            viewBox="0 0 16 16"
          >
            <path d="M6.428 1.151C6.708.591 7.213 0 8 0s1.292.592 1.572 1.151C9.861 1.73 10 2.431 10 3v3.691l5.17 2.585a1.5 1.5 0 0 1 .83 1.342V12a.5.5 0 0 1-.582.493l-5.507-.918-.375 2.253 1.318 1.318A.5.5 0 0 1 10.5 16h-5a.5.5 0 0 1-.354-.854l1.319-1.318-.376-2.253-5.507.918A.5.5 0 0 1 0 12v-1.382a1.5 1.5 0 0 1 .83-1.342L6 6.691V3c0-.568.14-1.271.428-1.849Z" />
          </svg>
          <span className="text-sm">Show Airports</span>
        </button>
      </div>
      {data &&
        data.map((item, index) => (
          <div key={index} className="p-4 border-b border-gray-200">
            {{ item }}
          </div>
        ))}
    </div>
  );
}
