import React, { useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ClientSideRowModelModule, AllCommunityModule, ModuleRegistry } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

import columnDefs from './columnsDefs';
import { Box } from '@mui/material';

const AgDataGrid = ({ rowData, ...rest }) => {
  return (
    <Box
      sx={{
        height: 'calc(100dvh - 165px)',
        width: '100%',
        '& .ag-header-cell': {
          backgroundColor: '#d6e0f4'
        }
      }}
    >
      <AgGridReact
        modules={[ClientSideRowModelModule]}
        rowData={rowData}
        pagination={true}
        paginationAutoPageSize={true}
        columnDefs={columnDefs}
        defaultColDef={{
          flex: 1,
          minWidth: 100,
          resizable: true,
        }}
        {...rest}
      />
    </Box>
  );
};

export default AgDataGrid;
