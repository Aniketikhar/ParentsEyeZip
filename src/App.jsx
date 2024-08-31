import "./App.css";
import { Navbar } from "./Components/Navbar/Navbar.jsx";
import { Sidebar } from "./Components/Sidebar/Sidebar.jsx";
import { Tablee } from "./Components/Table/Table.jsx";
import { CustomTabs } from "./Components/Tabs/Tabs.jsx";
import React, { useState, useEffect, useContext } from "react";
// import { Cards } from './Components/Cards/Cards.jsx';
import { Googlemap } from "./Components/googlemap/googlemap.jsx";
import { BasicSpeedDial } from "./Components/basicSpeedDial/basicSpeedDial.jsx";
import { DistanceReport } from "./Components/VariousTables/Reports/DistanceReport/DistanceReport.jsx";
import { Assets } from "./Components/VariousTables/Master/Assets/Assets.jsx";
// import { School } from "./Components/VariousTables/Master/Assets/School.jsx";
import { AssetsCategory } from "./Components/VariousTables/Master/AssetsCategory/AssetsCategory.jsx";
import {Leave} from "./Components/VariousTables/School/Leave/Leave.jsx"
import {Status} from "./Components/VariousTables/School/Status/Status.jsx"
import {StudentDetail} from "./Components/VariousTables/School/StudentDetail/StudentDetail.jsx"
import {Present} from "./Components/VariousTables/School/Present/Present.jsx"
import {User} from "./Components/VariousTables/School/User/User.jsx"
import { DriverAssignmentReport } from "./Components/VariousTables/Reports/DriverAssignmentReport/DriverAssignmentReport.jsx";
import { AnalyticsDashboard } from "./Components/VariousTables/Home/Analytics.js";
import {School}  from "./Components/VariousTables/Master/School/School.jsx";
import { AssetsType } from "./Components/VariousTables/Master/AssetsType/AssetsType.jsx";
import { AssetsCommand } from "./Components/VariousTables/Master/AssetsCommand/AssetsCommand.jsx";
import { AssetsClass } from "./Components/VariousTables/Master/AssetsClass/AssetsClass.jsx";
import { AssetsGroup } from "./Components/VariousTables/Master/AssetsGroup/AssetsGroup.jsx";
import { Users } from "./Components/VariousTables/Master/Users/Users.jsx";
import { CreateLandmark } from "./Components/VariousTables/Geofencing/CreateLandmark.jsx";
import { EditLandmarks } from "./Components/VariousTables/Geofencing/EditLandmarks/EditLandmarks.jsx";
import { CreateRoute } from "./Components/VariousTables/Geofencing/CreateRoute.jsx";
import { EditRoutes } from "./Components/VariousTables/Geofencing/EditRoutes/EditRoutes.jsx";
import { CreateArea } from "./Components/VariousTables/Geofencing/CreateArea.jsx";
import { AssetsDivision } from "./Components/VariousTables/Master/AssetsDivision/AssetsDivision.jsx";
import { AssetsOwner } from "./Components/VariousTables/Master/AssetsOwner/AssetsOwner.jsx";
import {Absent} from "./Components/VariousTables/School/Absent/Absent.jsx"
import { AddressBook } from "./Components/VariousTables/Master/AddressBook/AddressBook.jsx";
import { AddressBookGroup } from "./Components/VariousTables/Master/AddressBookGroup/AddressBookGroup.jsx";
import { AssetsURL } from "./Components/VariousTables/Master/AssetsURL/AssetsURL.jsx";
import { Broker } from "./Components/VariousTables/Master/Broker/Broker.jsx";
import { Commands } from "./Components/VariousTables/Master/Commands/Commands.jsx";
import { DeviceSettings } from "./Components/VariousTables/Master/DeviceSettings/DeviceSettings.jsx";
import { DriverMaster } from "./Components/VariousTables/Master/DriverMaster/DriverMaster.jsx";
import { Emails } from "./Components/VariousTables/Master/Emails/Emails.jsx";
import { GeoData } from "./Components/VariousTables/Master/GeoData/GeoData.jsx";
import { ImportLocation } from "./Components/VariousTables/Master/ImportLocation/ImportLocation.jsx";
import { LandmarkGroup } from "./Components/VariousTables/Master/LandmarkGroup/LandmarkGroup.jsx";
import { LandmarkImages } from "./Components/VariousTables/Master/LandmarkImages/LandmarkImages.jsx";
import { LandmarkWaypoints } from "./Components/VariousTables/Master/LandmarkWaypoints/LandmarkWaypoints.jsx";
import { MainMenuMaster } from "./Components/VariousTables/Master/MainMenuMaster/MainMenuMaster.jsx";
import { RFID } from "./Components/VariousTables/Master/RFID/RFID.jsx";
import { TelecomMaster } from "./Components/VariousTables/Master/TelecomMaster/TelecomMaster.jsx";
import { TopMainMenuMaster } from "./Components/VariousTables/Master/TopMainMenuMaster/TopMainMenuMaster.jsx";
import { TopMenuMaster } from "./Components/VariousTables/Master/TopMenuMaster/TopMenuMaster.jsx";
import { UserMenuMaster } from "./Components/VariousTables/Master/UserMenuMaster/UserMenuMaster.jsx";
import { UserProfile } from "./Components/VariousTables/Master/UserProfile/UserProfile.jsx";
import { UsersAssetsMapping } from "./Components/VariousTables/Master/UsersAssetsMapping/UsersAssetsMapping.jsx";
import { EditAreas } from "./Components/VariousTables/Geofencing/EditAreas/EditArea.js";
import { EditZones } from "./Components/VariousTables/Geofencing/EditZones/EditZones.jsx";
import { Trips } from "./Components/VariousTables/Geofencing/Trips/Trips.jsx";
import {Driver} from "./Components/VariousTables/Users/Driver/Driver.jsx";
import {Parent} from "./Components/VariousTables/Users/Parent/Parent.jsx";
import { Supervisor } from "./Components/VariousTables/Users/Supervisor/Supervisor.jsx";
import SchoolMaster from "./Components/VariousTables/Users/SchoolMaster/SchoolMaster.jsx";
import BranchMaster from "./Components/VariousTables/Users/BranchMaster/BranchMaster.jsx";

// import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'
import axios from "axios";
import { ApprovedRequest } from "./Components/VariousTables/School/ApprovedRequest/ApprovedRequest.jsx";
import { DeniedRequest } from "./Components/VariousTables/School/DeniedRequest/DeniedRequest.jsx";
import { Button } from "@mui/material";
// import { FetchData } from './Components/FetchData.jsx';
import { VehicleDetails } from "./Components/VehicleDetails.jsx";
import { PickupAndDrop } from "./Components/VariousTables/School/PickAndDrop/PickupAndDrop.jsx";
import { Server } from "./Components/VariousTables/Master/Server/Server.jsx";
import {Device} from "./Components/VariousTables/Master/Device/Device.jsx"
import { Groups } from "./Components/VariousTables/Master/Groups/Groups.jsx";
import { Geofence } from "./Components/VariousTables/School/Geofence/Geofence.jsx";
import { Preferences } from "./Components/VariousTables/MASTERUPDATED/Preferences/Preferences.jsx";
import { Notifications } from "./Components/VariousTables/MASTERUPDATED/Notifications/Notifications.jsx";
import {Devices} from "./Components/VariousTables/MASTERUPDATED/Device/Devices.jsx"
import { Geofences } from "./Components/VariousTables/MASTERUPDATED/Geofences/Geofences.jsx";
import { Drivers } from "./Components/VariousTables/MASTERUPDATED/Drivers/Drivers.jsx"
import { ComputedAttributes } from "./Components/VariousTables/MASTERUPDATED/ComputedAttributes/ComputedAttributes.jsx";
import { Maintenance } from "./Components/VariousTables/MASTERUPDATED/Maintenance/Maintenance.jsx";
import { SavedCommands } from "./Components/VariousTables/MASTERUPDATED/Saved Commands/SavedCommands.jsx";
import { Userrr } from "./Components/VariousTables/MASTERUPDATED/Userrr/Userrr.jsx";
import { Combined } from "./Components/VariousTables/ReportsUpdated/Combined/Combined.jsx";
import { Route } from "./Components/VariousTables/ReportsUpdated/Route/Route.jsx";
import { Events } from "./Components/VariousTables/ReportsUpdated/Events/Events.jsx"
import { Newdemo } from "./Components/VariousTables/Institutestudent/Newdemo/Newdemo.jsx";
// import { ComputedAttributes } from "./Components/VariousTables/MASTERUPDATED/ComputedAttributes/ComputedAttributes.jsx";
//import { TotalResponsesProvider } from './TotalResponsesContext';
function App() {
  const [state, setState] = useState(0);
  const [sideBarItems, setSideBarItems] = useState([]);
  const [sideBarBool, setSideBarBool] = useState(false);
  const [tabs, setTabs] = useState(["Dashboard"]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [component, setComponent] = useState("");
  const [apiData, setApiData] = useState([]);

  // const handleClick = async () => {
  //   try {
  //     const response = await axios.get('https://rocketsalestracker.com/api/devices', {
  //       params: { id: "42" }
  //     });
  //     console.log(response.data.message);
  //     setApiData(response.data.message);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  const handleDrivername = () => {};
  const handleMobileNo = () => {};
  //API FETCHING
  const [deviceApiData, setDeviceApiData] = useState([]); // State variable to store device API data
  const [positionApiData, setPositionApiData] = useState([]); // State variable to store position API data
  const [mergedData, setMergedData] = useState([]);

  useEffect(() => {
    const fetchDeviceData = async () => {
      try {
        const username = "test"; // Replace with your actual username
        const password = "123456"; // Replace with your actual password
        const token = btoa(`${username}:${password}`); // Base64 encode the username and password
        const response1 = await axios.get(
            "https://rocketsalestracker.com/api/devices",
          {
            headers: {
              Authorization: `Basic ${token}`, // Replace with your actual token
            },
          }
        );

        setDeviceApiData(response1.data); // Update state variable with device API data
      } catch (error) {
        console.error("Error fetching device data:", error);
      }
    };

    const fetchPositionData = async () => {
      try {
        const username = "test"; // Replace with your actual username
        const password = "123456"; // Replace with your actual password
        const token = btoa(`${username}:${password}`); // Base64 encode the username and password

        const response2 = await axios.get(
             "https://rocketsalestracker.com/api/positions",
          {
            headers: {
              Authorization: `Basic ${token}`,
            },
          }
        );

        setPositionApiData(response2.data); // Update state variable with position API data
      } catch (error) {
        console.error("Error fetching position data:", error);
      }
    };

    fetchDeviceData();
    fetchPositionData();
  }); // Empty dependency array ensures this effect runs only once on component mount

  // console.log(deviceApiData)
  // console.log(positionApiData)

  useEffect(() => {
    if (deviceApiData.length > 0 && positionApiData.length > 0) {
      // Assuming both APIs have a common key to merge data, e.g., 'deviceId'
      const merged = deviceApiData.map((device) => {
        const position = positionApiData.find(
          (pos) => pos.deviceId === device.id
        );
        return { ...device, ...position };
      });
      setMergedData(merged);
      // setFilteredRows(merged.map(row => ({ ...row, isSelected: false })));
    }
  }, [deviceApiData, positionApiData]);

  // console.log(mergedData)

  // console.log(tabs[selectedTab]);

  const handleClickSideBar = (data) => {
    setState(data);
  };

  const handleClickNav = (data) => {
    setSideBarItems(data);
  };

  const handleSidebarItemClick = (item) => {
    if (item === "Distance Report") {
      setComponent("DistanceReport");
    } else if (item === "Dashboard") {
      setComponent("Dashboard");
    } else if (item === "Assets") {
      setComponent("Assets");
    } else if (item === "Assets Category") {
      setComponent("AssetsCategory");
    }else if (item === "Leave") {
      setComponent("Leave");
    }else if (item === "Status") {
      setComponent("Status");
    } else if (item === "Driver Assignment Report") {
      setComponent("DriverAssignmentReport");
    } else if (item === "Analytics Dashboard") {
      setComponent("AnalyticsDashboard");
    } else if (item === "Assets Type") {
      setComponent("AssetsType");
    } else if (item === "Assets Command") {
      setComponent("AssetsCommand");
    } else if (item === "Assets Class") {
      setComponent("AssetsClass");
    } else if (item === "Assets Group") {
      setComponent("AssetsGroup");
    } else if (item === "Users") {
      setComponent("Users");
    } else if (item === "Create Landmark") {
      setComponent("CreateLandmark");
    } else if (item === "Edit Landmarks") {
      setComponent("EditLandmarks");
    } else if (item === "Create Route") {
      setComponent("CreateRoute");
    } else if (item === "Edit Routes") {
      setComponent("EditRoutes");
    } else if (item === "Create Area") {
      setComponent("CreateArea");
    } else if (item === "Assets Division") {
      setComponent("AssetsDivision");
    } else if (item === "Assets Owner") {
      setComponent("AssetsOwner");
    } else if (item === "Address Book") {
      setComponent("AddressBook");
    }else if (item === "Absent") {
      setComponent("Absent");
    }else if (item === "Student Detail") {
      setComponent("StudentDetail");
    }else if (item === "Address Book Group") {
      setComponent("AddressBookGroup");
    } else if (item === "Assets URL") {
      setComponent("AssetsURL");
    } else if (item === "Broker") {
      setComponent("Broker");
    } else if (item === "Commands") {
      setComponent("Commands");
    } else if (item === "Device Settings") {
      setComponent("DeviceSettings");
    } else if (item === "Driver Master") {
      setComponent("DriverMaster");
    } else if (item === "Emails") {
      setComponent("Emails");
    } else if (item === "Geo Data") {
      setComponent("GeoData");
    } else if (item === "Import Location") {
      setComponent("ImportLocation");
    } else if (item === "Landmark Group") {
      setComponent("LandmarkGroup");
    } else if (item === "Landmark Images") {
      setComponent("LandmarkImages");
    } else if (item === "Landmark Waypoints") {
      setComponent("LandmarkWaypoints");
    } else if (item === "Main Menu Master") {
      setComponent("MainMenuMaster");
    } else if (item === "RFID") {
      setComponent("RFID");
    } else if (item === "Telecom Master") {
      setComponent("TelecomMaster");
    } else if (item === "Top Main Menu Master") {
      setComponent("TopMainMenuMaster");
    } else if (item === "Top Menu Master") {
      setComponent("TopMenuMaster");
    } else if (item === "User Menu Master") {
      setComponent("UserMenuMaster");
    } else if (item === "User Profile") {
      setComponent("UserProfile");
    } else if (item === "Users Assets Mapping") {
      setComponent("UsersAssetsMapping");
    } else if (item === "Edit Areas") {
      setComponent("EditAreas");
    } else if (item === "Edit Zones") {
      setComponent("EditZones");
    } else if (item === "Trips") {
      setComponent("Trips");
    }else if (item === "School") {
      setComponent("School");
    }else if (item === "User") {
      setComponent("User");
    }else if (item === "Present") {
      setComponent("Present");
    }else if (item === "Driver") {
      setComponent("Driver");
    } else if (item === "SchoolMaster") {
      setComponent("SchoolMaster");
    } else if (item === "BranchMaster") {
      setComponent("BranchMaster");
    }else if (item === "Parent") {
      setComponent("Parent");
    }else if (item === "Supervisor") {
      setComponent("Supervisor");
    }else if (item === "Approved Request") {
      setComponent("ApprovedRequest");
    }else if (item === "Denied Request") {
      setComponent("DeniedRequest");
    }else if (item === "Pickup And Drop List") {
      setComponent("PickupAndDrop");
    }else if (item === "Server") {
      setComponent("Server");
    }else if (item === "Device") {
      setComponent("Device");
    }else if (item === "Groups") {
      setComponent("Groups");
    }else if (item === "Geofence") {
      setComponent("Geofence");
    }else if (item === "Preferences") {
      setComponent("Preferences");
    }else if (item === "Notifications") {
      setComponent("Notifications");
    }else if (item === "Devices") {
      setComponent("Devices");
    }else if (item === "Geofences") {
      setComponent("Geofences");
    }else if (item === "Drivers") {
      setComponent("Drivers");
    }else if (item === "Computed Attributes") {
      setComponent("ComputedAttributes");
    }else if (item === "Maintenance") {
      setComponent("Maintenance");
    }else if (item === "Saved Commands") {
      setComponent("SavedCommands");
    }else if (item === "Userrr") {
      setComponent("Userrr");
    }else if (item === "Combined") {
      setComponent("Combined");
    }else if (item === "Route") {
      setComponent("Route");
    }else if (item === "Events") {
      setComponent("Events");
    }else if (item === "Newdemo") {
      setComponent("Newdemo");
    }
   
   

    const tabIndex = tabs.indexOf(item);
    if (tabIndex === -1) {
      const newTabs = [...tabs, item];
      setTabs(newTabs);
      setSelectedTab(newTabs.length - 1);
      // console.log(tabs);
    } else {
      setSelectedTab(tabIndex);
    }
  };

  const handleRemoveTab = (tab) => {
    setTabs(tabs.filter((item) => item !== tab));
  };

  
  return (
    <>
      <div style={{ marginLeft: state, marginTop: "64px" }}>
        {/* <FetchData /> */}
        {/* <VehicleDetails /> */}
        <Navbar propFunc={handleClickNav} propBool={setSideBarBool} />

        <div style={{ marginTop: "64px" }}>
          {/* <CustomTabs tabs={tabs} selectedTab={selectedTab} handleRemoveTab={handleRemoveTab}/><br/> */}

          <Sidebar
            propFunc={handleClickSideBar}
            propArr={sideBarItems}
            propBoolFunc={setSideBarBool}
            propBoolIn={sideBarBool}
            onItemClick={handleSidebarItemClick}
          />

          {component === "Dashboard" && <Tablee data={mergedData} />}
          {component === "DistanceReport" && (
            <DistanceReport data={mergedData} />
          )}
          {component === "Assets" && <Assets data={mergedData} />}
          {component === "School" && <School data={mergedData} />}
          {component === "AssetsCategory" && (
            <AssetsCategory data={mergedData} />
          )}
          {component === "Leave" && (
            <Leave data={mergedData} />
          )}
          {component === "Status" && (
            <Status data={mergedData} />
          )}
           {component === "StudentDetail" && (
            <StudentDetail data={mergedData} />
          )}
          {component === "DriverAssignmentReport" && (
            <DriverAssignmentReport data={mergedData} />
          )}
          {component === "AnalyticsDashboard" && (
            <AnalyticsDashboard data={mergedData} />
          )}
          {component === "AssetsType" && <AssetsType data={mergedData} />}
          {component === "AssetsCommand" && <AssetsCommand data={mergedData} />}
          {component === "AssetsClass" && <AssetsClass data={mergedData} />}
          {component === "AssetsGroup" && <AssetsGroup data={mergedData} />}
          {component === "Users" && <Users data={mergedData} />}
          {component === "CreateLandmark" && (
            <CreateLandmark data={mergedData} />
          )}
          {component === "EditLandmarks" && <EditLandmarks data={mergedData} />}
          {component === "CreateRoute" && <CreateRoute data={mergedData} />}
          {component === "EditRoutes" && <EditRoutes data={mergedData} />}
          {component === "CreateArea" && <CreateArea data={mergedData} />}
          {component === "AssetsDivision" && (
            <AssetsDivision data={mergedData} />
          )}
          {component === "AssetsOwner" && <AssetsOwner data={mergedData} />}
          {component === "AddressBook" && <AddressBook data={mergedData} />}
          {component === "AddressBookGroup" && (
            <AddressBookGroup data={mergedData} />
          )}
          {component === "AssetsURL" && <AssetsURL data={mergedData} />}
          {component === "Broker" && <Broker data={mergedData} />}
          {component === "Commands" && <Commands data={mergedData} />}
          {component === "DeviceSettings" && (
            <DeviceSettings data={mergedData} />
          )}
          {component === "DriverMaster" && <DriverMaster data={mergedData} />}
          {component === "Emails" && <Emails data={mergedData} />}
          {component === "GeoData" && <GeoData data={mergedData} />}
          {component === "ImportLocation" && (
            <ImportLocation data={mergedData} />
          )}
          {component === "LandmarkGroup" && <LandmarkGroup data={mergedData} />}
          {component === "LandmarkImages" && (
            <LandmarkImages data={mergedData} />
          )}
          {component === "LandmarkWaypoints" && (
            <LandmarkWaypoints data={mergedData} />
          )}
          {component === "MainMenuMaster" && (
            <MainMenuMaster data={mergedData} />
          )}
          {component === "RFID" && <RFID data={mergedData} />}
          {component === "TelecomMaster" && <TelecomMaster data={mergedData} />}
          {component === "TopMainMenuMaster" && (
            <TopMainMenuMaster data={mergedData} />
          )}
            {/* {component === "School" && (
            <School data={mergedData} />
          )} */}
          {component === "TopMenuMaster" && <TopMenuMaster data={mergedData} />}
          {component === "UserMenuMaster" && (
            <UserMenuMaster data={mergedData} />
          )}
          
          {component === "UserProfile" && <UserProfile data={mergedData} />}
         
        


           

          {component === "EditAreas" && <EditAreas data={mergedData} />}
          {component === "EditZones" && <EditZones data={mergedData} />}
          {component === "Trips" && <Trips data={mergedData} />}

          {component === "Absent" && <Absent data={mergedData} />}
          {component === "User" && <User data={mergedData} />}
          {component === "Present" && <Present data={mergedData} />}
          {component === "Driver" && <Driver data={mergedData} />}
          {component === "Parent" && <Parent data={mergedData} />}
          {component === "Supervisor" && <Supervisor data={mergedData} />}
          {component === "SchoolMaster" && <SchoolMaster data={mergedData} />}
          {component === "BranchMaster" && <BranchMaster data={mergedData} />}
          
          {component === "ApprovedRequest" && <ApprovedRequest data={mergedData} />}
          {component === "DeniedRequest" && <DeniedRequest data={mergedData} />}
          {component === "PickupAndDrop" && <PickupAndDrop data={mergedData} />}
          {component === "Server" && <Server data={mergedData} />}
          {component === "Device" && <Device data={mergedData} />}
          {component === "Groups" && <Groups data={mergedData} />}
          {component === "Geofence" && <Geofence data={mergedData} />}
          {component === "Preferences" && <Preferences data={mergedData} />}
          {component === "Notifications" && <Notifications data={mergedData} />}
          {component === "Devices" && <Devices data={mergedData} />}
          {component === "Geofences" && <Geofences data={mergedData} />}
          {component === "Drivers" && <Drivers data={mergedData} />}
          {component === "ComputedAttributes" && <ComputedAttributes data={mergedData} />}
          {component === "Maintenance" && <Maintenance data={mergedData} />}
          {component === "SavedCommands" && <SavedCommands data={mergedData} />}
          {component === "Userrr" && <Userrr data={mergedData} />}
          {component === "Combined" && <Combined data={mergedData} />}
          {component === "Route" && <Route data={mergedData} />}
          {component === "Events" && <Events data={mergedData} />}
          {component === "Newdemo" && <Newdemo data={mergedData} />}
           {/* {component === "ComputedAttributs" && <ComputedAttributes data={mergedData} />} */}
          {/* {component === "School" && <AssetsType data={mergedData} />} */}
          <BasicSpeedDial />
          {![
            
            "Dashboard",
            "School",
            "DistanceReport",
            "Assets",
            "AssetsCategory",
            "Leave",
            "Status",
            "DriverAssignmentReport",
            "AnalyticsDashboard",
            "AssetsType",
            "AssetsCommand",
            "AssetsClass",
            "AssetsGroup",
            "Users",
            "CreateLandmark",
            "EditLandmarks",
            "CreateRoute",
            "EditRoutes",
            "CreateArea",
            "AssetsDivision",
            "AssetsOwner",
            "AddressBook",
            "AddressBookGroup",
            "AssetsURL",
            "Broker",
            "Commands",
            "DeviceSettings",
            "DriverMaster",
            "Emails",
            "GeoData",
            "ImportLocation",
            "LandmarkGroup",
            "LandmarkImages",
            "LandmarkWaypoints",
            "MainMenuMaster",
            "RFID",
            "TelecomMaster",
            "TopMainMenuMaster",
            "TopMenuMaster",
            "UserMenuMaster",
            "UserProfile",
            "UsersAssetsMapping",
            "CreateArea",
            "EditAreas",
            "EditZones",
            "Trips",
            "Absent",
            "StudentDetail",
            "User",
            "Present",
            "Driver",
            "Parent",
            "Supervisor",
            "SchoolMaster",
            "BranchMaster",
            "ApprovedRequest",
            "DeniedRequest",
            "PickupAndDrop",
            "Server",
            "Device",
            "Groups",
            "Geofence",
            "Preferences",
            "Notifications",
            "Devices",
            "Geofences",
            "Drivers",
           "ComputedAttributes",
           "Maintenance",
           "SavedCommands",
           "Userrr",
           "Combined",
           "Route",
           "Newdemo"
          ].includes(component) && <Tablee data={mergedData} />}
        </div>
      </div>
      
    </>
  );
}

export default App;
