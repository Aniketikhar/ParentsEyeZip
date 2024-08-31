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
    Header: 'Child Name',
    accessor: 'childName',
  },
  
 
  {
    Header: 'class',
    accessor: 'class',
  },
 
  {
    Header: 'Status of request',
    accessor:'statusOfRequest',
  },
  
  
  
  
  {
    Header: 'Parent Name',
    accessor: 'parentName', // accessing mapped field
  },
  {
    Header: 'Parent Email',
    accessor: 'email', // accessing mapped field
  },
  {
  Header: 'Phone Number',
  accessor: 'phone', // accessing nested field
},
{
  Header: 'Request Date',
  accessor: 'formattedRequestDate',
  Cell: ({ value }) => {
    const [day, month, year] = value.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString(); // Formats the date as MM/DD/YYYY or your locale's format
  },
},
  
];
