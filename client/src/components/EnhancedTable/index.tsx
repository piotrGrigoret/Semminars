import * as React from 'react';
import { useEffect } from 'react';
import styles from './EnhancedTable.module.scss'
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import EnhancedTableToolbar from '../EnhancedTableToolbar';
import EnhancedTableHead from '../EnhancedTableHead';
import { useDispatch, useSelector} from 'react-redux';
import { selectEvent, setPage, setRowsPerPage, setSelected } from '../../redux/slices/SeminarSlice';
export default function EnhancedTable() {
  const dispatch = useDispatch();
  const {seminars, selectedIds, pagination } = useSelector(selectEvent);
  

//определяет массив выбранных юзером строк таблицы и передает в редакс состояние 
const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
  const selectedIndex = selectedIds.indexOf(id);
  let newSelected: number[] = [];

  if (selectedIndex === -1) {
    newSelected = newSelected.concat(selectedIds, id);
  } else if (selectedIndex === 0) {
    newSelected = newSelected.concat(selectedIds.slice(1));
  } else if (selectedIndex === selectedIds.length - 1) {
    newSelected = newSelected.concat(selectedIds.slice(0, -1));
  } else if (selectedIndex > 0) {
    newSelected = newSelected.concat(
      selectedIds.slice(0, selectedIndex),
      selectedIds.slice(selectedIndex + 1),
    );
  }
  dispatch(setSelected(newSelected))
};

const handleChangePage = (event: unknown, newPage: number) => {
  dispatch(setPage(newPage));
};
// вызывает метод для регулирования пагинации и количества строк на одну страницу
const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
  dispatch(setRowsPerPage(parseInt(event.target.value, 10)));
};

return (
  <Box sx={{ width: '100%', backgroundColor: "#242424", color: "#fff"  }}>
    <Paper sx={{ width: '100%', mb: 2, backgroundColor: "#242424", color: "#fff"   }}>
      <EnhancedTableToolbar numSelected={selectedIds.length} />
      <TableContainer sx={{ maxHeight: 'calc(100vh - 300px)' }}>
        <Table
          stickyHeader
          sx={{ 
            minWidth: 750,
            '& .MuiTableCell-root': { 
              color: '#fff'
            },
            '& .MuiTableCell-head': { 
              backgroundColor: '#242424'
            }
          }}
          aria-labelledby="tableTitle"
        >
          <EnhancedTableHead/>
          <TableBody>
            {seminars
            .slice(pagination.page * pagination.rowsPerPage, pagination.page * pagination.rowsPerPage + pagination.rowsPerPage)
            .map((seminar, index) => {
              const isItemSelected = selectedIds.includes(Number(seminar.id));
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  onClick={(event) => handleClick(event, Number(seminar.id))}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={seminar.id}
                  selected={isItemSelected}
                  sx={{ cursor: 'pointer', color: '#fff' }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      sx={{color:'#fff'}}
                      color="primary"
                      checked={isItemSelected}
                      inputProps={{
                        'aria-labelledby': labelId,
                      }}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    id={labelId}
                    scope="row"
                    align="right"
                  >
                    {seminar.id}
                  </TableCell>
                  <TableCell align="right">{seminar.title}</TableCell>
                  <TableCell align="right">{seminar.description}</TableCell>
                  <TableCell align="right">{seminar.date}</TableCell>
                  <TableCell align="right">{seminar.time}</TableCell>
                  <TableCell align="right">
                    <img className={styles.seminar_img} src={seminar.photo} alt="" /></TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={seminars.length}
        rowsPerPage={pagination.rowsPerPage}
        page={pagination.page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  </Box>
);
}
