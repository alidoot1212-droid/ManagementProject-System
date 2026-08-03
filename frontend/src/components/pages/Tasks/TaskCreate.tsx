'use client'

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
import { EditorState } from 'draft-js'

import EditorControlled from '@/components/elements/editor'
import Breadcrumb from '@/components/Breadcrumb'
import { useCreateTask } from '@/hooks/admin/tasks/useTasks'
import { useTaskUpsertData } from '@/hooks/admin/upsert-data/useUpsertData'

type FormValues = {
  work_block_id: number | null
  name: string
  weight: number
  value: number
  priority_id: number | null
  status_id: number | null
  description: EditorState
}

export default function TaskCreate() {
  const {
    control,
    handleSubmit,
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
  const { jobId } = useParams()

  const { mutateAsync, isPending } = useCreateTask()
  const { workBlocks: blocks, priorities, statuses } = useTaskUpsertData()

  const onSubmit = async (data: FormValues) => {
    const payload = {
      work_block_id: data.work_block_id,
      name: data.name,
      weight: data.weight,
      value: data.value,
      priority_id: data.priority_id,
      status_id: data.status_id,
      description: data.description.getCurrentContent().getPlainText()
    }

    await mutateAsync(payload)

    router.push(`/admin/job/${jobId}/tasks`)
  }

  const items = [
    { title: 'داشبورد', to: '/admin' },
    { title: 'لیست وظایف', to: '/admin/tasks' },
    { title: 'ایجاد وظیفه جدید' }
  ]

  return (
    <>
      <Breadcrumb items={items} />
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader
            title='ایجاد وظیفه جدید'
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
                    <TextField
                      {...field}
                      select
                      label='بلوک کار'
                      fullWidth
                      value={field.value ?? ''}
                      onChange={e => field.onChange(Number(e.target.value))}
                    >
                      {blocks.map(block => (
                        <MenuItem key={block.id} value={block.id}>
                          {block.name}
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
                      onChange={(_, value) => field.onChange(Array.isArray(value) ? value[0] : value)}
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
                      onChange={(_, value) => field.onChange(Array.isArray(value) ? value[0] : value)}
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
                    <TextField
                      {...field}
                      select
                      label='اولویت'
                      fullWidth
                      error={!!errors.priority_id}
                      helperText={errors.priority_id?.message}
                      value={field.value ?? ''}
                    >
                      {priorities.map(priority => (
                        <MenuItem key={priority.id} value={priority.id}>
                          {priority.name}
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
                <Link
                  component='button'
                  underline='hover'
                  onClick={() => router.push(`/admin/job/${jobId}/tasks`)}
                  color='error'
                >
                  بازگشت
                </Link>
                <Button type='submit' variant='contained' color='success' disabled={isPending}>
                  ثبت
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </form>
      </Card>
    </>
  )
}
