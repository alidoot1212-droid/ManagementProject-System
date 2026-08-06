'use client'

import { useState } from 'react'

import { Button } from '@mui/material'

import { BiPlus } from 'react-icons/bi'

import CustomTable from '@/components/CustomTable'
import Breadcrumb from '@/components/Breadcrumb'
import CreateTeam from './CreateTeam'

import ShowTeam from './ShowTeam'
import UpdateTeam from './UpdateTeam'

export default function TeamTable() {
  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [openShowModal, setOpenShowModal] = useState(false)
  const [openUpdateModal, setOpenUpdateModal] = useState(false)

  const [selectedRow, setSelectedRow] = useState<any>(null)

  const items = [{ title: 'داشبورد', to: `/admin` }, { title: 'فهرست تیم ها' }]

  return (
    <>
      <Breadcrumb items={items} />
      <CustomTable
        titleTable={{
          title: 'فهرست تیم ها',
          description: 'می توانید فهرست تیم ها را مشاهده کنید'
        }}
        queryKey='teams'
        baseUrl='/teams'
        textBtn='ایجاد تیم'
        btnShow={true}
        checkboxEnabled={true}
        isPending={false}
        previousData={[]}
        btnOperation={{
          status: () => true,
          delete: () => true,
          edit: () => true,
          show: () => true,

          onShow: (row: any) => {
            setSelectedRow(row)
            setOpenShowModal(true)
          },

          onEdit: (row: any) => {
            setSelectedRow(row)
            setOpenUpdateModal(true)
          }
        }}
        cardHeader={{
          status: true,
          btn: (
            <Button variant='contained' onClick={() => setOpenCreateModal(true)} startIcon={<BiPlus />}>
              ایجاد تیم
            </Button>
          ),
          placeholderSearch: null
        }}
        dataStruct={{
          title: ['نام', 'سرتیم'],
          name: [['name'], ['leader']],
          rowId: ['id'],
          align: ['center', 'center'],

          //   width: ['40%', '20%', '10%'],
          sort: ['avatar', 'leader'],
          filter: [false, false],
          customCol: [
            // نام تیم
            (_val: any, _index: number, row: any) => row.name ?? '-',

            // اعضا
            // (_val: any, _index: number, row: any) => (
            //   <Stack direction='row' justifyContent='center' flexWrap='wrap' gap={1}>
            //     {row.members?.map((member: any) => (
            //       <CustomChip key={member.id} label={`${member.name} (${member.responsibility})`} size='small' />
            //     ))}
            //   </Stack>
            // ),

            // سرتیم
            (_val: any, _index: number, row: any) => {
              const leader = row.members?.find((member: any) => member.id === row.leader_id)

              return leader?.name ?? '-'
            }
          ]
        }}
      />

      <CreateTeam open={openCreateModal} onClose={() => setOpenCreateModal(false)} />

      <ShowTeam
        open={openShowModal}
        data={selectedRow}
        onClose={() => {
          setOpenShowModal(false)
          setSelectedRow(null)
        }}
      />

      <UpdateTeam
        open={openUpdateModal}
        data={selectedRow}
        onClose={() => {
          setOpenUpdateModal(false)
          setSelectedRow(null)
        }}
      />
    </>
  )
}
