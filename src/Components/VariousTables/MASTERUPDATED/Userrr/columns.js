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
    Header: 'Email',
    accessor: 'email',
  },
  {
    Header: 'Phone',
    accessor: 'phone',
  },
  {
    Header: 'Readonly',
    accessor: 'readonly',
    Cell: ({ value }) => (value ? 'Yes' : 'No'),
  },
  {
    Header: 'Administrator',
    accessor: 'administrator',
    Cell: ({ value }) => (value ? 'Yes' : 'No'),
  },
  {
    Header: 'Map',
    accessor: 'map',
  },
  {
    Header: 'Latitude',
    accessor: 'latitude',
    Cell: ({ value }) => {
      return value != null ? value.toFixed(5) : 'N/A';
    },
  },
  {
    Header: 'Longitude',
    accessor: 'longitude',
    Cell: ({ value }) => {
      return value != null ? value.toFixed(5) : 'N/A';
    },
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
    Header: 'Coordinate Format',
    accessor: 'coordinateFormat',
  },
  {
    Header: 'Disabled',
    accessor: 'disabled',
    Cell: ({ value }) => (value ? 'Yes' : 'No'),
  },
  {
    Header: 'Expiration Time',
    accessor: 'expirationTime',
    Cell: ({ value }) => {
      if (!value) return 'N/A';
      const date = new Date(value);
      return date.toLocaleDateString(); // Format as MM/DD/YYYY or your locale's format
    },
  },
  {
    Header: 'Device Limit',
    accessor: 'deviceLimit',
  },
  {
    Header: 'User Limit',
    accessor: 'userLimit',
  },
  {
    Header: 'Device Readonly',
    accessor: 'deviceReadonly',
    Cell: ({ value }) => (value ? 'Yes' : 'No'),
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
    Header: 'TOTP Key',
    accessor: 'totpKey',
  },
  {
    Header: 'Temporary',
    accessor: 'temporary',
    Cell: ({ value }) => (value ? 'Yes' : 'No'),
  },
  {
    Header: 'Password',
    accessor: 'password',
  },
  {
    Header: 'Address',
    accessor: 'attributes.address',
  },
  {
    Header: 'Timezone',
    accessor: 'attributes.timezone',
  },
  {
    Header: 'Company',
    accessor: 'attributes.company',
  },
  {
    Header: 'Map Follow',
    accessor: 'attributes.mapFollow',
    Cell: ({ value }) => (value ? 'Yes' : 'No'),
  },
  {
    Header: 'Map Live Routes',
    accessor: 'attributes.mapLiveRoutes',
  },
  {
    Header: 'Map Direction',
    accessor: 'attributes.mapDirection',
  },
  {
    Header: 'Speed Unit',
    accessor: 'attributes.speedUnit',
  },
  {
    Header: 'Active Map Styles',
    accessor: 'attributes.activeMapStyles',
  },
  {
    Header: 'Device Secondary',
    accessor: 'attributes.deviceSecondary',
  },
  {
    Header: 'Sound Events',
    accessor: 'attributes.soundEvents',
  },
  {
    Header: 'Sound Alarms',
    accessor: 'attributes.soundAlarms',
  },
  {
    Header: 'Position Items',
    accessor: 'attributes.positionItems',
  },
];
