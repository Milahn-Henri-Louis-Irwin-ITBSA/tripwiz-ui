import { useState, useEffect, useCallback } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { divIcon, Icon, point } from 'leaflet';
import { collection, query, orderBy } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '@/utils/firebase-config';
import UserInformation from '@/components/ui/UserInformation';
import Sidebar from '@/components/Sidebar';
import Feed from '@/components/Feed';
import MapEvents from '@/components/MapEvents';
import TopLeftAdditionalIcons from '@/components/ui/TopLeftAdditionalIcons';
import TopRightAdditionalIcons from '@/components/ui/TopRightAdditionalIcons';
import BottomMiddleIcon from '@/components/ui/BottomMiddleIcon';
import pinFire from '../icons/MapLocFire.png';
import pinAmbulance from '../icons/MapLocAmbulance.png';
import pinAnimal from '../icons/MapLocAnimal.png';
import pinPolice from '../icons/MapLocPolice.png';
import pinConstruction from '../icons/MapLocConstruction.png';
import pinDefault from '../icons/download.png';

const createClusterCustomIcon = (cluster) => {
  return new divIcon({
    html: `<span class='cluster-icon'>${cluster.getChildCount()}</span>`,
    className: 'custom-marker-cluster',
    iconSize: point(33, 33, true),
  });
};

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

const initialMapCoordinates = [-28.4792625, 24.6727135];

const Map = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [showFeed, setShowFeed] = useState(true);
  const [showEvent, setShowEvent] = useState(true);
  const [mapZoom, setMapZoom] = useState(null);
  const [mapCenter, setMapCenter] = useState(null);

  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        setMapCenter([position.coords.latitude, position.coords.longitude]);
        setMapZoom(12);
      } catch (error) {
        console.error('Error getting geolocation:', error);
        // Handle the error accordingly, e.g., show a message to the user
      }
    };

    fetchUserLocation();
  }, []);

  const mapQuery = query(collection(db, 'map'), orderBy('created_at', 'desc'));

  const [value, loading, error] = useCollection(mapQuery, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const handleMapClick = useCallback(() => {
    setShowSidebar(false);
    setShowFeed(false);
    setShowEvent(false);
  }, []);

  useEffect(() => {
    const mapContainer = document.querySelector('.leaflet-container');

    if (mapContainer) {
      mapContainer.addEventListener('mousedown', handleMapClick);

      return () => {
        mapContainer.removeEventListener('mousedown', handleMapClick);
      };
    }
  }, [handleMapClick]);

  if (!mapCenter || !mapZoom) {
    return null;
  }

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
        center={mapCenter}
        zoom={mapZoom}
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
            {value.docs.map((marker) => (
              <Marker
                position={[
                  marker.data().coordinates.latitude,
                  marker.data().coordinates.longitude,
                ]}
                key={marker.id}
                icon={createCustomIcon(marker.data().event)}
              >
                <Popup>{marker.data().info}</Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        )}
      </MapContainer>
    </>
  );
};

export default Map;
