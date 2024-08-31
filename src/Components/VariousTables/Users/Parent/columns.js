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
    Header: 'Parent Name',
    accessor: 'parentName',
  },
  {
    Header: 'Email',
    accessor: 'email',
  },
  {
    Header: 'Password',
    accessor: 'password',
  },
  {
    Header: 'Phone',
    accessor: 'phone',
    Cell: ({ value }) => (value ? value.toString() : 'N/A'),
  },
  {
    Header: 'Registration Date',
    accessor: 'formattedRegistrationDate',
  },
  
];
