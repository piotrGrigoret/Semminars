import TableHead from '@mui/material/TableHead';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { useSelector} from 'react-redux';
import { selectEvent } from '../../redux/slices/SeminarSlice';

 
export default function EnhancedTableHead() {
  const {seminars} = useSelector(selectEvent);
    
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
          </TableCell>
          {Object.keys(seminars[0]).map((key, i) => (
            <TableCell
              key={i}
              align={'right'}
              padding={'normal'}
            >  
              {key.toUpperCase()}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
  