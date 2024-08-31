
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
  
  {
    Header: 'Supervisor Name',
    accessor: 'supervisorName',
  },
  
  {
    Header: 'Phone Number',
    accessor: 'phone_no',
  },
  {
    Header: 'Address',
    accessor: 'address',
  },
  {
    Header: 'password',
    accessor: 'password',
  },
 
  {
    Header: 'Email',
    accessor: 'email',
  },
  {
    Header: 'Vehicle Id',
    accessor: 'deviceId',
  },
  {
    Header: 'Registration Date',
    accessor: 'formattedRegistrationDate',
    Cell: ({ value }) => {
      const [day, month, year] = value.split('-').map(Number);
      const date = new Date(year, month - 1, day);
      return date.toLocaleDateString(); // Formats the date as MM/DD/YYYY or your locale's format
    },
  },
]