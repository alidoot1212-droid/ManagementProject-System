'use client'

import { Fragment, useEffect } from 'react'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import MenuItem from '@mui/material/MenuItem'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import { Controller, useForm } from 'react-hook-form'
import { Grid, TextField } from '@mui/material'

import CustomDatePicker from '@/components/elements/date_picker_text_filed'
import { useTaskUpsertData } from '@/hooks/admin/upsert-data/useUpsertData'
import { useAssignUser } from '@/hooks/admin/tasks/useTasks'

type Props = {
  open: boolean
  onClose: () => void
  row?: any
}

const TimeModal = ({ open, row, onClose }: Props) => {
  const { teamMembers } = useTaskUpsertData()

  const { mutateAsync, isPending } = useAssignUser()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      teamMemberId: '',
      assignedAt: new Date(),
      deliveryDate: null as Date | null
    }
  })

  useEffect(() => {
    if (!row) return

    reset({
      teamMemberId: row.team_member?.id ?? '',
      assignedAt: new Date(),
      deliveryDate: null
    })
  }, [reset, row])

  const onSubmit = async (data: any) => {
    if (!row) return

    try {
      const result = await mutateAsync({
        id: row.id,
        payload: {
          team_member_id: Number(data.teamMemberId),
          due_date: data.deliveryDate
        }
      })

      console.log('ASSIGN RESPONSE:', result)

      onClose()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Fragment>
      <Dialog open={open} maxWidth='sm' fullWidth onClose={onClose} aria-labelledby='max-width-dialog-title'>
        <DialogTitle id='max-width-dialog-title'>اطلاعات بیشتر</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 4 }}>اطلاعات زیر را تکمیل کنید</DialogContentText>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Controller
                  name='teamMemberId'
                  control={control}
                  rules={{ required: 'انتخاب عضو تیم الزامی است.' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      onChange={e => {
                        console.log('1. SELECT CHANGED:', e.target.value)
                        field.onChange(e)
                      }}
                      select
                      fullWidth
                      label='عضو تیم'
                      error={!!errors.teamMemberId}
                      helperText={errors.teamMemberId?.message}
                    >
                      {teamMembers.map((item: any) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
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
                  rules={{ required: 'انتخاب موعد تحویل الزامی است.' }}
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
              <Button color='error' onClick={onClose} type='button'>
                انصراف
              </Button>

              <Button color='success' type='submit' variant='contained' disabled={isPending}>
                ثبت
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

export default TimeModal
