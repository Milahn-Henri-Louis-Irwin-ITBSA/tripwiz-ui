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
import BottomMiddleIcon from '@/components/ui/BottomMiddleIcon';
// create custom icon
const customIcon = new Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/447/447031.png',
  // eslint-disable-next-line no-undef
  // iconUrl: require('./icons/download.png.png'),
  iconSize: [38, 38], // size of the icon
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
const markers = [
  {
    geocode: [-25.73134, 28.21837],
    popUp: 'Pretoria',
  },
  {
    geocode: [-33.9249, 18.4241],
    popUp: 'Cape Town',
  },
  {
    geocode: [-29.8587, 31.0218],
    popUp: 'Durban',
  },
];

const initialMapCoordinates = [-28.4792625, 24.6727135];

export default function Map() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [showFeed, setShowFeed] = useState(true);
  const [showEvent, setShowEvent] = useState(true);

  const handleMapClick = () => {
    setShowSidebar(false);
    setShowFeed(false);
    setShowEvent(false);
  };

  useEffect(() => {
    const mapContainer = document.querySelector('.leaflet-container');
    mapContainer.addEventListener('click', handleMapClick);

    return () => {
      mapContainer.removeEventListener('click', handleMapClick);
    };
  }, []);

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

        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createClusterCustomIcon}
        >
          {/* Mapping through the markers */}
          {markers.map((marker, indx) => (
            // eslint-disable-next-line react/jsx-key
            <Marker position={marker.geocode} key={indx} icon={customIcon}>
              <Popup>{marker.popUp}</Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </>
  );
}
