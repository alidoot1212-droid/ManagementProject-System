'use client'

import type { Ref, ReactElement } from 'react'
import { forwardRef, useEffect, useState } from 'react'

import { Controller, useFieldArray, useForm } from 'react-hook-form'

import Fade from '@mui/material/Fade'

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  Grid,
  IconButton,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  CircularProgress
} from '@mui/material'

import DialogContent from '@mui/material/DialogContent'

import { BiSave } from 'react-icons/bi'

import ModalHeader from '@/components/ModalHeader'

import Icon from '@components/icon'
import { useCreateTeam, useGetTeamUpsertData } from '@/hooks/admin/team/useTeam'

const Transition = forwardRef(function Transition(props: any, ref: Ref<unknown>) {
  return <Fade ref={ref} {...props} />
})

type Props = {
  open: boolean
  onClose: () => void
}

type FormValues = {
  name: string

  members: {
    member_id: string | number
    responsibility_id: string | number
  }[]

  leader_id: string | number
}

const defaultValues: FormValues = {
  name: '',

  members: [
    {
      member_id: '',
      responsibility_id: ''
    }
  ],

  leader_id: ''
}

const CreateTeam = ({ open, onClose }: Props) => {
  const [loading, setLoading] = useState(false)
  const { mutateAsync: createTeamMutate } = useCreateTeam()

  const { data: upsertData } = useGetTeamUpsertData()

  const { control, handleSubmit, reset, setError, watch } = useForm<FormValues>({
    defaultValues
  })

  const { fields, append, remove } = useFieldArray({
    control,

    name: 'members'
  })

  useEffect(() => {
    if (open) {
      reset(defaultValues)
    }
  }, [open, reset])

  const selectedMembers = watch('members')

  const users = upsertData?.data?.members ?? []

  const responsibilities = upsertData?.data?.responsibilities ?? []

  const leaderOptions = users.filter(user => selectedMembers.some(item => Number(item.member_id) === user.id))

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true)

      console.log('SUBMIT DATA:', data)

      await createTeamMutate(data)

      reset(defaultValues)

      onClose()
    } catch (err: any) {
      const errors = err?.response?.data?.errors

      if (errors) {
        Object.entries(errors).forEach(([key, value]) => {
          setError(key as keyof FormValues, {
            type: 'server',
            message: (value as string[])[0]
          })
        })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog fullWidth open={open} maxWidth='md' scroll='body' onClose={onClose} TransitionComponent={Transition}>
      <ModalHeader title='ایجاد تیم' subtitle='اطلاعات تیم موردنظر را وارد کنید' onClose={onClose} />

      <DialogContent
        sx={{
          pb: 6,

          px: { xs: 8, sm: 15 },

          pt: { xs: 8, sm: 6 }
        }}
      >
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Controller
              name='name'
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  fullWidth
                  label='نام تیم'
                  error={Boolean(fieldState.error)}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>
          {/* members */}

          <Grid item xs={12}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4
              }}
            >
              {fields.map((item, index) => (
                <Grid container spacing={3} key={item.id} alignItems='center'>
                  <Grid item xs={12} md={5}>
                    <Controller
                      name={`members.${index}.member_id`}
                      control={control}
                      render={({ field, fieldState }) => (
                        <FormControl fullWidth error={Boolean(fieldState.error)}>
                          <InputLabel>عضو</InputLabel>

                          <Select
                            {...field}
                            label='عضو'
                            MenuProps={{
                              PaperProps: {
                                sx: {
                                  maxHeight: 250 // هر عددی که خواستی
                                }
                              }
                            }}
                          >
                            {users.map(user => (
                              <MenuItem key={user.id} value={user.id}>
                                {user.name}
                              </MenuItem>
                            ))}
                          </Select>

                          <FormHelperText>{fieldState.error?.message}</FormHelperText>
                        </FormControl>
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} md={5}>
                    <Controller
                      name={`members.${index}.responsibility_id`}
                      control={control}
                      render={({ field, fieldState }) => (
                        <FormControl fullWidth error={Boolean(fieldState.error)}>
                          <InputLabel>مسئولیت</InputLabel>

                          <Select {...field} label='مسئولیت'>
                            {responsibilities.map(item => (
                              <MenuItem key={item.id} value={item.id}>
                                {item.name}
                              </MenuItem>
                            ))}
                          </Select>

                          <FormHelperText>{fieldState.error?.message}</FormHelperText>
                        </FormControl>
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} md={2}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 1
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          gap: 1,

                          '& .MuiIconButton-root': {
                            width: 36,
                            height: 36,
                            border: theme => `1px solid ${theme.palette.divider}`,
                            borderRadius: 2
                          }
                        }}
                      >
                        {/* دکمه حذف */}
                        <IconButton color='error' onClick={() => remove(index)} disabled={fields.length === 1}>
                          <Icon icon='mdi:delete-outline' />
                        </IconButton>

                        {/* فقط در آخرین سطر دکمه اضافه نمایش داده شود */}
                        {index === fields.length - 1 && (
                          <IconButton
                            color='primary'
                            onClick={() =>
                              append({
                                member_id: '',
                                responsibility_id: ''
                              })
                            }
                          >
                            <Icon icon='mdi:plus-circle-outline' />
                          </IconButton>
                        )}
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              ))}
            </Box>
          </Grid>

          {/* leader */}

          <Grid item xs={12}>
            <Controller
              name='leader_id'
              control={control}
              render={({ field, fieldState }) => (
                <FormControl fullWidth error={Boolean(fieldState.error)}>
                  <InputLabel>سرتیم</InputLabel>

                  <Select {...field} label='سرتیم'>
                    {leaderOptions.map((user: any) => (
                      <MenuItem key={user.id} value={user.id}>
                        {user.name}
                      </MenuItem>
                    ))}
                  </Select>

                  <FormHelperText>{fieldState.error?.message}</FormHelperText>
                </FormControl>
              )}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button
          variant='contained'
          startIcon={<BiSave />}
          sx={{
            width: 90,
            opacity: loading ? 0.6 : 1
          }}
          onClick={handleSubmit(onSubmit)}
          disabled={loading}
        >
          ثبت
          {loading && (
            <CircularProgress
              size={18}
              sx={{
                color: 'inherit',
                ml: 1
              }}
            />
          )}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateTeam
