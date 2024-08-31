export const COLUMNS = () => [
    {
      Header: '',
      accessor: 'select',
      Cell: ({ row }) => (
        <input
          type="checkbox"
          checked={row.original.isSelected}
          onChange={() => row.original.handleRowSelect(row.index)}
        />
      ),
    },
    
    
    // New Student-Related Columns
    {
      Header: 'Student Name',
      accessor: 'student_name',
    },
    {
      Header: 'Absent',
      accessor: 'absent',
      Cell: ({ value }) => (value ? 'Yes' : 'No'),
    },
    {
      Header: 'Present',
      accessor: 'present',
      Cell: ({ value }) => (value ? 'Yes' : 'No'),
    },
    {
      Header: 'Bus No',
      accessor: 'bus_no',
    },
    {
      Header: 'Vehicle',
      accessor: 'vehicle',
    },
    {
      Header: 'Status',
      accessor: 'status',
    },
    {
      Header: 'ETA',
      accessor: 'eta',
    },
  ];
