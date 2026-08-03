import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { createTask, getTask, updateTask } from '@/libs/admin/tasks/tasks'

export function useCreateTask() {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending, error } = useMutation<any, any, any>({
    mutationFn: createTask,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tasks']
      })

      toast.success('وظیفه با موفقیت ایجاد شد')
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? 'خطایی رخ داد!')
    }
  })

  return {
    mutateAsync,
    isPending,
    error
  }
}

export function useGetTask(id: number) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['tasks', id],
    queryFn: () => getTask(id),
    enabled: !!id
  })

  return {
    data,
    isLoading,
    error
  }
}

export function useUpdateTask() {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: updateTask,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tasks']
      })

      toast.success(' وظیفه با موفقیت ویرایش شد')
    },

    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? error?.message ?? 'خطایی رخ داد!')
    }
  })

  return {
    mutateAsync,
    isPending,
    error
  }
}
