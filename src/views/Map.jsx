import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { divIcon, Icon, point } from 'leaflet';
import UserInformation from '@/components/ui/UserInformation';
import Sidebar from '@/components/Sidebar';
import Feed from '@/components/Feed';
import MapEvents from '@/components/MapEvents';
import TopLeftAdditionalIcons from '@/components/ui/TopLeftAdditionalIcons';
import TopRightAdditionalIcons from '@/components/ui/TopRightAdditionalIcons';
import { useState, useEffect } from 'react';
import { collection, limit, query, orderBy } from 'firebase/firestore';
import BottomMiddleIcon from '@/components/ui/BottomMiddleIcon';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '@/utils/firebase-config';
import MapPin from '../icons/MapLocFire.png';
// create custom icon
const customIcon = new Icon({
  // iconUrl: 'https://cdn-icons-png.flaticon.com/512/447/447031.png',
  iconUrl: MapPin,
  // eslint-disable-next-line no-undef
  iconSize: [60, 60],
});

// custom cluster icon
const createClusterCustomIcon = function (cluster) {
  return new divIcon({
    html: `<span class='cluster-icon'>${cluster.getChildCount()}</span>`,
    className: 'custom-marker-cluster',
    iconSize: point(33, 33, true),
  });
};

// markers
// const markers = [
//   {
//     geocode: [-25.73134, 28.21837],
//     popUp: 'Pretoria',
//   },
//   {
//     geocode: [-33.9249, 18.4241],
//     popUp: 'Cape Town',
//   },
//   {
//     geocode: [-29.8587, 31.0218],
//     popUp: 'Durban',
//   },
// ];

const initialMapCoordinates = [-28.4792625, 24.6727135];

export default function Map() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [showFeed, setShowFeed] = useState(true);
  const [showEvent, setShowEvent] = useState(true);
  const mapQuery = query(
    collection(db, 'map'),
    orderBy('created_at', 'asc'),
    limit(100)
  );
  const [value, loading, error] = useCollection(mapQuery, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const handleMapClick = () => {
    setShowSidebar(false);
    setShowFeed(false);
    setShowEvent(false);
  };

  useEffect(() => {
    const mapContainer = document.querySelector('.leaflet-container');
    if (!mapContainer) return;
    mapContainer.addEventListener('mousedown', handleMapClick);

    return () => {
      mapContainer.removeEventListener('mousedown', handleMapClick);
    };
  }, [loading]);

  return (
    <>
      <TopLeftAdditionalIcons
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      />
      <TopRightAdditionalIcons showFeed={showFeed} setShowFeed={setShowFeed} />
      <BottomMiddleIcon showEvent={showEvent} setShowEvent={setShowEvent} />
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <MapEvents showEvent={showEvent} setShowEvent={setShowEvent} />
      <Feed showFeed={showFeed} setShowFeed={setShowFeed} />
      <UserInformation />
      <MapContainer
        center={initialMapCoordinates}
        zoom={6}
        className="w-screen h-screen"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {!loading && !error && (
          <MarkerClusterGroup
            chunkedLoading
            iconCreateFunction={createClusterCustomIcon}
          >
            {/* Mapping through the markers */}
            {value.docs.map((marker) => (
              // eslint-disable-next-line react/jsx-key

              <Marker
                position={[
                  marker.data().coordinates.latitude,
                  marker.data().coordinates.longitude,
                ]}
                key={marker.id}
                icon={customIcon}
              >
                <Popup>{marker.data().event}</Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        )}
      </MapContainer>
    </>
  );
}
