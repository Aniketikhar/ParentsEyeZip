export const COLUMNS = () => [
  {
    Header: 'ID',
    accessor: 'id',
  },
  {
    Header: 'Unique ID',
    accessor: 'uniqueId',
  },
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Email',
    accessor: 'attributes',
    Cell: ({ value }) => {
      if (!value || Object.keys(value).length === 0) {
        return 'N/A'; // Display 'N/A' if attributes are empty or undefined
      }
      return Object.entries(value).map(([key, val]) => `${key}: ${val}`).join(', ');
    },
  },
  {
    Header: 'Attributes',
    accessor: 'attributes',
    Cell: ({ value }) => JSON.stringify(value), // Display attributes as JSON string
  },
];
