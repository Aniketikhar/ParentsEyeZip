export const COLUMNS = () => [
  {
    Header: 'ID',
    accessor: 'id',
  },
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Type',
    accessor: 'type',
  },
  {
    Header: 'Start',
    accessor: 'start',
    Cell: ({ value }) => value.toFixed(2), // Format start as a number with 2 decimal places
  },
  {
    Header: 'Period',
    accessor: 'period',
    Cell: ({ value }) => value.toFixed(2), // Format period as a number with 2 decimal places
  },
  {
    Header: 'Attributes',
    accessor: 'attributes',
    Cell: ({ value }) => {
      if (!value || Object.keys(value).length === 0) {
        return 'N/A'; // Display 'N/A' if attributes are empty or undefined
      }
      return Object.entries(value).map(([key, val]) => `${key}: ${val}`).join(', ');
    },
  },
];
