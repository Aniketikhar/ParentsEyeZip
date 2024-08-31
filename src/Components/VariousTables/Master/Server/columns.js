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
    Header: 'Speed Unit',
    accessor: 'attributes.speedUnit',
  },
  
  {
    Header: 'Timezone',
    accessor: 'attributes.timezone',
  },
  {
    Header: 'Logo',
    accessor: 'attributes.logo',
    Cell: ({ value }) => <img src={value} alt="Logo" style={{ width: '50px', height: 'auto' }} />,
  },
  {
    Header: 'Primary Color',
    accessor: 'attributes.colorPrimary',
  },
  {
    Header: 'Location IQ Key',
    accessor: 'attributes.locationIqKey',
  },
  {
    Header: 'Map on Select',
    accessor: 'attributes.mapOnSelect',
    Cell: ({ value }) => (value ? 'Yes' : 'No'),
  },
  {
    Header: 'Secondary Color',
    accessor: 'attributes.colorSecondary',
  },
  {
    Header: 'Registration',
    accessor: 'registration',
    Cell: ({ value }) => (value ? 'Yes' : 'No'),
  },
  {
    Header: 'Read Only',
    accessor: 'readonly',
    Cell: ({ value }) => (value ? 'Yes' : 'No'),
  },
  {
    Header: 'Device Read Only',
    accessor: 'deviceReadonly',
    Cell: ({ value }) => (value ? 'Yes' : 'No'),
  },
  {
    Header: 'Map Type',
    accessor: 'map',
  },
  {
    Header: 'Latitude',
    accessor: 'latitude',
    Cell: ({ value }) => value.toFixed(5),
  },
  {
    Header: 'Longitude',
    accessor: 'longitude',
    Cell: ({ value }) => value.toFixed(5),
  },
  {
    Header: 'Zoom',
    accessor: 'zoom',
  },
  {
    Header: '12-Hour Format',
    accessor: 'twelveHourFormat',
    Cell: ({ value }) => (value ? 'Yes' : 'No'),
  },
  {
    Header: 'Force Settings',
    accessor: 'forceSettings',
    Cell: ({ value }) => (value ? 'Yes' : 'No'),
  },
  {
    Header: 'Coordinate Format',
    accessor: 'coordinateFormat',
  },
  {
    Header: 'Limit Commands',
    accessor: 'limitCommands',
    Cell: ({ value }) => (value ? 'Yes' : 'No'),
  },
  {
    Header: 'Disable Reports',
    accessor: 'disableReports',
    Cell: ({ value }) => (value ? 'Yes' : 'No'),
  },
  {
    Header: 'Fixed Email',
    accessor: 'fixedEmail',
    Cell: ({ value }) => (value ? 'Yes' : 'No'),
  },
  {
    Header: 'POI Layer',
    accessor: 'poiLayer',
  },
  {
    Header: 'Announcement',
    accessor: 'announcement',
  },
  {
    Header: 'Email Enabled',
    accessor: 'emailEnabled',
    Cell: ({ value }) => (value ? 'Yes' : 'No'),
  },
  {
    Header: 'Geocoder Enabled',
    accessor: 'geocoderEnabled',
    Cell: ({ value }) => (value ? 'Yes' : 'No'),
  },
  {
    Header: 'Text Enabled',
    accessor: 'textEnabled',
    Cell: ({ value }) => (value ? 'Yes' : 'No'),
  },
  {
    Header: 'Storage Space',
    accessor: 'storageSpace',
    Cell: ({ value }) => value.map(v => (v / (1024 ** 3)).toFixed(2) + ' GB').join(', '),
  },
  {
    Header: 'New Server',
    accessor: 'newServer',
    Cell: ({ value }) => (value ? 'Yes' : 'No'),
  },
  {
    Header: 'Open ID Enabled',
    accessor: 'openIdEnabled',
    Cell: ({ value }) => (value ? 'Yes' : 'No'),
  },
  {
    Header: 'Open ID Force',
    accessor: 'openIdForce',
    Cell: ({ value }) => (value ? 'Yes' : 'No'),
  },
  {
    Header: 'Version',
    accessor: 'version',
  },
];
