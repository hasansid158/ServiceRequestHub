import { format } from 'date-fns';

const dateFormatter = (params) => {
  if (!params.value) return '';
  return format(new Date(params.value), 'dd/MM/yyyy');
};

const severityCellRenderer = (params) => {
  let color;
  switch (params.value) {
    case 'high':
      color = '#8B0000';
      break;
    case 'medium':
      color = '#B8860B';
      break;
    case 'low':
      color = '#6C8E68';
      break;
    default:
      color = theme.palette.text.primary;
  }

  const capitalizedValue =
    params.value && typeof params.value === 'string'
      ? params.value.charAt(0).toUpperCase() + params.value.slice(1)
      : params.value;

  return <span style={{ color, fontWeight: 'bold' }}>{capitalizedValue}</span>;
};

const columnDefs = [
  { 
    field: 'id', 
    headerName: 'ID', 
    sortable: true, 
    filter: true 
  },
  { 
    field: 'serviceName', 
    headerName: 'Service Name', 
    sortable: true, 
    filter: true 
  },
  { 
    field: 'serviceDescription', 
    headerName: 
    'Service Description', 
    sortable: true, 
    filter: true,
    minWidth: 250
  },
  {
    field: 'creationDate',
    headerName: 'Creation Date',
    sortable: true,
    filter: true,
    valueFormatter: dateFormatter,
  },
  {
    field: 'severity',
    headerName: 'Severity',
    sortable: true,
    filter: true,
    maxWidth: 90,
    cellRenderer: severityCellRenderer,
  },
  {
    field: 'resolutionDate',
    headerName: 'Resolution Date',
    sortable: true,
    filter: true,
    valueFormatter: dateFormatter,
  },
  { field: 'reporterName', headerName: 'Reporter Name', sortable: true, filter: true },
  { field: 'contactInformation', headerName: 'Contact Information', sortable: true, filter: true },
  { field: 'location', headerName: 'Location', sortable: true, filter: true },
  {
    field: 'createdAt',
    headerName: 'Created At',
    sortable: true,
    filter: true,
    valueFormatter: dateFormatter,
  },
  {
    field: 'updatedAt',
    headerName: 'Updated At',
    sortable: true,
    filter: true,
    valueFormatter: dateFormatter,
  },
];

export default columnDefs;