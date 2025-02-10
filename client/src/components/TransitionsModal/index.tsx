import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Tooltip, IconButton, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { selectEvent, deleteSeminar } from '../../redux/slices/SeminarSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#242424',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function TransitionsModal() {
  const dispatch = useDispatch<AppDispatch>();
  const {selectedIds} = useSelector(selectEvent);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = () =>{
    dispatch(deleteSeminar(selectedIds.map(s => String(s))));
    handleClose();
  }
  return (
    <div>
      <Tooltip  title="Delete" onClick={handleOpen}>
            <IconButton>
                <DeleteIcon />
            </IconButton>
        </Tooltip>  
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
                Please confirm action
            </Typography>
            <Box>

            </Box>
            <Stack direction="row" spacing={2} sx={{marginTop:'10px'}}>
                <Button variant="contained" color="success" onClick={handleDelete}>
                    Yes
                </Button>
                <Button variant="contained" color="error" onClick={handleClose}>
                    Exit
                </Button>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}