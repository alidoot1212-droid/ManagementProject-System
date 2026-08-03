import { useQuery } from '@tanstack/react-query'

import { getTaskUpsertData } from '@/libs/admin/upsert-data/upsertData'

export function useTaskUpsertData() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['tasks', 'upsert-data'],
    queryFn: getTaskUpsertData
  })

  return {
    workBlocks: data?.work_blocks ?? [],
    statuses: data?.statuses ?? [],
    priorities: data?.priorities ?? [],
    teamMembers: data?.team_members ?? [],
    teams: data?.teams ?? [],
    isLoading,
    error
  }
}
