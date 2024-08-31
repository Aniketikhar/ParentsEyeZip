// export const COLUMNS = () => [
//   {
//     Header: '',
//     accessor: 'select',
//     Cell: ({ row }) => (
//       <input
//         type="checkbox"
//         checked={row.original.isSelected}
//         onChange={() => row.original.handleRowSelect(row.index)}
//       />
//     ),
//   },
  
//   {
//     Header: 'Child Name',
//     accessor: 'childName',
//   },
  
 
//   {
//     Header: 'Class',
//     accessor: 'class',
//   },
//   {
//     Header: 'Roll No.',
//     accessor: 'rollno',
//   },
//   {
//     Header: 'Section',
//     accessor: 'section',
//   },

// {
//   Header: 'Date',
//   accessor: 'formattedDate',
//   Cell: ({ value }) => {
//     const [day, month, year] = value.split('-').map(Number);
//     const date = new Date(year, month - 1, day);
//     return date.toLocaleDateString(); // Formats the date as MM/DD/YYYY or your locale's format
//   },
// },
  
// ];
export const COLUMNS = () => [
  {
    Header: 'ID',
    accessor: 'id',
  },
  {
    Header: 'Group ID',
    accessor: 'groupId',
  },
  {
    Header: 'Calendar ID',
    accessor: 'calendarId',
  },
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Unique ID',
    accessor: 'uniqueId',
  },
  {
    Header: 'Status',
    accessor: 'status',
  },
  {
    Header: 'Last Update',
    accessor: 'lastUpdate',
    Cell: ({ value }) => new Date(value).toLocaleString(),
  },
  {
    Header: 'Position ID',
    accessor: 'positionId',
  },
  {
    Header: 'Phone',
    accessor: 'phone',
  },
  {
    Header: 'Model',
    accessor: 'model',
  },
  {
    Header: 'Contact',
    accessor: 'contact',
  },
  {
    Header: 'Category',
    accessor: 'category',
  },
  {
    Header: 'Disabled',
    accessor: 'disabled',
    Cell: ({ value }) => (value ? 'Yes' : 'No'),
  },
  {
    Header: 'Expiration Time',
    accessor: 'expirationTime',
    Cell: ({ value }) => value ? new Date(value).toLocaleString() : 'N/A',
  },
];
