import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Tooltip from '@mui/material/Tooltip';
import SettingsIcon from '@mui/icons-material/Settings';
import Paper from '@mui/material/Paper';
import SnackbarWrapper from '../SnackbarNotifier';

import { Box, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import styles from './FullScreenDialog.module.scss'
import { TransitionProps } from '@mui/material/transitions';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSeminar, selectEvent } from '../../redux/slices/SeminarSlice';
import { setSelectedObject, setUpdatedObject,  setOpenModal } from '../../redux/slices/SeminarSlice';
import { validateAndUpdateSeminar } from '../../redux/slices/SeminarSlice';
import { AppDispatch } from '../../redux/store';
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog() {
  const dispatch = useDispatch<AppDispatch>();
  const {selectedIds, updatedSeminar, openModal} = useSelector(selectEvent);

  // const [open, setOpen] = useState(false);
  const [openFields, setOpenFields] = React.useState<Set<number>>(new Set());

  useEffect(() => {
    dispatch(setSelectedObject());
  }, [selectedIds, dispatch]);
  
  const handleClickOpen = () => {
    dispatch(setOpenModal(true));
  };

  const handleClose = () => {
      dispatch(setOpenModal(false));
      dispatch(setSelectedObject());
      setOpenFields(new Set());
  };
  
  const toggleField = (index: number) => {
    setOpenFields((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index); 
      }
      return newSet;
    });
  };
  
  const handleSetUpdatedObject = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, 
    key: string) =>{
      dispatch(setUpdatedObject({key, value: event.target.value}));
  };
   
  const handleValidation = () => {
    dispatch(validateAndUpdateSeminar())
      .unwrap()
      .then(() => {
        dispatch(setOpenModal(false));
      })
      .catch((error: Error) => {
        if (error instanceof Error) {
          console.error('Update failed:', error.message);
        } else {
          console.error('An unknown error occurred:', error);
        }
      });
  };

  

  return (
    <React.Fragment>
      
      <Tooltip title="Change" onClick={handleClickOpen}>
          <IconButton>
          <SettingsIcon />
          </IconButton>
      </Tooltip>  

      <Dialog
        fullScreen
        open={openModal}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1, overflow:"hidden" }} variant="h6" component="div">
            {updatedSeminar.id}: {updatedSeminar.title}
            </Typography>
            <SnackbarWrapper />

            <Button autoFocus color="inherit" onClick={handleValidation}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <List sx={{}}>
        <Box
          sx={{
            display: 'flex',
            height: '80vh',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            '& > :not(style)': {
              m: 1,
              width: '25%',
              height: '30vh',
            },
            '@media (max-width: 600px)': {
              flexDirection: 'column',
              flexWrap: 'nowrap',
              justifyContent:'inherit',

              '& > :not(style)': {
                width: '80%',

              },
            },
          }}
        >
          {
            Object.keys(updatedSeminar).map((key, i) =>
              i > 0 && 
             
              <Paper key={i} sx={{
                backgroundColor: "#474646", 
                color: "#fff", 
                padding:"10px", 
                display:"flex",
                overflow:"hidden", 
                flexDirection:"column", 
                justifyContent:"space-between"}} >
                  {i < 5 ? 
                    <p className={styles.text_paper}>{updatedSeminar[key]}</p>                    
                  :
                    <img className={styles.seminar_img} src={updatedSeminar.photo} alt="" />                    
                  }
                <Box sx={{height:"60px", display:"flex", alignItems:"center", justifyContent:"center"}}>
                  {openFields.has(i) 
                  ?   
                <TextField  
                  id="filled-basic" 
                  label={i < 5 ? key : `${key} url`} 
                  variant="filled" 
                  sx={{ color: "#fff", fontFamily: "Chakra Petch, sans-serif"}}
                  onChange={(event) => handleSetUpdatedObject(event, key)}/>
                 
                  :
                  <Tooltip title="Change" sx={{width:'30px', height:'30px'}} onClick={() => toggleField(i)}>
                      <IconButton>
                      <SettingsIcon />
                      </IconButton>
                  </Tooltip>
                  }
                  
                </Box>
              </Paper>
  
            )
          }
     
        
          
          
        </Box>
        </List>
      </Dialog>
    </React.Fragment>
  );
}