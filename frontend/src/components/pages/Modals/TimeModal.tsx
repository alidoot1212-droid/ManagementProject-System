'use client'

import { Fragment, useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import MenuItem from '@mui/material/MenuItem'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import type { Breakpoint } from '@mui/material/styles'
import { styled } from '@mui/material/styles'
import DialogContentText from '@mui/material/DialogContentText'
import { Controller, useForm } from 'react-hook-form'
import { Grid, TextField } from '@mui/material'

import CustomDatePicker from '@/components/elements/date_picker_text_filed'

const Form = styled('form')({
  margin: 'auto',
  display: 'flex',
  width: 'fit-content',
  flexDirection: 'column'
})

type Props = {
  open: boolean
  onClose: () => void
}

const TimeModal = ({ open, onClose }: Props) => {
  const teamMembers = [
    { id: 1, full_name: 'علی رضایی' },
    { id: 2, full_name: 'محمد احمدی' }
  ]

  const [fullWidth, setFullWidth] = useState<boolean>(true)
  const [maxWidth, setMaxWidth] = useState<Breakpoint>('sm')

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      teamMemberId: '',
      assignedAt: new Date(),
      deliveryDate: null
    }
  })

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <Fragment>
      <Dialog
        open={open}
        maxWidth={maxWidth}
        fullWidth={fullWidth}
        onClose={onClose}
        aria-labelledby='max-width-dialog-title'
      >
        <DialogTitle id='max-width-dialog-title'>اطلاعات بیشتر</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 4 }}>اطلاعات زیر را تکمیل کنید</DialogContentText>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Controller
                  name='teamMemberId'
                  control={control}
                  rules={{ required: 'انتخاب عضو تیم الزامی است.' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      fullWidth
                      label='عضو تیم'
                      error={!!errors.teamMemberId}
                      helperText={errors.teamMemberId?.message}
                    >
                      {teamMembers.map(item => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.full_name}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name='assignedAt'
                  control={control}
                  render={({ field }) => (
                    <CustomDatePicker label='زمان تخصیص' value={field.value} onChange={field.onChange} disabled />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name='deliveryDate'
                  control={control}
                  render={({ field }) => (
                    <CustomDatePicker
                      label='موعد تحویل'
                      value={field.value}
                      onChange={field.onChange}
                      error={!!errors.deliveryDate}
                      helperText={errors.deliveryDate?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>

            <DialogActions>
              <Button color='error' onClick={onClose}>
                انصراف
              </Button>

              <Button color='success' type='submit' variant='contained'>
                ثبت
              </Button>
            </DialogActions>
          </Form>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

export default TimeModal
