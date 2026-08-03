'use client'

import { Fragment } from 'react'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'

type Props = {
  open: boolean
  onClose: () => void
  onSubmit: () => void
}

const AskingModal = ({ open, onClose, onSubmit }: Props) => {
  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>تأیید ثبت زمان تحویل</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            آیا از ثبت زمان تحویل و تأیید این درخواست اطمینان دارید؟ پس از ثبت، زمان تحویل ذخیره خواهد شد.
          </DialogContentText>
        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
          <Button color='error' onClick={onClose}>
            انصراف
          </Button>
          <Button color='success' onClick={onSubmit}>
            تأیید و ثبت
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default AskingModal
