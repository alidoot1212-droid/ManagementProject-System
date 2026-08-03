'use client'

import { useState } from 'react'

import { Chip, IconButton, Tooltip } from '@mui/material'

import { BiTask } from 'react-icons/bi'

import Breadcrumb from '@/components/Breadcrumb'
import CustomTable from '@/components/CustomTable'
import TimeModal from '../Modals/TimeModal'
import AskingModal from '../Modals/AskingModal'

export default function TaskTable() {
  const [selectedRow, setSelectedRow] = useState<any>(null)
  const [openTimeModal, setOpenTimeModal] = useState(false)
  const [openAskingModal, setOpenAskingModal] = useState(false)

  const statusConfig: Record<string, { label: string; color: any }> = {
    active: {
      label: 'فعال',
      color: 'success'
    },
    inactive: {
      label: 'غیرفعال',
      color: 'error'
    },
    pending: {
      label: 'در انتظار',
      color: 'warning'
    },
    completed: {
      label: 'تکمیل شده',
      color: 'success'
    },
    cancelled: {
      label: 'لغو شده',
      color: 'error'
    }
  }

  const items = [{ title: 'داشبورد', to: '/admin' }, { title: 'لیست وظایف' }]

  const dataStruct = {
    rowId: ['id'],

    title: ['عنوان', 'وزن', 'ارزش', 'وضعیت', 'اطلاعات بیشتر', 'تحویل'],

    name: [['name'], ['weight'], ['value'], ['status'], ['id'], ['id']],

    customCol: [
      null,
      null,
      null,

      (value: any[]) => {
        const status = value[0]

        const config = statusConfig[status] || {
          label: status ?? '-',
          color: 'default'
        }

        return <Chip label={config.label} color={config.color} size='small' />
      },

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

    width: ['20%', '20%', '20%', '20%', '10%', '10%'],

    sort: ['name', 'weight', 'value', 'status', '', ''],

    filter: [{ key: 'name' }, { key: 'weight' }, { key: 'value' }, { key: 'status' }, false, false]
  }

  return (
    <>
      <Breadcrumb items={items} />

      <CustomTable
        titleTable={{
          title: ' فهرست وظایف',
          description: 'تمام وظایف ثبت شده'
        }}
        checkboxEnabled={true}
        cardHeader={{
          status: true
        }}
        queryKey='enquiry'
        baseUrl='/request-area'
        textBtn='ایجاد وظیفه جدید'
        btnShow={true}
        dataStruct={dataStruct}
        btnOperation={{
          status: () => true,
          delete: () => true,
          edit: () => true,
          show: () => true
        }}
      />

      <TimeModal open={openTimeModal} onClose={() => setOpenTimeModal(false)} />

      <AskingModal
        open={openAskingModal}
        onClose={() => setOpenAskingModal(false)}
        onSubmit={() => {
          console.log(selectedRow)
          setOpenAskingModal(false)
        }}
      />
    </>
  )
}
