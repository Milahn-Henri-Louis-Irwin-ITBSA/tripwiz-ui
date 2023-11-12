import { useState, useMemo, useRef, useCallback } from 'react';
import pinFire from '../icons/MapLocFire.png';
import pinAmbulance from '../icons/MapLocAmbulance.png';
import pinAnimal from '../icons/MapLocAnimal.png';
import pinPolice from '../icons/MapLocPolice.png';
import pinConstruction from '../icons/MapLocConstruction.png';
import pinDefault from '../icons/download.png';
import { Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '@/utils/firebase-config';
import { doc, updateDoc, GeoPoint } from 'firebase/firestore';
const eventIcons = {
  fire: pinFire,
  medical: pinAmbulance,
  animal: pinAnimal,
  police: pinPolice,
  construction: pinConstruction,
};

const createCustomIcon = (event) => {
  const iconUrl = eventIcons[event] || pinDefault;
  return new Icon({
    iconUrl: iconUrl,
    iconSize: [60, 60],
  });
};
const DraggablePin = ({ coords, event, pinID, created_by, info }) => {
  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState(coords);
  const markerRef = useRef(null);
  const [user] = useAuthState(auth);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        const currentUserUID = user.uid;
        if (currentUserUID !== created_by) {
          alert('You are not authorized to move this pin');
          marker.setLatLng(coords);
          setDraggable(false);

          return;
        }
        if (marker != null) {
          setPosition(marker.getLatLng());
          updatePinCoords(marker.getLatLng()).then(() => {
            alert('Pin moved successfully');
            setDraggable(false);
          });
        }
      },
    }),
    []
  );

  async function updatePinCoords(newCoords) {
    const marker = markerRef.current;
    const currentUserUID = user.uid;
    if (currentUserUID !== created_by) {
      alert('You are not authorized to move this pin');
      marker.setLatLng(coords);
      setDraggable(false);
      return;
    }
    if (marker != null) {
      setPosition(marker.getLatLng());
    }

    const docRef = doc(db, 'map', pinID);
    await updateDoc(docRef, {
      coordinates: new GeoPoint(newCoords.lat, newCoords.lng),
    });
  }
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
      icon={createCustomIcon(event)}
    >
      <Popup className="bg-transparent p-4 rounded-md ">
        <div className="text-lg mb-2">{info ?? 'No Info'}</div>
        <button
          className="bg-blue-500 text-white p-3  rounded-md flex items-center justify-center w-full"
          onClick={toggleDraggable}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="bi bi-geo-alt w-6 me-2"
            viewBox="0 0 16 16"
          >
            <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
            <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          </svg>
          <span className="text-base">
            {draggable ? 'Stop Dragging' : 'Drag Pin'}
          </span>
        </button>
      </Popup>
    </Marker>
  );
};
export default DraggablePin;
