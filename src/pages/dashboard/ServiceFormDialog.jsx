import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'

import DialogBox from '../../components/common/DialogBox'
import { TextInput } from '../../components/input/TextInput'
import useHookFOrm from '../../hooks/useHookForm';

import { Box, Button, Grid2 } from '@mui/material';

import SelectorInput from '../../components/input/SelectorInput';
import { DateInput } from '../../components/input/DateInput';

import { createServiceApi, updateServiceApi, deleteServiceApi } from '../../api/serviceRequestApi';

import { customAlphabet } from 'nanoid';
import { addDays, parseISO } from 'date-fns';

const severityDayDiffMap = {
  'low': 5,
  'medium': 3,
  'high': 1,
};

const severityOptions = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' }
]

export const ServiceFormDialog = ({
  selectedRow = null,
  open = false,
  onClose = () => { },
  onServiceCreate = () => {},
  onServiceUpdate = () => {},
  onServiceDelete = () => {},
  setOpenSnack = () => {},
}) => {
  const { formObj, handleSubmit, watch } = useHookFOrm();
  const isUpdate = useMemo(() => !!selectedRow, [selectedRow]);

  const [loading, setLoading] = useState(false);

  //resetting form on load with selected row value if its update
  useEffect(() => {
    let resetObj = {}

    if (selectedRow) {
      const {
        //to skip
        createdAt,
        updatedAt,
        //select all other
        ...rest
      } = selectedRow;
      resetObj = {
        ...rest,
        creationDate: parseISO(selectedRow?.creationDate),
        resolutionDate: parseISO(selectedRow?.resolutionDate),
      };
    }

    formObj?.reset(resetObj);
  }, [open])

  const { severity, creationDate } = watch();
  useEffect(() => {
    if (!severity || !creationDate) return;

    const nextResolutionDay = addDays(creationDate, severityDayDiffMap?.[severity]);
    formObj.setValue('resolutionDate', nextResolutionDay);
  }, [severity, creationDate])

  const onSubmitCreate = useCallback((data) => {
    setLoading(true);
    //Generating unique ID which contains only alphanumeric values
    const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', 12);
    const uniqueServiceId = nanoid();
    
    const payload = {
      ...data,
      id: uniqueServiceId,
    }

    createServiceApi(payload)
      .then((res) => {
        onServiceCreate(res?.createServiceRequest);
        formObj?.reset({});
        setOpenSnack(`Service created successfully with ID: ${uniqueServiceId}`);
        onClose();
      })
      .catch((err) => console.log(err, 'err'))
      .finally(() => {
        setLoading(false);
      });
  }, [])
  
  const onSubmitUpdate = useCallback((data) => {
    setLoading(true);
    updateServiceApi(data)
     .then(res => {
      onServiceUpdate(res);
      formObj?.reset({});
      setOpenSnack(`Service ID: ${data?.id} updated successfully`);
      onClose();
     })
     .catch((err) => console.log(err, 'err'))
     .finally(() => {
       setLoading(false);
     });
  }, [])
  
  const onSubmitDelete = useCallback(() => {
    const { id } = selectedRow;

    setLoading(true);
    deleteServiceApi({id})
     .then(() => {
      onServiceDelete(id);
      formObj?.reset({});
      setOpenSnack(`Service ID: ${id} deleted successfully`);
      onClose();
     })
     .catch((err) => console.log(err, 'err'))
     .finally(() => {
       setLoading(false);
     });
  }, [selectedRow])

  return (
    <DialogBox
      maxWidth="sm"
      open={open}
      onClose={onClose}
      title={`${isUpdate ? 'Update' : 'Create'} Service Request`}
    >
      <Box mt={3} mb={1} width='100%'>
        <Grid2 container spacing={3}>
          <Grid2 size={6}>
            <TextInput 
              formObj={formObj}
              name='serviceName' 
              label='Service Name*' 
              required
              fullWidth
            />
          </Grid2>
          <Grid2 size={6}>
            <TextInput 
              formObj={formObj} 
              name='reporterName' 
              label='Reporter Name*' 
              required
              fullWidth
            />
          </Grid2>
          <Grid2 size={6}>
            <TextInput 
              formObj={formObj} 
              name='contactInformation' 
              label='Contact Information*' 
              type='email'
              required
              fullWidth
            />
          </Grid2>
          <Grid2 size={6}>
            <TextInput 
              formObj={formObj} 
              name='location' 
              label='Location*' 
              required
              fullWidth
            />
          </Grid2>

          <Grid2 size={4}>
            <SelectorInput 
              formObj={formObj} 
              name='severity' 
              label='Severity*' 
              required
              fullWidth     
              selectorOptions={severityOptions}
            />
          </Grid2>
          <Grid2 size={4}>
            <DateInput 
              formObj={formObj} 
              name='creationDate' 
              label='Creation Date*' 
              required
              fullWidth
            />
          </Grid2>
          <Grid2 size={4}>
            <DateInput 
              formObj={formObj} 
              name='resolutionDate' 
              label='Resolution Date' 
              fullWidth
              textFieldProps={{
                readOnly: true,
                InputProps: {
                  endAdornment: null,
                }
              }}
            />
          </Grid2>
          
          <Grid2 size={12}>
            <TextInput 
              formObj={formObj} 
              name='serviceDescription' 
              label='Service Description' 
              required
              fullWidth
              multiline
              minRows={2}
              maxRows={5}
            />
          </Grid2>
        </Grid2>

        <Box display='flex' justifyContent='space-between' width='100%' mt={3}>
            <Box>
              {isUpdate && 
                <Button
                  variant='outlined'
                  color='primary'
                  sx={{maxWidth: '100px', width: '100%'}}
                  onClick={onSubmitDelete}
                >
                  Delete
                </Button>
              }
            </Box>

            <Button 
              variant='contained' 
              color='secondary' 
              sx={{maxWidth: '220px', width: '100%'}}
              onClick={() => {
                isUpdate ? handleSubmit(onSubmitUpdate)() : handleSubmit(onSubmitCreate)();
              }}
              loading={loading}
              disabled={isUpdate ? !formObj.isDirty : false }
            >
              {`${isUpdate ? 'UPDATE' : 'SUBMIT'}`}
            </Button>
        </Box>
      </Box>
    </DialogBox>
  )
}

export default memo(ServiceFormDialog);
