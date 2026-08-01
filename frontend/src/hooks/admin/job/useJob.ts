import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { createJob, getJob, updateJob } from '@/libs/admin/job/job'

export function useCreateJob() {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending, error } = useMutation<any, any, any>({
    mutationFn: createJob,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['job']
      })

      toast.success('بلوک کار با موفقیت ایجاد شد')
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

export function useGetJob(id: number) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['job', id],
    queryFn: () => getJob(id),
    enabled: !!id
  })

  return {
    data,
    isLoading,
    error
  }
}

export function useUpdateJob() {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: updateJob,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['job']
      })

      toast.success('بلوک کار با موفقیت ویرایش شد')
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
