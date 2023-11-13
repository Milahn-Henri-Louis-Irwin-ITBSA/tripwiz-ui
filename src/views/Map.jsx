import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { LayersControl, MapContainer, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { divIcon, point } from 'leaflet';
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
import DraggablePin from '@/components/DraggablePin';
import RoutingMachine from '@/components/RoutingControl';

const createClusterCustomIcon = (cluster) => {
  return new divIcon({
    html: `<span class='cluster-icon'>${cluster.getChildCount()}</span>`,
    className: 'custom-marker-cluster',
    iconSize: point(33, 33, true),
  });
};

const Map = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [showFeed, setShowFeed] = useState(true);
  const [showEvent, setShowEvent] = useState(true);
  const [mapZoom, setMapZoom] = useState(null);
  const [mapCenter, setMapCenter] = useState(null);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

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
      }
    };

    fetchUserLocation();
  }, []);

  const mapQuery = query(collection(db, 'map'), orderBy('created_at', 'desc'));

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

    if (mapContainer) {
      mapContainer.addEventListener('mousedown', handleMapClick);

      return () => {
        mapContainer.removeEventListener('mousedown', handleMapClick);
      };
    }
  }, [loading]);

  if (!mapCenter || !mapZoom) {
    return null;
  }

  return (
    <>
      <h1 className="text-8xl text-red-800">{loading ?? 'NOPE'}</h1>
      <TopLeftAdditionalIcons
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      />
      <TopRightAdditionalIcons showFeed={showFeed} setShowFeed={setShowFeed} />
      <BottomMiddleIcon showEvent={showEvent} setShowEvent={setShowEvent} />
      <Sidebar
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        setStart={setStart}
        setEnd={setEnd}
      />
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
            <RoutingMachine
              start={[-25.80795166171267, 28.30057740211487]}
              end={[-25.690109865847596, 28.369102478027347]}
              color={'red'}
            />
            {value.docs.map((marker) => (
              <DraggablePin
                coords={[
                  marker.data().coordinates.latitude,
                  marker.data().coordinates.longitude,
                ]}
                event={marker.data().event}
                key={
                  marker.id +
                  marker.data().coordinates.latitude +
                  marker.data().coordinates.longitude
                }
                pinID={marker.id}
                info={marker.data().info}
                created_by={marker.data().created_by}
              />
            ))}
          </MarkerClusterGroup>
        )}
      </MapContainer>
    </>
  );
};

export default Map;
