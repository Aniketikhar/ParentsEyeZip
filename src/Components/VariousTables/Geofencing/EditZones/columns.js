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
      Header: 'SN',
      accessor: '',
    },
    {
      Header: 'Zone Name',
      accessor: '',
    },
    {
      Header: 'Assets',
      accessor: '',
    },
    {
      Header: 'Zone Color',
      accessor: '',
    },
    {
      Header: 'In Alert',
      accessor: '',
    },
    {
      Header: 'Out Alert',
      accessor: '',
    },
    {
      Header: 'Sms Alert',
      accessor: '',
    },
    {
      Header: 'Email Alert',
      accessor: '',
    }
  ];
  