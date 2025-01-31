// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Paper from '@mui/material/Paper';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import TextField from '@mui/material/TextField';
// import SearchIcon from '@mui/icons-material/Search';
// import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
// import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
// import Button from '@mui/material/Button';
// import Modal from '@mui/material/Modal';
// import Box from '@mui/material/Box';
// import Switch from '@mui/material/Switch';
// import { COLUMNS } from './columns';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import ImportExportIcon from '@mui/icons-material/ImportExport';
// import AddCircleIcon from '@mui/icons-material/AddCircle';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import * as XLSX from 'xlsx';
// import Alert from '@mui/material/Alert';
// import Snackbar from '@mui/material/Snackbar';
// //import { TableCell } from '@mui/material';
// import CheckIcon from '@mui/icons-material/Check';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: '80%',
//   height: '80%',
//   bgcolor: 'background.paper',
//   boxShadow: 24,
//   p: 4,
//   overflowY: 'auto', // Enable vertical scrolling
//   display: 'flex',
//   flexDirection: 'column',
// };

// export const Leave = () => {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [filterText, setFilterText] = useState('');
//   const [filteredRows, setFilteredRows] = useState([]);
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
//   const [columnVisibility, setColumnVisibility] = useState(Object.fromEntries(COLUMNS().map(col => [col.accessor, true])));
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectAll, setSelectAll] = useState(false);
//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [addModalOpen, setAddModalOpen] = useState(false);
//   const [importModalOpen, setImportModalOpen] = useState(false);
//   const [importData, setImportData] = useState([]);
//   const [selectedRow, setSelectedRow] = useState(null);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [formData, setFormData] = useState({});
//   const[totalresponse,setTotalResponses]=useState(0);
  
  
//   const fetchData = async () => {
//     try {
//       const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OWYwZjUzODUxZDljZjk5YmY0Y2Y0ZSIsInVzZXJuYW1lIjoiQURNSU4iLCJpYXQiOjE3MjE3MTE5NzJ9.Ub19Ev2GMNGW_5ROW5Gzh7P7RQQjZ0zQnDwic1rCXGI';
//       const response = await axios.get(
//         "https://schoolmanagement-13.onrender.com/school/pending-requests",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       console.log('fetch data', response.data); // Log the entire response data
//       if (Array.isArray(response.data.requests)) {
//         setFilteredRows(response.data.requests.map(row => ({ ...row, isSelected: false })));
//         setTotalResponses(response.data.requests.length);
//       } else {
//         console.error('Expected an array but got:', response.data.requests);
//       }
//     } catch (error) {
//       console.log('error:', error);
//     }
//     console.log('get data');
//   };
  
//   useEffect(() => {
//     fetchData();
//   }, []);

//   useEffect(() => {
//     filterData(filterText);
//   }, [filterText]);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   const handleFilterChange = (event) => {
//     const text = event.target.value;
//     setFilterText(text);
//   };

//   const filterData = (text) => {
//     const filteredData = filteredRows.filter((row) =>
//       Object.values(row).some(val => typeof val === 'string' && val.toLowerCase().includes(text.toLowerCase()))
//     ).map(row => ({ ...row, isSelected: false }));
//     setFilteredRows(filteredData);
//   };

//   const requestSort = (key) => {
//     let direction = 'ascending';
//     if (sortConfig.key === key && sortConfig.direction === 'ascending') {
//       direction = 'descending';
//     }
//     setSortConfig({ key, direction });
//   };

//   const handleColumnVisibilityChange = (accessor) => {
//     setColumnVisibility(prevState => ({
//       ...prevState,
//       [accessor]: !prevState[accessor]
//     }));
//   };

//   const handleRowSelect = (index) => {
//     const newFilteredRows = [...filteredRows];
//     newFilteredRows[index].isSelected = !newFilteredRows[index].isSelected;
//     setFilteredRows(newFilteredRows);
//   };

//   const handleSelectAll = () => {
//     const newSelectAll = !selectAll;
//     const newFilteredRows = filteredRows.map(row => ({ ...row, isSelected: newSelectAll }));
//     setFilteredRows(newFilteredRows);
//     setSelectAll(newSelectAll);
//   };

//   const handleDeleteSelected = () => {
//     const newFilteredRows = filteredRows.filter(row => !row.isSelected);
//     setFilteredRows(newFilteredRows);
//     setSelectAll(false);
//   };

//   const handleExport = () => {
//     const dataToExport = filteredRows.map(row => {
//       const { isSelected, ...rowData } = row;
//       return rowData;
//     });
//     const worksheet = XLSX.utils.json_to_sheet(dataToExport);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
//     XLSX.writeFile(workbook, "Leave.xlsx");
//   };

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const data = new Uint8Array(e.target.result);
//         const workbook = XLSX.read(data, { type: 'array' });
//         const sheetNames = workbook.SheetNames;
//         const sheet = workbook.Sheets[sheetNames[0]];
//         const parsedData = XLSX.utils.sheet_to_json(sheet);
//         setImportData(parsedData);
//       };
//       reader.readAsArrayBuffer(file);
//     }
//   };

//   const sortedData = [...filteredRows];
//   if (sortConfig.key !== null) {
//     sortedData.sort((a, b) => {
//       if (a[sortConfig.key] < b[sortConfig.key]) {
//         return sortConfig.direction === 'ascending' ? -1 : 1;
//       }
//       if (a[sortConfig.key] > b[sortConfig.key]) {
//         return sortConfig.direction === 'ascending' ? 1 : -1;
//       }
//       return 0;
//     });
//   }

//   const handleEditButtonClick = () => {
//     const selected = filteredRows.find(row => row.isSelected);
//     if (selected) {
//       setSelectedRow(selected);
//       setFormData(selected);
//       setEditModalOpen(true);
//     } else {
//       setSnackbarOpen(true);
//     }
//   };

//   const handleAddButtonClick = () => {
//     setFormData({});
//     setAddModalOpen(true);
//   };

//   const handleModalClose = () => {
//     setEditModalOpen(false);
//     setAddModalOpen(false);
//     setFormData({});
//   };

//   const handleSnackbarClose = () => {
//     setSnackbarOpen(false);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleEditSubmit = () => {
//     const updatedRows = filteredRows.map(row =>
//       row.id === selectedRow.id ? { ...row, ...formData, isSelected: false } : row
//     );
//     setFilteredRows(updatedRows);
//     handleModalClose();
//   };

//   const handleAddSubmit = () => {
//     const newRow = { ...formData, id: filteredRows.length + 1, isSelected: false };
//     setFilteredRows([...filteredRows, newRow]);
//     handleModalClose();
//   };
//   const handleFirstButtonClick = (row) => {
//     console.log('First button clicked', row);
//     // Add your logic here
//   };
  
//   const handleSecondButtonClick = (row) => {
//     console.log('Second button clicked with row', row);

//     // Add your logic here
//   };
 
//   const [clickedButtons, setClickedButtons] = useState({});

 
//  const [selectedApproveRowId, setSelectedApproveRowId] = useState(null);
//   function handleApproveClick(event, row) {
//   event.stopPropagation();
//   setSelectedApproveRowId(row.id);
//   console.log('Approved row:', row);


//   // Example of making an API call (if needed)
//   // apiApproveRow(row.id)
//   //   .then(response => {
//   //     console.log('Approval response:', response);
//   //   })
//   //   .catch(error => {
//   //     console.error('Error approving row:', error);
//   //   });
// }

  
//   return (
//     <>
//       <h1 style={{ textAlign: 'center',marginTop:'113px' }}>Student Leave List</h1>
//       <div>
//         <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
//           <TextField
//             label="Search"
//             variant="outlined"
//             value={filterText}
//             onChange={handleFilterChange}
//             sx={{ marginRight: '10px', width: '300px' }}
//             InputProps={{
//               startAdornment: (
//                 <SearchIcon style={{ cursor: 'pointer', marginLeft: '10px', marginRight: '5px' }} />
//               ),
//             }}
//           />
//           <Button
//             onClick={() => setModalOpen(true)}
//             sx={{
//               backgroundColor: 'rgb(85, 85, 85)',
//               color: 'white',
//               fontWeight: 'bold',
//               marginRight: '10px',
//               display: 'flex',
//               alignItems: 'center',
//               gap: '10px'
//             }}
//           >
//             <ImportExportIcon />
//             Column Visibility
//           </Button>
//           <Button
//             variant="contained"
//             color="error"
//             onClick={handleDeleteSelected}
//             sx={{ marginRight: '10px' }}
//             startIcon={<DeleteIcon />}
//           >
//             Delete
//           </Button>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleEditButtonClick}
//             sx={{ marginRight: '10px' }}
//             startIcon={<EditIcon />}
//           >
//             Edit
//           </Button>
//           <Button
//             variant="contained"
//             color="success"
//             onClick={handleAddButtonClick}
//             sx={{ marginRight: '10px' }}
//             startIcon={<AddCircleIcon />}
//           >
//             Add
//           </Button>
//           <Button
//             variant="contained"
//             onClick={() => setImportModalOpen(true)}
//             sx={{ backgroundColor: 'rgb(255, 165, 0)', marginRight: '10px' }}
//             startIcon={<CloudUploadIcon />}
//           >
//             Import
//           </Button>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleExport}
//           >
//             Export
//           </Button>
//         </div>
//         <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
         
//           <Table stickyHeader aria-label="sticky table" style={{border:'1px solid black',borderRadius:'10px'}}>
//   <TableHead >
//     <TableRow style={{borderBottom:'1px solid black'}}>
//       <TableCell padding="checkbox" style={{ borderRight: '1px solid #e0e0e0',borderBottom:'1px solid black' }}>
//         <Switch
//           checked={selectAll}
//           onChange={handleSelectAll}
//           color="primary"
//         />
//       </TableCell>
//       {COLUMNS().filter(col => columnVisibility[col.accessor]).map((column) => (
//         <TableCell
//           key={column.accessor}
//           align={column.align}
//           style={{ minWidth: column.minWidth, cursor: 'pointer', borderRight: '1px solid #e0e0e0', borderBottom:'1px solid black'}}
//           onClick={() => requestSort(column.accessor)}
//         >
//           {column.Header}
//           {sortConfig.key === column.accessor ? (
//             sortConfig.direction === 'ascending' ? (
//               <ArrowUpwardIcon fontSize="small" />
//             ) : (
//               <ArrowDownwardIcon fontSize="small" />
//             )
//           ) : null}
//         </TableCell>  
//       ))}
//        {/* Heading for the first button column */}
//       <TableCell style={{ borderRight: '1px solid #e0e0e0', borderBottom:'1px solid black' }}>
// Approve      </TableCell>
//       {/* Heading for the second button column */}
//       <TableCell style={{ borderRight: '1px solid #e0e0e0', borderBottom:'1px solid black' }}>
//         Denied
//       </TableCell>
//     </TableRow>
//   </TableHead>
  


// <TableBody>
//   {sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
//     <TableRow
//       hover
//       role="checkbox"
//       tabIndex={-1}
//       key={row.id}
//       onClick={() => handleRowSelect(page * rowsPerPage + index)}
//       selected={row.isSelected}
//     >
//       <TableCell padding="checkbox" style={{ borderRight: '1px solid #e0e0e0' }}>
//         <Switch
//           checked={row.isSelected}
//           color="primary"
//         />
//       </TableCell>
//       {COLUMNS().filter(col => columnVisibility[col.accessor]).map((column) => {
//         const value = row[column.accessor];
//         return (
//           <TableCell key={column.accessor} align={column.align} style={{ borderRight: '1px solid #e0e0e0' }}>
//             {column.format && typeof value === 'number' ? column.format(value) : value}
//           </TableCell>
//         );
//       })}
//       <TableCell style={{ borderRight: '1px solid #e0e0e0' }}>
//         <Button
//           variant="contained"
//           sx={{ backgroundColor: 'green', color: 'white' }}
//           onClick={(e) => handleApproveClick(e, row)}
//         >
//           approve
//         </Button>
//       </TableCell>
//       <TableCell style={{ borderRight: '1px solid #e0e0e0' }}>
//         <Button
//           variant="contained"
//           sx={{ backgroundColor: 'red', color: 'white' }}
//           onClick={(e) => {
//             e.stopPropagation();
//             handleSecondButtonClick(row);
//             console.log('button is click')
//           }}
//         >
//           Reject
//         </Button>
//       </TableCell>
//     </TableRow>
//   ))}
// </TableBody>

// </Table>

//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[10, 25, 100]}
//           component="div"
//           count={sortedData.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </div>
//       <Modal
//         open={modalOpen}
//         onClose={() => setModalOpen(false)}
//       >
//         <Box sx={style}>
//           <h2>Column Visibility</h2>
//           {COLUMNS().map((col) => (
//             <div key={col.accessor}>
//               <Switch
//                 checked={columnVisibility[col.accessor]}
//                 onChange={() => handleColumnVisibilityChange(col.accessor)}
//                 color="primary"
//               />
//               {col.Header}
//             </div>
//           ))}
//         </Box>
//       </Modal>
//       <Modal
//         open={editModalOpen}
//         onClose={handleModalClose}
//       >
//         <Box sx={style}>
//           <h2>Edit Row</h2>
//           {COLUMNS().map((col) => (
//             <TextField
//               key={col.accessor}
//               label={col.Header}
//               variant="outlined"
//               name={col.accessor}
//               value={formData[col.accessor] || ''}
//               onChange={handleInputChange}
//               sx={{ marginBottom: '10px' }}
//               fullWidth
//             />
//           ))}
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleEditSubmit}
//           >
//             Submit
//           </Button>
//         </Box>
//       </Modal>
//       <Modal
//         open={addModalOpen}
//         onClose={handleModalClose}
//       >
//         <Box sx={style}>
//           <h2>Add Row</h2>
//           {COLUMNS().map((col) => (
//             <TextField
//               key={col.accessor}
//               label={col.Header}
//               variant="outlined"
//               name={col.accessor}
//               value={formData[col.accessor] || ''}
//               onChange={handleInputChange}
//               sx={{ marginBottom: '10px' }}
//               fullWidth
//             />
//           ))}
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleAddSubmit}
//           >
//             Submit
//           </Button>
//         </Box>
//       </Modal>
//       <Modal
//         open={importModalOpen}
//         onClose={() => setImportModalOpen(false)}
//       >
//         <Box sx={style}>
//           <h2>Import Data</h2>
//           <input type="file" onChange={handleFileUpload} />
//           {importData.length > 0 && (
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={() => setFilteredRows([...filteredRows, ...importData.map(row => ({ ...row, isSelected: false }))])}
//               sx={{ marginTop: '10px' }}
//             >
//               Import
//             </Button>
//           )}
//         </Box>
//       </Modal>
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={3000}
//         onClose={handleSnackbarClose}
//       >
//         <Alert onClose={handleSnackbarClose} severity="warning">
//           Please select a row to edit!
//         </Alert>
//       </Snackbar>
//     </>
//   );
// };














// import React, { useState, useEffect,useContext } from 'react';
// import axios from 'axios';
// import Paper from '@mui/material/Paper';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import TextField from '@mui/material/TextField';
// import SearchIcon from '@mui/icons-material/Search';
// import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
// import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
// import Button from '@mui/material/Button';
// import Modal from '@mui/material/Modal';
// import Box from '@mui/material/Box';
// import Switch from '@mui/material/Switch';
// import { COLUMNS } from './columns';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import ImportExportIcon from '@mui/icons-material/ImportExport';
// import AddCircleIcon from '@mui/icons-material/AddCircle';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import * as XLSX from 'xlsx';
// import Alert from '@mui/material/Alert';
// import Snackbar from '@mui/material/Snackbar';
// import { TotalResponsesContext } from '../../../../TotalResponsesContext';
// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: '80%',
//   height: '80%',
//   bgcolor: 'background.paper',
//   boxShadow: 24,
//   p: 4,
//   overflowY: 'auto', // Enable vertical scrolling
//   display: 'flex',
//   flexDirection: 'column',
// };

// export const Leave = () => {
//   const { settotalLeaveRequest } = useContext(TotalResponsesContext); // Get the context value
  

//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [filterText, setFilterText] = useState('');
//   const [filteredRows, setFilteredRows] = useState([]);
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
//   const [columnVisibility, setColumnVisibility] = useState(Object.fromEntries(COLUMNS().map(col => [col.accessor, true])));
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectAll, setSelectAll] = useState(false);
//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [addModalOpen, setAddModalOpen] = useState(false);
//   const [importModalOpen, setImportModalOpen] = useState(false);
//   const [importData, setImportData] = useState([]);
//   const [selectedRow, setSelectedRow] = useState(null);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [formData, setFormData] = useState({});
//   const [requests, setRequests] = useState([]);
//   //const[totalresponse,setTotalResponses]=useState(0);
//   const fetchData = async () => {
//     try {
//       const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjRhMDdmMGRkYmVjNmM3YmMzZDUzZiIsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE3MjMxMTU1MjJ9.4DgAJH_zmaoanOy4gHB87elbUMod8PunDL2qzpfPXj0';
//       const response = await axios.get(
//         "https://schoolmanagement-3-ap01.onrender.com/school/pending-requests",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       console.log('fetch data', response.data); // Log the entire response data
     
//       if (Array.isArray(response.data.requests)) {
//         setFilteredRows(response.data.requests.map(row => ({ ...row, isSelected: false })));
//         settotalLeaveRequest(response.data.requests.length);
//       } else {
//         console.error('Expected an array but got:', response.data.requests);
//       }
//     } catch (error) {
//       console.log('error:', error);
//     }
//     console.log('get data');
//   };
  
//   useEffect(() => {
//     fetchData();
//   }, []);

//   useEffect(() => {
//     filterData(filterText);
//   }, [filterText]);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   const handleFilterChange = (event) => {
//     const text = event.target.value;
//     setFilterText(text);
//   };

//   const filterData = (text) => {
//     const filteredData = filteredRows.filter((row) =>
//       Object.values(row).some(val => typeof val === 'string' && val.toLowerCase().includes(text.toLowerCase()))
//     ).map(row => ({ ...row, isSelected: false }));
//     setFilteredRows(filteredData);
//   };

//   const requestSort = (key) => {
//     let direction = 'ascending';
//     if (sortConfig.key === key && sortConfig.direction === 'ascending') {
//       direction = 'descending';
//     }
//     setSortConfig({ key, direction });
//   };

//   const handleColumnVisibilityChange = (accessor) => {
//     setColumnVisibility(prevState => ({
//       ...prevState,
//       [accessor]: !prevState[accessor]
//     }));
//   };

//   const handleRowSelect = (index) => {
//     const newFilteredRows = [...filteredRows];
//     newFilteredRows[index].isSelected = !newFilteredRows[index].isSelected;
//     setFilteredRows(newFilteredRows);
//   };

//   const handleSelectAll = () => {
//     const newSelectAll = !selectAll;
//     const newFilteredRows = filteredRows.map(row => ({ ...row, isSelected: newSelectAll }));
//     setFilteredRows(newFilteredRows);
//     setSelectAll(newSelectAll);
//   };

//   const handleEditButtonClick = () => {
//     const selected = filteredRows.find(row => row.isSelected);
//     if (selected) {
//       setSelectedRow(selected);
//       setFormData(selected);
//       setEditModalOpen(true);
//     } else {
//       setSnackbarOpen(true);
//     }
//   };

 


//   const handleDeleteSelected = async () => {
//     // Log filteredRows to check its structure
//     console.log("Filtered rows:", filteredRows);
  
//     // Get selected row IDs
//     const selectedIds = filteredRows
//       .filter(row => row.isSelected)
//       .map(row => {
//         // Log each row to check its structure
//         console.log("Processing row:", row);
//         return row._id; // Ensure id exists and is not undefined
//       });
  
//     console.log("Selected IDs:", selectedIds);
  
//     if (selectedIds.length === 0) {
//       alert("No rows selected for deletion.");
//       return;
//     }
  
//     try {
//       // Define the API endpoint and token
//       const apiUrl = 'https://schoolmanagement-uz4r.onrender.com/school/delete';
//       const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjRhMDdmMGRkYmVjNmM3YmMzZDUzZiIsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE3MjMxMTU1MjJ9.4DgAJH_zmaoanOy4gHB87elbUMod8PunDL2qzpfPXj0'; // Replace with actual token
  
//       // Send delete requests for each selected ID
//       const deleteRequests = selectedIds.map(id =>
//         fetch(`${apiUrl}/${id}`, {
//           method: 'DELETE',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         }).then(response => {
//           if (!response.ok) {
//             throw new Error(`Error deleting record with ID ${id}: ${response.statusText}`);
//           }
//           return response.json();
//         })
//       );
  
//       // Wait for all delete requests to complete
//       await Promise.all(deleteRequests);
  
//       // Filter out deleted rows
//       const newFilteredRows = filteredRows.filter(row => !row.isSelected);
  
//       // Update state
//       setFilteredRows(newFilteredRows);
//       setSelectAll(false);
  
//       alert('Selected records deleted successfully.');
//     } catch (error) {
//       console.error('Error during deletion:', error);
//       alert('Failed to delete selected records.');
//     }
//   };
  
  
  

//   const handleExport = () => {
//     const dataToExport = filteredRows.map(row => {
//       const { isSelected, ...rowData } = row;
//       return rowData;
//     });
//     const worksheet = XLSX.utils.json_to_sheet(dataToExport);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
//     XLSX.writeFile(workbook, "Leave.xlsx");
//   };

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const data = new Uint8Array(e.target.result);
//         const workbook = XLSX.read(data, { type: 'array' });
//         const sheetNames = workbook.SheetNames;
//         const sheet = workbook.Sheets[sheetNames[0]];
//         const parsedData = XLSX.utils.sheet_to_json(sheet);
//         setImportData(parsedData);
//       };
//       reader.readAsArrayBuffer(file);
//     }
//   };

//   const sortedData = [...filteredRows];
//   if (sortConfig.key !== null) {
//     sortedData.sort((a, b) => {
//       if (a[sortConfig.key] < b[sortConfig.key]) {
//         return sortConfig.direction === 'ascending' ? -1 : 1;
//       }
//       if (a[sortConfig.key] > b[sortConfig.key]) {
//         return sortConfig.direction === 'ascending' ? 1 : -1;
//       }
//       return 0;
//     });
//   }

  
  
//   const handleAddButtonClick = () => {
//     setFormData({});
//     setAddModalOpen(true);
//   };

//   const handleModalClose = () => {
//     setEditModalOpen(false);
//     setAddModalOpen(false);
//     setFormData({});
//   };

//   const handleSnackbarClose = () => {
//     setSnackbarOpen(false);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   // const handleEditSubmit = () => {
//   //   const updatedRows = filteredRows.map(row =>
//   //     row.id === selectedRow.id ? { ...row, ...formData, isSelected: false } : row
//   //   );
//   //   setFilteredRows(updatedRows);
//   //   handleModalClose();
//   // };

//   const handleEditSubmit = async () => {
//     // Define the API URL and authentication token
//     const apiUrl = `https://schoolmanagement-uz4r.onrender.com/school/update/${selectedRow._id}`; // Replace with your actual API URL
//     const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjRhMDdmMGRkYmVjNmM3YmMzZDUzZiIsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE3MjMxMTU1MjJ9.4DgAJH_zmaoanOy4gHB87elbUMod8PunDL2qzpfPXj0'; // Replace with your actual authentication token
  
//     // Prepare the updated data
//     const updatedData = {
//       ...formData,
//       isSelected: false
//     };
  
//     try {
//       // Perform the PUT request
//       const response = await fetch(apiUrl, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(updatedData)
//       });
  
//       // Check if the response is okay (status code 200-299)
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
  
//       // Optionally: Process the response data if needed
//       const result = await response.json();
//       console.log('Update successful:', result);
  
//       // Update local state after successful API call
//       const updatedRows = filteredRows.map(row =>
//         row.id === selectedRow.id ? { ...row, ...formData, isSelected: false } : row
//       );
//       setFilteredRows(updatedRows);
  
//       // Close the modal
//       handleModalClose();
  
//     } catch (error) {
//       console.error('Error updating row:', error);
//       // Optionally: Handle the error (e.g., show a notification or message to the user)
//     }
//   };
  

//   // const handleAddSubmit = () => {
//   //   const newRow = { ...formData, id: filteredRows.length + 1, isSelected: false };
//   //   setFilteredRows([...filteredRows, newRow]);
//   //   handleModalClose();
//   // };

//   const handleAddSubmit = async () => {
//     try {
//       const newRow = { ...formData, id: filteredRows.length + 1, isSelected: false };
  
//       // POST request to the server
//       const response = await fetch('https://schoolmanagement-uz4r.onrender.com/parent/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newRow),
//       });
  
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
  
//       // Assuming the server returns the created object
//       const result = await response.json();
  
//       // Update the state with the new row
//       setFilteredRows([...filteredRows, result]);
  
//       // Close the modal
//       handleModalClose();
//       console.log('error occured in post method')
//     } catch (error) {
//       console.error('Error during POST request:', error);
//       // Handle the error appropriately (e.g., show a notification to the user)
//     }
//   };
  
//   // const handleStatusUpdate = (requestId, status) => {
//   //   axios.post(`/api/update-request-status/${requestId}`, { statusOfRequest: status })
//   //     .then(response => {
//   //       console.log('Status update response:', response.data);
//   //       // Update the requests list by filtering out the processed request
//   //       setRequests(requests.filter(request => request.requestId !== requestId));
//   //     })
//   //     .catch(error => {
//   //       console.error('Error updating request status:', error);
//   //     });
//   // };
//   const handleApprove = async (requestId) => {
//     try {
//       const response = await axios.post(`https://schoolmanagement-uz4r.onrender.com/school/review-request/${requestId}`, {
//         statusOfRequest: 'approved'
//       }, {
//         headers: {
//           Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjRhMDdmMGRkYmVjNmM3YmMzZDUzZiIsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE3MjMxMTU1MjJ9.4DgAJH_zmaoanOy4gHB87elbUMod8PunDL2qzpfPXj0`, // Replace with your token
//         },
//       });
//       if (response.status === 200) {
//         setSnackbarOpen(true);
//         fetchData(); // Refresh data
//       }
//     } catch (error) {
//       console.error('Error approving request:', error);
//     }
//   };

//   const handleReject = async (requestId) => {
//     try {
//       const response = await axios.post(`https://schoolmanagement-uz4r.onrender.com/school/review-request/${requestId}`, {
//         statusOfRequest: 'denied'
//       }, {
//         headers: {
//           Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjRhMDdmMGRkYmVjNmM3YmMzZDUzZiIsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE3MjMxMTU1MjJ9.4DgAJH_zmaoanOy4gHB87elbUMod8PunDL2qzpfPXj0`, // Replace with your token
//         },
//       });
//       if (response.status === 200) {
//         setSnackbarOpen(true);
//         fetchData(); // Refresh data
//       }
//     } catch (error) {
//       console.error('Error rejecting request:', error);
//     }
//   };
//   return (
//     <>
//       <h1 style={{ textAlign: 'center',marginTop:'113px' }}>Leave Detail </h1>
//       <div>
//         <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
//           <TextField
//             label="Search"
//             variant="outlined"
//             value={filterText}
//             onChange={handleFilterChange}
//             sx={{ marginRight: '10px', width: '300px' }}
//             InputProps={{
//               startAdornment: (
//                 <SearchIcon style={{ cursor: 'pointer', marginLeft: '10px', marginRight: '5px' }} />
//               ),
//             }}
//           />
//           <Button
//             onClick={() => setModalOpen(true)}
//             sx={{
//               backgroundColor: 'rgb(85, 85, 85)',
//               color: 'white',
//               fontWeight: 'bold',
//               marginRight: '10px',
//               display: 'flex',
//               alignItems: 'center',
//               gap: '10px'
//             }}
//           >
//             <ImportExportIcon />
//             Column Visibility
//           </Button>
//           <Button
//             variant="contained"
//             color="error"
//             onClick={handleDeleteSelected}
//             sx={{ marginRight: '10px' }}
//             startIcon={<DeleteIcon />}
//           >
//             Delete
//           </Button>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleEditButtonClick}
//             sx={{ marginRight: '10px' }}
//             startIcon={<EditIcon />}
//           >
//             Edit
//           </Button>
//           <Button
//             variant="contained"
//             color="success"
//             onClick={handleAddButtonClick}
//             sx={{ marginRight: '10px' }}
//             startIcon={<AddCircleIcon />}
//           >
//             Add
//           </Button>
//           <Button
//             variant="contained"
//             onClick={() => setImportModalOpen(true)}
//             sx={{ backgroundColor: 'rgb(255, 165, 0)', marginRight: '10px' }}
//             startIcon={<CloudUploadIcon />}
//           >
//             Import
//           </Button>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleExport}
//           >
//             Export
//           </Button>
//         </div>
//         <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
         
//           <Table stickyHeader aria-label="sticky table" style={{border:'1px solid black',borderRadius:'10px'}}>
//   <TableHead >
//     <TableRow style={{borderBottom:'1px solid black'}}>
//       <TableCell padding="checkbox" style={{ borderRight: '1px solid #e0e0e0',borderBottom:'1px solid black' }}>
//         <Switch
//           checked={selectAll}
//           onChange={handleSelectAll}
//           color="primary"
//         />
//       </TableCell>
//       {COLUMNS().filter(col => columnVisibility[col.accessor]).map((column) => (
//         <TableCell
//           key={column.accessor}
//           align={column.align}
//           style={{ minWidth: column.minWidth, cursor: 'pointer', borderRight: '1px solid #e0e0e0', borderBottom:'1px solid black'}}
//           onClick={() => requestSort(column.accessor)}
//         >
//           {column.Header}
//           {sortConfig.key === column.accessor ? (
//             sortConfig.direction === 'ascending' ? (
//               <ArrowUpwardIcon fontSize="small" />
//             ) : (
//               <ArrowDownwardIcon fontSize="small" />
//             )
//           ) : null}
//         </TableCell>
//       ))}
//       {/* Heading for the first button column */}
//      {/* <TableCell style={{ borderRight: '1px solid #e0e0e0', borderBottom:'1px solid black' }}>
// Approve      </TableCell>
//     {/* Heading for the second button column */}
//     {/* <TableCell style={{ borderRight: '1px solid #e0e0e0', borderBottom:'1px solid black' }}>       Denied      </TableCell>  */} 
     
//     <TableCell>Actions</TableCell>
//     </TableRow>
//   </TableHead>
//   <TableBody>
  
//     {sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
//       <TableRow
//         hover
//         role="checkbox"
//         tabIndex={-1}
//         key={row.id}
//         onClick={() => handleRowSelect(page * rowsPerPage + index)}
//         selected={row.isSelected}
//       >
//         <TableCell padding="checkbox" style={{ borderRight: '1px solid #e0e0e0' }}>
//           <Switch
//             checked={row.isSelected}
//             color="primary"
//           />
//         </TableCell>
//         {COLUMNS().filter(col => columnVisibility[col.accessor]).map((column) => {
//           const value = row[column.accessor];
//           return (
//             <TableCell key={column.accessor} align={column.align} style={{ borderRight: '1px solid #e0e0e0' }}>
//               {column.format && typeof value === 'number' ? column.format(value) : value}
//             </TableCell>
//           );
//         })}
//       <TableCell>
//                     <Button
//                       onClick={() => handleApprove(row.requestId)}
//                       color="primary"
//                     >
//                       Approve
//                     </Button>
//                     <Button
//                       onClick={() => handleReject(row.requestId)}
//                       color="secondary"
//                     >
//                       Reject
//                     </Button>
//                   </TableCell>
//       </TableRow>
//     ))}
//   </TableBody>
// </Table>

//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[10, 25, 100]}
//           component="div"
//           count={sortedData.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </div>
//       <Modal
//         open={modalOpen}
//         onClose={() => setModalOpen(false)}
//       >
//         <Box sx={style}>
//           <h2>Column Visibility</h2>
//           {COLUMNS().map((col) => (
//             <div key={col.accessor}>
//               <Switch
//                 checked={columnVisibility[col.accessor]}
//                 onChange={() => handleColumnVisibilityChange(col.accessor)}
//                 color="primary"
//               />
//               {col.Header}
//             </div>
//           ))}
//         </Box>
//       </Modal>
//       <Modal
//         open={editModalOpen}
//         onClose={handleModalClose}
//       >
//         <Box sx={style}>
//           <h2>Edit Row</h2>
//           {COLUMNS().map((col) => (
//             <TextField
//               key={col.accessor}
//               label={col.Header}
//               variant="outlined"
//               name={col.accessor}
//               value={formData[col.accessor] || ''}
//               onChange={handleInputChange}
//               sx={{ marginBottom: '10px' }}
//               fullWidth
//             />
//           ))}
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleEditSubmit}
//           >
//             Submit
//           </Button>
//         </Box>
//       </Modal>
//       <Modal
//         open={addModalOpen}
//         onClose={handleModalClose}
//       >
//         <Box sx={style}>
//           <h2>Add Row</h2>
//           {COLUMNS().map((col) => (
//             <TextField
//               key={col.accessor}
//               label={col.Header}
//               variant="outlined"
//               name={col.accessor}
//               value={formData[col.accessor] || ''}
//               onChange={handleInputChange}
//               sx={{ marginBottom: '10px' }}
//               fullWidth
//             />
//           ))}
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleAddSubmit}
//           >
//             Submit
//           </Button>
//         </Box>
//       </Modal>
//       <Modal
//         open={importModalOpen}
//         onClose={() => setImportModalOpen(false)}
//       >
//         <Box sx={style}>
//           <h2>Import Data</h2>
//           <input type="file" onChange={handleFileUpload} />
//           {importData.length > 0 && (
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={() => setFilteredRows([...filteredRows, ...importData.map(row => ({ ...row, isSelected: false }))])}
//               sx={{ marginTop: '10px' }}
//             >
//               Import
//             </Button>
//           )}
//         </Box>
//       </Modal>
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={3000}
//         onClose={handleSnackbarClose}
//       >
//         <Alert onClose={handleSnackbarClose} severity="warning">
//           Please select a row to edit!
//         </Alert>
//       </Snackbar>
//     </>
//   );
// };

import React, { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import { COLUMNS } from './columns';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import * as XLSX from 'xlsx';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { TotalResponsesContext } from '../../../../TotalResponsesContext';
import CircularProgress from "@mui/material/CircularProgress";
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: '80%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  overflowY: 'auto', // Enable vertical scrolling
  display: 'flex',
  flexDirection: 'column',
  padding:'1rem',
};

export const Leave = () => {
  const { settotalLeaveRequest } = useContext(TotalResponsesContext); // Get the context value
  

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterText, setFilterText] = useState('');
  const [filteredRows, setFilteredRows] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [columnVisibility, setColumnVisibility] = useState(Object.fromEntries(COLUMNS().map(col => [col.accessor, true])));
  const [modalOpen, setModalOpen] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [importData, setImportData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [originalRows, setOriginalRows] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");


  //const[totalresponse,setTotalResponses]=useState(0);
  // const fetchData = async () => {
  //   try {
  //     const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjRhMDdmMGRkYmVjNmM3YmMzZDUzZiIsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE3MjMxMTU1MjJ9.4DgAJH_zmaoanOy4gHB87elbUMod8PunDL2qzpfPXj0';
  //     const response = await axios.get(
  //       "https://schoolmanagement-3-ap01.onrender.com/school/pending-requests",
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     console.log('fetch data', response.data); // Log the entire response data
     
  //     if (Array.isArray(response.data.requests)) {
  //       setFilteredRows(response.data.requests.map(row => ({ ...row, isSelected: false })));
  //       settotalLeaveRequest(response.data.requests.length);
  //     } else {
  //       console.error('Expected an array but got:', response.data.requests);
  //     }
  //   } catch (error) {
  //     console.log('error:', error);
  //   }
  //   console.log('get data');
  // };
  const fetchData = async (startDate = "", endDate = "") => {
    setLoading(true);
    try {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjRhMDdmMGRkYmVjNmM3YmMzZDUzZiIsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE3MjMxMTU1MjJ9.4DgAJH_zmaoanOy4gHB87elbUMod8PunDL2qzpfPXj0"; // Replace with actual token
      const response = await axios.get(
        "https://schoolmanagement-1-hurx.onrender.com/school/pending-requests",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log("fetch data", response.data); // Log the entire response data
  
      if (Array.isArray(response.data.requests)) {
        const allData = response.data.requests;
  
        // Apply local date filtering if dates are provided
        const filteredData = (startDate || endDate) ? allData.filter((row) => {
          const registrationDate = parseDate(row.formattedRegistrationDate);
          const start = parseDate(startDate);
          const end = parseDate(endDate);
  
          return (!startDate || registrationDate >= start) &&
                 (!endDate || registrationDate <= end);
        }) : allData; // If no date range, use all data
        const reversedData = filteredData.reverse();
        // Log the date range and filtered data
        console.log(`Data fetched between ${startDate} and ${endDate}:`);
        console.log(filteredData);
        setFilteredRows(
          reversedData.map((row) => ({ ...row, isSelected: false }))
        );
        setOriginalRows(allData.map((row) => ({ ...row, isSelected: false })));
        settotalLeaveRequest(reversedData.length);
        // Log the date range and filtered data
        console.log(`Data fetched between ${startDate} and ${endDate}:`);
        console.log(filteredData);
  
        // setFilteredRows(filteredData.map((row) => ({ ...row, isSelected: false })));
        // setOriginalRows(allData.map((row) => ({ ...row, isSelected: false })));
        // settotalLeaveRequest(filteredData.length);
        
      } else {
        console.error("Expected an array but got:", response.data.children);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching completes
    }
  };
 
  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day); // Months are 0-indexed
  };
  const handleApplyDateRange = () => {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
  
    // If either date is empty, fetch all data
    if (!startDate && !endDate) {
      fetchData(); // Fetch all data
    } else {
      // Convert to desired format if values are not empty
      const formattedStartDate = startDate ? formatDate(startDate) : "";
      const formattedEndDate = endDate ? formatDate(endDate) : "";
  
      fetchData(formattedStartDate, formattedEndDate);
    }
  };
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-').map(Number);
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterData(filterText);
  }, [filterText]);

  useEffect(() => {
    fetchData(); // Fetch data when startDate or endDate changes
}, [startDate, endDate]);
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
  let dataToFilter = originalRows;

  if (startDate && endDate) {
    dataToFilter = dataToFilter.filter(row => {
      const rowDate = new Date(row.dateOfBirth); // Replace `row.date` with the actual date field
      return rowDate >= new Date(startDate) && rowDate <= new Date(endDate);
    });
  }

  if (text === '') {
    setFilteredRows(dataToFilter); // Reset to filtered data
  } else {
    const filteredData = dataToFilter
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

  try {
    // Define the API endpoint and token
    const apiUrl = "https://schoolmanagement-1-hurx.onrender.com/school/delete";
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
  XLSX.writeFile(workbook, "StudentDetail.xlsx");
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

const handleEditSubmit = async () => {
  // Define the API URL and authentication token
  const apiUrl = `https://schoolmanagement-1-hurx.onrender.com/school/update/${selectedRow._id}`; // Replace with your actual API URL
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjRhMDdmMGRkYmVjNmM3YmMzZDUzZiIsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE3MjMxMTU1MjJ9.4DgAJH_zmaoanOy4gHB87elbUMod8PunDL2qzpfPXj0"; // Replace with your actual authentication token

  // Prepare the updated data
  const updatedData = {
    ...formData,
    isSelected: false,
  };

  try {
    // Perform the PUT request
    const response = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    });

    // Check if the response is okay (status code 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Optionally: Process the response data if needed
    const result = await response.json();
    console.log("Update successful:", result);

    // Update local state after successful API call
    const updatedRows = filteredRows.map((row) =>
      row.id === selectedRow.id
        ? { ...row, ...formData, isSelected: false }
        : row
    );
    setFilteredRows(updatedRows);

    // Close the modal
    handleModalClose();
  } catch (error) {
    console.error("Error updating row:", error);
    // Optionally: Handle the error (e.g., show a notification or message to the user)
  }
  fetchData();
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
      "https://schoolmanagement-1-hurx.onrender.com/parent/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRow),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // Assuming the server returns the created object
    const result = await response.json();

    // Update the state with the new row
    setFilteredRows([...filteredRows, result]);

    // Close the modal
    handleModalClose();
    console.log("error occured in post method");
  } catch (error) {
    console.error("Error during POST request:", error);
    // Handle the error appropriately (e.g., show a notification to the user)
  }
};
  
  // const handleStatusUpdate = (requestId, status) => {
  //   axios.post(`/api/update-request-status/${requestId}`, { statusOfRequest: status })
  //     .then(response => {
  //       console.log('Status update response:', response.data);
  //       // Update the requests list by filtering out the processed request
  //       setRequests(requests.filter(request => request.requestId !== requestId));
  //     })
  //     .catch(error => {
  //       console.error('Error updating request status:', error);
  //     });
  // };
  const handleApprove = async (requestId) => {
    try {
      const response = await axios.post(`https://schoolmanagement-1-hurx.onrender.com/school/review-request/${requestId}`, {
        statusOfRequest: 'approved'
      }, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjRhMDdmMGRkYmVjNmM3YmMzZDUzZiIsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE3MjMxMTU1MjJ9.4DgAJH_zmaoanOy4gHB87elbUMod8PunDL2qzpfPXj0`, // Replace with your token
        },
      });
      if (response.status === 200) {
        setSnackbarOpen(true);
        fetchData(); // Refresh data
      }
    } catch (error) {
      console.error('Error approving request:', error);
    }
  };

  const handleReject = async (requestId) => {
    try {
      const response = await axios.post(`https://schoolmanagement-1-hurx.onrender.com/school/review-request/${requestId}`, {
        statusOfRequest: 'denied'
      }, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjRhMDdmMGRkYmVjNmM3YmMzZDUzZiIsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE3MjMxMTU1MjJ9.4DgAJH_zmaoanOy4gHB87elbUMod8PunDL2qzpfPXj0`, // Replace with your token
        },
      });
      if (response.status === 200) {
        setSnackbarOpen(true);
        fetchData(); // Refresh data
      }
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };
  return (
    <>
      <h1 style={{ textAlign: 'center',marginTop:'80px' }}>Leave Detail </h1>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <TextField
            label="Search"
            variant="outlined"
            value={filterText}
            onChange={handleFilterChange}
            sx={{ marginRight: '10px', width: '300px' }}
            InputProps={{
              startAdornment: (
                <SearchIcon style={{ cursor: 'pointer', marginLeft: '10px', marginRight: '5px' }} />
              ),
            }}
          />
          <Button
            onClick={() => setModalOpen(true)}
            sx={{
              backgroundColor: 'rgb(85, 85, 85)',
              color: 'white',
              fontWeight: 'bold',
              marginRight: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <ImportExportIcon />
            Column Visibility
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteSelected}
            sx={{ marginRight: '10px' }}
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleEditButtonClick}
            sx={{ marginRight: '10px' }}
            startIcon={<EditIcon />}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleAddButtonClick}
            sx={{ marginRight: '10px' }}
            startIcon={<AddCircleIcon />}
          >
            Add
          </Button>
          <Button
            variant="contained"
            onClick={() => setImportModalOpen(true)}
            sx={{ backgroundColor: 'rgb(255, 165, 0)', marginRight: '10px' }}
            startIcon={<CloudUploadIcon />}
          >
            Import
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleExport}
          >
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
<input type="date" id="startDate" placeholder="DD-MM-YYYY" style={{width: "140px",marginRight: "10px",padding:'2px',marginLeft:'3px',border:" 0.1px solid black",borderRadius: '3px'
}}/>
<input type="date" id="endDate" placeholder="DD-MM-YYYY" style={{width: "140px",marginRight: "10px",padding:'2px',marginLeft:'3px',border:" 0.1px solid black",borderRadius: '3px'
}}/>
<button  onClick={handleApplyDateRange} style={{backgroundColor:'#1976d2',color:'white',border: "none",padding: "6px 10px",borderRadius: "5px",cursor: "pointer"}}>Apply Date Range</button>
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
        <TableContainer component={Paper} sx={{ maxHeight: 440,border:'1.5px solid black',borderRadius: "7px" }}>
         
          <Table stickyHeader aria-label="sticky table" style={{border:'1px solid black'}}>
  <TableHead >
    <TableRow style={{borderBottom:'1px solid black',borderTop:'1px solid black'}}>
      <TableCell padding="checkbox"  style={{
                        borderRight: "1px solid #e0e0e0",
                        borderBottom: "2px solid black",
                      }}>
        <Switch
          checked={selectAll}
          onChange={handleSelectAll}
          color="primary"
        />
      </TableCell>
      {COLUMNS().filter(col => columnVisibility[col.accessor]).map((column) => (
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
            sortConfig.direction === 'ascending' ? (
              <ArrowUpwardIcon fontSize="small" />
            ) : (
              <ArrowDownwardIcon fontSize="small" />
            )
          ) : null}
        </TableCell>
      ))}
      {/* Heading for the first button column */}
     {/* <TableCell style={{ borderRight: '1px solid #e0e0e0', borderBottom:'1px solid black' }}>
Approve      </TableCell>
    {/* Heading for the second button column */}
    {/* <TableCell style={{ borderRight: '1px solid #e0e0e0', borderBottom:'1px solid black' }}>       Denied      </TableCell>  */} 
     
    <TableCell style={{
           
            cursor: "pointer",
            borderRight: "1px solid #e0e0e0",
            borderBottom: "2px solid black",
            padding: "4px 4px",
            textAlign: "center",
            fontWeight: "bold",
          }}>Actions</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
  
    {sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
      <TableRow
        hover
        role="checkbox"
        tabIndex={-1}
        key={row.id}
        onClick={() => handleRowSelect(page * rowsPerPage + index)}
        selected={row.isSelected}
        style={{
          backgroundColor:
            index % 2 === 0 ? "#ffffff" : "#eeeeefc2",
          borderBottom: "none", // White for even rows, light grey for odd rows
        }}
      >
        <TableCell padding="checkbox" style={{ borderRight: '1px solid #e0e0e0' }}>
          <Switch
            checked={row.isSelected}
            color="primary"
          />
        </TableCell>
        {COLUMNS().filter(col => columnVisibility[col.accessor]).map((column) => {
          const value = row[column.accessor];
          return (
            <TableCell key={column.accessor} align={column.align} style={{
              borderRight: "1px solid #e0e0e0",
              paddingTop: "4px",
              paddingBottom: "4px",
              borderBottom: "none",
              backgroundColor:
                index % 2 === 0 ? "#ffffff" : "#eeeeefc2",
              fontSize: "smaller", // White for even rows, light grey for odd rows
            }}>
              {column.format && typeof value === 'number' ? column.format(value) : value}
            </TableCell>
          );
        })}
      <TableCell style={{
              borderRight: "1px solid #e0e0e0",
              paddingTop: "4px",
              paddingBottom: "4px",
              borderBottom: "none",
              display:'flex',
              textAlign:'center',
              justifyContent:'space-around',

              backgroundColor:
                index % 2 === 0 ? "#ffffff" : "#eeeeefc2",
              fontSize: "smaller", // White for even rows, light grey for odd rows
            }}>
                    <Button
                      onClick={() => handleApprove(row.requestId)}
                      color="primary"
                    >
                      Approve
                    </Button>
                    <Button
                      onClick={() => handleReject(row.requestId)}
                      color="secondary"
                    >
                      Reject
                    </Button>
                  </TableCell>
      </TableRow>
    ))}
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
      </>
        )}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      >
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
      <Modal
        open={editModalOpen}
        onClose={handleModalClose}
      >
        <Box sx={style}>
          <h2>Edit Row</h2>
          {COLUMNS().map((col) => (
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
      <Modal
        open={addModalOpen}
        onClose={handleModalClose}
      >
        <Box sx={style}>
          <h2>Add Row</h2>
          {COLUMNS().map((col) => (
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
      <Modal
        open={importModalOpen}
        onClose={() => setImportModalOpen(false)}
      >
        <Box sx={style}>
          <h2>Import Data</h2>
          <input type="file" onChange={handleFileUpload} />
          {importData.length > 0 && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setFilteredRows([...filteredRows, ...importData.map(row => ({ ...row, isSelected: false }))])}
              sx={{ marginTop: '10px' }}
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
