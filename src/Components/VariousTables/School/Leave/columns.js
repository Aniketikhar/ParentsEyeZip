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
    Header: 'parent Name',
    accessor: 'parentName',
  },
  {
    Header: 'email',
    accessor: 'email',
  },
  {
    Header: 'vehicle Id',
    accessor: 'vehicleId',
  },
  {
    Header: 'Leave from',
    accessor: '',
  },
  {
    Header: 'Leave To',
    accessor: '',
  }
]