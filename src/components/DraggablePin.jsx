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
      <Popup className="bg-white p-4 rounded-md">
        <div className="text-lg mb-2">{info ?? 'No Info'}</div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={toggleDraggable}
        >
          {draggable ? 'Stop Dragging' : 'Drag'}
        </button>
      </Popup>
    </Marker>
  );
};
export default DraggablePin;
