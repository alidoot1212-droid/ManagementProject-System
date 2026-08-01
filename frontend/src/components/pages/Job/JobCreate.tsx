'use client'

import { useRouter } from 'next/navigation'

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Link,
  MenuItem,
  TextField,
  Typography
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'

import EditorControlled from '@/components/elements/editor'

type FormValues = {
  title: string
  start_time: string
  end_time: string
  team_id: number | null
  status_id: number | null
  description: string
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
      start_time: '',
      end_time: '',
      team_id: null,
      status_id: null,
      description: ''
    }
  })

  const router = useRouter()

  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader>
          <Typography variant='h4'>ایجاد بلوک کار جدید</Typography>
        </CardHeader>

        <Divider sx={{ mb: 5 }} />

        <CardContent>
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
                  <TextField
                    {...field}
                    type='datetime-local'
                    label='زمان شروع'
                    InputLabelProps={{ shrink: true }}
                    fullWidth
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
                  <TextField
                    {...field}
                    type='datetime-local'
                    label='زمان پایان'
                    InputLabelProps={{ shrink: true }}
                    fullWidth
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
                render={({ field }) => <EditorControlled onChange={field.onChange} />}
              />
            </Grid>

            <Grid item md={12} display='flex' justifyContent='space-between'>
              <Link component='button' underline='hover' onClick={() => router.back()} color='error'>
                بازگشت
              </Link>
              <Button type='submit' variant='contained' color='success'>
                ثبت
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </form>
    </Card>
  )
}
