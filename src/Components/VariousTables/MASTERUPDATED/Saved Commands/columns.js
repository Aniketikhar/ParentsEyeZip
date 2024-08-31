export const COLUMNS = () => [
  {
    Header: 'ID',
    accessor: 'id',
  },
  {
    Header: 'Description',
    accessor: 'description',
  },
  {
    Header: 'Device ID',
    accessor: 'deviceId',
  },
  {
    Header: 'Type',
    accessor: 'type',
  },
  {
    Header: 'Text Channel',
    accessor: 'textChannel',
    Cell: ({ value }) => (value ? 'Yes' : 'No'), // Display 'Yes' or 'No' for boolean values
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
