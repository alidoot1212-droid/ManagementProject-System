'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { Chip, IconButton, Tooltip } from '@mui/material'

import { BiTask } from 'react-icons/bi'

import Breadcrumb from '@/components/Breadcrumb'
import CustomTable from '@/components/CustomTable'
import TimeModal from '../Modals/TimeModal'
import AskingModal from '../Modals/AskingModal'
import { useCompleteTask } from '@/hooks/admin/tasks/useTasks'

export default function TaskTable() {
  const statusColors: Record<number, any> = {
    1: 'default',
    2: 'info',
    3: 'warning',
    4: 'success',
    5: 'error'
  }

  const priorityColors: Record<number, any> = {
    1: 'success',
    2: 'warning',
    3: 'error'
  }

  const [selectedRow, setSelectedRow] = useState<any>(null)
  const [openTimeModal, setOpenTimeModal] = useState(false)
  const [openAskingModal, setOpenAskingModal] = useState(false)

  const router = useRouter()
  const { mutateAsync: completeTask } = useCompleteTask()

  const dataStruct = {
    rowId: ['id'],

    title: ['عنوان', 'وضعیت', 'اولویت', 'عضو تیم', 'اطلاعات بیشتر', 'تحویل'],

    name: [['name'], ['status'], ['priority'], ['team_member'], ['id'], ['id']],

    customCol: [
      null,

      (value: any[]) => {
        const status = value[0]

        return <Chip label={status?.name ?? '-'} color={statusColors[status?.id] ?? 'default'} size='small' />
      },

      (value: any[]) => {
        const priority = value[0]

        return <Chip label={priority?.name ?? '-'} color={priorityColors[priority?.id] ?? 'default'} size='small' />
      },

      (value: any[]) => <span>{value[0]?.name ?? '-'}</span>,

      (_value: any, _index: number, row: any) => (
        <Tooltip title='اطلاعات بیشتر' arrow>
          <IconButton
            color='info'
            onClick={() => {
              setSelectedRow(row)
              setOpenTimeModal(true)
            }}
          >
            <BiTask />
          </IconButton>
        </Tooltip>
      ),

      (_value: any, _index: number, row: any) => (
        <Tooltip title='تحویل' arrow>
          <IconButton
            color='success'
            onClick={() => {
              setSelectedRow(row)
              setOpenAskingModal(true)
            }}
          >
            <BiTask />
          </IconButton>
        </Tooltip>
      )
    ],

    align: ['center', 'center', 'center', 'center', 'center', 'center'],
    width: ['25%', '15%', '15%', '15%', '15%', '15%'],
    sort: ['name', '', '', '', '', ''],
    filter: [{ key: 'name' }, false, false, false, false, false]
  }

  const items = [{ title: 'داشبورد', to: '/admin' }, { title: 'لیست وظایف' }]

  return (
    <>
      <Breadcrumb items={items} />

      <CustomTable
        titleTable={{ title: ' فهرست وظایف', description: 'تمام وظایف ثبت شده' }}
        checkboxEnabled={true}
        cardHeader={{ status: true }}
        queryKey='tasks'
        baseUrl='/tasks'
        textBtn='ایجاد وظیفه جدید'
        btnShow={true}
        dataStruct={dataStruct}
        btnOperation={{
          status: () => true,
          delete: () => true,
          edit: () => true,
          show: () => true,

          onShow: (row: any) => {
            router.push(`/admin/job/${row.id}/tasks/${row.id}/show`)
          },

          onEdit: (row: any) => {
            router.push(`/admin/job/${row.id}/tasks/${row.id}/edit`)
          }
        }}
      />

      <TimeModal open={openTimeModal} row={selectedRow} onClose={() => setOpenTimeModal(false)} />

      <AskingModal
        open={openAskingModal}
        row={selectedRow}
        onClose={() => setOpenAskingModal(false)}
        onSubmit={async () => {
          if (!selectedRow) return

          try {
            await completeTask(selectedRow.id)
          } catch {
            // toast خطا از قبل توی onError هوک نشون داده میشه
          } finally {
            setOpenAskingModal(false)
          }
        }}
      />
    </>
  )
}
