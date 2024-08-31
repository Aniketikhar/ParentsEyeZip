import React, { useContext, useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import HomeIcon from '@mui/icons-material/Home';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined'; 
import LoopSharpIcon from '@mui/icons-material/LoopSharp';
import { RedAlertZone } from '../redAlertZone/redAlertZone.jsx';
import { Modal, Box as MuiBox, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import ChangePassword from '../ChangePassword.jsx';
import LockResetTwoToneIcon from '@mui/icons-material/LockResetTwoTone';
import { Login } from '@mui/icons-material';
import {Link} from 'react-router-dom';
import { TotalResponsesContext } from '../../TotalResponsesContext.jsx';


const pages = [
  { title: 'Home', icon: <HomeIcon />, arr: ['Dashboard', 'Advanced Dashboard', 'Analytics Dashboard'] },
  // { title: 'Master', icon: <DriveEtaIcon />, arr: ['Server','Device','Groups','Assets','School', 'Assets Type','Assets Command','Assets Category','Assets Class','Assets Group','Users','Assets URL','User Profile','Users Assets Mapping','User Menu Master','Import Location','Assets Division','Assets Owner','Driver Master','Over speed setting','Device Settings','Geo Data', 'Landmark Group','Commands','Top Main Menu Master','Import Trip','Top Menu Master','Broker','Address Book','Main Menu Master','Address Book Group','User Display Settings','RFID','Telecom Master','Landmark Images','Landmark Waypoints','Emails'] },
  { title: 'Masterupdated', icon: <DriveEtaIcon />, arr: ['Preferences','Notifications','Account','Devices','Geofences','Groups','Drivers','Calendars','Computed Attributes','Maintenance','Saved Commands','Server','Userrr'] },
  { title: 'ReportsUpdated', icon: <BarChartIcon />, arr: ['Combined','Route','Events'] },
  { title: 'School', icon: <DriveEtaIcon />, arr:['Student Detail','Geofence','Pickup And Drop List', 'Absent','Present','Leave','Status','User','Approved Request','Denied Request'] },
  { title: 'Users', icon: <DriveEtaIcon />, arr:["SchoolMaster", "BranchMaster",'Driver', 'Parent','Supervisor'] },
  { title: 'Geofencing', icon: <DriveEtaIcon />, arr: ['Create Landmark', 'Edit Landmarks','Create Route','Edit Routes','Create Area','Edit Areas','Create Zone','Edit Zones','Trips'] },
  // { title: 'Reports', icon: <BarChartIcon />, arr: ['Summary', 'Stop Report', 'Area In/Out Report', 'Area Report', 'Landmark Distance', 'Landmark Report', 'Location Wise Distance', 'Distance Report', 'Run Report', 'Distance Graph', 'Speed Graph', 'Trip Report', 'All Point Report','RFID','Distance Between Report','Vehicle Average','Alerts','Data Logs','AC Report', 'Petrolling Report','Bin Details Report','ETA details report','ETA details'] },
  
  {title: 'Institutestudent', icon: <BarChartIcon />, arr: ['Combined1','Route1','Events1','Trips1','Stops1','Summary1','Statistics1','Newdemo']}
  // { title: 'Maintenance', icon: <SettingsIcon />, arr: ['Search','Add maintenance','Type of operation','Custom Profile'] },
];

export const Navbar = (props) => {
  const [selectedPage, setSelectedPage] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [filteredPages, setFilteredPages] = useState([]);
  const { role } = useContext(TotalResponsesContext);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (role == 1) {
      setFilteredPages(pages);
    } else if (role == 2 || role == 3) {
      const pagesToFilter = [
        "Home",
        "School",
        "Users",
        "ReportsUpdated",
        "Maintenance",
      ];
      const filter = pages.filter((item) => pagesToFilter.includes(item.title));

      setFilteredPages(filter);
    }
  }, []);


  const handleNavClick = (arr, title) => {
    if (role === 1) {
      
      props.propFunc(arr);
      props.propBool(true);
      setSelectedPage(title);
    } else if (role === 2) {
      const updatedArr = arr.filter((item) => item !== "SchoolMaster");
      props.propFunc(updatedArr);
      props.propBool(true);
      setSelectedPage(title);
    } else if (role === 3) {
      const updatedArr = arr.filter(
        (item) => item !== "SchoolMaster" && item !== "BranchMaster"
      );
      props.propFunc(updatedArr);
      props.propBool(true);
      setSelectedPage(title);
    }
  };

  const handleRedAlert = () =>{
    setOpenModal(true);
  }

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleAccount = () => {
    <Grid item>
          <Tooltip title="Add" placement="bottom-start">
            <Button>bottom-start</Button>
          </Tooltip>
        </Grid>
  }

  return (
    <> <AppBar position="fixed" sx={{ zIndex: 1301, backgroundColor:'#f4d24a',height:'69px' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters >
          <Link to={'/'}>
          <img src='parentslogo.png' style={{ height: 64, width: 150,paddingTop:'15px',paddingBottom:'5px' }} /></Link><br/>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, marginLeft: '5px' }}>
            
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1,paddingTop:'11px'}}>
            {filteredPages.map((page) => (
              <Button
                key={page.title}
                sx={{
                  mx: 1,
                  color: 'black',
                  backgroundColor: selectedPage === page.title ? 'rgba(255, 255, 255, 0.2)' : 'transparent'
                }}
                onClick={() => handleNavClick(page.arr, page.title)}
              >
                <Typography variant="body1" component="span" sx={{ display: 'flex', alignItems: 'left' }}>
                  {page.icon}
                  {page.title}
                  <ExpandMoreIcon />
                </Typography>
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center',paddingTop:'11px' }}>
            <Tooltip title='Red Zone Alert'>
              <IconButton sx={{ p: 0 }} onClick={handleRedAlert}>
                <ReportProblemOutlinedIcon style={{ color: 'red', marginRight: 10 }} />
              </IconButton>
            </Tooltip>
            <Tooltip title='Refresh Page'>
              <IconButton sx={{ p: 0 }} onClick={() => window.location.reload()}>
                <LoopSharpIcon style={{ color: 'black' }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Open settings">
              <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                  >
                    <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                sx={{ zIndex: 1302 }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                alignItems={{ horizontal: 'right' }}
              ><div style={{background: 'linear-gradient(to right, rgb(253, 215, 52), #828b94)'}}>
                <MenuItem onClick={handleClose}>
                  <Avatar /> Profile
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Avatar /> My account
                </MenuItem>
                </div>
                <Divider />
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <PersonAdd fontSize="small" />
                  </ListItemIcon>
                  Helpline No:9370180012
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Language
                </MenuItem>
                <Link to={"/Login"} >
                <MenuItem onClick={handleClose}>
                  
                  <ListItemIcon>
                    <Login fontSize="small" />
                  </ListItemIcon>
                  Login
                
              </MenuItem>
              </Link>
              <Link to={"/ChangePassword"} >
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <LockResetTwoToneIcon fontsize="small" />
                </ListItemIcon>
                ChangePassword
              </MenuItem>
              </Link>
            </Menu>
          </Tooltip>
        </Box>
      </Toolbar>
    </Container><Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="red-alert-modal-title"
      aria-describedby="red-alert-modal-description"
    >
        <MuiBox sx={style}>
          <div style={{ backgroundColor: 'rgb(253, 215, 52)', color: 'black', height: 40, display: 'flex' }}><b style={{ marginLeft: 5 }}>Red Alert Zone</b></div>
          <Typography id="red-alert-modal-title" variant="h6" component="h2">
            RedZone Time
          </Typography>
          <select style={{ width: 200, height: 40 }}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
          </select><br />

          <RedAlertZone />
        </MuiBox>
      </Modal>
    </AppBar></>
  );
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  bgcolor: 'background.paper',
  border: '2px solid rgb(253, 215, 52)',
  boxShadow: 24,
  
};
