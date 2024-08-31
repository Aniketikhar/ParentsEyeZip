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
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddIcon from '@mui/icons-material/Add';
//import { TextField } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import AddCircleIcon from '@mui/icons-material/AddCircle';
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

export const Groups = () => {
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
  // const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [originalRows, setOriginalRows] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");


 


const fetchData = async () => {
  console.log('Fetching data...');
  setLoading(true); // Set loading to true when starting fetch
  try {
    const username = "test";
    const password = "123456";
    const token = btoa(`${username}:${password}`);

    const response = await axios.get("https://rocketsalestracker.com/api/groups", {
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
      const apiUrl = "https://rocketsalestracker.com/api/groups"; // Replace with actual API endpoint
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
  
  const handleExport = () => {
    const dataToExport = filteredRows.map((row) => {
      const { isSelected, ...rowData } = row;
      return rowData;
    });
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "Groups.xlsx");
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

  

 



// const handleEditSubmit = async () => {
//   const apiUrl = `https://rocketsalestracker.com/api/groups/${selectedRow.id}`;
//   const username = "test";
//   const password = "123456";
//   const token = btoa(`${username}:${password}`);

//   // Ensure formData contains only necessary fields
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
  const apiUrl = `https://rocketsalestracker.com/api/groups/${selectedRow.id}`;
  const username = "test"; // Replace with your actual username
  const password = "123456"; // Replace with your actual password
  const token = btoa(`${username}:${password}`); // Encode credentials in Base64

  // Extract and transform attributes for submission
  const transformedAttributes = Object.keys(formData.attributes || {}).reduce((acc, key) => {
    const attribute = formData.attributes[key];
    let value;

    // Transform value based on type
    switch (attribute.type) {
      case "Boolean":
        value = attribute.value ? "true" : "false";
        break;
      case "Number":
        value = attribute.value.toString(); // Convert number to string
        break;
      default:
        value = attribute.value || ""; // Default to empty string for String type
    }

    acc[key] = value;
    return acc;
  }, {});

  // Ensure formData contains only necessary fields, including transformed attributes
  const { isSelected, ...updatedData } = formData; // Exclude isSelected
  updatedData.attributes = transformedAttributes; // Add transformed attributes to updatedData

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
  //     // Define the API endpoint and credentials
  //     const apiUrl = "https://rocketsalestracker.com/api/groups"; // Replace with actual API endpoint
  //     const username = "test"; // Replace with your actual username
  //     const password = "123456"; // Replace with your actual password
  //     const token = btoa(`${username}:${password}`); // Encode credentials in Base64
  
  //     // Extract only attributes for submission
  //     const attributesToSubmit = { ...formData.attributes };
  
  //     // Log or send attributes to server
  //     console.log('Attributes to submit:', attributesToSubmit);
  
  //     // Prepare the new row object based on the expected schema
  //     const newRow = {
  //       id: filteredRows.length + 1, // Ensure id is provided correctly
  //       name: formData.name || '', // Ensure formData has 'name' with default value if not provided
  //       groupId: formData.groupId || '', // Ensure formData has 'groupId' with default value if not provided
  //       attributes: attributesToSubmit, // Submit only the attributes
  //     };
  
  //     // POST request to the server with Basic Auth
  //     const response = await fetch(apiUrl, {
  //       method: "POST",
  //       headers: {
  //         "Authorization": `Basic ${token}`, // Add Basic Auth header
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(newRow),
  //     });
  
  //     if (response.ok) { // Use response.ok to check for success
  //       // Assuming the server returns the created object
  //       const result = await response.json();
  
  //       // Update the state with the new row
  //       setFilteredRows((prevRows) => [...prevRows, result]);
  
  //       // Close the modal and refresh data
  //       handleModalClose();
  //       fetchData();
  
  //       console.log("Record created successfully:", result);
  //       alert("Record created successfully");
  //     } else if (response.status === 400) {
  //       throw new Error("Bad request or no permission");
  //     } else {
  //       throw new Error(`Network response was not ok: ${response.statusText}`);
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
      const apiUrl = "https://rocketsalestracker.com/api/groups"; // Replace with actual API endpoint
      const username = "test"; // Replace with your actual username
      const password = "123456"; // Replace with your actual password
      const token = btoa(`${username}:${password}`); // Encode credentials in Base64
  
      // Extract and transform attributes for submission
      const transformedAttributes = Object.keys(formData.attributes).reduce((acc, key) => {
        const attribute = formData.attributes[key];
        let value;
  
        // Transform value based on type
        switch (attribute.type) {
          case "Boolean":
            value = attribute.value ? "true" : "false";
            break;
          case "Number":
            value = attribute.value.toString(); // Convert number to string
            break;
          default:
            value = attribute.value || ""; // Default to empty string for String type
        }
  
        acc[key] = value;
        return acc;
      }, {});
  
      // Log or send transformed attributes to server
      console.log('Attributes to submit:', transformedAttributes);
  
      // Prepare the new row object based on the expected schema
      const newRow = {
        id: filteredRows.length + 1, // Ensure id is provided correctly
        name: formData.name || '', // Ensure formData has 'name' with default value if not provided
        groupId: formData.groupId || '', // Ensure formData has 'groupId' with default value if not provided
        attributes: transformedAttributes, // Submit the transformed attributes
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
  
      if (response.ok) { // Use response.ok to check for success
        // Assuming the server returns the created object
        const result = await response.json();
  
        // Update the state with the new row
        setFilteredRows((prevRows) => [...prevRows, result]);
  
        // Close the modal and refresh data
        handleModalClose();
        fetchData();
  
        console.log("Record created successfully:", result);
        alert("Record created successfully");
      } else if (response.status === 400) {
        throw new Error("Bad request or no permission");
      } else {
        throw new Error(`Network response was not ok: ${response.statusText}`);
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

const [showAddButton, setShowAddButton] = useState(false);
const [attributeName, setAttributeName] = useState('');
const [attributeType, setAttributeType] = useState('string');
const [attributes, setAttributes] = useState([]);

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


const [showAttributeFields, setShowAttributeFields] = useState(false);

// // Other states and handlers...

// const handleAddAttribute = () => {
//   setShowAttributeFields(true);
// };

// const handleInputChange = (event) => {
//   const { name, value } = event.target;
//   setFormData({
//     ...formData,
//     [name]: value,
//   });
// };




// const [showAttributeFields, setShowAttributeFields] = useState(false);

// // Handler for adding new attribute fields
// const handleAddAttribute = () => {
//   setShowAttributeFields(true);
// };

// // Handler for input changes, including attributes
// const handleInputChange = (event) => {
//   const { name, value } = event.target;

//   // Handle attributes separately
//   if (name === "attribute" || name === "type") {
//     setFormData((prevFormData) => {
//       const newAttributes = { ...prevFormData.attributes };
      
//       // Assuming you want to add a new attribute with an incrementing key (for example)
//       const attributeKey = Object.keys(newAttributes).length + 1;
      
//       if (name === "attribute") {
//         newAttributes[attributeKey] = {
//           ...newAttributes[attributeKey],
//           value: value,
//         };
//       } else if (name === "type") {
//         newAttributes[attributeKey] = {
//           ...newAttributes[attributeKey],
//           type: value,
//         };
//       }

//       return {
//         ...prevFormData,
//         attributes: newAttributes,
//       };
//     });
//   } else {
//     // Handle other fields normally
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   }
// };
//const [showAttributeFields, setShowAttributeFields] = useState(false);
const [formData, setFormData] = useState({
  attributes: {},
  groupId: '',
  name: '',
  currentAttributeKey: '', // To track the current attribute key for editing
});

// Function to get default value based on type
const getDefaultValueForType = (type) => {
  switch (type) {
    case 'Boolean':
      return false;
    case 'Number':
      return 0;
    default:
      return ''; // For "String" and any other types
  }
};

// Handler for input changes
const handleInputChange = (event) => {
  const { name, value } = event.target;

  if (name.startsWith('attribute-key')) {
    setFormData((prevFormData) => {
      const newAttributes = { ...prevFormData.attributes };
      const key = value;

      // Remove previous key if it's different
      if (prevFormData.currentAttributeKey && prevFormData.currentAttributeKey !== key) {
        delete newAttributes[prevFormData.currentAttributeKey];
      }

      // Add or update the new key
      newAttributes[key] = {
        value: newAttributes[key]?.value || getDefaultValueForType(newAttributes[key]?.type || 'String'),
        type: newAttributes[key]?.type || 'String', // Default type
      };

      return {
        ...prevFormData,
        attributes: newAttributes,
        currentAttributeKey: key,
      };
    });
  } else if (name.startsWith('attribute-type')) {
    setFormData((prevFormData) => {
      const newAttributes = { ...prevFormData.attributes };
      const key = prevFormData.currentAttributeKey;
      newAttributes[key] = {
        ...newAttributes[key],
        type: value,
        value: getDefaultValueForType(value), // Set default value based on type
      };

      return {
        ...prevFormData,
        attributes: newAttributes,
      };
    });
  } else if (name.startsWith('attribute-value')) {
    setFormData((prevFormData) => {
      const newAttributes = { ...prevFormData.attributes };
      const key = prevFormData.currentAttributeKey;
      newAttributes[key] = {
        ...newAttributes[key],
        value: value,
      };

      return {
        ...prevFormData,
        attributes: newAttributes,
      };
    });
  } else {
    // Handle other fields normally
    setFormData({
      ...formData,
      [name]: value,
    });
  }
};

// Handler for adding new attribute fields
const handleAddAttribute = () => {
  setShowAttributeFields(true);
  setFormData((prevFormData) => ({
    ...prevFormData,
    currentAttributeKey: '', // Reset current key for new attribute
  }));
};

  return (
    <>
      <h1 style={{ textAlign: "center", marginTop: "80px" }}>
       Groups 
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

    {COLUMNS().map((col) => {
      if (col.accessor === 'groupId' && col.Header === 'Group ID') {
        return (
          <FormControl fullWidth sx={{ marginBottom: '10px' }} key={col.accessor}>
            <InputLabel>Group ID</InputLabel>
            <Select
              name={col.accessor}
              value={formData[col.accessor] || ''}
              onChange={handleInputChange}
              variant="outlined"
            >
              {groups.map((group) => (
                <MenuItem key={group.id} value={group.id}>
                  {group.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      }

      if (col.accessor === 'attributes' && col.Header === 'Attributes') {
        return (
          <Box key={col.accessor} sx={{ marginBottom: '10px' }}>
            <FormControl fullWidth>
              <InputLabel>Attributes</InputLabel>
              <Select
                value=""
                displayEmpty
                variant="outlined"
                IconComponent={() => <ArrowDropDownIcon />}
              >
                <MenuItem disabled value="">
                  Attributes
                </MenuItem>
                <MenuItem>
                  <Button
                    onClick={handleAddAttribute}
                    startIcon={<AddIcon />}
                  >
                    +Add
                  </Button>
                </MenuItem>
              </Select>
            </FormControl>

            {showAttributeFields && (
              <Box sx={{ marginTop: '10px' }}>
                <TextField
                  label="Attribute Key"
                  variant="outlined"
                  name="attribute-key"
                  onChange={handleInputChange}
                  sx={{ marginBottom: '10px' }}
                  fullWidth
                />
                <FormControl fullWidth sx={{ marginBottom: '10px' }}>
                  <InputLabel>Type</InputLabel>
                  <Select
                    name="attribute-type"
                    onChange={handleInputChange}
                    variant="outlined"
                  >
                    <MenuItem value="Boolean">Boolean</MenuItem>
                    <MenuItem value="String">String</MenuItem>
                    <MenuItem value="Number">Number</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="Attribute Value"
                  variant="outlined"
                  name="attribute-value"
                  onChange={handleInputChange}
                  sx={{ marginBottom: '10px' }}
                  fullWidth
                />
              </Box>
            )}
          </Box>
        );
      }

      return (
        <TextField
          key={col.accessor}
          label={col.Header}
          variant="outlined"
          name={col.accessor}
          value={formData[col.accessor] || ''}
          onChange={handleInputChange}
          sx={{ marginBottom: '10px' }}
          fullWidth
        />
      );
    })}

    <Button
      variant="contained"
      color="primary"
      onClick={handleEditSubmit}
    >
      Submit
    </Button>
  </Box>
</Modal>

       {/* <Modal open={editModalOpen} onClose={handleModalClose}>
          <Box sx={style}>
            {/* <h2>Edit Row</h2> 
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
            {COLUMNS().map((col) => (
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
        </Modal>*/}
       
 
{/* <Modal open={addModalOpen} onClose={handleModalClose}>
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
    
    {COLUMNS().map((col) => {
      if (col.accessor === 'groupId' && col.Header === 'Group ID') {
        return (
          <FormControl fullWidth sx={{ marginBottom: "10px" }} key={col.accessor}>
            <InputLabel>Group ID</InputLabel>
            <Select
              name={col.accessor}
              value={formData[col.accessor] || ""}
              onChange={handleInputChange}
              variant="outlined"
            >
              {groups.map((group) => (
                <MenuItem key={group.id} value={group.id}>
                  {group.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      }

      if (col.accessor === 'attributes' && col.Header === 'Attributes') {
        return (
          <Box key={col.accessor} sx={{ marginBottom: "10px" }}>
            <FormControl fullWidth>
              <InputLabel>Attributes</InputLabel>
              <Select
                value=""
                displayEmpty
                variant="outlined"
                IconComponent={() => <ArrowDropDownIcon />}
              >
                <MenuItem disabled value="">
                  Attributes
                </MenuItem>
                <MenuItem>
                  <Button
                    onClick={handleAddAttribute}
                    startIcon={<AddIcon />}
                  >
                    +Add
                  </Button>
                </MenuItem>
              </Select>
            </FormControl>

            {showAttributeFields && (
              <Box sx={{ marginTop: "10px" }}>
                <TextField
                  label="Attribute"
                  variant="outlined"
                  name="attribute"
                  value={formData.attribute || ""}
                  onChange={handleInputChange}
                  sx={{ marginBottom: "10px" }}
                  fullWidth
                />
                <FormControl fullWidth>
                  <InputLabel>Type</InputLabel>
                  <Select
                    name="type"
                    value={formData.type || ""}
                    onChange={handleInputChange}
                    variant="outlined"
                  >
                    <MenuItem value="Boolean">Boolean</MenuItem>
                    <MenuItem value="String">String</MenuItem>
                    <MenuItem value="Number">Number</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            )}
          </Box>
        );
      }

      return (
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
      );
    })}

    <Button
      variant="contained"
      color="primary"
      onClick={handleAddSubmit}
    >
      Submit
    </Button>
  </Box>
</Modal> */}
{/*<Modal open={addModalOpen} onClose={handleModalClose}>
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
    
    {COLUMNS().map((col) => {
      if (col.accessor === 'groupId' && col.Header === 'Group ID') {
        return (
          <FormControl fullWidth sx={{ marginBottom: "10px" }} key={col.accessor}>
            <InputLabel>Group ID</InputLabel>
            <Select
              name={col.accessor}
              value={formData[col.accessor] || ""}
              onChange={handleInputChange}
              variant="outlined"
            >
              {groups.map((group) => (
                <MenuItem key={group.id} value={group.id}>
                  {group.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      }

      if (col.accessor === 'attributes' && col.Header === 'Attributes') {
        return (
          <Box key={col.accessor} sx={{ marginBottom: "10px" }}>
            <FormControl fullWidth>
              <InputLabel>Attributes</InputLabel>
              <Select
                value=""
                displayEmpty
                variant="outlined"
                IconComponent={() => <ArrowDropDownIcon />}
              >
                <MenuItem disabled value="">
                  Attributes
                </MenuItem>
                <MenuItem>
                  <Button
                    onClick={handleAddAttribute}
                    startIcon={<AddIcon />}
                  >
                    +Add
                  </Button>
                </MenuItem>
              </Select>
            </FormControl>

            {showAttributeFields && (
              <Box sx={{ marginTop: "10px" }}>
                <TextField
                  label="Attribute"
                  variant="outlined"
                  name="attribute"
                  value={formData.attribute || ""}
                  onChange={handleInputChange}
                  sx={{ marginBottom: "10px" }}
                  fullWidth
                />
                <FormControl fullWidth>
                  <InputLabel>Type</InputLabel>
                  <Select
                    name="type"
                    value={formData.type || ""}
                    onChange={handleInputChange}
                    variant="outlined"
                  >
                    <MenuItem value="Boolean">Boolean</MenuItem>
                    <MenuItem value="String">String</MenuItem>
                    <MenuItem value="Number">Number</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            )}
          </Box>
        );
      }

      return (
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
      );
    })}

    <Button
      variant="contained"
      color="primary"
      onClick={handleAddSubmit}
    >
      Submit
    </Button>
  </Box>
</Modal>*/}










  {/* <Modal open={addModalOpen} onClose={handleModalClose}>
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

    {COLUMNS().map((col) => {
      if (col.accessor === 'groupId' && col.Header === 'Group ID') {
        return (
          <FormControl fullWidth sx={{ marginBottom: "10px" }} key={col.accessor}>
            <InputLabel>Group ID</InputLabel>
            <Select
              name={col.accessor}
              value={formData[col.accessor] || ""}
              onChange={handleInputChange}
              variant="outlined"
            >
              {groups.map((group) => (
                <MenuItem key={group.id} value={group.id}>
                  {group.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      }

      if (col.accessor === 'attributes' && col.Header === 'Attributes') {
        return (
          <Box key={col.accessor} sx={{ marginBottom: "10px" }}>
            <FormControl fullWidth>
              <InputLabel>Attributes</InputLabel>
              <Select
                value=""
                displayEmpty
                variant="outlined"
                IconComponent={() => <ArrowDropDownIcon />}
              >
                <MenuItem disabled value="">
                  Attributes
                </MenuItem>
                <MenuItem>
                  <Button
                    onClick={handleAddAttribute}
                    startIcon={<AddIcon />}
                  >
                    +Add
                  </Button>
                </MenuItem>
              </Select>
            </FormControl>

            {showAttributeFields && (
              <Box sx={{ marginTop: "10px" }}>
                <TextField
                  label="Attribute Key"
                  variant="outlined"
                  name="attribute-key"
                  onChange={handleInputChange}
                  sx={{ marginBottom: "10px" }}
                  fullWidth
                />
                <FormControl fullWidth sx={{ marginBottom: "10px" }}>
                  <InputLabel>Type</InputLabel>
                  <Select
                    name="attribute-type"
                    onChange={handleInputChange}
                    variant="outlined"
                  >
                    <MenuItem value="Boolean">Boolean</MenuItem>
                    <MenuItem value="String">String</MenuItem>
                    <MenuItem value="Number">Number</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="Attribute Value"
                  variant="outlined"
                  name="attribute-value"
                  onChange={handleInputChange}
                  sx={{ marginBottom: "10px" }}
                  fullWidth
                />
              </Box>
            )}
          </Box>
        );
      }

      return (
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
      );
    })}

    <Button
      variant="contained"
      color="primary"
      onClick={handleAddSubmit}
    >
      Submit
    </Button>
  </Box>
</Modal> */}
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

        {COLUMNS().map((col) => {
          if (col.accessor === 'groupId' && col.Header === 'Group ID') {
            return (
              <FormControl fullWidth sx={{ marginBottom: '10px' }} key={col.accessor}>
                <InputLabel>Group ID</InputLabel>
                <Select
                  name={col.accessor}
                  value={formData[col.accessor] || ''}
                  onChange={handleInputChange}
                  variant="outlined"
                >
                  {groups.map((group) => (
                    <MenuItem key={group.id} value={group.id}>
                      {group.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            );
          }

          if (col.accessor === 'attributes' && col.Header === 'Attributes') {
            return (
              <Box key={col.accessor} sx={{ marginBottom: '10px' }}>
                <FormControl fullWidth>
                  <InputLabel>Attributes</InputLabel>
                  <Select
                    value=""
                    displayEmpty
                    variant="outlined"
                    IconComponent={() => <ArrowDropDownIcon />}
                  >
                    <MenuItem disabled value="">
                      Attributes
                    </MenuItem>
                    <MenuItem>
                      <Button
                        onClick={handleAddAttribute}
                        startIcon={<AddIcon />}
                      >
                        +Add
                      </Button>
                    </MenuItem>
                  </Select>
                </FormControl>

                {showAttributeFields && (
                  <Box sx={{ marginTop: '10px' }}>
                    <TextField
                      label="Attribute Key"
                      variant="outlined"
                      name="attribute-key"
                      onChange={handleInputChange}
                      sx={{ marginBottom: '10px' }}
                      fullWidth
                    />
                    <FormControl fullWidth sx={{ marginBottom: '10px' }}>
                      <InputLabel>Type</InputLabel>
                      <Select
                        name="attribute-type"
                        onChange={handleInputChange}
                        variant="outlined"
                      >
                        <MenuItem value="Boolean">Boolean</MenuItem>
                        <MenuItem value="String">String</MenuItem>
                        <MenuItem value="Number">Number</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      label="Attribute Value"
                      variant="outlined"
                      name="attribute-value"
                      onChange={handleInputChange}
                      sx={{ marginBottom: '10px' }}
                      fullWidth
                    />
                  </Box>
                )}
              </Box>
            );
          }

          return (
            <TextField
              key={col.accessor}
              label={col.Header}
              variant="outlined"
              name={col.accessor}
              value={formData[col.accessor] || ''}
              onChange={handleInputChange}
              sx={{ marginBottom: '10px' }}
              fullWidth
            />
          );
        })}

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
