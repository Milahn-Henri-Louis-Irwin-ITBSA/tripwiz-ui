import { useState, useEffect, useCallback } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet';
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
import TourismPin from '@/components/TourismPin';

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
  const [tourismData, setTourismData] = useState([]);
  const [gettingUserLocation, setGettingUserLocation] = useState(false);

  const updateTourismData = (newData) => {
    setTourismData(newData);
  };
  const fetchUserLocation = async () => {
    try {
      return await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    } catch (error) {
      console.error('Error getting geolocation:', error);
    }
  };

  useEffect(() => {
    const setInitialMapCenter = async () => {
      const currentUserCoords = await fetchUserLocation();
      setMapCenter([
        currentUserCoords.coords.latitude,
        currentUserCoords.coords.longitude,
      ]);
      setMapZoom(13);
    };
    setInitialMapCenter();
  }, []);

  const mapQuery = query(collection(db, 'map'), orderBy('created_at', 'desc'));

  const [value, loading, error] = useCollection(mapQuery, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const initiateNavigate = useCallback(async (coords) => {
    setGettingUserLocation(true);
    const currentUserCoords = await fetchUserLocation();
    setStart([
      currentUserCoords.coords.latitude,
      currentUserCoords.coords.longitude,
    ]);
    setEnd(coords);
    setGettingUserLocation(false);
  }, []);

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
        updateTourismData={updateTourismData}
        setStart={setStart}
        setEnd={setEnd}
      />
      <MapEvents showEvent={showEvent} setShowEvent={setShowEvent} />
      <Feed showFeed={showFeed} setShowFeed={setShowFeed} />
      <UserInformation />
      {mapCenter && mapZoom && (
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
              {!gettingUserLocation && end && start && (
                <RoutingMachine start={start} end={end} color={'black'} />
              )}
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
              {tourismData.map((item, index) => (
                <TourismPin
                  key={item.coords.latitude + item.coords.longitude + index}
                  coords={[item.coords.latitude, item.coords.longitude]}
                  formattedAddress={item.formattedAddress}
                  types={item.types}
                  iconType={item.iconType}
                  initiateNavigate={initiateNavigate}
                  settingMapState={gettingUserLocation}
                />
              ))}
            </MarkerClusterGroup>
          )}
        </MapContainer>
      )}
    </>
  );
};

export default Map;
