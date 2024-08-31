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
    Header: 'Attributes',
    accessor: 'attributes',
    Cell: ({ value }) => JSON.stringify(value), // Display attributes as JSON string
  },
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Group ID',
    accessor: 'groupId',
  },
 
];
