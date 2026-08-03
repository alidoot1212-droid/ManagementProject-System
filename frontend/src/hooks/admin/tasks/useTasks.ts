import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import {
  assignUser,
  completeTask,
  createTask,
  getTags,
  getTask,
  syncTaskTag,
  updateTask
} from '@/libs/admin/tasks/tasks'

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
    data: data?.data ?? null,
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

export function useSyncTaskTag() {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: syncTaskTag,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      toast.success('تگ با موفقیت ثبت شد')
    },

    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? error?.message ?? 'خطایی رخ داد!')
    }
  })

  return { mutateAsync, isPending, error }
}

export function useCompleteTask() {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: completeTask,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      toast.success('وظیفه با موفقیت به پایان یافته تغییر کرد')
    },

    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? error?.message ?? 'خطایی رخ داد!')
    }
  })

  return { mutateAsync, isPending, error }
}

export function useTags() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['tags'],
    queryFn: getTags
  })

  return {
    tags: data?.data ?? [],
    isLoading,
    error
  }
}

export function useAssignUser() {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: assignUser,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tasks']
      })

      toast.success('وظیفه با موفقیت به عضو تیم تخصیص داده شد')
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
