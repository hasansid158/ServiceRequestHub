import React, { useEffect } from 'react'

import DialogBox from '../../components/common/DialogBox'
import { TextInput } from '../../components/input/TextInput'
import useHookFOrm from '../../hooks/useHookForm';

import { Box, Grid2 } from '@mui/material';

import { customAlphabet } from 'nanoid';

// id: ID!
// serviceName: String!
// serviceDescription: String!
// creationDate: AWSDate!
// severity: String!
// resolutionDate: AWSDate!
// reporterName: String!
// contactInformation: AWSEmail!
// location: String!

// 	Service Request Name: Short Text
// 	Service Request Description: Long Text
// 	Creation Date (DD/MM/YYYY): Date input
// 	Severity: Dropdown (Low, Medium, High)
// 	Resolution Date (DD/MM/YYYY):: Date input (to be automatically calculated, 5 days from creation date if severity is low, 3 days from creation date if severity is medium, 1 day from creation date if severity is High)
// 	Reporter Name: Text input
// 	Contact Information: Email input
// 	Location: Text input


//unique ID which contains only alphanumeric values
const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', 12);

export const ServiceFormDialog = ({
  fetchedData,
  isUpdate,
  open = false,
  onClose = () => { },
  ...rest
}) => {
  const { formObj, handleSubmit } = useHookFOrm();

  const serviceRequestId = nanoid();

  useEffect(() => {
    const preFilData = fetchedData || {};

    formObj?.reset({
      id: serviceRequestId,
      ...preFilData
    })
  }, [fetchedData])



  return (
    <DialogBox
      maxWidth="sm"
      open={true}
      onClose={onClose}
      title={`${isUpdate ? 'Update' : 'Create'} Service Request`}
    >
      <Box mt={3} mb={1} width='100%'>
        <Grid2 container spacing={3}>
          <Grid2 size={6}>
            <TextInput 
              formObj={formObj} 
              name='serviceName' 
              label='Service Name' 
              required
              fullWidth
            />
          </Grid2>
          <Grid2 size={6}>
            <TextInput 
              formObj={formObj} 
              name='serviceDescription' 
              label='Service Description' 
              required
              fullWidth
            />
          </Grid2>
        </Grid2>
      </Box>
    </DialogBox>
  )
}

export default ServiceFormDialog;
