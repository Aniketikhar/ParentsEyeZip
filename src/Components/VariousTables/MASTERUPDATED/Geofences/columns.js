export const COLUMNS = () => [
  {
    Header: 'ID',
    accessor: 'id',
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
    Header: 'Description',
    accessor: 'description',
    Cell: ({ value }) => value || 'N/A', // Display 'N/A' if description is null
  },
  {
    Header: 'Area',
    accessor: 'area',
    Cell: ({ value }) => value, // Render area as is; could also format if needed
  },
  {
    Header: 'Attributes',
    accessor: 'attributes',
    Cell: ({ value }) => {
      if (Object.keys(value).length === 0) {
        return 'N/A'; // Display 'N/A' if attributes are empty
      }
      return Object.entries(value).map(([key, val]) => `${key}: ${val}`).join(', ');
    },
  },
];
