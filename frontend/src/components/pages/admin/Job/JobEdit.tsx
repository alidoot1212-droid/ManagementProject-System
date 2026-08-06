'use client'

import { useEffect } from 'react'

import { useParams, useRouter } from 'next/navigation'

import type { Dayjs } from 'dayjs'

import { Button, Card, CardContent, CardHeader, Divider, Grid, Link, MenuItem, TextField } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'

import { MobileTimePicker } from '@mui/x-date-pickers'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { faIR } from '@mui/x-date-pickers/locales'
import { EditorState, ContentState } from 'draft-js'
import dayjs from 'dayjs'

import { useTaskUpsertData } from '@/hooks/admin/upsert-data/useUpsertData'
import EditorControlled from '@/components/elements/editor'
import { useGetJob, useUpdateJob } from '@/hooks/admin/job/useJob'
import Breadcrumb from '@/components/Breadcrumb'

type FormValues = {
  name: string
  start_time: Dayjs | null
  end_time: Dayjs | null
  team_id: number | null
  status_id: number | null
  description: EditorState
}

export default function JobEdit() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      start_time: null,
      end_time: null,
      team_id: null,
      status_id: null,
      description: EditorState.createEmpty()
    }
  })

  const router = useRouter()

  const { jobId } = useParams()
  const { teams, statuses } = useTaskUpsertData()

  const { data, isLoading } = useGetJob(Number(jobId))

  const job = data?.data

  const { mutateAsync, isPending } = useUpdateJob()

  useEffect(() => {
    if (!job) return

    reset({
      name: job.name,
      start_time: job.start_time ? dayjs(`2026-01-01 ${job.start_time}`) : null,
      end_time: job.end_time ? dayjs(`2026-01-01 ${job.end_time}`) : null,
      team_id: job.team_id,
      status_id: job.status?.id ?? null,
      description: job.description
        ? EditorState.createWithContent(ContentState.createFromText(job.description))
        : EditorState.createEmpty()
    })
  }, [job, reset])

  const onSubmit = async (data: FormValues) => {
    const payload = {
      name: data.name,
      team_id: data.team_id,
      status_id: data.status_id,
      start_time: data.start_time?.format('HH:mm'),
      end_time: data.end_time?.format('HH:mm'),
      description: data.description.getCurrentContent().getPlainText()
    }

    console.log(payload)
    await mutateAsync({
      id: Number(jobId),
      ...payload
    })

    router.push('/admin/job')
  }

  if (isLoading) return <>در حال بارگذاری...</>

  const items = [
    { title: 'داشبورد', to: '/admin' },
    { title: 'لیست کار ها', to: '/admin/job' },
    { title: 'ویرایش کار' }
  ]

  return (
    <>
      <Breadcrumb items={items} />
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader
            title='ویرایش بلوک کار'
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
                    name='name'
                    control={control}
                    rules={{ required: 'عنوان الزامی است' }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label='عنوان'
                        fullWidth
                        error={!!errors.name}
                        helperText={errors.name?.message}
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
                      <TextField
                        {...field}
                        select
                        label='تیم'
                        fullWidth
                        value={field.value ?? ''}
                        error={!!errors.team_id}
                        helperText={errors.team_id?.message}
                      >
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
                            {status.name}
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
                  <Link component='button' type='button' underline='hover' onClick={() => router.back()} color='error'>
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
