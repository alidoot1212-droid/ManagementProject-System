'use client'

import { useEffect } from 'react'

import { useParams, useRouter } from 'next/navigation'

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Link,
  MenuItem,
  Slider,
  TextField,
  Typography
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { convertToRaw, EditorState } from 'draft-js'

import EditorControlled from '@/components/elements/editor'
import Breadcrumb from '@/components/Breadcrumb'
import { useGetTask, useUpdateTask } from '@/hooks/admin/tasks/useTasks'

type FormValues = {
  work_block_id: number | null
  name: string
  weight: number
  value: number
  priority_id: number | null
  status_id: number | null
  description: EditorState
}

export default function TaskEdit() {
  const priorities = [
    {
      id: 1,
      title: 'کم'
    },
    {
      id: 2,
      title: 'متوسط'
    },
    {
      id: 3,
      title: 'زیاد'
    }
  ]

  const blocks = [
    {
      id: 1,
      title: 'بلوک فرانت'
    },
    {
      id: 2,
      title: 'بلوک بک'
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
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      work_block_id: null,
      name: '',
      weight: 1,
      value: 1,
      priority_id: null,
      status_id: null,
      description: EditorState.createEmpty()
    }
  })

  const router = useRouter()
  const { id } = useParams()

  const { data: task, isLoading } = useGetTask(Number(id))
  const { mutateAsync, isPending } = useUpdateTask()

  useEffect(() => {
    if (!task) return

    reset({
      work_block_id: task.block_id,
      name: task.name,
      weight: task.weight,
      value: task.value,
      priority_id: task.priority_id,
      status_id: task.status_id,
      description: task.description
    })
  }, [reset, task])

  const onSubmit = async (data: FormValues) => {
    const payload = {
      ...data,
      description: JSON.stringify(convertToRaw(data.description.getCurrentContent()))
    }

    await mutateAsync({
      id: Number(id),
      payload
    })
    router.push('/admin/tasks')
  }

  const items = [
    { title: 'داشبورد', to: '/admin' },
    { title: 'لیست وظایف', to: '/admin/tasks' },
    { title: 'ویرایش وظیفه' }
  ]

  if (isLoading) return <>در حال بارگذاری...</>

  if (!task) return <>صفحه مورد نظر یافت نشد!</>

  return (
    <>
      <Breadcrumb items={items} />
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader
            title='ویرایش وظیفه'
            titleTypographyProps={{
              variant: 'h4',
              align: 'center'
            }}
          />

          <Divider sx={{ mb: 5 }} />

          <CardContent>
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
                  name='work_block_id'
                  control={control}
                  rules={{ required: 'انتخاب بلوک کار الزامی است' }}
                  render={({ field }) => (
                    <TextField {...field} select label='بلوک کار' fullWidth value={field.value ?? ''}>
                      {blocks.map(block => (
                        <MenuItem key={block.id} value={block.id}>
                          {block.title}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>

              <Grid item md={3} xs={12}>
                <Typography gutterBottom>وزن:</Typography>

                <Controller
                  name='weight'
                  control={control}
                  rules={{ required: 'انتخاب وزن الزامی است' }}
                  render={({ field }) => (
                    <Slider
                      value={field.value}
                      onChange={(_, value) => field.onChange(value)}
                      valueLabelDisplay='auto'
                      marks
                      min={1}
                      max={5}
                      step={1}
                    />
                  )}
                />
              </Grid>

              <Grid item md={3} xs={12}>
                <Typography gutterBottom>ارزش:</Typography>

                <Controller
                  name='value'
                  control={control}
                  rules={{ required: 'انتخاب ارزش الزامی است' }}
                  render={({ field }) => (
                    <Slider
                      value={field.value}
                      onChange={(_, value) => field.onChange(value)}
                      valueLabelDisplay='auto'
                      marks
                      min={1}
                      max={5}
                      step={1}
                    />
                  )}
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <Controller
                  name='priority_id'
                  control={control}
                  rules={{ required: 'انتخاب اولویت الزامی است' }}
                  render={({ field }) => (
                    <TextField {...field} select label='اولویت' fullWidth value={field.value ?? ''}>
                      {priorities.map(priority => (
                        <MenuItem key={priority.id} value={priority.id}>
                          {priority.title}
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
                  ویرایش
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </form>
      </Card>
    </>
  )
}
