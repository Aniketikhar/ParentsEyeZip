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
    Header: 'School Name',
    accessor: 'schoolName',
  },
  {
    Header: 'Branch',
    accessor: 'branch',
  },
  {
    Header: 'User Name',
    accessor: 'userName',
  },
  {
    Header: 'Phone',
    accessor: 'phone',
    Cell: ({ value }) => (value ? value.toString() : 'N/A'),
  },
  {
    Header: 'Email',
    accessor: 'email',
  },
  {
    Header: 'Password',
    accessor: 'password',
  },
  
  
];
