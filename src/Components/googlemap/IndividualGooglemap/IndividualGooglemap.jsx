



import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  Polygon,
  Tooltip,
  Circle,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import IndividualNav from "./individualNav/IndividualNav.jsx";
import IndividualInfo from "./IndividualInfo/IndividualInfo";
import PlayBar from "./PlayBar/PlayBar.jsx";

import carIcon from "../SVG/car-s.png";
import motorcycleIcon from "../SVG/bike-s.png";
import JCBIcon from "../SVG/jcb-s.png";
import truckIcon from "../SVG/truck-s.png";
import autoIcon from "../SVG/auto-s.png";

// import truckIconTop from "../SVG/Vehicle Top View/Truck/Truck-Y.png";
import truckIconTop from "../SVG/truck-s.png";
// import motorcycleIconTop from "../SVG/Vehicle Top View/Bike/Bike-R.png";
import motorcycleIconTop from "../SVG/bike-s.png";

// import carIconTop from "../SVG/Vehicle Top View/Car/Car-R.png";
import carIconTop from "../SVG/car-s.png";

// import JCBIconTop from "../SVG/Vehicle Top View/JCB/JCB-Y.png";
import JCBIconTop from  "../SVG/jcb-s.png";

// import TractorIconTop from "../SVG/Vehicle Top View/Tractor/Tractor-G.png";
import TractorIconTop from "../SVG/truck-s.png";

// import AutoIconTop from "../SVG/Vehicle Top View/Auto/Auto-O.png";
import AutoIconTop from "../SVG/auto-s.png";
// import pointerIcon from "../SVG/pointer.svg";
// import pointerIcon from "../SVG/locationimg.jpg";
import pointerIcon from "../SVG/stopp.png";
// import "leaflet-fullscreen/dist/Leaflet.fullscreen";
import axios from "axios";
import { MdLocationPin, MdAccessTime } from "react-icons/md";
import { FcAlarmClock } from "react-icons/fc";
import { FaTruck } from "react-icons/fa";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { PiPlugsFill } from "react-icons/pi";
import "./IndividualGooglemap.css";
// import BottomSlider from "./BottomSlider/BottomSlider.jsx";
import dayjs from "dayjs";
import GeoFencing from "../../GeoFencing/GeoFencing.jsx";
import Calender from "./Calender.jsx";
import { Button } from "@mui/material";
import redimg from "../SVG/redflag.jpg";
import greenimg from "../SVG/OIP.jpg";
import green from "../SVG/green.png";
import red from "../SVG/red.png";
import clockimg from "../SVG/clockimg.png";
import { FaDownload } from "react-icons/fa";
import { FaUpload } from "react-icons/fa";
import { GiDuration } from "react-icons/gi";
import { FaRoad } from "react-icons/fa";
// import fs from "fs";
import * as XLSX from "xlsx";
// import Loader from "../../Loader/Loader.jsx";
// import AnimeLoader from "../../Loader/AnimeLoader.jsx";

// import loadingPerson from "../../../assets/LoadingPerson.json"

const car = new L.Icon({
  iconUrl: carIcon,
  iconSize: [35, 45],
  iconAnchor: [17, 45],
  popupAnchor: [0, -30],
});
const truck = new L.Icon({
  iconUrl: truckIcon,
  iconSize: [35, 45],
  iconAnchor: [17, 45],
  popupAnchor: [0, -30],
});
const motorcycle = new L.Icon({
  iconUrl: motorcycleIcon,
  iconSize: [35, 45],
  iconAnchor: [17, 45],
  popupAnchor: [0, -30],
});

const auto = new L.Icon({
  iconUrl: autoIcon,
  iconSize: [35, 45],
  iconAnchor: [17, 45],
  popupAnchor: [0, -30],
});

const jcb = new L.Icon({
  iconUrl: JCBIcon,
  iconSize: [35, 45],
  iconAnchor: [17, 45],
  popupAnchor: [0, -30],
});

// TOP VIEW ICONS ===============================

const jcbTop = new L.Icon({
  iconUrl: JCBIconTop,
  iconSize: [35, 45],
  iconAnchor: [17, 45],
  popupAnchor: [0, -30],
});

const autoTop = new L.Icon({
  iconUrl: AutoIconTop,
  iconSize: [35, 45],
  iconAnchor: [17, 45],
  popupAnchor: [0, -30],
});

const tractorTop = new L.Icon({
  iconUrl: TractorIconTop,
  iconSize: [35, 45],
  iconAnchor: [17, 45],
  popupAnchor: [0, -30],
});

const truckTop = new L.Icon({
  iconUrl: truckIconTop,
  iconSize: [35, 45],
  iconAnchor: [17, 45],
  popupAnchor: [0, -30],
});

const carTop = new L.Icon({
  iconUrl: carIconTop,
  iconSize: [35, 45],
  iconAnchor: [17, 45],
  popupAnchor: [0, -30],
});

const motorcycleTop = new L.Icon({
  iconUrl: motorcycleIconTop,
  iconSize: [35, 45],
  iconAnchor: [17, 45],
  popupAnchor: [0, -30],
});

const pointer = new L.Icon({
  iconUrl: pointerIcon,
  iconSize: [35, 45],
  iconAnchor: [17, 45],
  popupAnchor: [0, -30],
});

const osmProvider = {
  url: "https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=jXbNOuobzSRdq08XiuKY",
  attribution:
    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
};

const initialCenter = {
  lat: 19.9606,
  lng: 79.2961,
};



const PopupElement = ({ icon, imgSrc, text }) => (
  <div className="popupElement">
    <div>
      {imgSrc ? (
        <img
          src={imgSrc}
          alt="Icon"
          style={{ width: "20px", height: "20px" }}
        />
      ) : (
        icon
      )}
    </div>
    <span style={{ fontSize: "0.9rem", color: "black" }}>{text}</span>
  </div>
);
function IndividualGooglemap({ data, setIndividualMap, individualDataObj }) {
  // const map = useMap();
  const [showPlayBar, setShowPlayBar] = useState(false);
  const [center, setCenter] = useState(initialCenter);
  const [address, setAddress] = useState("");
  const ZOOM_LEVEL = 16;
  const mapRef = useRef();
  const [startDateTime, setStartDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);
  const [playbackData, setPlaybackData] = useState();
  const [wait, setWait] = useState("Loading...");
  const [animatedMarkerPosition, setAnimatedMarkerPosition] = useState(null);
  const [stoppedPositions, setStoppedPositions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [count, setCount] = useState(0);
  const [geofenceData, setGeofenceData] = useState();
  const [isStopped, setIsStopped] = useState(false);
  const [isPlaybacking, setIsPlaybacking] = useState(false);
  const [isCalender, setIsCalender] = useState(false);
  const [liveTrackPoints, setLiveTrackPoints] = useState(null);
  const [points, setPoints] = useState([]);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  

  const getIconByCategoryTop = (category) => {
    switch (category) {
      case "car":
        return carTop;
      case "truck":
        return truckTop;
      case "motorcycle":
        return motorcycleTop;
      case "auto":
        return autoTop;
      case "tractor":
        return tractorTop;
      case "jcb":
        return jcbTop;
      default:
        return carTop;
    }
  };

  //new api data fetch
//   async function fetchData() {
//     const apiUrl = 'https://rocketsalestracker.com/api/reports/stops?deviceId=2431&from=2024-08-17T18%3A30%3A00.000Z&to=2024-08-24T18%3A29%3A59.999Z';

//     try {
//         // Make a request to the API
//         const response = await fetch(apiUrl);

//         // Check if the response is OK
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         // Parse the JSON data
//         const data = await response.json();

//         // Process the data
//         data.forEach(entry => {
//             console.log(`Device ID: ${entry.deviceId}`);
//             console.log(`Device Name: ${entry.deviceName}`);
//             console.log(`Start Time: ${entry.startTime}`);
//             console.log(`End Time: ${entry.endTime}`);
//             console.log(`Duration: ${entry.duration / 1000} seconds`);
//             console.log(`Latitude: ${entry.latitude}`);
//             console.log(`Longitude: ${entry.longitude}`);
//             console.log('---');
//         });

//         return data;

//     } catch (error) {
//         console.error('Error fetching data:', error);
//         return [];
//     }
// }

// // Call the function
// fetchData();

  //polyline points for live tracking
  useEffect(() => {
    setPoints((prevPoints) => [
      ...prevPoints,
      [individualDataObj.latitude, individualDataObj.longitude],
    ]);
  }, [individualDataObj.latitude, individualDataObj.longitude]);

  // console.log("startDate end Date", startDateTime, endDateTime);
  // console.log("isCalneder", isCalender);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  

  const fetchAddress = useCallback(async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      if (data.address) {
        setAddress(
          `${data.address.neighbourhood || ""}, ${data.address.city || ""}, ${
            data.address.state || ""
          }, ${data.address.postcode || ""}`
        );
      } else {
        setError("No address details available");
      }
      console.log(data);
    } catch (error) {
      setError("Error fetching address");
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (individualDataObj.latitude && individualDataObj.longitude) {
      fetchAddress(individualDataObj.latitude, individualDataObj.longitude);
    }
  }, [individualDataObj.latitude, individualDataObj.longitude, fetchAddress]);

  const fetchPlaybackData = async () => {
    isPlaybacking === false
      ? setIsPlaybacking(true)
      : setIsPlaybacking(false) &&
        setPlaybackData(null) &&
        setGeofenceData(null);

    try {
      const username = "test";
      const password = "123456";
      const token = btoa(`${username}:${password}`);
      const response1 = await axios.get(
        `https://rocketsalestracker.com/api/positions?deviceId=${individualDataObj.deviceId}&from=${startDateTime}&to=${endDateTime}`,
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
        }
      );
      setPlaybackData(response1.data);
      console.log(
        "device id =====================",
        individualDataObj.deviceId
      );
      console.log("startDateTime =====================", startDateTime);
      console.log("endDateTime =====================", endDateTime);
    } catch (error) {
      console.error("Error fetching device data:", error);
    }

    try {
      const username = "test";
      const password = "123456";
      const token = btoa(`${username}:${password}`);
      const response2 = await axios.get(
        `https://rocketsalestracker.com/api/geofences`,
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
        }
      );
      setGeofenceData(response2.data);
    } catch (error) {
      console.error("Error fetching geofence data:", error);
    }
    
  };
  
  // console.log("geofencingngg", geofenceData);

  const pairedArray = playbackData
    ? playbackData.map((row) => [row.latitude, row.longitude, row.course]) // Ensure course is included
    : [];

  // Use the course from the playback data to create custom icons
  const createCustomIcon = (heading, iconUrl) => {
    return L.divIcon({
      className: "custom-icon",
      html: `
      <div style="
        width: 35px; height: 45px;
        background: url(${iconUrl}) no-repeat center center;
        background-size: contain;
        transform: rotate(${heading}deg);
        transform-origin: center center;
      "></div>
    `,
      iconSize: [35, 45],
      iconAnchor: [17, 45],
    });
  };

  const handleDateTimeChange = (newValue) => {
    const formattedStartDateTime = newValue[0]
      ? dayjs(newValue[0]).toISOString()
      : null;
    const formattedEndDateTime = newValue[1]
      ? dayjs(newValue[1]).toISOString()
      : null;

    setStartDateTime(formattedStartDateTime);
    setEndDateTime(formattedEndDateTime);
  };

  useEffect(() => {
    if (individualDataObj.latitude && individualDataObj.longitude) {
      fetchAddress(individualDataObj.latitude, individualDataObj.longitude);
    }
  }, [individualDataObj.latitude, individualDataObj.longitude]);

  const getIconByCategory = (category) => {
    switch (category) {
      case "car":
        return car;
      case "truck":
        return truck;
      case "motorcycle":
        return motorcycle;
      case "auto":
        return auto;
      case "jcb":
        return jcb;
      default:
        return car;
    }
  };

  

  const startAnimation = () => {
    if (isAnimating) {
      setIsAnimating(false);
    } else {
      setIsAnimating(true);
      setCurrentIndex(0);
    }
  };

  const showMyLocation = useCallback((lati, longi) => {
    mapRef.current.flyTo([lati, longi], ZOOM_LEVEL, {
      animate: true,
      duration: 2,
    });
  }, []);

  const showMyLocationIndividual = useCallback((lati, longi) => {
    const map = mapRef.current;
    map.setView([lati, longi], 22, {
      animate: true,
      duration: 2,
    });
  }, []);
  let locate;

  const calculateHeading = (startLatLng, endLatLng) => {
    if (
      !startLatLng ||
      !endLatLng ||
      startLatLng.length < 2 ||
      endLatLng.length < 2
    ) {
      // Return 0 or any default heading if input is invalid
      return 0;
    }

    const startLat = (startLatLng[0] * Math.PI) / 180;
    const startLng = (startLatLng[1] * Math.PI) / 180;
    const endLat = (endLatLng[0] * Math.PI) / 180;
    const endLng = (endLatLng[1] * Math.PI) / 180;

    const dLon = endLng - startLng;
    const y = Math.sin(dLon) * Math.cos(endLat);
    const x =
      Math.cos(startLat) * Math.sin(endLat) -
      Math.sin(startLat) * Math.cos(endLat) * Math.cos(dLon);
    const heading = Math.atan2(y, x);

    return (heading * 180) / Math.PI;
  };

  

  useEffect(() => {
    let interval;
    if (isAnimating && pairedArray.length > 1) {
      setAnimatedMarkerPosition(pairedArray[0]);
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const newIndex = prevIndex + 1;
          if (newIndex < pairedArray.length) {
            const startPos = pairedArray[newIndex - 1];
            const endPos = pairedArray[newIndex];
            const heading = endPos[2]; // Use course from API
            setAnimatedMarkerPosition(endPos);
            locate = endPos;
            showMyLocationIndividual(locate[0], locate[1]);

            return newIndex;
          } else {
            clearInterval(interval);
            setIsAnimating(false);
            return prevIndex;
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isAnimating]);

  //================================================================================================================================================================================

  

  useEffect(() => {
    if (!isAnimating) return;
    setProgress((currentIndex / (pairedArray.length - 1)) * 100);
  }, [currentIndex, pairedArray.length, isAnimating]);

  const setAnimationProgress = (progress) => {
    const index = Math.floor((progress / 100) * (pairedArray.length - 1));
    setCurrentIndex(index);
    setAnimatedMarkerPosition(pairedArray[index]);
  };

  // Logic for stop points
  useEffect(() => {
    let resetTime = null;
    let count = 0;
    let latitude;
    let longitude;

    if (playbackData) {
      console.log("this is for stop data : ", playbackData);
      const stopPoints = playbackData.reduce((acc, row, index) => {
        if (index == 0 && resetTime == null) {
          resetTime = new Date(row.deviceTime);
          count += 1;
          latitude = row.latitude;
          longitude = row.longitude;
          acc.push({
            startTime: resetTime,
            latitude: row.latitude,
            longitude: row.longitude,
            index: count,
          });

          resetTime = null;
        } else if (
          index !== playbackData.length - 1 &&
          row.attributes?.ignition === false &&
          resetTime == null
        ) {
          resetTime = new Date(row.deviceTime);
          count += 1;
          latitude = row.latitude;
          longitude = row.longitude;
        } else if (row.attributes.ignition && resetTime !== null) {
          let ignitionOnTime = new Date(row.deviceTime);
          let duration = ignitionOnTime - resetTime;

          let Hrs = Math.floor(duration / (1000 * 60 * 60));
          let Mins = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
          let Sec = Math.floor((duration % (1000 * 60)) / 1000);

          acc.push({
            latitude: row.latitude,
            longitude: row.longitude,
            duration: `${Hrs}:${Mins}:${Sec}`,
            index: count,
            arrivalTime: resetTime,
            departureTime: ignitionOnTime,
          });

          resetTime = null;
        } else if (index == playbackData.length - 1) {
          resetTime = new Date(row.deviceTime);
          count += 1;
          latitude = row.latitude;
          longitude = row.longitude;
          acc.push({
            endTime: resetTime,
            latitude: row.latitude,
            longitude: row.longitude,
            index: count,
          });

          resetTime = null;
        }
        return acc;
      }, []);

      

      console.log("This is stop poinst : ", stopPoints);
      setStoppedPositions(stopPoints);
      mapRef.current.flyTo([playbackData[0].latitude, playbackData[0].longitude], 14, {
        animate: true,
        duration: 3,
      });

    }
  }, [playbackData]);

  //geofencing function
  const parseGeoFenceCoordinates = (area) => {
    const coordinates = [];

    if (area.startsWith("POLYGON")) {
      // Extract coordinates for POLYGON format
      const polygonPoints = area.match(/\d+\.\d+\s\d+\.\d+/g);
      if (polygonPoints) {
        polygonPoints.forEach((point) => {
          const [lat, lng] = point.split(" ").map((coord) => parseFloat(coord));
          coordinates.push([lat, lng]);
        });
      }
    } else if (area.startsWith("CIRCLE")) {
      // Extract coordinates for CIRCLE format
      const circleParts = area.match(/\d+\.\d+/g);
      if (circleParts && circleParts.length >= 3) {
        const [lat, lng, radius] = circleParts.map((coord) =>
          parseFloat(coord)
        );
        // Return coordinates as array with lat, lng, and radius
        coordinates.push([lat, lng, radius]);
      }
    }

    return coordinates;
  };
  const handleCutHistory = () => {
    setShowPlayBar(false);
    setIsCalender(false);
    setIsPlaybacking(false);
    setIsAnimating(false);
  };

  const [livetrack, setLivetrack] = useState(false);
  const handleLive = () => {};
 
  const createPointerIcon = (index, total) => {
    // Determine the icon URL based on index
    const iconUrl =
      index === 0 ? green : index === total - 1 ? red : pointerIcon;

    return L.divIcon({
      className: "custom-pointer-icon",
      html: `
        <div style="
          position: relative;
          width: 35px;
          height: 45px;
          background: url(${iconUrl}) no-repeat center center;
          background-size: contain;
        ">
          <span style="
            position: absolute;
            bottom: 11px;
            left: 50%;
            transform: translateX(-50%);
            color: #fff;
            font-size: 14px;
            font-weight: bold;

            background-color: transparent;
            padding: 2px 5px;
            border-radius: 3px;
          ">
            ${index + 1}
          </span>
        </div>
      `,
      iconSize: [35, 45],
      iconAnchor: [17, 45],
      popupAnchor: [0, -30],
    });
  };




  return (
    <>
     
      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          marginLeft: "0.5rem",
          marginBottom: "5px",
        }}
      >
        <div
          style={{ fontSize: "20px", marginleft: "63px", fontweight: "bold" }}
        >
          History
        </div>
        {isCalender && (
          <Calender
            style={{ padding: "2px" }}
            setStartDateTime={setStartDateTime}
            setEndDateTime={setEndDateTime}
          />
        )}

        {isCalender && (
          <Button
            variant="contained"
            sx={{
              color: "#000000",
              // background: "linear-gradient(235deg, #f6e5c1, #8d8d8d)",
              background: "#f4d24a",
              "&:hover": {
                backgroundColor: "#1a242f",
              },
            }}
            style={{ height: "2.7rem", marginTop: "6px" }}
            onClick={fetchPlaybackData}
          >
            Search
          </Button>
        )}
        {isCalender && (
          <button className="cutHistory newclass" onClick={handleCutHistory}>
            Go Back
          </button>
        )}
      </div>

      <div className="mapContainer">
        <MapContainer
          center={center}
          zoom={7}
          ref={mapRef}
          style={{
            height: "500px",
            width: "99vw",
            border: "3px solid #f4d24a",
            // borderRadius: "6px",
            marginBottom: "10px",
            marginLeft: "0.75px",
          }}
        >
          <TileLayer
            url={osmProvider.url}
            attribution={osmProvider.attribution}
          />

          <Marker
            position={[individualDataObj.latitude, individualDataObj.longitude]}
            icon={getIconByCategory(individualDataObj.category)}
          >
            <Popup style={{ fontSize: "1.1rem", color: "black" }}>
              <div className="popup" style={{ height: "250px" }}>
                <div className="tooltipHead" style={{ marginBottom: "8px" }}>
                  <div className="tooltipNamePlate">
                    {/* <div className="ind">
                        <p>IND</p>
                      </div> */}
                    <div className="name">
                      <p style={{ marginRight: "16px" }}>
                        {individualDataObj.name}
                      </p>
                    </div>
                    <GeoFencing className="geoFence" />
                  </div>
                </div>
                <div className="popupInfo">
                
                  <PopupElement
                    imgSrc={clockimg} // Use image source
                    text="12/07/2024 12:51:46"
                  />
                  <PopupElement
                    icon={<PiPlugsFill style={{ color: "black" }} />}
                    text={
                      individualDataObj.ignition
                        ? "Ignition On"
                        : "Ignition Off"
                    }
                  />
                  <PopupElement
                    icon={<FaTruck style={{ color: "black" }} />}
                    text={`${individualDataObj.speed} kmph`}
                  />
                  {/* <PopupElement
                      icon={<MdAccessTime style={{ color: "black" }} />}
                      text="12D 01H 04M"
                    /> */}
                  {/* <PopupElement icon={<FaRegSnowflake style={{color:"#aa9d6f"}}/>} text="Ac off" /> */}
                  <PopupElement
                    icon={<BsFillFuelPumpFill style={{ color: "black" }} />}
                    text="0.00 L"
                  />
                  <PopupElement
                    icon={<MdLocationPin style={{ color: "black" }} />}
                    text={address}
                    // text={`${individualDataObj.address}`}
                  />
                 {/* <PopupElement
                    icon={<MdLocationPin style={{ color: "black" }} />}
                    text={startDateTime}
                    // text={`${individualDataObj.address}`}
                  /> */}
                </div>
                {/* <GeoFencing className="geoFence" /> */}
              </div>
            </Popup>
          </Marker>
          {isAnimating && animatedMarkerPosition && (
            <Marker
              position={animatedMarkerPosition}
              icon={createCustomIcon(
                calculateHeading(
                  pairedArray[currentIndex - 1],
                  animatedMarkerPosition
                ),
                getIconByCategoryTop(individualDataObj.category).options.iconUrl
              )}
            />
          )}

          {isPlaybacking && <Polyline positions={pairedArray} color="blue" />}
          {!isPlaybacking && <Polyline positions={points} color="green" />}

          {isPlaybacking &&
            stoppedPositions.map((stop, index) => (
              <Marker
                key={index}
                position={[stop.latitude, stop.longitude]}
                icon={createPointerIcon(index, stoppedPositions.length)}
              >
                
                <Popup style={{ fontSize: "1.1rem", color: "black" }}>
                  <div className="popup" style={{ height: "250px" }}>
                    <div
                      className="tooltipHead"
                      style={{ marginBottom: "8px" }}
                    >
                     

                      <div className="tooltipNamePlate indcardind">
                        {/* <div className="ind">
                        <p>IND</p>
                         </div> */}
                        <div className="name indexgeofence">
                          <p style={{ marginRight: "5px" }}>{index + 1}</p>
                        </div>
                        <div className="name">
                          <PopupElement
                            // imgSrc={clockimg} // Use image source
                            text={(() => {
                              const departure = String(stop.departureTime);
                              return departure.slice(0, -30);
                            })()}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="popupInfo">
                      {/* <PopupElement
                      icon={<FcAlarmClock style={{ color: "black" }} />}
                      text="12/07/2024 12:51:46"
                    /> */}
                      <PopupElement
                        // imgSrc={clockimg} // Use image source
                        icon={<FaDownload style={{ color: "black" }} />}
                        // text="Arrival Time:12/07/2024 12:51:46"
                         text={`Arrival Time: ${(() => {
                          const arrival = String(stop.arrivalTime);
                          return arrival.slice(0, -30);
                        })()}`}

                      />
                      <PopupElement
                        // imgSrc={clockimg} // Use image source

                        icon={<FaUpload style={{ color: "black" }} />}
                        //  text="Depsture Time:12/07/2024 12:51:46"
                         text={`Depsture Time: ${(() => {
                          const departure = String(stop.departureTime);
                          return departure.slice(0, -30);
                        })()}`}
                      />
                      <PopupElement
                        // imgSrc={clockimg} // Use image source
                        icon={<GiDuration style={{ color: "black" }} />}
                        // text="Duration Time:12/07/2024 12:51:46"
                         text={`Duration Time: ${stop.duration}`}
                      />
                      <PopupElement
                        // imgSrc={clockimg} // Use image source
                        icon={<FaRoad style={{ color: "black" }} />}
                        // text="Last Km: Time:12/07/2024 12:51:46"
                        text={`Last Km: ${individualDataObj.distanceFromPrevious}`}
                      />
                      <PopupElement
                        icon={<MdLocationPin style={{ color: "black" }} />}
                        text={address}
                        // text={`${individualDataObj.address}`}
                      />
                       {/* <PopupElement
                    icon={<MdLocationPin style={{ color: "black" }} />}
                    text={`latitude: ${stop.latitude} and longitude: ${stop.longitude} `}
                    text={`${individualDataObj.address}`}
                  /> */}
                    </div>

                     
                  </div>
                </Popup>
              </Marker>
            ))}

          {/* Render GeoFences */}
          {isPlaybacking &&
            geofenceData &&
            geofenceData.map((geoFence) => {
              const coordinates = parseGeoFenceCoordinates(geoFence.area);
              if (coordinates.length === 0) return null;

              if (geoFence.area.startsWith("POLYGON")) {
                return (
                  <Polygon
                    positions={coordinates}
                    color="red"
                    key={geoFence.id}
                  >
                    <Tooltip>{geoFence.name}</Tooltip>
                  </Polygon>
                );
              } else if (
                geoFence.area.startsWith("CIRCLE") &&
                coordinates.length === 1
              ) {
                const [lat, lng, radius] = coordinates[0];
                return (
                  <Circle
                    center={[lat, lng]}
                    radius={radius}
                    color="red"
                    key={geoFence.id}
                  >
                    <Tooltip>{geoFence.name}</Tooltip>
                  </Circle>
                );
              }
            })}
        </MapContainer>
      </div>
      <div>
        <div className="InfoContainer">
          {showPlayBar ? null : (
            <IndividualNav
              showMyLocation={showMyLocation}
              setIndividualMap={setIndividualMap}
              setShowPlayBar={setShowPlayBar}
              individualDataObj={individualDataObj}
              setIsCalender={setIsCalender}
              livetrack={livetrack}
              setLivetrack={setLivetrack}
            />
          )}
          {showPlayBar ? (
            <PlayBar
              playbackData={playbackData ? playbackData : null}
              setShowPlayBar={setShowPlayBar}
              setIsCalender={setIsCalender}
              setIsPlaybacking={setIsPlaybacking}
              startAnimation={startAnimation}
              isAnimating={isAnimating}
              setIsAnimating={setIsAnimating}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              pairedArray={pairedArray}
              progress={progress}
              setProgress={setAnimationProgress}
              individualDataObj={individualDataObj}
              locate={locate}
              mapRef={mapRef}
            />
          ) : !livetrack ? (
            <IndividualInfo individualDataObj={individualDataObj} />
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}

 export default IndividualGooglemap;

//  http://104.251.216.99:8082/api/reports/stops?deviceId=${individualDataObj.deviceId}&from=${startDateTime}&to=${endDateTime}



// import React, { useRef, useState, useEffect, useCallback } from "react";
// import {
//   MapContainer,
//   Marker,
//   Polyline,
//   Popup,
//   TileLayer,
//   Polygon,
//   Tooltip,
//   Circle,
// } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";
// import IndividualNav from "./individualNav/IndividualNav.jsx";
// import IndividualInfo from "./IndividualInfo/IndividualInfo";
// import PlayBar from "./PlayBar/PlayBar.jsx";

// import carIcon from "../SVG/Car/C1.svg";
// import motorcycleIcon from "../SVG/Bike/bike1.svg";
// import JCBIcon from "../SVG/JCB1/j3.svg";
// import truckIcon from "../SVG/Truck/b1.svg";
// import autoIcon from "../SVG/Auto/a4.svg";

// import truckIconTop from "../SVG/Vehicle Top View/Truck/Truck-Y.png";
// import motorcycleIconTop from "../SVG/Vehicle Top View/Bike/Bike-R.png";
// import carIconTop from "../SVG/Vehicle Top View/Car/Car-R.png";
// import JCBIconTop from "../SVG/Vehicle Top View/JCB/JCB-Y.png";
// import TractorIconTop from "../SVG/Vehicle Top View/Tractor/Tractor-G.png";
// import AutoIconTop from "../SVG/Vehicle Top View/Auto/Auto-O.png";

// // import pointerIcon from "../SVG/pointer.svg";
// // import pointerIcon from "../SVG/locationimg.jpg";
// import pointerIcon from "../SVG/stopp.png";
// // import "leaflet-fullscreen/dist/Leaflet.fullscreen";
// import axios from "axios";
// import { MdLocationPin, MdAccessTime } from "react-icons/md";
// import { FcAlarmClock } from "react-icons/fc";
// import { FaTruck } from "react-icons/fa";
// import { BsFillFuelPumpFill } from "react-icons/bs";
// import { PiPlugsFill } from "react-icons/pi";
// import "./IndividualGooglemap.css";
// // import BottomSlider from "./BottomSlider/BottomSlider.jsx";
// import dayjs from "dayjs";
// import GeoFencing from "../../GeoFencing/GeoFencing.jsx";
// import Calender from "./Calender.jsx";
// import { Button } from "@mui/material";
// import redimg from "../SVG/redflag.jpg";
// import greenimg from "../SVG/OIP.jpg";
// import green from "../SVG/green.png";
// import red from "../SVG/red.png";
// import clockimg from "../SVG/clockimg.png";
// import { FaDownload } from "react-icons/fa";
// import { FaUpload } from "react-icons/fa";
// import { GiDuration } from "react-icons/gi";
// import { FaRoad } from "react-icons/fa";
// // import fs from "fs";
// import * as XLSX from "xlsx";
// // import Loader from "../../Loader/Loader.jsx";
// // import AnimeLoader from "../../Loader/AnimeLoader.jsx";

// // import loadingPerson from "../../../assets/LoadingPerson.json"

// const car = new L.Icon({
//   iconUrl: carIcon,
//   iconSize: [35, 45],
//   iconAnchor: [17, 45],
//   popupAnchor: [0, -30],
// });
// const truck = new L.Icon({
//   iconUrl: truckIcon,
//   iconSize: [35, 45],
//   iconAnchor: [17, 45],
//   popupAnchor: [0, -30],
// });
// const motorcycle = new L.Icon({
//   iconUrl: motorcycleIcon,
//   iconSize: [35, 45],
//   iconAnchor: [17, 45],
//   popupAnchor: [0, -30],
// });

// const auto = new L.Icon({
//   iconUrl: autoIcon,
//   iconSize: [35, 45],
//   iconAnchor: [17, 45],
//   popupAnchor: [0, -30],
// });

// const jcb = new L.Icon({
//   iconUrl: JCBIcon,
//   iconSize: [35, 45],
//   iconAnchor: [17, 45],
//   popupAnchor: [0, -30],
// });

// // TOP VIEW ICONS ===============================

// const jcbTop = new L.Icon({
//   iconUrl: JCBIconTop,
//   iconSize: [35, 45],
//   iconAnchor: [17, 45],
//   popupAnchor: [0, -30],
// });

// const autoTop = new L.Icon({
//   iconUrl: AutoIconTop,
//   iconSize: [35, 45],
//   iconAnchor: [17, 45],
//   popupAnchor: [0, -30],
// });

// const tractorTop = new L.Icon({
//   iconUrl: TractorIconTop,
//   iconSize: [35, 45],
//   iconAnchor: [17, 45],
//   popupAnchor: [0, -30],
// });

// const truckTop = new L.Icon({
//   iconUrl: truckIconTop,
//   iconSize: [35, 45],
//   iconAnchor: [17, 45],
//   popupAnchor: [0, -30],
// });

// const carTop = new L.Icon({
//   iconUrl: carIconTop,
//   iconSize: [35, 45],
//   iconAnchor: [17, 45],
//   popupAnchor: [0, -30],
// });

// const motorcycleTop = new L.Icon({
//   iconUrl: motorcycleIconTop,
//   iconSize: [35, 45],
//   iconAnchor: [17, 45],
//   popupAnchor: [0, -30],
// });

// const pointer = new L.Icon({
//   iconUrl: pointerIcon,
//   iconSize: [35, 45],
//   iconAnchor: [17, 45],
//   popupAnchor: [0, -30],
// });

// const osmProvider = {
//   url: "https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=jXbNOuobzSRdq08XiuKY",
//   attribution:
//     '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
// };

// const initialCenter = {
//   lat: 19.9606,
//   lng: 79.2961,
// };



// const PopupElement = ({ icon, imgSrc, text }) => (
//   <div className="popupElement">
//     <div>
//       {imgSrc ? (
//         <img
//           src={imgSrc}
//           alt="Icon"
//           style={{ width: "20px", height: "20px" }}
//         />
//       ) : (
//         icon
//       )}
//     </div>
//     <span style={{ fontSize: "0.9rem", color: "black" }}>{text}</span>
//   </div>
// );
// function IndividualGooglemap({ data, setIndividualMap, individualDataObj }) {
//   // const map = useMap();
//   const [showPlayBar, setShowPlayBar] = useState(false);
//   const [center, setCenter] = useState(initialCenter);
//   const [address, setAddress] = useState("");
//   const ZOOM_LEVEL = 16;
//   const mapRef = useRef();
//   const [startDateTime, setStartDateTime] = useState(null);
//   const [endDateTime, setEndDateTime] = useState(null);
//   const [playbackData, setPlaybackData] = useState();
//   const [wait, setWait] = useState("Loading...");
//   const [animatedMarkerPosition, setAnimatedMarkerPosition] = useState(null);
//   const [stoppedPositions, setStoppedPositions] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isAnimating, setIsAnimating] = useState(false);
//   const [count, setCount] = useState(0);
//   const [geofenceData, setGeofenceData] = useState();
//   const [isStopped, setIsStopped] = useState(false);
//   const [isPlaybacking, setIsPlaybacking] = useState(false);
//   const [isCalender, setIsCalender] = useState(false);
//   const [liveTrackPoints, setLiveTrackPoints] = useState(null);
//   const [points, setPoints] = useState([]);
//   const [progress, setProgress] = useState(0);
//   const [error, setError] = useState("");

  

//   const getIconByCategoryTop = (category) => {
//     switch (category) {
//       case "car":
//         return carTop;
//       case "truck":
//         return truckTop;
//       case "motorcycle":
//         return motorcycleTop;
//       case "auto":
//         return autoTop;
//       case "tractor":
//         return tractorTop;
//       case "jcb":
//         return jcbTop;
//       default:
//         return carTop;
//     }
//   };

//   //new api data fetch
// //   async function fetchData() {
// //     const apiUrl = 'https://rocketsalestracker.com/api/reports/stops?deviceId=2431&from=2024-08-17T18%3A30%3A00.000Z&to=2024-08-24T18%3A29%3A59.999Z';

// //     try {
// //         // Make a request to the API
// //         const response = await fetch(apiUrl);

// //         // Check if the response is OK
// //         if (!response.ok) {
// //             throw new Error(HTTP error! status: ${response.status});
// //         }

// //         // Parse the JSON data
// //         const data = await response.json();

// //         // Process the data
// //         data.forEach(entry => {
// //             console.log(Device ID: ${entry.deviceId});
// //             console.log(Device Name: ${entry.deviceName});
// //             console.log(Start Time: ${entry.startTime});
// //             console.log(End Time: ${entry.endTime});
// //             console.log(Duration: ${entry.duration / 1000} seconds);
// //             console.log(Latitude: ${entry.latitude});
// //             console.log(Longitude: ${entry.longitude});
// //             console.log('---');
// //         });

// //         return data;

// //     } catch (error) {
// //         console.error('Error fetching data:', error);
// //         return [];
// //     }
// // }

// // // Call the function
// // fetchData();

//   //polyline points for live tracking
//   useEffect(() => {
//     setPoints((prevPoints) => [
//       ...prevPoints,
//       [individualDataObj.latitude, individualDataObj.longitude],
//     ]);
//   }, [individualDataObj.latitude, individualDataObj.longitude]);

//   // console.log("startDate end Date", startDateTime, endDateTime);
//   // console.log("isCalneder", isCalender);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCount((prevCount) => prevCount + 1);
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

  

//   const fetchAddress = useCallback(async (latitude, longitude) => {
//     try {
//       const response = await fetch(
//         https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1
//       );
//       if (!response.ok) {
//         throw new Error(HTTP error! status: ${response.status});
//       }
//       const data = await response.json();

//       if (data.address) {
//         setAddress(
//           `${data.address.neighbourhood || ""}, ${data.address.city || ""}, ${
//             data.address.state || ""
//           }, ${data.address.postcode || ""}`
//         );
//       } else {
//         setError("No address details available");
//       }
//       console.log(data);
//     } catch (error) {
//       setError("Error fetching address");
//       console.log(error);
//     }
//   }, []);

//   useEffect(() => {
//     if (individualDataObj.latitude && individualDataObj.longitude) {
//       fetchAddress(individualDataObj.latitude, individualDataObj.longitude);
//     }
//   }, [individualDataObj.latitude, individualDataObj.longitude, fetchAddress]);

//   const fetchPlaybackData = async () => {
//     isPlaybacking === false
//       ? setIsPlaybacking(true)
//       : setIsPlaybacking(false) &&
//         setPlaybackData(null) &&
//         setGeofenceData(null);

//     try {
//       const username = "test";
//       const password = "123456";
//       const token = btoa(${username}:${password});
//       const response1 = await axios.get(
//         https://rocketsalestracker.com/api/positions?deviceId=${individualDataObj.deviceId}&from=${startDateTime}&to=${endDateTime},
//         {
//           headers: {
//             Authorization: Basic ${token},
//           },
//         }
//       );
//       setPlaybackData(response1.data);
//       console.log(
//         "device id =====================",
//         individualDataObj.deviceId
//       );
//       console.log("startDateTime =====================", startDateTime);
//       console.log("endDateTime =====================", endDateTime);
//     } catch (error) {
//       console.error("Error fetching device data:", error);
//     }

//     try {
//       const username = "test";
//       const password = "123456";
//       const token = btoa(${username}:${password});
//       const response2 = await axios.get(
//         https://rocketsalestracker.com/api/geofences,
//         {
//           headers: {
//             Authorization: Basic ${token},
//           },
//         }
//       );
//       setGeofenceData(response2.data);
//     } catch (error) {
//       console.error("Error fetching geofence data:", error);
//     }
    
//   };
  
//   // console.log("geofencingngg", geofenceData);

//   const pairedArray = playbackData
//     ? playbackData.map((row) => [row.latitude, row.longitude, row.course]) // Ensure course is included
//     : [];

//   // Use the course from the playback data to create custom icons
//   const createCustomIcon = (heading, iconUrl) => {
//     return L.divIcon({
//       className: "custom-icon",
//       html: `
//       <div style="
//         width: 35px; height: 45px;
//         background: url(${iconUrl}) no-repeat center center;
//         background-size: contain;
//         transform: rotate(${heading}deg);
//         transform-origin: center center;
//       "></div>
//     `,
//       iconSize: [35, 45],
//       iconAnchor: [17, 45],
//     });
//   };

//   const handleDateTimeChange = (newValue) => {
//     const formattedStartDateTime = newValue[0]
//       ? dayjs(newValue[0]).toISOString()
//       : null;
//     const formattedEndDateTime = newValue[1]
//       ? dayjs(newValue[1]).toISOString()
//       : null;

//     setStartDateTime(formattedStartDateTime);
//     setEndDateTime(formattedEndDateTime);
//   };

//   useEffect(() => {
//     if (individualDataObj.latitude && individualDataObj.longitude) {
//       fetchAddress(individualDataObj.latitude, individualDataObj.longitude);
//     }
//   }, [individualDataObj.latitude, individualDataObj.longitude]);

//   const getIconByCategory = (category) => {
//     switch (category) {
//       case "car":
//         return car;
//       case "truck":
//         return truck;
//       case "motorcycle":
//         return motorcycle;
//       case "auto":
//         return auto;
//       case "jcb":
//         return jcb;
//       default:
//         return car;
//     }
//   };

  

//   const startAnimation = () => {
//     if (isAnimating) {
//       setIsAnimating(false);
//     } else {
//       setIsAnimating(true);
//       setCurrentIndex(0);
//     }
//   };

//   const showMyLocation = useCallback((lati, longi) => {
//     mapRef.current.flyTo([lati, longi], ZOOM_LEVEL, {
//       animate: true,
//       duration: 2,
//     });
//   }, []);

//   const showMyLocationIndividual = useCallback((lati, longi) => {
//     const map = mapRef.current;
//     map.setView([lati, longi], 22, {
//       animate: true,
//       duration: 2,
//     });
//   }, []);
//   let locate;

//   const calculateHeading = (startLatLng, endLatLng) => {
//     if (
//       !startLatLng ||
//       !endLatLng ||
//       startLatLng.length < 2 ||
//       endLatLng.length < 2
//     ) {
//       // Return 0 or any default heading if input is invalid
//       return 0;
//     }

//     const startLat = (startLatLng[0] * Math.PI) / 180;
//     const startLng = (startLatLng[1] * Math.PI) / 180;
//     const endLat = (endLatLng[0] * Math.PI) / 180;
//     const endLng = (endLatLng[1] * Math.PI) / 180;

//     const dLon = endLng - startLng;
//     const y = Math.sin(dLon) * Math.cos(endLat);
//     const x =
//       Math.cos(startLat) * Math.sin(endLat) -
//       Math.sin(startLat) * Math.cos(endLat) * Math.cos(dLon);
//     const heading = Math.atan2(y, x);

//     return (heading * 180) / Math.PI;
//   };

  

//   useEffect(() => {
//     let interval;
//     if (isAnimating && pairedArray.length > 1) {
//       setAnimatedMarkerPosition(pairedArray[0]);
//       interval = setInterval(() => {
//         setCurrentIndex((prevIndex) => {
//           const newIndex = prevIndex + 1;
//           if (newIndex < pairedArray.length) {
//             const startPos = pairedArray[newIndex - 1];
//             const endPos = pairedArray[newIndex];
//             const heading = endPos[2]; // Use course from API
//             setAnimatedMarkerPosition(endPos);
//             locate = endPos;
//             showMyLocationIndividual(locate[0], locate[1]);

//             return newIndex;
//           } else {
//             clearInterval(interval);
//             setIsAnimating(false);
//             return prevIndex;
//           }
//         });
//       }, 1000);
//     }
//     return () => clearInterval(interval);
//   }, [isAnimating]);

//   //================================================================================================================================================================================

  

//   useEffect(() => {
//     if (!isAnimating) return;
//     setProgress((currentIndex / (pairedArray.length - 1)) * 100);
//   }, [currentIndex, pairedArray.length, isAnimating]);

//   const setAnimationProgress = (progress) => {
//     const index = Math.floor((progress / 100) * (pairedArray.length - 1));
//     setCurrentIndex(index);
//     setAnimatedMarkerPosition(pairedArray[index]);
//   };

//   // Logic for stop points
//   useEffect(() => {
//     let resetTime = null;
//     let count = 0;
//     let latitude;
//     let longitude;

//     if (playbackData) {
//       console.log("this is for stop data : ", playbackData);
//       const stopPoints = playbackData.reduce((acc, row, index) => {
//         if (index == 0 && resetTime == null) {
//           resetTime = new Date(row.deviceTime);
//           count += 1;
//           latitude = row.latitude;
//           longitude = row.longitude;
//           acc.push({
//             startTime: resetTime,
//             latitude: row.latitude,
//             longitude: row.longitude,
//             index: count,
//           });

//           resetTime = null;
//         } else if (
//           index !== playbackData.length - 1 &&
//           row.attributes?.ignition === false &&
//           resetTime == null
//         ) {
//           resetTime = new Date(row.deviceTime);
//           count += 1;
//           latitude = row.latitude;
//           longitude = row.longitude;
//         } else if (row.attributes.ignition && resetTime !== null) {
//           let ignitionOnTime = new Date(row.deviceTime);
//           let duration = ignitionOnTime - resetTime;

//           let Hrs = Math.floor(duration / (1000 * 60 * 60));
//           let Mins = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
//           let Sec = Math.floor((duration % (1000 * 60)) / 1000);

//           acc.push({
//             latitude: row.latitude,
//             longitude: row.longitude,
//             duration: ${Hrs}:${Mins}:${Sec},
//             index: count,
//             arrivalTime: resetTime,
//             departureTime: ignitionOnTime,
//           });

//           resetTime = null;
//         } else if (index == playbackData.length - 1) {
//           resetTime = new Date(row.deviceTime);
//           count += 1;
//           latitude = row.latitude;
//           longitude = row.longitude;
//           acc.push({
//             endTime: resetTime,
//             latitude: row.latitude,
//             longitude: row.longitude,
//             index: count,
//           });

//           resetTime = null;
//         }
//         return acc;
//       }, []);

      

//       console.log("this is stop poinst : ", stopPoints);
//       setStoppedPositions(stopPoints);
//     }
//   }, [playbackData]);

//   //geofencing function
//   const parseGeoFenceCoordinates = (area) => {
//     const coordinates = [];

//     if (area.startsWith("POLYGON")) {
//       // Extract coordinates for POLYGON format
//       const polygonPoints = area.match(/\d+\.\d+\s\d+\.\d+/g);
//       if (polygonPoints) {
//         polygonPoints.forEach((point) => {
//           const [lat, lng] = point.split(" ").map((coord) => parseFloat(coord));
//           coordinates.push([lat, lng]);
//         });
//       }
//     } else if (area.startsWith("CIRCLE")) {
//       // Extract coordinates for CIRCLE format
//       const circleParts = area.match(/\d+\.\d+/g);
//       if (circleParts && circleParts.length >= 3) {
//         const [lat, lng, radius] = circleParts.map((coord) =>
//           parseFloat(coord)
//         );
//         // Return coordinates as array with lat, lng, and radius
//         coordinates.push([lat, lng, radius]);
//       }
//     }

//     return coordinates;
//   };
//   const handleCutHistory = () => {
//     setShowPlayBar(false);
//     setIsCalender(false);
//     setIsPlaybacking(false);
//     setIsAnimating(false);
//   };

//   const [livetrack, setLivetrack] = useState(false);
//   const handleLive = () => {};
 
//   const createPointerIcon = (index, total) => {
//     // Determine the icon URL based on index
//     const iconUrl =
//       index === 0 ? green : index === total - 1 ? red : pointerIcon;

//     return L.divIcon({
//       className: "custom-pointer-icon",
//       html: `
//         <div style="
//           position: relative;
//           width: 35px;
//           height: 45px;
//           background: url(${iconUrl}) no-repeat center center;
//           background-size: contain;
//         ">
//           <span style="
//             position: absolute;
//             bottom: 11px;
//             left: 50%;
//             transform: translateX(-50%);
//             color: #fff;
//             font-size: 14px;
//             font-weight: bold;

//             background-color: transparent;
//             padding: 2px 5px;
//             border-radius: 3px;
//           ">
//             ${index + 1}
//           </span>
//         </div>
//       `,
//       iconSize: [35, 45],
//       iconAnchor: [17, 45],
//       popupAnchor: [0, -30],
//     });
//   };




//   return (
//     <>
     
//       <div
//         style={{
//           display: "flex",
//           gap: "10px",
//           alignItems: "center",
//           marginLeft: "0.5rem",
//           marginBottom: "5px",
//         }}
//       >
//         <div
//           style={{ fontSize: "20px", marginleft: "63px", fontweight: "bold" }}
//         >
//           History
//         </div>
//         {isCalender && (
//           <Calender
//             style={{ padding: "2px" }}
//             setStartDateTime={setStartDateTime}
//             setEndDateTime={setEndDateTime}
//           />
//         )}

//         {isCalender && (
//           <Button
//             variant="contained"
//             sx={{
//               color: "#000000",
//               // background: "linear-gradient(235deg, #f6e5c1, #8d8d8d)",
//               background: "#f4d24a",
//               "&:hover": {
//                 backgroundColor: "#1a242f",
//               },
//             }}
//             style={{ height: "2.7rem", marginTop: "6px" }}
//             onClick={fetchPlaybackData}
//           >
//             Search
//           </Button>
//         )}
//         {isCalender && (
//           <button className="cutHistory newclass" onClick={handleCutHistory}>
//             Go Back
//           </button>
//         )}
//       </div>

//       <div className="mapContainer">
//         <MapContainer
//           center={center}
//           zoom={7}
//           ref={mapRef}
//           style={{
//             height: "500px",
//             width: "99vw",
//             border: "3px solid #f4d24a",
//             // borderRadius: "6px",
//             marginBottom: "10px",
//             marginLeft: "0.75px",
//           }}
//         >
//           <TileLayer
//             url={osmProvider.url}
//             attribution={osmProvider.attribution}
//           />

//           <Marker
//             position={[individualDataObj.latitude, individualDataObj.longitude]}
//             icon={getIconByCategory(individualDataObj.category)}
//           >
//             <Popup style={{ fontSize: "1.1rem", color: "black" }}>
//               <div className="popup" style={{ height: "250px" }}>
//                 <div className="tooltipHead" style={{ marginBottom: "8px" }}>
//                   <div className="tooltipNamePlate">
//                     {/* <div className="ind">
//                         <p>IND</p>
//                       </div> */}
//                     <div className="name">
//                       <p style={{ marginRight: "16px" }}>
//                         {individualDataObj.name}
//                       </p>
//                     </div>
//                     <GeoFencing className="geoFence" />
//                   </div>
//                 </div>
//                 <div className="popupInfo">
                
//                   <PopupElement
//                     imgSrc={clockimg} // Use image source
//                     text="12/07/2024 12:51:46"
//                   />
//                   <PopupElement
//                     icon={<PiPlugsFill style={{ color: "black" }} />}
//                     text={
//                       individualDataObj.ignition
//                         ? "Ignition On"
//                         : "Ignition Off"
//                     }
//                   />
//                   <PopupElement
//                     icon={<FaTruck style={{ color: "black" }} />}
//                     text={${individualDataObj.speed} kmph}
//                   />
//                   {/* <PopupElement
//                       icon={<MdAccessTime style={{ color: "black" }} />}
//                       text="12D 01H 04M"
//                     /> */}
//                   {/* <PopupElement icon={<FaRegSnowflake style={{color:"#aa9d6f"}}/>} text="Ac off" /> */}
//                   <PopupElement
//                     icon={<BsFillFuelPumpFill style={{ color: "black" }} />}
//                     text="0.00 L"
//                   />
//                   <PopupElement
//                     icon={<MdLocationPin style={{ color: "black" }} />}
//                     text={address}
//                     // text={${individualDataObj.address}}
//                   />
//                  {/* <PopupElement
//                     icon={<MdLocationPin style={{ color: "black" }} />}
//                     text={startDateTime}
//                     // text={${individualDataObj.address}}
//                   /> */}
//                 </div>
//                 {/* <GeoFencing className="geoFence" /> */}
//               </div>
//             </Popup>
//           </Marker>
//           {isAnimating && animatedMarkerPosition && (
//             <Marker
//               position={animatedMarkerPosition}
//               icon={createCustomIcon(
//                 calculateHeading(
//                   pairedArray[currentIndex - 1],
//                   animatedMarkerPosition
//                 ),
//                 getIconByCategoryTop(individualDataObj.category).options.iconUrl
//               )}
//             />
//           )}

//           {isPlaybacking && <Polyline positions={pairedArray} color="blue" />}
//           {!isPlaybacking && <Polyline positions={points} color="green" />}

//           {isPlaybacking &&
//             stoppedPositions.map((stop, index) => (
//               <Marker
//                 key={index}
//                 position={[stop.latitude, stop.longitude]}
//                 icon={createPointerIcon(index, stoppedPositions.length)}
//               >
                
//                 <Popup style={{ fontSize: "1.1rem", color: "black" }}>
//                   <div className="popup" style={{ height: "250px" }}>
//                     <div
//                       className="tooltipHead"
//                       style={{ marginBottom: "8px" }}
//                     >
                     

//                       <div className="tooltipNamePlate indcardind">
//                         {/* <div className="ind">
//                         <p>IND</p>
//                          </div> */}
//                         <div className="name indexgeofence">
//                           <p style={{ marginRight: "5px" }}>{index + 1}</p>
//                         </div>
//                         <div className="name">
//                           <PopupElement
//                             // imgSrc={clockimg} // Use image source
//                             text={(() => {
//                               const departure = String(stop.departureTime);
//                               return departure.slice(0, -30);
//                             })()}
//                           />
//                         </div>
//                       </div>
//                     </div>
//                     <div className="popupInfo">
//                       {/* <PopupElement
//                       icon={<FcAlarmClock style={{ color: "black" }} />}
//                       text="12/07/2024 12:51:46"
//                     /> */}
//                       <PopupElement
//                         // imgSrc={clockimg} // Use image source
//                         icon={<FaDownload style={{ color: "black" }} />}
//                         // text="Arrival Time:12/07/2024 12:51:46"
//                          text={`Arrival Time: ${(() => {
//                           const arrival = String(stop.arrivalTime);
//                           return arrival.slice(0, -30);
//                         })()}`}

//                       />
//                       <PopupElement
//                         // imgSrc={clockimg} // Use image source

//                         icon={<FaUpload style={{ color: "black" }} />}
//                         //  text="Depsture Time:12/07/2024 12:51:46"
//                          text={`Depsture Time: ${(() => {
//                           const departure = String(stop.departureTime);
//                           return departure.slice(0, -30);
//                         })()}`}
//                       />
//                       <PopupElement
//                         // imgSrc={clockimg} // Use image source
//                         icon={<GiDuration style={{ color: "black" }} />}
//                         // text="Duration Time:12/07/2024 12:51:46"
//                          text={Duration Time: ${stop.duration}}
//                       />
//                       <PopupElement
//                         // imgSrc={clockimg} // Use image source
//                         icon={<FaRoad style={{ color: "black" }} />}
//                         // text="Last Km: Time:12/07/2024 12:51:46"
//                         text={Last Km: ${individualDataObj.distanceFromPrevious}}
//                       />
//                       <PopupElement
//                         icon={<MdLocationPin style={{ color: "black" }} />}
//                         text={address}
//                         // text={${individualDataObj.address}}
//                       />
//                        <PopupElement
//                     icon={<MdLocationPin style={{ color: "black" }} />}
//                     text={`latitude: ${stop.latitude} and longitude: ${stop.longitude} `}
//                     // text={${individualDataObj.address}}
//                   />
//                     </div>

                     
//                   </div>
//                 </Popup>
//               </Marker>
//             ))}

//           {/* Render GeoFences */}
//           {isPlaybacking &&
//             geofenceData &&
//             geofenceData.map((geoFence) => {
//               const coordinates = parseGeoFenceCoordinates(geoFence.area);
//               if (coordinates.length === 0) return null;

//               if (geoFence.area.startsWith("POLYGON")) {
//                 return (
//                   <Polygon
//                     positions={coordinates}
//                     color="red"
//                     key={geoFence.id}
//                   >
//                     <Tooltip>{geoFence.name}</Tooltip>
//                   </Polygon>
//                 );
//               } else if (
//                 geoFence.area.startsWith("CIRCLE") &&
//                 coordinates.length === 1
//               ) {
//                 const [lat, lng, radius] = coordinates[0];
//                 return (
//                   <Circle
//                     center={[lat, lng]}
//                     radius={radius}
//                     color="red"
//                     key={geoFence.id}
//                   >
//                     <Tooltip>{geoFence.name}</Tooltip>
//                   </Circle>
//                 );
//               }
//             })}
//         </MapContainer>
//       </div>
//       <div>
//         <div className="InfoContainer">
//           {showPlayBar ? null : (
//             <IndividualNav
//               showMyLocation={showMyLocation}
//               setIndividualMap={setIndividualMap}
//               setShowPlayBar={setShowPlayBar}
//               individualDataObj={individualDataObj}
//               setIsCalender={setIsCalender}
//               livetrack={livetrack}
//               setLivetrack={setLivetrack}
//             />
//           )}
//           {showPlayBar ? (
//             <PlayBar
//               playbackData={playbackData}
//               setShowPlayBar={setShowPlayBar}
//               setIsCalender={setIsCalender}
//               setIsPlaybacking={setIsPlaybacking}
//               startAnimation={startAnimation}
//               isAnimating={isAnimating}
//               setIsAnimating={setIsAnimating}
//               currentIndex={currentIndex}
//               setCurrentIndex={setCurrentIndex}
//               pairedArray={pairedArray}
//               progress={progress}
//               setProgress={setAnimationProgress}
//               individualDataObj={individualDataObj}
//               locate={locate}
//               mapRef={mapRef}
//             />
//           ) : !livetrack ? (
//             <IndividualInfo individualDataObj={individualDataObj} />
//           ) : (
//             <></>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

//  export default IndividualGooglemap;

// //  http://104.251.216.99:8082/api/reports/stops?deviceId=${individualDataObj.deviceId}&from=${startDateTime}&to=${endDateTime}