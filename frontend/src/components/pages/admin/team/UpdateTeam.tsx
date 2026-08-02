'use client'

import type { Ref } from 'react'
import { forwardRef, useEffect } from 'react'

import { Controller, useFieldArray, useForm } from 'react-hook-form'

import Fade from '@mui/material/Fade'

import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material'

import DialogContent from '@mui/material/DialogContent'

import { BiSave } from 'react-icons/bi'

import ModalHeader from '@/components/ModalHeader'

import Icon from '@components/icon'

import { useGetTeamUpsertData, useShowTeam, useUpdateTeam } from '@/hooks/admin/team/useTeam'

const Transition = forwardRef(function Transition(props: any, ref: Ref<unknown>) {
  return <Fade ref={ref} {...props} />
})

type Props = {
  open: boolean

  onClose: () => void

  data: any
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

export default function UpdateTeam({ open, onClose, data }: Props) {
  const { data: teamData } = useShowTeam(data?.id, open)

  const { data: upsertData } = useGetTeamUpsertData()

  const { mutateAsync: updateTeamMutate, isPending } = useUpdateTeam()

  const { control, handleSubmit, reset, setError, watch } = useForm<FormValues>({
    defaultValues
  })

  const { fields, append, remove } = useFieldArray({
    control,

    name: 'members'
  })

  const users = upsertData?.data?.members ?? []

  const responsibilities = upsertData?.data?.responsibilities ?? []

  useEffect(() => {
    if (!teamData?.data) return

    const team = teamData.data

    reset({
      name: team.name ?? '',

      members:
        team.members?.map((member: any) => ({
          member_id: member.id,

          responsibility_id: responsibilities.find((item: any) => item.name === member.responsibility)?.id ?? ''
        })) ?? [],

      leader_id: team.leader_id ?? ''
    })
  }, [teamData, responsibilities, reset])

  const selectedMembers = watch('members')

  const leaderOptions = users.filter((user: any) => selectedMembers.some(item => Number(item.member_id) === user.id))

  const onSubmit = async (values: FormValues) => {
    try {
      await updateTeamMutate({
        id: data.id,

        data: values
      })

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
    }
  }

  return (
    <Dialog fullWidth open={open} maxWidth='md' scroll='body' onClose={onClose} TransitionComponent={Transition}>
      <ModalHeader title='ویرایش تیم' subtitle='اطلاعات تیم را ویرایش کنید' onClose={onClose} />

      <DialogContent
        sx={{
          pb: 6,
          px: { xs: 8, sm: 15 },
          pt: { xs: 8, sm: 6 }
        }}
      >
        <Grid container spacing={5}>
          {/* name */}

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
                  {/* member */}

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
                                  maxHeight: 250
                                }
                              }
                            }}
                          >
                            {users.map((user: any) => (
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

                  {/* responsibility */}

                  <Grid item xs={12} md={5}>
                    <Controller
                      name={`members.${index}.responsibility_id`}
                      control={control}
                      render={({ field, fieldState }) => (
                        <FormControl fullWidth error={Boolean(fieldState.error)}>
                          <InputLabel>مسئولیت</InputLabel>

                          <Select {...field} label='مسئولیت'>
                            {responsibilities.map((item: any) => (
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

                  {/* buttons */}

                  <Grid item xs={12} md={2}>
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

                      <IconButton color='error' onClick={() => remove(index)} disabled={fields.length === 1}>
                        <Icon icon='mdi:delete-outline' />
                      </IconButton>
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
          onClick={handleSubmit(onSubmit)}
          disabled={isPending}
          sx={{
            width: 100,
            opacity: isPending ? 0.6 : 1
          }}
        >
          ویرایش
          {isPending && (
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
