import React, { useState, useEffect, useContext, Component } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import { COLUMNS } from "./columns";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import * as XLSX from "xlsx";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { TotalResponsesContext } from "../../../../TotalResponsesContext";
import CircularProgress from "@mui/material/CircularProgress";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

//import { TextField } from '@mui/material';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "80%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflowY: "auto", // Enable vertical scrolling
  display: "flex",
  flexDirection: "column",
  padding: "1rem",
};

export const Combined = () => {
  const { setTotalResponses } = useContext(TotalResponsesContext); // Get the context value

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterText, setFilterText] = useState("");
  const [filteredRows, setFilteredRows] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [columnVisibility, setColumnVisibility] = useState(
    Object.fromEntries(COLUMNS().map((col) => [col.accessor, true]))
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [importData, setImportData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [originalRows, setOriginalRows] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  
 
// const fetchData = async () => {
//   console.log('Fetching data...');
//   setLoading(true); // Set loading to true when starting fetch
//   try {
//     const username = "test";
//     const password = "123456";
//     const token = btoa(`${username}:${password}`);

//     const response = await axios.get("https://rocketsalestracker.com/api/server", {
//       headers: {
//         Authorization: `Basic ${token}`,
//       },
//     });

//     console.log('fetch data', response.data);

//     if (response.data && typeof response.data === 'object') {
//       const wrappedData = [response.data];
//       setFilteredRows(wrappedData.map(row => ({ ...row, isSelected: false })));
//       setTotalResponses(wrappedData.length);
//     } else {
//       console.error('Expected an object but got:', response.data);
//     }
//   } catch (error) {
//     console.error('Fetch data error:', error);
//     alert('An error occurred while fetching data.');
//   } finally {
//     setLoading(false);
//   }
// };

  

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterData(filterText);
  }, [filterText]);

 

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleFilterChange = (event) => {
    const text = event.target.value;
    setFilterText(text);
  };

 
  const filterData = (text) => {
    // Apply text-based filtering
    if (text === "") {
      // If no text is provided, reset to original rows
      setFilteredRows(originalRows.map(row => ({ ...row, isSelected: false })));
    } else {
      // Filter based on text
      const filteredData = originalRows
        .filter((row) =>
          Object.values(row).some(
            (val) =>
              typeof val === "string" &&
              val.toLowerCase().includes(text.toLowerCase())
          )
        )
        .map((row) => ({ ...row, isSelected: false }));
  
      setFilteredRows(filteredData);
    }
  };
  
  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleColumnVisibilityChange = (accessor) => {
    setColumnVisibility((prevState) => ({
      ...prevState,
      [accessor]: !prevState[accessor],
    }));
  };

  const handleRowSelect = (index) => {
    const newFilteredRows = [...filteredRows];
    newFilteredRows[index].isSelected = !newFilteredRows[index].isSelected;
    setFilteredRows(newFilteredRows);
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    const newFilteredRows = filteredRows.map((row) => ({
      ...row,
      isSelected: newSelectAll,
    }));
    setFilteredRows(newFilteredRows);
    setSelectAll(newSelectAll);
  };

  const handleEditButtonClick = () => {
    const selected = filteredRows.find((row) => row.isSelected);
    if (selected) {
      setSelectedRow(selected);
      setFormData(selected);
      setEditModalOpen(true);
    } else {
      setSnackbarOpen(true);
    }
  };

  const handleDeleteSelected = async () => {
    // Log filteredRows to check its structure
    console.log("Filtered rows:", filteredRows);

    // Get selected row IDs
    const selectedIds = filteredRows
      .filter((row) => row.isSelected)
      .map((row) => {
        // Log each row to check its structure
        console.log("Processing row:", row);
        return row._id; // Ensure id exists and is not undefined
      });

    console.log("Selected IDs:", selectedIds);

    if (selectedIds.length === 0) {
      alert("No rows selected for deletion.");
      return;
    }
    const userConfirmed = window.confirm(
      `Are you sure you want to delete ${selectedIds.length} record(s)?`
    );

    if (!userConfirmed) {
      // If the user clicks "Cancel", exit the function
      return;
    }
    try {
      // Define the API endpoint and token
      const apiUrl =
        "https://schoolmanagement-4-pzsf.onrender.com/school/delete";
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjRhMDdmMGRkYmVjNmM3YmMzZDUzZiIsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE3MjMxMTU1MjJ9.4DgAJH_zmaoanOy4gHB87elbUMod8PunDL2qzpfPXj0"; // Replace with actual token

      // Send delete requests for each selected ID
      const deleteRequests = selectedIds.map((id) =>
        fetch(`${apiUrl}/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }).then((response) => {
          if (!response.ok) {
            throw new Error(
              `Error deleting record with ID ${id}: ${response.statusText}`
            );
          }
          return response.json();
        })
      );

      // Wait for all delete requests to complete
      await Promise.all(deleteRequests);

      // Filter out deleted rows
      const newFilteredRows = filteredRows.filter((row) => !row.isSelected);

      // Update state
      setFilteredRows(newFilteredRows);
      setSelectAll(false);

      alert("Selected records deleted successfully.");
    } catch (error) {
      console.error("Error during deletion:", error);
      alert("Failed to delete selected records.");
    }
    fetchData();
  };

  const handleExport = () => {
    const dataToExport = filteredRows.map((row) => {
      const { isSelected, ...rowData } = row;
      return rowData;
    });
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "Combined.xlsx");
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetNames = workbook.SheetNames;
        const sheet = workbook.Sheets[sheetNames[0]];
        const parsedData = XLSX.utils.sheet_to_json(sheet);
        setImportData(parsedData);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const sortedData = [...filteredRows];
  if (sortConfig.key !== null) {
    sortedData.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  }

  const handleAddButtonClick = () => {
    setFormData({});
    setAddModalOpen(true);
  };

  const handleModalClose = () => {
    setEditModalOpen(false);
    setAddModalOpen(false);
    setFormData({});
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

 

// const handleEditSubmit = async () => {
//   const apiUrl = `https://rocketsalestracker.com/api/server`; // Ensure this is correct
//   const username = "test";
//   const password = "123456";
//   const token = btoa(`${username}:${password}`);

//   // Ensure formData contains the full structure with nested attributes
//   const updatedData = {
//       ...formData, // formData should have the same structure as the object you are retrieving
//       isSelected: false,
//   };

//   try {
//       console.log("Sending request to:", apiUrl);
//       console.log("Request payload:", updatedData);

//       const response = await fetch(apiUrl, {
//           method: "PUT", // PUT method to update the resource
//           headers: {
//               "Authorization": `Basic ${token}`,
//               "Content-Type": "application/json",
//           },
//           body: JSON.stringify(updatedData), // Convert updatedData to JSON
//       });

//       console.log("Response status:", response.status);
//       console.log("Response headers:", response.headers);

//       if (!response.ok) {
//           const errorResult = await response.json();
//           console.error("Error response:", errorResult);
//           throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorResult.message}`);
//       }

//       const result = await response.json();
//       console.log("Update successful:", result);
//       alert("Updated successfully");

//       // Update filteredRows in state
//       const updatedRows = filteredRows.map((row) =>
//           row.id === selectedRow.id
//               ? { ...row, ...formData, isSelected: false } // Ensure the updated data includes nested fields
//               : row
//       );
//       setFilteredRows(updatedRows);

//       handleModalClose();
//       fetchData(); // Refetch data to ensure the UI is up-to-date
//   } catch (error) {
//       console.error("Error updating row:", error.message, error.stack);
//       alert("Error updating code");
//   }
// };
// const handleEditSubmit = async () => {
//   const apiUrl = `https://rocketsalestracker.com/api/server`; // Ensure this is correct
//   const username = "test";
//   const password = "123456";
//   const token = btoa(`${username}:${password}`);

//   // Ensure formData contains the full structure with nested attributes
//   const updatedData = {
//     ...formData, // formData should have the same structure as the object you are retrieving
//     isSelected: false,
//   };

//   try {
//     console.log("Sending request to:", apiUrl);
//     console.log("Request payload:", JSON.stringify(updatedData, null, 2));

//     const response = await fetch(apiUrl, {
//       method: "PUT", // PUT method to update the resource
//       headers: {
//         "Authorization": `Basic ${token}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(updatedData), // Convert updatedData to JSON
//     });

//     console.log("Response status:", response.status);
//     console.log("Response headers:", response.headers);

//     if (!response.ok) {
//       const errorResult = await response.json();
//       console.error("Error response:", errorResult);
//       throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorResult.message}`);
//     }

//     const result = await response.json();
//     console.log("Update successful:", result);
//     alert("Updated successfully");

//     // Update filteredRows in state
//     const updatedRows = filteredRows.map((row) =>
//       row.id === selectedRow.id
//         ? { ...row, ...updatedData, isSelected: false } // Ensure the updated data includes nested fields
//         : row
//     );
//     setFilteredRows(updatedRows);

//     handleModalClose();
//     fetchData(); // Refetch data to ensure the UI is up-to-date
//   } catch (error) {
//     console.error("Error updating row:", error.message, error.stack);
//     alert("Error updating data");
//   }
// };
const handleEditSubmit = async () => {
  const apiUrl = `https://rocketsalestracker.com/api/server`; // Ensure this is correct
  const username = "test";
  const password = "123456";
  const token = btoa(`${username}:${password}`);

  // Ensure formData contains the full structure with nested attributes
  const updatedData = {
    ...formData, // formData should have the same structure as the object you are retrieving
    isSelected: false,
    attributes: {
      ...formData.attributes,
      speedUnit: "kmh", // Ensure this is updated correctly
    }
  };

  try {
    console.log("Sending request to:", apiUrl);
    console.log("Request payload:", JSON.stringify(updatedData, null, 2));

    const response = await fetch(apiUrl, {
      method: "PUT", // PUT method to update the resource
      headers: {
        "Authorization": `Basic ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData), // Convert updatedData to JSON
    });

    console.log("Response status:", response.status);
    console.log("Response headers:", response.headers);

    if (!response.ok) {
      const errorResult = await response.json();
      console.error("Error response:", errorResult);
      throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorResult.message}`);
    }

    const result = await response.json();
    console.log("Update successful:", result);
    alert("Updated successfully");

    // Update filteredRows in state
    const updatedRows = filteredRows.map((row) =>
      row.id === selectedRow.id
        ? { ...row, ...updatedData, isSelected: false } // Ensure the updated data includes nested fields
        : row
    );
    setFilteredRows(updatedRows);

    handleModalClose();
    fetchData(); // Refetch data to ensure the UI is up-to-date
  } catch (error) {
    console.error("Error updating row:", error.message, error.stack);
    alert("Error updating data");
  }
};

 
  const handleAddSubmit = async () => {
    try {
      const newRow = {
        ...formData,
        id: filteredRows.length + 1,
        isSelected: false,
      };

      // POST request to the server
      const response = await fetch(
        "https://schoolmanagement-4-pzsf.onrender.com/parent/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newRow),
        }
      );
      alert('record created successfully');
    
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Assuming the server returns the created object
      const result = await response.json();

      // Update the state with the new row
      setFilteredRows([...filteredRows, result]);

      // Close the modal
      handleModalClose();
      fetchData();
      console.log("error occured in post method");
    } catch (error) {
      console.error("Error during POST request:", error);
      alert('unable to create record');
      // Handle the error appropriately (e.g., show a notification to the user)
    }
  };


  const [devices, setDevices] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await fetch('https://rocketsalestracker.com/api/devices', {
          headers: {
            'Authorization': 'Basic ' + btoa('test:123456'), // Replace with your username and password
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setDevices(data); // Adjust according to the actual response format
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDevices();
  }, []);
  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;
  const [groups, setGroups] = useState([]);
  // const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch('https://rocketsalestracker.com/api/groups', {
          method: 'GET',
          headers: {
            'Authorization': 'Basic ' + btoa('test:123456') // Replace with actual credentials
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setGroups(data); // Assuming the API returns { groups: [...] }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchGroups();
  }, []);

  // const [startDate, setStartDate] = useState('');
  // const [endDate, setEndDate] = useState('');
  const [selectedDevice, setSelectedDevice] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [apiUrl, setApiUrl] = useState('');
  // const handleShowClick = async () => {
  //   if (!startDate || !endDate || !selectedDevice || !selectedGroup) {
  //     alert('Please fill all fields');
  //     return;
  //   }

  //   // Construct the API URL
  //   const url = `https://rocketsalestracker.com/api/reports/combined?from=${encodeURIComponent(startDate)}&to=${encodeURIComponent(endDate)}&deviceId=${encodeURIComponent(selectedDevice)}&groupId=${encodeURIComponent(selectedGroup)}`;
    
  //   setApiUrl(url); // Update the state with the generated URL

  //   console.log(url);
    
  // };
  // const formatToUTC = (localDateTime) => {
  //   if (!localDateTime) return '';

  //   const localDate = new Date(localDateTime);
  //   const utcDate = new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000);
  //   const isoString = utcDate.toISOString();
  //   return isoString;
  // };
  // const handleShowClick = async () => {
  //   const formattedStartDate = formatToUTC(startDate);
  //   const formattedEndDate = formatToUTC(endDate);

  //   if (!formattedStartDate || !formattedEndDate || !selectedDevice || !selectedGroup) {
  //     alert('Please fill all fields');
  //     return;
  //   }

  //   // Construct the API URL
  //   const url = `https://rocketsalestracker.com/api/reports/combined?from=${encodeURIComponent(formattedStartDate)}&to=${encodeURIComponent(formattedEndDate)}&deviceId=${encodeURIComponent(selectedDevice)}&groupId=${encodeURIComponent(selectedGroup)}`;

  //   setApiUrl(url); // Update the state with the generated URL

  //   // try {
  //   //   // Make the API request
  //   //   const response = await fetch(url);
  //   //   if (!response.ok) {
  //   //     throw new Error('Network response was not ok');
  //   //   }
  //   //   const data = await response.json();
  //   //   console.log('API response:', data); // Handle the API response data here
  //   // } catch (error) {
  //   //   console.error('There was a problem with the fetch operation:', error);
  //   // }
  // };
  const handleShowClick = () => {
    const formattedStartDate = formatToUTC(startDate);
    const formattedEndDate = formatToUTC(endDate);

    if (!formattedStartDate || !formattedEndDate || !selectedDevice || !selectedGroup) {
      alert('Please fill all fields');
      return;
    }

    // Construct the API URL
    const url = `https://rocketsalestracker.com/api/reports/combined?from=${encodeURIComponent(formattedStartDate)}&to=${encodeURIComponent(formattedEndDate)}&deviceId=${encodeURIComponent(selectedDevice)}&groupId=${encodeURIComponent(selectedGroup)}`;
    
    setApiUrl(url); // Update the state with the generated URL
    fetchData(url); // Call fetchData with the generated URL
  };
  const formatToUTC = (localDateTime) => {
    if (!localDateTime) return '';
    const localDate = new Date(localDateTime);
    const utcDate = new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000);
    return utcDate.toISOString();
  };
  
  // const fetchData = async (url) => {
  //   console.log('Fetching data...');
  //   setLoading(true); // Set loading to true when starting fetch
  //   try {
  //     const username = "test";
  //     const password = "123456";
  //     const token = btoa(`${username}:${password}`);

  //     const response = await axios.get(url, {
  //       headers: {
  //         Authorization: `Basic ${token}`,
  //       },
  //     });

  //     console.log('fetch data', response.data);

  //     if (response.data && typeof response.data === 'object') {
  //       const wrappedData = [response.data];
  //       setFilteredRows(wrappedData.map(row => ({ ...row, isSelected: false })));
  //       setTotalResponses(wrappedData.length);
  //     } else {
  //       console.error('Expected an object but got:', response.data);
  //     }
  //   } catch (error) {
  //     console.error('Fetch data error:', error);
  //     alert('An error occurred while fetching data.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // const fetchData = async (url) => {
  //   console.log('Fetching data...');
  //   setLoading(true); // Set loading to true when starting fetch
    
  //   try {
  //     const username = "test";
  //     const password = "123456";
  //     const token = btoa(`${username}:${password}`);
  
  //     const response = await axios.get(url, {
  //       headers: {
  //         Authorization: `Basic ${token}`,
  //       },
  //     });
  
  //     console.log('Fetched data:', response.data);
  
  //     // Check if response.data is an array
  //     if (Array.isArray(response.data)) {
  //       // Assuming you want to use the first object in the array
  //       const data = response.data[0];
  
  //       // Wrap data if necessary
  //       const wrappedData = [data];
  
  //       // Set the filtered rows
  //       setFilteredRows(wrappedData.map(row => ({
  //         ...row,
  //         isSelected: false
  //       })));
  
  //       // Set the total number of responses
  //       setTotalResponses(wrappedData.length);
  //     } else {
  //       console.error('Expected an array but got:', response.data);
  //       alert('Unexpected data format.');
  //     }
  //   } catch (error) {
  //     console.error('Fetch data error:', error);
  //     alert('An error occurred while fetching data.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // const fetchData = async (url) => {
  //   console.log('Fetching data...');
  //   setLoading(true); // Set loading to true when starting fetch
    
  //   try {
  //     const username = "test";
  //     const password = "123456";
  //     const token = btoa(`${username}:${password}`);
  
  //     const response = await axios.get(url, {
  //       headers: {
  //         Authorization: `Basic ${token}`,
  //       },
  //     });
  
  //     console.log('Fetched data:', response.data);
  
  //     // Check if response.data is an array
  //     if (Array.isArray(response.data) && response.data.length > 0) {
  //       const data = response.data[0]; // Assuming you only need the first object
  
  //       // Safely process route
  //       const processedRoute = (data.route || []).map(([lat, lon]) => ({
  //         lat: lat !== undefined ? parseFloat(lat).toFixed(6) : 'N/A',
  //         lon: lon !== undefined ? parseFloat(lon).toFixed(6) : 'N/A'
  //       }));
  
  //       // Safely process positions
  //       const processedPositions = (data.positions || []).map(position => ({
  //         ...position,
  //         latitude: position.latitude !== undefined ? parseFloat(position.latitude).toFixed(6) : 'N/A',
  //         longitude: position.longitude !== undefined ? parseFloat(position.longitude).toFixed(6) : 'N/A'
  //       }));
  
  //       // Assuming no additional processing needed for events
  //       const processedEvents = data.events || [];
  
  //       // Set state with processed data
  //       const wrappedData = [{
  //         ...data,
  //         route: processedRoute,
  //         positions: processedPositions,
  //         events: processedEvents
  //       }];
  
  //       setFilteredRows(wrappedData.map(row => ({
  //         ...row,
  //         isSelected: false
  //       })));
  
  //       setTotalResponses(wrappedData.length);
  //     } else {
  //       console.error('Expected an array but got:', response.data);
  //       alert('Unexpected data format.');
  //     }
  //   } catch (error) {
  //     console.error('Fetch data error:', error);
  //     alert('An error occurred while fetching data.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };
//   const fetchData = async (url) => {
//     console.log('Fetching data...');
//     setLoading(true); // Set loading to true when starting fetch

//     try {
//         const username = "test";
//         const password = "123456";
//         const token = btoa(`${username}:${password}`);

//         const response = await axios.get(url, {
//             headers: {
//                 Authorization: `Basic ${token}`,
//             },
//         });

//         console.log('Fetched data:', response.data);

//         // Check if response.data is an array
//         if (Array.isArray(response.data) && response.data.length > 0) {
//             const data = response.data[0]; // Assuming you only need the first object

//             // Safely process route
//             const processedRoute = (data.route || []).map(([lat, lon]) => ({
//                 lat: lat !== undefined ? parseFloat(lat).toFixed(6) : 'N/A',
//                 lon: lon !== undefined ? parseFloat(lon).toFixed(6) : 'N/A'
//             }));

//             // Safely process positions
//             const processedPositions = (data.positions || []).map(position => ({
//                 ...position,
//                 latitude: position.latitude !== undefined ? parseFloat(position.latitude).toFixed(6) : 'N/A',
//                 longitude: position.longitude !== undefined ? parseFloat(position.longitude).toFixed(6) : 'N/A'
//             }));

//             // Process events
//             const processedEvents = data.events || [];

//             console.log('Processed Events:', processedEvents);

//             // Set state with processed data
//             const wrappedData = [{
//                 ...data,
//                 route: processedRoute,
//                 positions: processedPositions,
//                 events: processedEvents
//             }];

//             console.log('Wrapped Data:', wrappedData);

//             setFilteredRows(wrappedData.map(row => ({
//                 ...row,
//                 isSelected: false
//             })));

//             setTotalResponses(wrappedData.length);
//         } else {
//             console.error('Expected an array but got:', response.data);
//             alert('Unexpected data format.');
//         }
//     } catch (error) {
//         console.error('Fetch data error:', error);
//         alert('An error occurred while fetching data.');
//     } finally {
//         setLoading(false);
//     }
// };
const fetchData = async (url) => {
  console.log('Fetching data...');
  setLoading(true);

  try {
      const username = "test";
      const password = "123456";
      const token = btoa(`${username}:${password}`);

      const response = await axios.get(url, {
          headers: {
              Authorization: `Basic ${token}`,
          },
      });

      console.log('Fetched data:', response.data);

      if (Array.isArray(response.data) && response.data.length > 0) {
          const data = response.data[0];

          const processedEvents = (data.events || []).map(event => ({
              deviceId: data.deviceId,
              eventTime: new Date(event.eventTime).toLocaleString(),
              type: event.type.replace(/([A-Z])/g, ' $1').trim() // Optional: Format type
          }));

          console.log('Processed Events:', processedEvents);

          setFilteredRows(processedEvents.map(event => ({
              ...event,
              isSelected: false
          })));

          setTotalResponses(processedEvents.length);
      } else {
          console.error('Expected an array but got:', response.data);
          alert('Unexpected data format.');
      }
  } catch (error) {
      console.error('Fetch data error:', error);
      alert('An error occurred while fetching data.');
  } finally {
      setLoading(false);
  }
};
// const sortedData = React.useMemo(() => {
//   if (!sortConfig.key) return data;
//   return [...data].sort((a, b) => {
//     if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
//     if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
//     return 0;
//   });
// }, [data, sortConfig]);
  return (
    <>
      <h1 style={{ textAlign: "center", marginTop: "80px" }}>
       Combined 
      </h1>
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <TextField
            label="Search"
            variant="outlined"
            value={filterText}
            onChange={handleFilterChange}
            sx={{ marginRight: "10px", width: "300px" }}
            InputProps={{
              startAdornment: (
                <SearchIcon
                  style={{
                    cursor: "pointer",
                    marginLeft: "10px",
                    marginRight: "5px",
                  }}
                />
              ),
            }}
          />
          <Button
            onClick={() => setModalOpen(true)}
            sx={{
              backgroundColor: "rgb(85, 85, 85)",
              color: "white",
              fontWeight: "bold",
              marginRight: "10px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <ImportExportIcon />
            Column Visibility
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteSelected}
            sx={{ marginRight: "10px" }}
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleEditButtonClick}
            sx={{ marginRight: "10px" }}
            startIcon={<EditIcon />}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleAddButtonClick}
            sx={{ marginRight: "10px" }}
            startIcon={<AddCircleIcon />}
          >
            Add
          </Button>
          <Button
            variant="contained"
            onClick={() => setImportModalOpen(true)}
            sx={{ backgroundColor: "rgb(255, 165, 0)", marginRight: "10px" }}
            startIcon={<CloudUploadIcon />}
          >
            Import
          </Button>
          <Button variant="contained" color="primary" onClick={handleExport}>
            Export
          </Button>
        </div>
       
     <div
      style={{
        display: "flex",
        alignItems: "center",
        marginBottom: "10px",
      }}
    >
      <select
        value={selectedDevice}
        onChange={(e) => setSelectedDevice(e.target.value)}
        style={{ marginRight: '10px', padding: '5px' }}
      >
        <option value="">Select Device</option>
        {devices.map((device) => (
          <option key={device.id} value={device.id}>
            {device.name}
          </option>
        ))}
      </select>

      <select
        value={selectedGroup}
        onChange={(e) => setSelectedGroup(e.target.value)}
        style={{ marginRight: "10px", padding: "5px" }}
      >
        <option value="">Select Group</option>
        {groups.map(group => (
          <option key={group.id} value={group.id}>{group.name}</option>
        ))}
      </select>

      <div style={{ marginRight: "10px", padding: "5px" }}>
        <label htmlFor="start-date">Start Date & Time:</label>
        <input
          id="start-date"
          type="datetime-local"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          style={{ marginRight: "10px", padding: "5px" }}
        />
        
        <label htmlFor="end-date">End Date & Time:</label>
        <input
          id="end-date"
          type="datetime-local"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          style={{ padding: "5px" }}
        />
      </div>

      <button
        onClick={handleShowClick}
        style={{
          padding: "5px 10px",
        }}
      >
        Show
      </button>

       {apiUrl && (
        <div style={{ marginTop: '10px' }}>
          <label htmlFor="api-url">Generated API URL:</label>
          <textarea
            id="api-url"
            rows="3"
            value={apiUrl}
            readOnly
            style={{ width: '100%', padding: '5px' }}
          ></textarea>
        </div>
      )} 
    </div>

       

        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <>
            <TableContainer
              component={Paper}
              sx={{
                maxHeight: 440,
                border: "1.5px solid black",
                borderRadius: "7px",
              }}
            >
            
              {/* <Table
  stickyHeader
  aria-label="sticky table"
  style={{ border: "1px solid black" }}
>
  <TableHead>
    <TableRow
      style={{
        borderBottom: "1px solid black",
        borderTop: "1px solid black",
      }}
    >
      <TableCell
        padding="checkbox"
        style={{
          borderRight: "1px solid #e0e0e0",
          borderBottom: "2px solid black",
        }}
      >
        <Switch
          checked={selectAll}
          onChange={handleSelectAll}
          color="primary"
        />
      </TableCell>
      {COLUMNS()
        .filter((col) => columnVisibility[col.accessor])
        .map((column) => (
          <TableCell
            key={column.accessor}
            align={column.align}
            style={{
              minWidth: column.minWidth,
              cursor: "pointer",
              borderRight: "1px solid #e0e0e0",
              borderBottom: "2px solid black",
              padding: "4px 4px",
              textAlign: "center",
              fontWeight: "bold",
            }}
            onClick={() => requestSort(column.accessor)}
          >
            {column.Header}
            {sortConfig.key === column.accessor ? (
              sortConfig.direction === "ascending" ? (
                <ArrowUpwardIcon fontSize="small" />
              ) : (
                <ArrowDownwardIcon fontSize="small" />
              )
            ) : null}
          </TableCell>
        ))}
    </TableRow>
  </TableHead>
  <TableBody>
    {sortedData.length === 0 ? (
      <TableRow>
        <TableCell
          colSpan={COLUMNS().filter((col) => columnVisibility[col.accessor]).length}
          style={{
            textAlign: 'center',
            padding: '16px',
            fontSize: '16px',
            color: '#757575',
          }}
        >
          <h4>No Data Available</h4>
        </TableCell>
      </TableRow>
    ) : (
      sortedData
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row, index) => (
          <TableRow
            hover
            role="checkbox"
            tabIndex={-1}
            key={row.id}
            onClick={() =>
              handleRowSelect(page * rowsPerPage + index)
            }
            selected={row.isSelected}
            style={{
              backgroundColor:
                index % 2 === 0 ? "#ffffff" : "#eeeeefc2",
              borderBottom: "none",
            }}
          >
            <TableCell
              padding="checkbox"
              style={{ borderRight: "1px solid #e0e0e0" }}
            >
              <Switch checked={row.isSelected} color="primary" />
            </TableCell>
            {COLUMNS()
              .filter((col) => columnVisibility[col.accessor])
              .map((column) => {
                // Debug output
                // console.log(`Row data: ${JSON.stringify(row)}, Column accessor: ${column.accessor}`);

                // Access the correct value from the row
                const value = column.accessor.split('.').reduce((acc, part) => acc && acc[part], row);

                return (
                  <TableCell
                    key={column.accessor}
                    align={column.align}
                    style={{
                      borderRight: "1px solid #e0e0e0",
                      paddingTop: "4px",
                      paddingBottom: "4px",
                      borderBottom: "none",
                      backgroundColor:
                        index % 2 === 0 ? "#ffffff" : "#eeeeefc2",
                      fontSize: "smaller",
                    }}
                  >
                    {column.Cell ? column.Cell({ value }) : value}
                  </TableCell>
                );
              })}
          </TableRow>
        ))
    )}
  </TableBody>
</Table> */}
 <Table
      stickyHeader
      aria-label="sticky table"
      style={{ border: "1px solid black" }}
    >
      <TableHead>
        <TableRow
          style={{
            borderBottom: "1px solid black",
            borderTop: "1px solid black",
          }}
        >
          <TableCell
            padding="checkbox"
            style={{
              borderRight: "1px solid #e0e0e0",
              borderBottom: "2px solid black",
            }}
          >
            <Switch
              checked={selectAll}
              onChange={handleSelectAll}
              color="primary"
            />
          </TableCell>
          {COLUMNS()
            .filter((col) => columnVisibility[col.accessor])
            .map((column) => (
              <TableCell
                key={column.accessor}
                align={column.align || 'left'}
                style={{
                  minWidth: column.minWidth || '100px',
                  cursor: "pointer",
                  borderRight: "1px solid #e0e0e0",
                  borderBottom: "2px solid black",
                  padding: "4px 4px",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
                onClick={() => requestSort(column.accessor)}
              >
                {column.Header}
                {sortConfig.key === column.accessor ? (
                  sortConfig.direction === "ascending" ? (
                    <ArrowUpwardIcon fontSize="small" />
                  ) : (
                    <ArrowDownwardIcon fontSize="small" />
                  )
                ) : null}
              </TableCell>
            ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {sortedData.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={COLUMNS().filter((col) => columnVisibility[col.accessor]).length}
              style={{
                textAlign: 'center',
                padding: '16px',
                fontSize: '16px',
                color: '#757575',
              }}
            >
              <h4>No Data Available</h4>
            </TableCell>
          </TableRow>
        ) : (
          sortedData
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => (
              <TableRow
                hover
                role="checkbox"
                tabIndex={-1}
                key={row.deviceId + index} // Ensure uniqueness for the key
                onClick={() =>
                  handleRowSelect(page * rowsPerPage + index)
                }
                selected={row.isSelected}
                style={{
                  backgroundColor:
                    index % 2 === 0 ? "#ffffff" : "#eeeeefc2",
                  borderBottom: "none",
                }}
              >
                <TableCell
                  padding="checkbox"
                  style={{ borderRight: "1px solid #e0e0e0" }}
                >
                  <Switch checked={row.isSelected} color="primary" />
                </TableCell>
                {COLUMNS()
                  .filter((col) => columnVisibility[col.accessor])
                  .map((column) => {
                    const value = column.accessor.split('.').reduce((acc, part) => acc && acc[part], row);

                    return (
                      <TableCell
                        key={column.accessor}
                        align={column.align || 'left'}
                        style={{
                          borderRight: "1px solid #e0e0e0",
                          paddingTop: "4px",
                          paddingBottom: "4px",
                          borderBottom: "none",
                          backgroundColor:
                            index % 2 === 0 ? "#ffffff" : "#eeeeefc2",
                          fontSize: "smaller",
                        }}
                      >
                        {column.Cell ? column.Cell({ value }) : value}
                      </TableCell>
                    );
                  })}
              </TableRow>
            ))
        )}
      </TableBody>
    </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={sortedData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
            {/* //</></div> */}
          </>
        )}
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <Box sx={style}>
            <h2>Column Visibility</h2>
            {COLUMNS().map((col) => (
              <div key={col.accessor}>
                <Switch
                  checked={columnVisibility[col.accessor]}
                  onChange={() => handleColumnVisibilityChange(col.accessor)}
                  color="primary"
                />
                {col.Header}
              </div>
            ))}
          </Box>
        </Modal>
        <Modal open={editModalOpen} onClose={handleModalClose}>
          <Box sx={style}>
            {/* <h2>Edit Row</h2> */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <h2 style={{ flexGrow: 1 }}>Edit Row</h2>
              <IconButton onClick={handleModalClose}>
                <CloseIcon />
              </IconButton>
            </Box>
            {COLUMNS()
              .slice(0, -1)
              .map((col) => (
                <TextField
                  key={col.accessor}
                  label={col.Header}
                  variant="outlined"
                  name={col.accessor}
                  value={formData[col.accessor] || ""}
                  onChange={handleInputChange}
                  sx={{ marginBottom: "10px" }}
                  fullWidth
                />
              ))}
            <Button
              variant="contained"
              color="primary"
              onClick={handleEditSubmit}
            >
              Submit
            </Button>
          </Box>
        </Modal>
        <Modal open={addModalOpen} onClose={handleModalClose}>
          <Box sx={style}>
            {/* <h2>Add Row</h2> */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <h2 style={{ flexGrow: 1 }}>Add Row</h2>
              <IconButton onClick={handleModalClose}>
                <CloseIcon />
              </IconButton>
            </Box>
            {COLUMNS()
              .slice(0, -1)
              .map((col) => (
                <TextField
                  key={col.accessor}
                  label={col.Header}
                  variant="outlined"
                  name={col.accessor}
                  value={formData[col.accessor] || ""}
                  onChange={handleInputChange}
                  sx={{ marginBottom: "10px" }}
                  fullWidth
                />
              ))}
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddSubmit}
            >
              Submit
            </Button>
          </Box>
        </Modal>
        <Modal open={importModalOpen} onClose={() => setImportModalOpen(false)}>
          <Box sx={style}>
            <h2>Import Data</h2>
            <input type="file" onChange={handleFileUpload} />
            {importData.length > 0 && (
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  setFilteredRows([
                    ...filteredRows,
                    ...importData.map((row) => ({ ...row, isSelected: false })),
                  ])
                }
                sx={{ marginTop: "10px" }}
              >
                Import
              </Button>
            )}
          </Box>
        </Modal>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity="warning">
            Please select a row to edit!
          </Alert>
        </Snackbar>
      </div>
    </>
  );
};
