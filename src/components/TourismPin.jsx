import { useState, useMemo, useRef } from 'react';
import pinDefault from '@/icons/download.png';
import hotel from '@/icons/Hotel.png';
import fuel from '@/icons/fuel.png';
import airport from '@/icons/airport.png';
import { Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/utils/firebase-config';

const customIcons = {
  fuel: fuel,
  airport: airport,
  hotel: hotel,
};

const createCustomIcon = (service) => {
  const iconUrl = customIcons[service] || pinDefault;
  return new Icon({
    iconUrl: iconUrl,
    iconSize: [60, 60],
  });
};
const TourismPin = ({ coords, event, pinID, info }) => {
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

          return;
        }
        if (marker != null) {
          setPosition(marker.getLatLng());
          updatePinCoords(marker.getLatLng()).then(() => {
            alert('Pin moved successfully');
          });
        }
      },
    }),
    []
  );

  return (
    <Marker
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
      icon={createCustomIcon(event)}
    >
      <Popup className="bg-transparent p-4 rounded-md ">
        <div className="text-lg mb-2">{info ?? 'No Info'}</div>
      </Popup>
    </Marker>
  );
};
export default TourismPin;
