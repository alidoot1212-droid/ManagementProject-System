'use client'

import type { Ref } from 'react'
import { forwardRef } from 'react'

import Fade from '@mui/material/Fade'

import { Box, Button, Chip, Dialog, DialogActions, Grid, Typography, CircularProgress } from '@mui/material'

import DialogContent from '@mui/material/DialogContent'

import ModalHeader from '@/components/ModalHeader'
import Icon from '@components/icon'

import { useShowTeam } from '@/hooks/admin/team/useTeam'

const Transition = forwardRef(function Transition(props: any, ref: Ref<unknown>) {
  return <Fade ref={ref} {...props} />
})

type Props = {
  open: boolean
  onClose: () => void
  data: any
}

const ShowTeam = ({ open, onClose, data }: Props) => {
  const { data: teamData, isLoading } = useShowTeam(data?.id, open)

  if (isLoading) {
    return (
      <Dialog open={open} fullWidth maxWidth='md'>
        <Box
          sx={{
            height: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <CircularProgress />
        </Box>
      </Dialog>
    )
  }

  const team = teamData?.data

  const leader = team?.members?.find((member: any) => member.id === team?.leader_id)

  return (
    <Dialog fullWidth open={open} maxWidth='md' scroll='body' onClose={onClose} TransitionComponent={Transition}>
      <ModalHeader title='نمایش تیم' subtitle='اطلاعات تیم را مشاهده کنید' onClose={onClose} />

      <DialogContent
        sx={{
          pb: 6,
          px: { xs: 5, sm: 10 },
          pt: { xs: 5, sm: 6 }
        }}
      >
        <Grid container spacing={5}>
          {/* Header Team */}

          <Grid item xs={12}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 3,
                p: 4,
                borderRadius: 2,
                bgcolor: 'action.hover'
              }}
            >
              <Box
                sx={{
                  width: 55,
                  height: 55,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'primary.main',
                  color: 'white'
                }}
              >
                <Icon icon='mdi:account-group' fontSize={28} />
              </Box>

              <Box>
                <Typography variant='body2' color='text.secondary'>
                  نام تیم
                </Typography>
                <Typography variant='h6' fontWeight={700}>
                  {team?.name ?? '-'}
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* info cards */}

          {/* <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 3,
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider'
              }}
            >
              <Typography variant='caption' color='text.secondary'>
                کد تیم
              </Typography>

              <Typography fontWeight={600} mt={1}>
                {team?.code ?? '-'}
              </Typography>
            </Box>
          </Grid> */}

          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 3,
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider'
              }}
            >
              <Typography variant='caption' color='text.secondary'>
                سرتیم
              </Typography>

              <Box mt={1}>
                <Chip color='primary' label={leader?.name ?? '-'} />
              </Box>
            </Box>
          </Grid>

          {/* Members */}

          <Grid item xs={12}>
            <Typography fontWeight={600} mb={3}>
              اعضای تیم:
            </Typography>

            <Grid container spacing={3}>
              {team?.members?.map((member: any) => (
                <Grid item xs={12} md={6} key={member.id}>
                  <Box
                    sx={{
                      p: 3,
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: 'divider',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Box>
                      <Typography fontWeight={600}>{member.name}</Typography>

                      <Typography variant='body2' color='text.secondary'>
                        {member.mobile}
                      </Typography>
                    </Box>

                    <Chip size='small' label={member.responsibility} />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Date */}

          <Grid item xs={12}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <Icon icon='mdi:calendar-outline' />

              <Typography variant='body2' color='text.secondary'>
                تاریخ ایجاد:
              </Typography>

              <Typography fontWeight={600}>
                {team?.created_at ? new Date(team.created_at).toLocaleDateString('fa-IR') : '-'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button variant='contained' onClick={onClose}>
          بستن
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ShowTeam
