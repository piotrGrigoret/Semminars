
import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import FullScreenDialog from '../FullScreenDialog';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { deleteSeminar, selectEvent } from '../../redux/slices/SeminarSlice';
import TransitionsModal from '../TransitionsModal';

interface EnhancedTableToolbarProps {
    numSelected: number;
  }


export default function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const dispatch = useDispatch<AppDispatch>();
    const {selectedIds} = useSelector(selectEvent);
    
    const handleDelete = () =>{
      dispatch(deleteSeminar(selectedIds.map(s => String(s))))
    };
    
    const { numSelected } = props;
    return (
      <Toolbar
        sx={[
          {
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
          },
          numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
          },
        ]}
      >
        
        {numSelected > 0 &&
            <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
            >
            {numSelected} selected
            </Typography>
        }

        {numSelected === 1 &&
         <FullScreenDialog/>
        }
        
        
        {numSelected > 0 &&
          <TransitionsModal/>
            // <Tooltip  title="Delete" onClick={handleDelete}>
            //     <IconButton>
            //     <DeleteIcon />
            //     </IconButton>
            // </Tooltip>  
        }
      </Toolbar>
    );
  }