'use client'

import { useParams, useRouter } from 'next/navigation'

import { Card, CardContent, CardHeader, Divider, Grid, Link, TextField } from '@mui/material'

import { useGetJob } from '@/hooks/admin/job/useJob'
import Breadcrumb from '@/components/Breadcrumb'

export default function JobShow() {
  const { jobId } = useParams()

  console.log('PARAM:', jobId)
  const router = useRouter()

  const { data, isLoading } = useGetJob(Number(jobId))

  console.log('PAGE DATA:', data)

  // const job = data?.data

  // console.log(job, 'dataaaa')

  if (isLoading) return <>درحال بارگزاری...</>

  if (!data) return <>صفحه مورد نظر یافت نشد!</>

  const items = [{ title: 'داشبورد', to: '/admin' }, { title: 'لیست کار ها', to: '/admin/job' }, { title: 'نمایش کار' }]

  return (
    <>
      <Breadcrumb items={items} />

      <Card>
        <CardHeader
          title='مشاهده کار'
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
                value={data.data.name ?? ''}
                fullWidth
                InputProps={{
                  readOnly: true
                }}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                label='زمان شروع'
                value={data.data.start_time ?? ''}
                fullWidth
                InputProps={{
                  readOnly: true
                }}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                label='زمان پایان'
                value={data.data.end_time ?? ''}
                fullWidth
                InputProps={{
                  readOnly: true
                }}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                label='شناسه تیم'
                value={data.data.team_id ?? ''}
                fullWidth
                InputProps={{
                  readOnly: true
                }}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                label='وضعیت'
                value={data.data.status?.name ?? ''}
                fullWidth
                InputProps={{
                  readOnly: true
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Card variant='outlined'>
                <CardContent>
                  <TextField
                    label='توضیحات'
                    value={data.data.description ?? ''}
                    multiline
                    minRows={5}
                    fullWidth
                    InputProps={{
                      readOnly: true
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
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
