'use client'

import { useRouter } from 'next/navigation'

import { Chip, IconButton, Tooltip } from '@mui/material'

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'

import Breadcrumb from '@/components/Breadcrumb'
import CustomTable from '@/components/CustomTable'

export default function JobTable() {
  const router = useRouter()

  const statusColors: Record<number, any> = {
    1: 'primary',
    2: 'warning',
    3: 'success',
    4: 'error',
    5: 'info'
  }

  const items = [{ title: 'داشبورد', to: '/admin' }, { title: 'لیست کار ها' }]

  const dataStruct = {
    rowId: ['id'],

    title: ['عنوان', 'زمان شروع', 'زمان پایان', 'وضعیت', 'وظایف'],

    name: [['name'], ['start_time'], ['end_time'], ['status'], ['id']],

    customCol: [
      null,
      null,
      null,
      (value: any[]) => {
        const status = value[0]

        return <Chip label={status?.name ?? '-'} color={statusColors[status?.id] ?? 'default'} size='small' />
      },
      (_value: any, _index: number, row: any) => (
        <Tooltip title='وظایف' arrow>
          <IconButton color='info' onClick={() => router.push(`/admin/job/${row.id}/tasks`)}>
            <InfoOutlinedIcon />
          </IconButton>
        </Tooltip>
      )
    ],

    align: ['center', 'center', 'center', 'center', 'center'],

    width: ['20%', '20%', '20%', '20%', '20%'],

    sort: ['name', 'start_time', 'end_time', 'status', ''],

    filter: [{ key: 'name' }, { key: 'start_time' }, { key: 'end_time' }, { key: 'status' }, false]
  }

  return (
    <>
      <Breadcrumb items={items} />

      <CustomTable
        titleTable={{
          title: ' فهرست کار ها',
          description: 'تمام کار های ثبت شده'
        }}
        checkboxEnabled={true}
        cardHeader={{
          status: true
        }}
        queryKey='work-blocks'
        baseUrl='/work-blocks'
        textBtn='ایجاد کار جدید'
        btnShow={true}
        dataStruct={dataStruct}
        btnOperation={{
          status: () => true,
          delete: () => true,
          edit: () => true,
          show: () => true,

          info: () => true,

          onShow: (row: any) => {
            router.push(`/admin/job/${row.id}/show`)
          },

          onEdit: (row: any) => {
            router.push(`/admin/job/${row.id}/edit`)
          },

          onInfo: (row: any) => {
            router.push(`/admin/job/${row.id}/tasks`)
          }
        }}
      />
    </>
  )
}
