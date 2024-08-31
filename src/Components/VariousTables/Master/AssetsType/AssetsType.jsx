import React, { useState, useEffect } from 'react';
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
import MOCK_DATA from './MOCK_DATA.json';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import * as XLSX from 'xlsx';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { Select, MenuItem } from '@mui/material';

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
};

export const AssetsType = ({data}) => {
  // console.log(data);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterText, setFilterText] = useState('');
  const [filteredRows, setFilteredRows] = useState(MOCK_DATA.map(row => ({ ...row, isSelected: false })));
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [columnVisibility, setColumnVisibility] = useState(Object.fromEntries(COLUMNS().map(col => [col.accessor, true])));
  const [modalOpen, setModalOpen] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [sheet, setSheet] = useState('');
  const [importData, setImportData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [formData, setFormData] = useState({});


 useEffect(() => {
    setFilteredRows(data.map(row => ({ ...row, isSelected: false })));
  }, [data]);

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
    const filteredData = MOCK_DATA.filter((row) =>
      Object.values(row).some(val => typeof val === 'string' && val.toLowerCase().includes(text.toLowerCase()))
    ).map(row => ({ ...row, isSelected: false }));
    setFilteredRows(filteredData);
  };

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleColumnVisibilityChange = (accessor) => {
    setColumnVisibility(prevState => ({
      ...prevState,
      [accessor]: !prevState[accessor]
    }));
  };

  const handleRowSelect = (index) => {
    const newFilteredRows = [...filteredRows];
    newFilteredRows[index].isSelected = !newFilteredRows[index].isSelected;
    setFilteredRows(newFilteredRows);
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    const newFilteredRows = filteredRows.map(row => ({ ...row, isSelected: newSelectAll }));
    setFilteredRows(newFilteredRows);
    setSelectAll(newSelectAll);
  };

  const handleDeleteSelected = () => {
    const newFilteredRows = filteredRows.filter(row => !row.isSelected);
    setFilteredRows(newFilteredRows);
    setSelectAll(false);
  };

  const handleExport = () => {
    const dataToExport = filteredRows.map(row => {
      const { isSelected, ...rowData } = row;
      return rowData;
    });
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "Assets_Type_List.xlsx");
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
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
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }

  const handleEditButtonClick = () => {
    const selected = filteredRows.find(row => row.isSelected);
    if (selected) {
      setSelectedRow(selected);
      setFormData(selected);
      setEditModalOpen(true);
    } else {
      setSnackbarOpen(true);
    }
  };

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
      [name]: value
    });
  };

  const handleEditSubmit = () => {
    const updatedRows = filteredRows.map(row =>
      row.id === selectedRow.id ? { ...row, ...formData, isSelected: false } : row
    );
    setFilteredRows(updatedRows);
    handleModalClose();
  };

  const handleAddSubmit = () => {
    const newRow = { ...formData, id: filteredRows.length + 1, isSelected: false };
    setFilteredRows([...filteredRows, newRow]);
    handleModalClose();
  };

  const columns = COLUMNS().map(col => ({
    ...col,
    Cell: col.accessor === 'select'
      ? ({ row }) => (
        <input
          type="checkbox"
          checked={row.original.isSelected}
          onChange={() => handleRowSelect(row.index)}
        />
      )
      : col.Cell
  }));

  return (
    <>
      <h2 style={{ textAlign: 'center' }}>Assets Type List</h2>
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
            variant="contained"
            onClick={() => setModalOpen(true)}
            sx={{
              backgroundColor: 'rgb(253, 215, 52)',
              '&:hover': {
                backgroundColor: '#1a242f',
              },
            }}
          >
            Manage Columns
          </Button>
        </div>

        

      <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '16px' }}>
        <TableContainer sx={{ maxHeight: '100%' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell
                  key="select-all"
                  align="left"
                  style={{
                    minWidth: 50,
                    borderRight: '1px solid #ddd',
                    backgroundColor: 'rgb(253, 215, 52)',
                    color: 'white',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </TableCell>
                {COLUMNS().map((column) => (
                  column.accessor !== 'select' && columnVisibility[column.accessor] && (
                    <TableCell
                      key={column.Header}
                      align={column.accessor === 'date_of_birth' ? 'right' : 'left'}
                      style={{
                        minWidth: column.minWidth,
                        borderRight: '1px solid #ddd',
                        backgroundColor: 'rgb(253, 215, 52)',
                        color: 'white',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => requestSort(column.accessor)}>
                        {column.Header}
                        <ArrowUpwardIcon
                            style={{
                              width:'10px',
                              color: sortConfig.key === column.accessor && sortConfig.direction === 'ascending' ? 'black' : '#bbb'
                            }}
                          />
                          <ArrowDownwardIcon
                            style={{
                              width:'10px',
                              color: sortConfig.key === column.accessor && sortConfig.direction === 'descending' ? 'black' : '#bbb'
                            }}
                          />
                      </div>
                    </TableCell>
                  )
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                    style={{
                      backgroundColor: index % 2 === 0 ? 'white' : '#f9f9f9',
                    }}
                  >
                    <TableCell
                      key={`select-${index}`}
                      align="left"
                      style={{
                        borderRight: '1px solid #ddd',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={row.isSelected}
                        onChange={() => handleRowSelect(index)}
                      />
                    </TableCell>
                    {COLUMNS().map((column) => (
                      column.accessor !== 'select' && columnVisibility[column.accessor] && (
                        <TableCell
                          key={column.accessor}
                          align={column.accessor === 'date_of_birth' ? 'right' : 'left'}
                          style={{
                            borderRight: '1px solid #ddd',
                          }}
                        >
                          {column.Cell ? column.Cell({ value: row[column.accessor], row }) : row[column.accessor]}
                        </TableCell>
                      )
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      
      <div style={{ display: 'flex', marginBottom: '10px', marginTop:5 }}>
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleDeleteSelected}
            sx={{
              
              marginRight: '10px',
              backgroundColor: 'rgb(253, 215, 52)',
              '&:hover': {
                backgroundColor: '#1a242f',
              },
            }}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
            onClick={handleEditButtonClick}
            sx={{
              marginRight: '10px',
              backgroundColor: 'rgb(253, 215, 52)',
              '&:hover': {
                backgroundColor: '#1a242f',
              },
            }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleIcon />}
            onClick={handleAddButtonClick}
            sx={{
              marginRight: '10px',
              backgroundColor: 'rgb(253, 215, 52)',
              '&:hover': {
                backgroundColor: '#1a242f',
              },
            }}
          >
            Add
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<ImportExportIcon />}
            onClick={handleExport}
            sx={{
              marginRight: '10px',
              backgroundColor: 'rgb(253, 215, 52)',
              '&:hover': {
                backgroundColor: '#1a242f',
              },
            }}
          >
            Export
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<CloudUploadIcon />}
            onClick={() => setImportModalOpen(true)}
            sx={{
              backgroundColor: 'rgb(253, 215, 52)',
              '&:hover': {
                backgroundColor: '#1a242f',
              },
            }}
          >
            Import
          </Button>
        </div>
      </div>

      {/* Column Visibility Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box sx={style}>
          <h2>Manage Column Visibility</h2>
          {COLUMNS().map((column) => (
            <div key={column.accessor}>
              <Switch
                checked={columnVisibility[column.accessor]}
                onChange={() => handleColumnVisibilityChange(column.accessor)}
              />
              {column.Header}
            </div>
          ))}
          <Button variant="contained" onClick={() => setModalOpen(false)}>Back</Button>
        </Box>
      </Modal>

      {/* Edit Modal */}
      <Modal open={editModalOpen} onClose={handleModalClose}>
        <Box sx={style}>
          <h2>Edit Row</h2>
          {COLUMNS().map((column) => (
            column.accessor !== 'select' && (
              <TextField
                key={column.accessor}
                name={column.accessor}
                label={column.Header}
                value={formData[column.accessor] || ''}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
            )
          ))}
          <div style={{display: 'flex', justifyContent: 'center'}}>
          <Button variant="contained" onClick={handleEditSubmit} sx={{ marginRight: '10px', width:300 }}>Submit</Button>
          <Button variant="contained" onClick={handleModalClose} sx={{ width:300 }}>Back</Button></div>
        </Box>
      </Modal>

      {/* Add Modal */}
      <Modal open={addModalOpen} onClose={handleModalClose}>
        <Box sx={style}>
          <h2>Add New Row</h2>
          {COLUMNS().map((column) => (
            column.accessor !== 'select' && ( 
              // column.accessor === 'id' ?
              <TextField
                key={column.accessor}
                name={column.accessor}
                label={column.Header}
                value={formData[column.accessor] || ''}
                onChange={handleInputChange}
                fullWidth
                margin="normal" />
          //     /> : <Select
          //   key={column.accessor}
          //   id="asset-status-select-1"
          //   name={column.accessor}
          //   value={column.Header}
          //   onChange={handleInputChange}
          //   label={column.Header}
          //   fullWidth
          //   margin="normal"
          // >
          //   <MenuItem value="All assets">All assets</MenuItem>
          //   <MenuItem value="Running">Running</MenuItem>
          //   <MenuItem value="Parked">Parked</MenuItem>
          //   <MenuItem value="less than 10km">Less than 10km</MenuItem>
          //   <MenuItem value="Out of Network">Out of Network</MenuItem>
          //   <MenuItem value="Device Fault">Device Fault</MenuItem>
          // </Select>
            )
          ))}
          <div style={{display: 'flex', justifyContent: 'center'}}>
          <Button variant="contained" onClick={handleAddSubmit} sx={{ marginRight: '10px', width:300 }}>Submit</Button>
          <Button variant="contained" onClick={handleModalClose} sx={{ width:300 }}>Back</Button></div>
        </Box>
      </Modal>

      {/* Import Modal */}
      <Modal open={importModalOpen} onClose={() => setImportModalOpen(false)}>
        <Box sx={style}>
          <h2>Import Data</h2>
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
          />
          {importData.length > 0 && (
            <>
              <Button variant="contained" onClick={() => {
                setFilteredRows(importData.map(row => ({ ...row, isSelected: false })));
                setImportModalOpen(false);
              }}>
                Import Data
              </Button>
            </>
          )}
          <Button variant="contained" onClick={() => setImportModalOpen(false)}>Back</Button>
        </Box>
      </Modal>

      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="warning" sx={{ width: '100%' }}>
          Select a Row
        </Alert>
      </Snackbar>
    </>
  );
};


//chedchad code
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

// export const AssetsType = () => {
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
//       const username = "hbgadget221@gmail.com"; // Replace with your actual username
//       const password = "123456"; // Replace with your actual password
//       const token = btoa(`${username}:${password}`); // Base64 encode the username and password
//       const response = await axios.get(
//         "https://rocketsalestracker.com/api/devices", // Replace with your actual API URL
//         {
//           headers: {
//             Authorization: `Basic ${token}`, // Replace with your actual token
//           },
//         }
//       );
//       console.log('fetch data*****************************************')
//       setFilteredRows(response.data.map(row => ({ ...row, isSelected: false })));
//       setTotalResponses(response.data.length);
//       // Update state variable with fetched data
//     } catch (error) {
//       console.log('errorrrrrrrrrrrrrr')
//       console.error("Error fetching data:***********", error);
//     }
//     console.log('get data')
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
//     XLSX.writeFile(workbook, "AssetsType3.xlsx");
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
