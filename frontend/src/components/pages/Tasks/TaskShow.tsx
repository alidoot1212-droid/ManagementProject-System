'use client'

import { useParams, useRouter } from 'next/navigation'

import { Card, CardContent, CardHeader, Divider, Grid, Link, TextField } from '@mui/material'

import Breadcrumb from '@/components/Breadcrumb'
import { useGetTask } from '@/hooks/admin/tasks/useTasks'

export default function TaskShow() {
  const router = useRouter()

  const task = {
    name: 'پیاده سازی صفحه وظایف',
    block: {
      title: 'بلوک فرانت'
    },
    weight: 4,
    value: 5,
    priority: {
      title: 'زیاد'
    },
    status: {
      title: 'در حال انجام'
    },
    description: `
      <p>این یک توضیح تست برای وظیفه است.</p>
      <ul>
        <li>ساخت Create</li>
        <li>ساخت Show</li>
        <li>ساخت Edit</li>
      </ul>
    `
  }

  const { id } = useParams()

  const { data: task, isLoading } = useGetTask(Number(id))

  if (isLoading) return <>در حال بارگذاری...</>

  if (!task) return <>یافت نشد</>

  const items = [
    { title: 'داشبورد', to: '/admin' },
    { title: 'لیست وظایف', to: '/admin/tasks' },
    { title: 'مشاهده وظیفه' }
  ]

  return (
    <>
      <Breadcrumb items={items} />

      <Card>
        <CardHeader
          title='مشاهده وظیفه'
          titleTypographyProps={{
            variant: 'h4',
            align: 'center'
          }}
        />

        <Divider sx={{ mb: 5 }} />

        <CardContent>
          <Grid container spacing={6}>
            <Grid item md={12} xs={12}>
              <TextField label='عنوان' value={task.name} fullWidth InputProps={{ readOnly: true }} />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField label='بلوک کار' value={task.block.title} fullWidth InputProps={{ readOnly: true }} />
            </Grid>

            <Grid item md={3} xs={12}>
              <TextField label='وزن' value={task.weight} fullWidth InputProps={{ readOnly: true }} />
            </Grid>

            <Grid item md={3} xs={12}>
              <TextField label='ارزش' value={task.value} fullWidth InputProps={{ readOnly: true }} />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField label='اولویت' value={task.priority.title} fullWidth InputProps={{ readOnly: true }} />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField label='وضعیت' value={task.status.title} fullWidth InputProps={{ readOnly: true }} />
            </Grid>

            <Grid item md={12} xs={12}>
              <Card variant='outlined'>
                <CardContent>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: task.description
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item md={12}>
              <Link component='button' underline='hover' color='error' onClick={() => router.back()}>
                بازگشت
              </Link>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}
