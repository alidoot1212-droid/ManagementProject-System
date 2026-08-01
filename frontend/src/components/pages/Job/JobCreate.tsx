'use client'

import { useRouter } from 'next/navigation'

import type { Dayjs } from 'dayjs'

import { Button, Card, CardContent, CardHeader, Divider, Grid, Link, MenuItem, TextField } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'

import { MobileTimePicker } from '@mui/x-date-pickers'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { faIR } from '@mui/x-date-pickers/locales'
import { EditorState, convertToRaw } from 'draft-js'

import EditorControlled from '@/components/elements/editor'
import { useCreateJob } from '@/hooks/admin/job/useJob'
import Breadcrumb from '@/components/Breadcrumb'

type FormValues = {
  title: string
  start_time: Dayjs | null
  end_time: Dayjs | null
  team_id: number | null
  status_id: number | null
  description: EditorState
}

export default function JobCreate() {
  const teams = [
    {
      id: 1,
      name: 'Frontend'
    },
    {
      id: 2,
      name: 'Backend'
    },
    {
      id: 3,
      name: 'Mobile'
    }
  ]

  const statuses = [
    {
      id: 1,
      title: 'در انتظار'
    },
    {
      id: 2,
      title: 'در حال انجام'
    },
    {
      id: 3,
      title: 'تکمیل شده'
    }
  ]

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      title: '',
      start_time: null,
      end_time: null,
      team_id: null,
      status_id: null,
      description: EditorState.createEmpty()
    }
  })

  const router = useRouter()
  const { mutateAsync, isPending } = useCreateJob()

  const onSubmit = async (data: FormValues) => {
    const payload = {
      ...data,
      start_time: data.start_time?.format('HH:mm'),
      end_time: data.end_time?.format('HH:mm'),
      description: JSON.stringify(convertToRaw(data.description.getCurrentContent()))
    }

    await mutateAsync(payload)

    router.push('/admin/job')
  }

  const items = [
    { title: 'داشبورد', to: '/admin' },
    { title: 'لیست کار ها', to: '/admin/job' },
    { title: 'ایجاد کار جدید' }
  ]

  return (
    <>
      <Breadcrumb items={items} />
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader
            title='ایجاد بلوک کار'
            titleTypographyProps={{
              variant: 'h4',
              align: 'center'
            }}
          />

          <Divider sx={{ mb: 5 }} />

          <CardContent>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              localeText={{
                ...faIR.components.MuiLocalizationProvider.defaultProps.localeText,
                okButtonLabel: 'ثبت',
                cancelButtonLabel: 'انصراف'
              }}
            >
              <Grid container spacing={6}>
                <Grid item md={12} xs={12}>
                  <Controller
                    name='title'
                    control={control}
                    rules={{ required: 'عنوان الزامی است' }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label='عنوان'
                        fullWidth
                        error={!!errors.title}
                        helperText={errors.title?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <Controller
                    name='start_time'
                    control={control}
                    rules={{ required: 'زمان شروع الزامی است' }}
                    render={({ field }) => (
                      <MobileTimePicker
                        label='زمان شروع'
                        value={field.value}
                        ampm={false}
                        onChange={field.onChange}
                        inputRef={field.ref}
                        slotProps={{
                          actionBar: {
                            sx: {
                              '& .MuiButton-root:first-of-type': { color: 'error.main' },
                              '& .MuiButton-root:last-of-type': { color: 'success.main' }
                            }
                          },
                          textField: {
                            fullWidth: true
                          }
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <Controller
                    name='end_time'
                    control={control}
                    rules={{ required: 'زمان پایان الزامی است' }}
                    render={({ field }) => (
                      <MobileTimePicker
                        label='زمان پایان'
                        value={field.value}
                        ampm={false}
                        onChange={field.onChange}
                        inputRef={field.ref}
                        slotProps={{
                          actionBar: {
                            sx: {
                              '& .MuiButton-root:first-of-type': { color: 'error.main' },
                              '& .MuiButton-root:last-of-type': { color: 'success.main' }
                            }
                          },
                          textField: {
                            fullWidth: true
                          }
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <Controller
                    name='team_id'
                    control={control}
                    rules={{ required: 'انتخاب تیم الزامی است' }}
                    render={({ field }) => (
                      <TextField {...field} select label='تیم' fullWidth value={field.value ?? ''}>
                        {teams.map(team => (
                          <MenuItem key={team.id} value={team.id}>
                            {team.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <Controller
                    name='status_id'
                    control={control}
                    render={({ field }) => (
                      <TextField {...field} select label='وضعیت' fullWidth value={field.value ?? ''}>
                        {statuses.map(status => (
                          <MenuItem key={status.id} value={status.id}>
                            {status.title}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>

                <Grid item md={12} xs={12}>
                  <Controller
                    name='description'
                    control={control}
                    render={({ field }) => <EditorControlled value={field.value} onChange={field.onChange} />}
                  />
                </Grid>

                <Grid item md={12} display='flex' justifyContent='space-between'>
                  <Link component='button' underline='hover' onClick={() => router.back()} color='error'>
                    بازگشت
                  </Link>
                  <Button type='submit' variant='contained' color='success' disabled={isPending}>
                    ثبت
                  </Button>
                </Grid>
              </Grid>
            </LocalizationProvider>
          </CardContent>
        </form>
      </Card>
    </>
  )
}
