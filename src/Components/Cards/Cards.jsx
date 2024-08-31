import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { green, red, yellow, blue, grey, orange } from '@mui/material/colors';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StopIcon from '@mui/icons-material/Stop';
import SpeedIcon from '@mui/icons-material/Speed';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import ErrorIcon from '@mui/icons-material/Error';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import { useContext } from 'react';
import { TotalResponsesContext } from '../../TotalResponsesContext';
//import {StudentDetail} from "./Components/VariousTables/School/StudentDetail/StudentDetail.jsx"
//import {StudentDetail} from ".VariousTables/StudentDetail"
// import Leave from './Components/School/Leave/Leave.jsx';
export const Cards = ({vehicleRunningCount, vehicleStoppedCount, vehicleOverspeedCount, vehicleIdleCount,leavecard }) => {
  const { totalResponses,totalLeaveRequest } = useContext(TotalResponsesContext); // Consume the context
  // const { totalLeaveRequest } = useContext(TotalResponsesContext);

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
      {/* Running */}
      <Card sx={{ width: 197, margin: '5px' }}>
        <CardContent sx={{ padding: '10px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: green[200], padding: '5px', borderRadius: 2, marginBottom: '5px',height:'60px' }}>
            <AccessTimeIcon sx={{ color: green[500], marginRight: '5px' }} />
            <Typography sx={{ fontSize: 20 }}>Total No. Of Student</Typography>
          </Box>
          <Typography variant="h6" sx={{ color: green[500], fontSize: 18 }}>{totalResponses}/Assets</Typography>
        </CardContent>
      </Card>

      {/* Stopped */}
      <Card sx={{ width: 197, margin: '5px' }}>
        <CardContent sx={{ padding: '10px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: red[200], padding: '5px', borderRadius: 2, marginBottom: '5px',height:'60px' }}>
            <StopIcon sx={{ color: red[500], marginRight: '5px' }} />
            <Typography sx={{ fontSize: 20 }}>Present Student</Typography>
          </Box>
          <Typography variant="h6" sx={{ color: red[500], fontSize: 18 }}>{vehicleStoppedCount}/Assets</Typography>
        </CardContent>
      </Card>

      {/* Overspeed */}
      <Card sx={{ width: 197, margin: '5px' }}>
        <CardContent sx={{ padding: '10px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: orange[200], padding: '5px', borderRadius: 2, marginBottom: '5px',height:'60px' }}>
            <SpeedIcon sx={{ color: orange[500], marginRight: '5px' }} />
            <Typography sx={{ fontSize: 20 }}>Absent Student</Typography>
          </Box>
          <Typography variant="h6" sx={{ color: orange[500], fontSize: 18 }}>{vehicleOverspeedCount}/Assets</Typography>
        </CardContent>
      </Card>

      {/* Idle */}
      <Card sx={{ width: 197, margin: '5px' }}>
        <CardContent sx={{ padding: '10px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: yellow[200], padding: '5px', borderRadius: 2, marginBottom: '5px',height:'60px' }}>
            <HourglassEmptyIcon sx={{ color: yellow[500], marginRight: '5px' }} />
            <Typography sx={{ fontSize: 20 }}>All Vehicles</Typography>
          </Box>
          <Typography variant="h6" sx={{ color: yellow[500], fontSize: 18 }}>{vehicleIdleCount}/Assets</Typography>
        </CardContent>
      </Card>

      
      
      {/* Leaves Card */}
      <Card sx={{ width: 197, margin: '5px' }}>
        <CardContent sx={{ padding: '10px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: blue[200], padding: '5px', borderRadius: 2, marginBottom: '5px', height: '60px' }}>
            <ErrorIcon sx={{ color: blue[500], marginRight: '5px' }} />
            <Typography sx={{ fontSize: 20 }}>Leaves</Typography>
          </Box>
          <Typography variant="h6" sx={{ color: blue[500], fontSize: 18 }}>{totalLeaveRequest}/Assets</Typography>
        </CardContent>
      </Card>

      

      {/* New */}
      <Card sx={{ width: 197, margin: '5px' }}>
        <CardContent sx={{ padding: '10px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: grey[200], padding: '5px', borderRadius: 2, marginBottom: '5px',height:'60px' }}>
            <NewReleasesIcon sx={{ color: grey[500], marginRight: '5px' }} />
            <Typography sx={{ fontSize: 20 }}>New</Typography>
          </Box>
          <Typography variant="h6" sx={{ color: grey[500], fontSize: 18 }}>00/Assets</Typography>
        </CardContent>
      </Card>

      {/* leavecard */}
      <Card sx={{ width: 197, margin: '5px' }}>
        <CardContent sx={{ padding: '10px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: blue[200], padding: '5px', borderRadius: 2, marginBottom: '5px',height:'60px' }}>
            <ErrorIcon sx={{ color: blue[500], marginRight: '5px' }} />
            <Typography sx={{ fontSize: 20 }}>Leavescard</Typography>
          </Box>
          <Typography variant="h6" sx={{ color: blue[500], fontSize: 18 }}>{leavecard}/Assets</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};
