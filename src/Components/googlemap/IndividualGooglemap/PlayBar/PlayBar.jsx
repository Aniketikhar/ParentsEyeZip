import { useState, useEffect, useCallback } from "react";
import { FaForward, FaPause } from "react-icons/fa6";
import { FaFastBackward, FaPlay } from "react-icons/fa";
import { FaFilter } from "react-icons/fa6";
import { FaShippingFast } from "react-icons/fa";
import { MdSpeed } from "react-icons/md";
import "bootstrap/dist/css/bootstrap.min.css";
import "./PlayBar.css";
const PlayBar = ({
  setShowPlayBar,
  setIsCalender,
  setIsPlaybacking,
  startAnimation,
  currentIndex,
  pairedArray,
  setProgress,
  progress,
  setCurrentIndex,
  setIsAnimating,
  isAnimating,
  locate,
  mapRef,individualDataObj
}) => {
  const [isPlaying, setIsPlaying] = useState(false);



  const showMyLocation = (locate) => {
    mapRef.current.flyTo(locate, 22, {
      animate: true,
      duration: 2,
    });
  } ;

  const handlePlay = () => {
    if(locate){
      showMyLocation(locate);
    }
  }
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    startAnimation();
  };

  const handleProgressChange = (event) => {
    setProgress(event.target.value);
  };

  const handleCutHistory = () => {
    setShowPlayBar(false);
    setIsCalender(false);
    setIsPlaybacking(false);
    setIsAnimating(false);
  };

  useEffect(() => {
    const mySlider = document.getElementById("progress-bar");
    if (mySlider) {
      const valPercent = (progress / mySlider.max) * 100;
      mySlider.style.background = `linear-gradient(to right, #000000 ${valPercent}%, #d5d5d5 ${valPercent}%)`;
    }
  }, [progress]);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      isAnimating &&
        setProgress((currentIndex / (pairedArray.length - 1)) * 100);

    }, 1000);
    return () => clearInterval(interval);
  }, [currentIndex, pairedArray.length, isPlaying]);

  
  return (
    <>
      <hr style={{height:"2px", color:"black"}} />

      <div className="containerPlay">
      <div className="playBarInfo">
          <div className="dataInfo">
            <div className="head">Speed</div>
            <div className="headData">{`0 kmph`}</div>
          </div>
          <div className="dataInfo">
            <div className="head">Distance</div>
            <div className="headData">21.40 km</div>
          </div>
          <div className="dataInfo">
            <div className="head">Time</div>
            <div className="headData">11/07/2024 07:45:11</div>
          </div>
          <div className="dataInfo">
            <div className="head">Total Distance</div>
            <div className="headData">33.50 km</div>
          </div>
          <div className="dataInfo">
            <div className="head">Avg.Speed (km/h)</div>
            <div className="headData">22.38 kmph</div>
          </div>
          <div className="dataInfo">
            <div className="head">Max.Speed (km/h)</div>
            <div className="headData">46 kmph</div>
          </div>
        </div>
        <div className="playbar-container">
        <button type="button" class="btn btn-outline-dark playBar-btn" >
        <FaFilter className="BtnIcon" />
          </button>

          <button type="button" class="btn btn-outline-dark playBar-btn">
            <FaFastBackward className="BtnIcon" />
          </button>

          <button className="play-pause-btn btn btn-outline-dark playBar-btn" onClick={togglePlay}>
            {isPlaying ? (
              <FaPause className="BtnIcon" />
            ) : (
              <FaPlay onClick={handlePlay()} className="BtnIcon" />
            )}
          </button>
          <input
            type="range"
            min={0}
            max={100}
            value={progress}
            id="progress-bar"
            onChange={handleProgressChange}
            style={{ backgroundColor: "#fff !important" }}
          />
          <span className="progress-percentage">
            <b>{progress.toFixed(2)}/100</b>
          </span>
          <button className="btn btn-outline-dark playBar-btn">
            <FaForward className="BtnIcon" />
          </button>
          <button className="btn btn-outline-dark playBar-btn">
            <MdSpeed className="BtnIcon" />
          </button>
        </div>

      </div>
      <hr style={{height:"2px", color:"black"}} />
    </>
  );
};

export default PlayBar;




// import { useState, useEffect, useCallback } from "react";
// import { FaForward, FaPause } from "react-icons/fa6";
// import { FaFastBackward, FaPlay } from "react-icons/fa";
// import { FaFilter } from "react-icons/fa6";
// import { MdSpeed } from "react-icons/md";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./PlayBar.css";

// const PlayBar = ({
//   setShowPlayBar,
//   setIsCalender,
//   setIsPlaybacking,
//   startAnimation,
//   currentIndex,
//   pairedArray,
//   setProgress,
//   progress,
//   setCurrentIndex,
//   setIsAnimating,
//   isAnimating,
//   locate,
//   mapRef
// }) => {
//   const [isPlaying, setIsPlaying] = useState(false);

//   const showMyLocation = (locate) => {
//     mapRef.current.flyTo(locate, 22, {
//       animate: true,
//       duration: 2,
//     });
//   };

//   const togglePlay = () => {
//     setIsPlaying(!isPlaying);
//     if (!isPlaying) {
//       startAnimation();
//     } else {
//       setIsAnimating(false); // Stop animation when paused
//     }
//   };

//   const handleProgressChange = (event) => {
//     const newProgress = event.target.value;
//     setProgress(newProgress);

//     // Calculate the new index based on progress
//     const newIndex = Math.round((newProgress / 100) * (pairedArray.length - 1));
//     setCurrentIndex(newIndex);

//     // Optional: Show the location on the map for the current index
//     showMyLocation(pairedArray[newIndex].locate);
//   };

//   const handleCutHistory = () => {
//     setShowPlayBar(false);
//     setIsCalender(false);
//     setIsPlaybacking(false);
//     setIsAnimating(false);
//   };

//   useEffect(() => {
//     const mySlider = document.getElementById("progress-bar");
//     if (mySlider) {
//       const valPercent = (progress / mySlider.max) * 100;
//       mySlider.style.background = `linear-gradient(to right, #000000 ${valPercent}%, #d5d5d5 ${valPercent}%)`;
//     }
//   }, [progress]);

//   useEffect(() => {
//     if (!isPlaying) return;
//     const interval = setInterval(() => {
//       if (isAnimating) {
//         setProgress((currentIndex / (pairedArray.length - 1)) * 100);
//         setCurrentIndex((prevIndex) => {
//           const nextIndex = prevIndex + 1;
//           if (nextIndex >= pairedArray.length) {
//             clearInterval(interval);
//             setIsPlaying(false);
//             return prevIndex;
//           }
//           showMyLocation(pairedArray[nextIndex].locate);
//           return nextIndex;
//         });
//       }
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [isPlaying, isAnimating, currentIndex, pairedArray]);

//   const currentData = pairedArray[currentIndex] || {};

//   return (
//     <>
//       <hr style={{ height: "2px", color: "black" }} />

//       <div className="containerPlay">
//         <div className="playBarInfo">
//           <div className="dataInfo">
//             <div className="head">Speed</div>
//             <div className="headData">{`${currentData.speed || "0"} kmph`}</div>
//           </div>
//           <div className="dataInfo">
//             <div className="head">Distance</div>
//             <div className="headData">{currentData.distance || "0.00"} km</div>
//           </div>
//           <div className="dataInfo">
//             <div className="head">Time</div>
//             <div className="headData">{currentData.time || "N/A"}</div>
//           </div>
//           <div className="dataInfo">
//             <div className="head">Total Distance</div>
//             <div className="headData">{currentData.totalDistance || "0.00"} km</div>
//           </div>
//           <div className="dataInfo">
//             <div className="head">Avg.Speed (km/h)</div>
//             <div className="headData">{currentData.avgSpeed || "0.00"} kmph</div>
//           </div>
//           <div className="dataInfo">
//             <div className="head">Max.Speed (km/h)</div>
//             <div className="headData">{currentData.maxSpeed || "0.00"} kmph</div>
//           </div>
//         </div>
//         <div className="playbar-container">
//           <button type="button" className="btn btn-outline-dark playBar-btn">
//             <FaFilter className="BtnIcon" />
//           </button>

//           <button type="button" className="btn btn-outline-dark playBar-btn">
//             <FaFastBackward className="BtnIcon" />
//           </button>

//           <button className="play-pause-btn btn btn-outline-dark playBar-btn" onClick={togglePlay}>
//             {isPlaying ? (
//               <FaPause className="BtnIcon" />
//             ) : (
//               <FaPlay className="BtnIcon" />
//             )}
//           </button>
//           <input
//             type="range"
//             min={0}
//             max={100}
//             value={progress}
//             id="progress-bar"
//             onChange={handleProgressChange}
//             style={{ backgroundColor: "#fff !important" }}
//           />
//           <span className="progress-percentage">
//             <b>{progress.toFixed(2)}/100</b>
//           </span>
//           <button className="btn btn-outline-dark playBar-btn">
//             <FaForward className="BtnIcon" />
//           </button>
//           <button className="btn btn-outline-dark playBar-btn">
//             <MdSpeed className="BtnIcon" />
//           </button>
//         </div>
//       </div>
//       <hr style={{ height: "2px", color: "black" }} />
//     </>
//   );
// };

// export default PlayBar;




// import { useState, useEffect } from "react";
// import { FaForward, FaPause } from "react-icons/fa6";
// import { FaFastBackward, FaPlay } from "react-icons/fa";
// import { FaFilter } from "react-icons/fa6";
// import { MdSpeed } from "react-icons/md";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./PlayBar.css";

// const PlayBar = ({
//   playbackdata,
//   setShowPlayBar,
//   setIsCalender,
//   setIsPlaybacking,
//   startAnimation,
//   currentIndex,
//   pairedArray,
//   setProgress,
//   progress,
//   setCurrentIndex,
//   setIsAnimating,
//   isAnimating,
//   locate,
//   mapRef,
// }) => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentData, setCurrentData] = useState({});

//   const showMyLocation = (locate) => {
//     mapRef.current.flyTo(locate, 22, {
//       animate: true,
//       duration: 2,
//     });
//   };

//   const handlePlay = () => {
//     if (locate) {
//       showMyLocation(locate);
//     }
//   };

//   const togglePlay = () => {
//     setIsPlaying(!isPlaying);
//     startAnimation();
//   };

//   const handleProgressChange = (event) => {
//     setProgress(event.target.value);
//   };

//   const handleCutHistory = () => {
//     setShowPlayBar(false);
//     setIsCalender(false);
//     setIsPlaybacking(false);
//     setIsAnimating(false);
//   };

//   useEffect(() => {
//     const mySlider = document.getElementById("progress-bar");
//     if (mySlider) {
//       const valPercent = (progress / mySlider.max) * 100;
//       mySlider.style.background = `linear-gradient(to right, #000000 ${valPercent}%, #d5d5d5 ${valPercent}%)`;
//     }
//   }, [progress]);

//   useEffect(() => {
//     if (!isPlaying) return;

//     const interval = setInterval(() => {
//       if (isAnimating) {
//         const newIndex = Math.floor(
//           (progress / 100) * (playbackdata.length - 1)
//         );
//         setCurrentIndex(newIndex);
//         setCurrentData(playbackdata[newIndex]);
//         setProgress((newIndex / (playbackdata.length - 1)) * 100);
//       }
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [isPlaying, progress, playbackdata, isAnimating]);

//   return (
//     <>
//       <hr style={{ height: "2px", color: "black" }} />

//       <div className="containerPlay">
//         <div className="playBarInfo">
//           <div className="dataInfo">
//             <div className="head">Speed</div>
//             <div className="headData">{`${currentData?.speed} kmph`}</div>
//           </div>
//           <div className="dataInfo">
//             <div className="head">Distance</div>
//             <div className="headData">
//               {currentData?.distance !== undefined &&
//               currentData?.distance !== null
//                 ? `${currentData.distance.toFixed(2)} km`
//                 : "0.00 km"}
//             </div>
//           </div>
//           <div className="dataInfo">
//             <div className="head">Time</div>
//             <div className="headData">
//               {new Date(currentData?.deviceTime).toLocaleString()}
//             </div>
//           </div>
//           <div className="dataInfo">
//             <div className="head">Total Distance</div>
//             <div className="headData">
//               {currentData?.totalDistance !== undefined &&
//               currentData?.totalDistance !== null
//                 ? `${currentData.totalDistance.toFixed(2)} km`
//                 : "0.00 km"}
//             </div>
//           </div>
//           <div className="dataInfo">
//             <div className="head">Avg. Speed (km/h)</div>
//             <div className="headData">22.38 kmph</div>
//           </div>
//           <div className="dataInfo">
//             <div className="head">Max. Speed (km/h)</div>
//             <div className="headData">46 kmph</div>
//           </div>
//         </div>
//         <div className="playbar-container">
//           <button type="button" className="btn btn-outline-dark playBar-btn">
//             <FaFilter className="BtnIcon" />
//           </button>

//           <button type="button" className="btn btn-outline-dark playBar-btn">
//             <FaFastBackward className="BtnIcon" />
//           </button>

//           <button
//             className="play-pause-btn btn btn-outline-dark playBar-btn"
//             onClick={togglePlay}
//           >
//             {isPlaying ? (
//               <FaPause className="BtnIcon" />
//             ) : (
//               <FaPlay onClick={handlePlay()} className="BtnIcon" />
//             )}
//           </button>
//           <input
//             type="range"
//             min={0}
//             max={100}
//             value={progress}
//             id="progress-bar"
//             onChange={handleProgressChange}
//             style={{ backgroundColor: "#fff !important" }}
//           />
//           <span className="progress-percentage">
//             <b>{progress.toFixed(2)}/100</b>
//           </span>
//           <button className="btn btn-outline-dark playBar-btn">
//             <FaForward className="BtnIcon" />
//           </button>
//           <button className="btn btn-outline-dark playBar-btn">
//             <MdSpeed className="BtnIcon" />
//           </button>
//         </div>
//       </div>
//       <hr style={{ height: "2px", color: "black" }} />
//     </>
//   );
// };

// export default PlayBar;







// import { useState, useEffect, useCallback } from "react";
// import { FaForward, FaPause } from "react-icons/fa6";
// import { FaFastBackward, FaPlay } from "react-icons/fa";
// import { FaFilter } from "react-icons/fa6";
// import { MdSpeed } from "react-icons/md";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./PlayBar.css";

// const PlayBar = ({
//   setShowPlayBar,
//   setIsCalender,
//   setIsPlaybacking,
//   startAnimation,
//   currentIndex,
//   pairedArray,
//   setProgress,
//   progress,
//   setCurrentIndex,
//   setIsAnimating,
//   isAnimating,
//   locate,
//   mapRef,
//   individualDataObj,
// }) => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [animationData, setAnimationData] = useState(individualDataObj);

//   const showMyLocation = (locate) => {
//     mapRef.current.flyTo(locate, 22, {
//       animate: true,
//       duration: 2,
//     });
//   };

//   const handlePlay = () => {
//     if (locate) {
//       showMyLocation(locate);
//     }
//   };

//   const togglePlay = () => {
//     setIsPlaying(!isPlaying);
//     if (!isPlaying) {
//       startAnimation(); // Start animation
//     }
//   };

//   const handleProgressChange = (event) => {
//     setProgress(event.target.value);
//   };

//   const handleCutHistory = () => {
//     setShowPlayBar(false);
//     setIsCalender(false);
//     setIsPlaybacking(false);
//     setIsAnimating(false);
//   };

//   useEffect(() => {
//     const mySlider = document.getElementById("progress-bar");
//     if (mySlider) {
//       const valPercent = (progress / mySlider.max) * 100;
//       mySlider.style.background = `linear-gradient(to right, #000000 ${valPercent}%, #d5d5d5 ${valPercent}%)`;
//     }
//   }, [progress]);

//   useEffect(() => {
//     if (!isPlaying) return;

//     const interval = setInterval(() => {
//       setProgress((currentIndex / (pairedArray.length - 1)) * 100);

//       // Simulate data changes
//       setAnimationData((prevData) => ({
//         ...prevData,
//         speed: Math.min(prevData.speed + 5, 46), // Simulate increasing speed
//         distance: prevData.distance + 0.2, // Simulate increasing distance
//         // Add logic for updating time and other data as needed
//       }));

//       setCurrentIndex((prevIndex) => (prevIndex + 1) % pairedArray.length);
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [isPlaying, currentIndex, pairedArray.length]);

//   return (
//     <>
//       <hr style={{ height: "2px", color: "black" }} />

//       <div className="containerPlay">
//         <div className="playBarInfo">
//           <div className="dataInfo">
//             <div className="head">Speed</div>
//             <div className="headData">{`${animationData.speed} kmph`}</div>
//           </div>
//           <div className="dataInfo">
//             <div className="head">Distance</div>
//             <div className="headData">
//               {animationData.distance !== undefined &&
//               animationData.distance !== null &&
//               (animationData.distance)
//                 ? `${animationData.distance.toFixed(2)} km`
//                 : "0.00 km"}
//             </div>
//           </div>
//           <div className="dataInfo">
//             <div className="head">Time</div>
//             <div className="headData">{animationData.time}</div>
//           </div>
//           <div className="dataInfo">
//             <div className="head">Total Distance</div>
//             <div className="headData">33.50 km</div>
//           </div>
//           <div className="dataInfo">
//             <div className="head">Avg. Speed (km/h)</div>
//             <div className="headData">22.38 kmph</div>
//           </div>
//           <div className="dataInfo">
//             <div className="head">Max. Speed (km/h)</div>
//             <div className="headData">46 kmph</div>
//           </div>
//         </div>
//         <div className="playbar-container">
//           <button type="button" className="btn btn-outline-dark playBar-btn">
//             <FaFilter className="BtnIcon" />
//           </button>

//           <button type="button" className="btn btn-outline-dark playBar-btn">
//             <FaFastBackward className="BtnIcon" />
//           </button>

//           <button
//             className="play-pause-btn btn btn-outline-dark playBar-btn"
//             onClick={togglePlay}
//           >
//             {isPlaying ? (
//               <FaPause className="BtnIcon" />
//             ) : (
//               <FaPlay className="BtnIcon" onClick={handlePlay} />
//             )}
//           </button>
//           <input
//             type="range"
//             min={0}
//             max={100}
//             value={progress}
//             id="progress-bar"
//             onChange={handleProgressChange}
//             style={{ backgroundColor: "#fff !important" }}
//           />
//           <span className="progress-percentage">
//           <b>{progress !== undefined && progress !== null && !isNaN(progress) ? progress.toFixed(2) : "0.00"}/100</b>
//           </span>
//           <button className="btn btn-outline-dark playBar-btn">
//             <FaForward className="BtnIcon" />
//           </button>
//           <button className="btn btn-outline-dark playBar-btn">
//             <MdSpeed className="BtnIcon" />
//           </button>
//         </div>
//       </div>
//       <hr style={{ height: "2px", color: "black" }} />
//     </>
//   );
// };

// export default PlayBar;