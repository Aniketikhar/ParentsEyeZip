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
import {Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { Category } from "@mui/icons-material";
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

export const Devices = () => {
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

//     const response = await axios.get("https://rocketsalestracker.com/api/devices", {
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


const fetchData = async () => {
  console.log('Fetching data...');
  setLoading(true); // Set loading to true when starting fetch
  try {
    const username = "test";
    const password = "123456";
    const token = btoa(`${username}:${password}`);

    const response = await axios.get("https://rocketsalestracker.com/api/devices", {
      headers: {
        Authorization: `Basic ${token}`,
      },
    });

    console.log('fetch data', response.data);

    if (Array.isArray(response.data)) {
      const wrappedData = response.data; // Directly use the array
      setFilteredRows(wrappedData.map(row => ({ ...row, isSelected: false })));
      setTotalResponses(wrappedData.length);
    } else {
      console.error('Expected an array but got:', response.data);
      alert('Unexpected data format received.');
    }
  } catch (error) {
    console.error('Fetch data error:', error);
    alert('An error occurred while fetching data.');
  } finally {
    setLoading(false);
  }
};

  

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
        return row.id; // Use 'id' if '_id' is not defined; ensure id exists and is not undefined
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
      // Define the API endpoint and credentials
      const apiUrl = "https://rocketsalestracker.com/api/devices"; // Replace with actual API endpoint
      const username = "test"; // Replace with your actual username
      const password = "123456"; // Replace with your actual password
      const token = btoa(`${username}:${password}`); // Encode credentials in Base64
  
      // Send delete requests for each selected ID
      const deleteRequests = selectedIds.map((id) =>
        fetch(`${apiUrl}/${id}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Basic ${token}`, // Add Basic Auth header
            "Content-Type": "application/json",
          },
        }).then((response) => {
          if (!response.ok) {
            throw new Error(
              `Error deleting record with ID ${id}: ${response.statusText}`
            );
          }
          return response; // No need to parse JSON for a 204 response
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
  
    // Refresh data
    fetchData();
  };
  // const handleDeleteSelected = async () => {
  //   // Log filteredRows to check its structure
  //   console.log("Filtered rows:", filteredRows);

  //   // Get selected row IDs
  //   const selectedIds = filteredRows
  //     .filter((row) => row.isSelected)
  //     .map((row) => {
  //       // Log each row to check its structure
  //       console.log("Processing row:", row);
  //       return row._id; // Ensure id exists and is not undefined
  //     });

  //   console.log("Selected IDs:", selectedIds);

  //   if (selectedIds.length === 0) {
  //     alert("No rows selected for deletion.");
  //     return;
  //   }
  //   const userConfirmed = window.confirm(
  //     `Are you sure you want to delete ${selectedIds.length} record(s)?`
  //   );

  //   if (!userConfirmed) {
  //     // If the user clicks "Cancel", exit the function
  //     return;
  //   }
  //   try {
  //     // Define the API endpoint and token
  //     const apiUrl =
  //       "https://rocketsalestracker.com/api/devices";
  //       const username = "test";
  //       const password = "123456";
  //       const token = btoa(`${username}:${password}`);
  //     // const token =
  //     //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjRhMDdmMGRkYmVjNmM3YmMzZDUzZiIsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE3MjMxMTU1MjJ9.4DgAJH_zmaoanOy4gHB87elbUMod8PunDL2qzpfPXj0"; // Replace with actual token

  //     // Send delete requests for each selected ID
  //     const deleteRequests = selectedIds.map((id) =>
  //       fetch(`${apiUrl}/${id}`, {
  //         method: "DELETE",
  //         headers: {
  //           Authorization: `Basic ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }).then((response) => {
  //         if (!response.ok) {
  //           throw new Error(
  //             `Error deleting record with ID ${id}: ${response.statusText}`
  //           );
  //         }
  //         return response.json();
  //       })
  //     );

  //     // Wait for all delete requests to complete
  //     await Promise.all(deleteRequests);

  //     // Filter out deleted rows
  //     const newFilteredRows = filteredRows.filter((row) => !row.isSelected);

  //     // Update state
  //     setFilteredRows(newFilteredRows);
  //     setSelectAll(false);

  //     alert("Selected records deleted successfully.");
  //   } catch (error) {
  //     console.error("Error during deletion:", error);
  //     alert("Failed to delete selected records.");
  //   }
  //   fetchData();
  // };

  const handleExport = () => {
    const dataToExport = filteredRows.map((row) => {
      const { isSelected, ...rowData } = row;
      return rowData;
    });
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "Device.xlsx");
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

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

 

// const handleEditSubmit = async () => {
//   const apiUrl = `https://rocketsalestracker.com/api/Device`; // Ensure this is correct
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
//   const apiUrl = `https://rocketsalestracker.com/api/Device`; // Ensure this is correct
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
// const handleEditSubmit = async () => {
//   const apiUrl = `https://rocketsalestracker.com/api/devices`; // Ensure this is correct
//   const username = "test";
//   const password = "123456";
//   const token = btoa(`${username}:${password}`);

//   // Ensure formData contains the full structure with nested attributes
//   const updatedData = {
//     ...formData, // formData should have the same structure as the object you are retrieving
//     isSelected: false,
//     attributes: {
//       ...formData.attributes,
//       // speedUnit: "kmh", // Ensure this is updated correctly
//     }
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
// const handleEditSubmit = async () => {
//   const apiUrl = `https://rocketsalestracker.com/api/devices/${selectedRow.id}`; // Ensure this is correct
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
// const handleEditSubmit = async () => {
//   const apiUrl = `https://rocketsalestracker.com/api/devices/${selectedRow.id}`;
//   const username = "test";
//   const password = "123456";
//   const token = btoa(`${username}:${password}`);

//   // Ensure formData contains the full structure with nested attributes
//   const { isSelected, ...updatedData } = formData; // Exclude isSelected

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
//         ? { ...row, ...updatedData } // Ensure the updated data includes nested fields
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
  const apiUrl = `https://rocketsalestracker.com/api/devices/${selectedRow.id}`;
  const username = "test";
  const password = "123456";
  const token = btoa(`${username}:${password}`);

  // Ensure formData contains only necessary fields
  const { isSelected, ...updatedData } = formData; // Exclude isSelected

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
        ? { ...row, ...updatedData } // Ensure the updated data includes nested fields
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


  // const handleAddSubmit = async () => {
  //   try {
  //     const newRow = {
  //       ...formData,
  //       id: filteredRows.length + 1,
  //       isSelected: false,
  //     };

  //     // POST request to the Device
  //     const response = await fetch(
  //       "https://rocketsalestracker.com/api/devices",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(newRow),
  //       }
  //     );
  //     alert('record created successfully');
    
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }

  //     // Assuming the Device returns the created object
  //     const result = await response.json();

  //     // Update the state with the new row
  //     setFilteredRows([...filteredRows, result]);

  //     // Close the modal
  //     handleModalClose();
  //     fetchData();
  //     console.log("error occured in post method");
  //   } catch (error) {
  //     console.error("Error during POST request:", error);
  //     alert('unable to create record');
  //     // Handle the error appropriately (e.g., show a notification to the user)
  //   }
  // };
  // const handleAddSubmit = async () => {
  //   try {
  //     const newRow = {
  //       ...formData,
  //       id: filteredRows.length + 1,
  //       isSelected: false,
  //     };

  //     // POST request to the server
  //     const response = await fetch(
  //       "https://rocketsalestracker.com/api/devices",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(newRow),
  //       }
  //     );
  //     alert("record created successfully");

  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }

  //     // Assuming the server returns the created object
  //     const result = await response.json();

  //     // Update the state with the new row
  //     setFilteredRows([...filteredRows, result]);

  //     // Close the modal
  //     handleModalClose();
  //     fetchData();
  //     console.log("error occured in post method");
  //   } catch (error) {
  //     console.error("Error during POST request:", error);
  //     alert("unable to create record");
  //     // Handle the error appropriately (e.g., show a notification to the user)
  //   }
  // };
//   const handleAddSubmit = async () => {
//     try {
//         const newRow = {
//             ...formData,
//             id: filteredRows.length + 1,
//             isSelected: false,
//         };

//         // Basic Authentication credentials
//         const username = 'test';
//         const password = '123456';
//         const token = btoa(`${username}:${password}`);

//         // POST request to the server with Basic Authentication
//         const response = await fetch(
//             "https://rocketsalestracker.com/api/devices",
//             {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": `Basic ${token}`
//                 },
//                 body: JSON.stringify(newRow),
//             }
//         );

//         if (!response.ok) {
//             throw new Error("Network response was not ok");
//         }

//         // Assuming the server returns the created object
//         const result = await response.json();

//         // Update the state with the new row
//         setFilteredRows([...filteredRows, result]);

//         // Close the modal and fetch updated data
//         handleModalClose();
//         fetchData();

//         console.log("Record created successfully");
//         alert("Record created successfully");
//     } catch (error) {
//         // console.error("Error during POST request:", error);
//         alert("Unable to create record");
//         console.log("error for post req.",error);
//     }
// };
// const handleAddSubmit = async () => {
//   try {
//     // Define the API endpoint and credentials
//     const apiUrl = "https://rocketsalestracker.com/api/devices"; // Replace with actual API endpoint
//     const username = "test"; // Replace with your actual username
//     const password = "123456"; // Replace with your actual password
//     const token = btoa(`${username}:${password}`); // Encode credentials in Base64

//     // Prepare the new row object based on the expected schema
//     const newRow = {

//       // id: filteredRows.length + 1, // Ensure id is provided correctly
//       name: formData.name, // Ensure formData has 'name'
//       // groupId: formData.groupId, // Ensure formData has 'groupId'
//       attributes: formData.attributes || {}, // Ensure formData has 'attributes' (empty object if not provided)
//       uniqueId: formData.uniqueId,
//       groupId:formData.groupId,
//       calendarId:formData.calendarId,
//       status:formData.status,
//       phone:formData.phone,
//      model:formData.model,
//      expirationTime:formData.expirationTime,
//      contact:formData.contact,
//      Category:formData.Category
//     };
//     //       const newRow = {
//     //   ...formData,
//     //   id: filteredRows.length + 1, // Assuming the id is auto-incremented
//     //   isSelected: false,
//     // };

//     // POST request to the server with Basic Auth
//     const response = await fetch(apiUrl, {
//       method: "POST",
//       headers: {
//         "Authorization": `Basic ${token}`, // Add Basic Auth header
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(newRow),
//     });

//     if (response.status === 200) {
//       // Assuming the server returns the created object
//       const result = await response.json();

//       // Update the state with the new row
//       setFilteredRows([...filteredRows, result]);

//       // Close the modal and refresh data
//       handleModalClose();
//       fetchData();

//       console.log("Record created successfully:", result);
//       alert("Record created successfully");
//     } else if (response.status === 400) {
//       throw new Error("No permission or bad request");
//     } else {
//       throw new Error("Network response was not ok");
//     }
//   } catch (error) {
//     console.error("Error during POST request:", error);
//     alert("Unable to create record");
//     // Handle the error appropriately (e.g., show a notification to the user)
//   }
// };

const handleAddSubmit = async () => {
  try {
    // Define the API endpoint and credentials
    const apiUrl = "https://rocketsalestracker.com/api/devices"; // Replace with actual API endpoint
    const username = "test"; // Replace with your actual username
    const password = "123456"; // Replace with your actual password
    const token = btoa(`${username}:${password}`); // Encode credentials in Base64

    // Prepare the new row object based on the expected schema
    const newRow = {
      name: formData.name, // Ensure formData has 'name'
      uniqueId: formData.uniqueId, // Ensure formData has 'uniqueId'
      groupId: formData.groupId, // Ensure formData has 'groupId'
      attributes: formData.attributes || {}, // Ensure formData has 'attributes' (empty object if not provided)
      calendarId: formData.calendarId, // Ensure formData has 'calendarId'
      status: formData.status, // Ensure formData has 'status'
      phone: formData.phone, // Ensure formData has 'phone'
      model: formData.model, // Ensure formData has 'model'
      expirationTime: formData.expirationTime, // Ensure formData has 'expirationTime'
      contact: formData.contact, // Ensure formData has 'contact'
      category: formData.category, // Ensure formData has 'category'
    };

    // POST request to the server with Basic Auth
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Authorization": `Basic ${token}`, // Add Basic Auth header
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRow),
    });

    // Parse the JSON response
    const result = await response.json();

    if (response.ok) {
      // Update the state with the new row
      setFilteredRows([...filteredRows, result]);

      // Close the modal and refresh data
      handleModalClose();
      fetchData();

      console.log("Record created successfully:", result);
      alert("Record created successfully");
    } else {
      // Log and alert the specific server response in case of an error
      console.error("Server responded with:", result);
      alert(`Unable to create record: ${result.message || response.statusText}`);
    }
  } catch (error) {
    console.error("Error during POST request:", error);
    alert("Unable to create record");
    // Handle the error appropriately (e.g., show a notification to the user)
  }
};

const [groups, setGroups] = useState([]);
// const [error, setError] = useState(null);
const [error, setError] = useState(null);
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

const handleInputChange = (e) => {
  const { name, value, type, checked } = e.target;

  // For checkbox inputs, use the checked property
  if (type === 'checkbox') {
    setFormData({
      ...formData,
      [name]: checked,
    });
  } else {
    setFormData({
      ...formData,
      [name]: value,
    });
  }
};



const [calendars, setCalendars] = useState([]); // State to store calendar data
const [calendarError, setCalendarError] = useState(null); // State to store error

useEffect(() => {
  const fetchCalendars = async () => {
    try {
      const response = await fetch('https://rocketsalestracker.com/api/calendars', {
        method: 'GET',
        headers: {
          'Authorization': 'Basic ' + btoa('test:123456') // Replace with actual credentials
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setCalendars(data); // Assuming the API returns { calendars: [...] }
    } catch (error) {
      setCalendarError(error.message);
    }
  };

  fetchCalendars();
}, []);


  return (
    <>
      <h1 style={{ textAlign: "center", marginTop: "80px" }}>
       Device 
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
        col.accessor === 'groupId' && col.Header === 'Group ID' ? (
          <FormControl fullWidth sx={{ marginBottom: '10px' }} key={col.accessor}>
            <InputLabel id="group-select-label">Group ID</InputLabel>
            <Select
              labelId="group-select-label"
              label="Group ID"
              name={col.accessor}
              value={formData[col.accessor] || ''}
              onChange={handleInputChange}
            >
              {groups.map((group) => (
                <MenuItem key={group.id} value={group.id}>
                  {group.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : col.accessor === 'category' && col.Header === 'Category' ? (
          <FormControl fullWidth sx={{ marginBottom: '10px' }} key={col.accessor}>
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              labelId="category-select-label"
              label="Category"
              name={col.accessor}
              value={formData[col.accessor] || ''}
              onChange={handleInputChange}
            >
              <MenuItem value={"Default"}>Default</MenuItem>
              <MenuItem value={"Animal"}>Animal</MenuItem>
              <MenuItem value={"Bicycle"}>Bicycle</MenuItem>
              <MenuItem value={"Boat"}>Boat</MenuItem>
              <MenuItem value={"Bus"}>Bus</MenuItem>
              <MenuItem value={"Car"}>Car</MenuItem>
              <MenuItem value={"Camper"}>Camper</MenuItem>
              <MenuItem value={"Crane"}>Crane</MenuItem>
              <MenuItem value={"Helicopter"}>Helicopter</MenuItem>
              <MenuItem value={"Motorcycle"}>Motorcycle</MenuItem>
              <MenuItem value={"Offroad"}>Offroad</MenuItem>
              <MenuItem value={"Person"}>Person</MenuItem>
              <MenuItem value={"Pickup"}>Pickup</MenuItem>
              <MenuItem value={"Plane"}>Plane</MenuItem>
              <MenuItem value={"Ship"}>Ship</MenuItem>
              <MenuItem value={"Tractor"}>Tractor</MenuItem>
              <MenuItem value={"Train"}>Train</MenuItem>
              <MenuItem value={"Tram"}>Tram</MenuItem>
              <MenuItem value={"Trolleybus"}>Trolleybus</MenuItem>
              <MenuItem value={"Truck"}>Truck</MenuItem>
              <MenuItem value={"Van"}>Van</MenuItem>
              <MenuItem value={"Scooter"}>Scooter</MenuItem>
            </Select>
          </FormControl>
        ) : col.accessor === 'calendarId' && col.Header === 'Calendar ID' ? (
          <FormControl fullWidth sx={{ marginBottom: '10px' }} key={col.accessor}>
            <InputLabel id="calendar-select-label">Calendar ID</InputLabel>
            <Select
              labelId="calendar-select-label"
              label="Calendar ID"
              name={col.accessor}
              value={formData[col.accessor] || ''}
              onChange={handleInputChange}
            >
              {calendars.map((calendar) => (
                <MenuItem key={calendar.id} value={calendar.id}>
                  {calendar.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
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
        )
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
        col.accessor === 'groupId' && col.Header === 'Group ID' ? (
          <FormControl fullWidth sx={{ marginBottom: '10px' }} key={col.accessor}>
            <InputLabel id="group-select-label">Group ID</InputLabel>
            <Select
              labelId="group-select-label"
              label="Group ID"
              name={col.accessor}
              value={formData[col.accessor] || ''}
              onChange={handleInputChange}
            >
              {groups.map((group) => (
                <MenuItem key={group.id} value={group.id}>
                  {group.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : col.accessor === 'category' && col.Header === 'Category' ? (
          <FormControl fullWidth sx={{ marginBottom: '10px' }} key={col.accessor}>
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              labelId="category-select-label"
              label="Category"
              name={col.accessor}
              value={formData[col.accessor] || ''}
              onChange={handleInputChange}
            >
              <MenuItem value={"Default"}>Default</MenuItem>
              <MenuItem value={"Animal"}>Animal</MenuItem>
              <MenuItem value={"Bicycle"}>Bicycle</MenuItem>
              <MenuItem value={"Boat"}>Boat</MenuItem>
              <MenuItem value={"Bus"}>Bus</MenuItem>
              <MenuItem value={"Car"}>Car</MenuItem>
              <MenuItem value={"Camper"}>Camper</MenuItem>
              <MenuItem value={"Crane"}>Crane</MenuItem>
              <MenuItem value={"Helicopter"}>Helicopter</MenuItem>
              <MenuItem value={"Motorcycle"}>Motorcycle</MenuItem>
              <MenuItem value={"Offroad"}>Offroad</MenuItem>
              <MenuItem value={"Person"}>Person</MenuItem>
              <MenuItem value={"Pickup"}>Pickup</MenuItem>
              <MenuItem value={"Plane"}>Plane</MenuItem>
              <MenuItem value={"Ship"}>Ship</MenuItem>
              <MenuItem value={"Tractor"}>Tractor</MenuItem>
              <MenuItem value={"Train"}>Train</MenuItem>
              <MenuItem value={"Tram"}>Tram</MenuItem>
              <MenuItem value={"Trolleybus"}>Trolleybus</MenuItem>
              <MenuItem value={"Truck"}>Truck</MenuItem>
              <MenuItem value={"Van"}>Van</MenuItem>
              <MenuItem value={"Scooter"}>Scooter</MenuItem>
            </Select>
          </FormControl>
        ) : col.accessor === 'calendarId' && col.Header === 'Calendar ID' ? (
          <FormControl fullWidth sx={{ marginBottom: '10px' }} key={col.accessor}>
            <InputLabel id="calendar-select-label">Calendar ID</InputLabel>
            <Select
              labelId="calendar-select-label"
              label="Calendar ID"
              name={col.accessor}
              value={formData[col.accessor] || ''}
              onChange={handleInputChange}
            >
              {calendars.map((calendar) => (
                <MenuItem key={calendar.id} value={calendar.id}>
                  {calendar.name} {/* Replace with actual property names */}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
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
        )
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
