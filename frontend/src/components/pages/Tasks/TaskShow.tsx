'use client'

import { useParams, useRouter } from 'next/navigation'

import { Card, CardContent, CardHeader, Divider, Grid, Link, TextField } from '@mui/material'

import { useGetJob } from '@/hooks/admin/job/useJob'
import Breadcrumb from '@/components/Breadcrumb'

export default function JobShow() {
  //   const job = {
  //     title: 'پیاده‌سازی فرم ایجاد Job',
  //     start_time: '09:00',
  //     end_time: '12:00',
  //     team: {
  //       name: 'Frontend'
  //     },
  //     status: {
  //       title: 'در حال انجام'
  //     },
  //     description: '<p>این یک توضیح تست برای بلوک کار است.</p>'
  //   }

  const { id } = useParams()
  const { data: job, isLoading } = useGetJob(Number(id))

  const router = useRouter()

  if (isLoading) return <>درحال بارگزاری...</>

  if (!job) return <>صفحه مورد نظر یافت نشد!</>

  const items = [{ title: 'داشبورد', to: '/admin' }, { title: 'لیست کار ها', to: '/admin/job' }, { title: 'نمایش کار' }]

  return (
    <>
      <Breadcrumb items={items} />
      <Card>
        <CardHeader
          title='مشاهده بلوک کار'
          titleTypographyProps={{
            variant: 'h4',
            align: 'center'
          }}
        />

        <Divider sx={{ mb: 5 }} />

        <CardContent>
          <Grid container spacing={6}>
            <Grid item md={12} xs={12}>
              <TextField
                label='عنوان'
                value={job.title}
                fullWidth
                InputProps={{
                  readOnly: true
                }}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                label='زمان شروع'
                value={job.start_time}
                fullWidth
                InputProps={{
                  readOnly: true
                }}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                label='زمان پایان'
                value={job.end_time}
                fullWidth
                InputProps={{
                  readOnly: true
                }}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                label='تیم'
                value={job.team?.name ?? ''}
                fullWidth
                InputProps={{
                  readOnly: true
                }}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                label='وضعیت'
                value={job.status?.title ?? ''}
                fullWidth
                InputProps={{
                  readOnly: true
                }}
              />
            </Grid>

            <Grid item md={12} xs={12}>
              <Card variant='outlined'>
                <CardContent>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: job.description
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item md={12} xs={12}>
              <Link component='button' underline='hover' onClick={() => router.back()} color='error'>
                بازگشت
              </Link>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}
