import TeamTable from '@/components/pages/admin/team/TeamTable'

export const metadata = {
  title: 'فهرست تیم ها',
  description: 'می توانید فهرست تیم ها را مشاهده کنید'
}

export default function membersPage() {
  return <TeamTable />
}
