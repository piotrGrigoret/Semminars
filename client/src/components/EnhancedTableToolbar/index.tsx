
import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import FullScreenDialog from '../FullScreenDialog';
import TransitionsModal from '../TransitionsModal';

interface EnhancedTableToolbarProps {
    numSelected: number;
  }


export default function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
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
        {/*если число выбранных элементов больше 1 то выводим лишь значок удаления */}
        {numSelected === 1 &&
         <FullScreenDialog/>
        }
        
        {numSelected > 0 &&
          <TransitionsModal/>
        }
      </Toolbar>
    );
  }