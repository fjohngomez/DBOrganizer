import React, { useEffect, useState } from 'react' ;
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Container, Box, Paper, Pagination, TableContainer, TableRow, TableBody, TableCell, Table, TableHead, Grid } from '@mui/material';
import { getStudents, resetStudents } from '../store/students';
import usePagination from './Pagination';

const ViewAll = () => {
  const dispatch =  useDispatch();
  const [change, setChange] = useState(false);

  useEffect(()=>{
    setChange(false)
    dispatch(getStudents())

    return function () {
      dispatch(resetStudents())
    }
  }, [dispatch])

  const students = useSelector(state => state.students.all)

  //pagination variables
  let [page, setPage] = useState(1);
  const per_page = 10;
  const count = Math.ceil(students.length / per_page);
  const _DATA = usePagination(students, per_page);
  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  }

  function DataVisual (props) {
    const {firstName, lastName, email, imageURL, gpa, campus} = props.data
    return (

    <TableRow>
      <TableCell>{firstName}</TableCell>
      <TableCell>{lastName}</TableCell>
      <TableCell align='right'>{gpa}</TableCell>
      <TableCell align='right'>{campus.name}</TableCell>
      <TableCell align='right'>{email}</TableCell>
    </TableRow>
      // <>
      // {`${firstName} ${lastName} ${email} ${imageURL} ${gpa}`}
      // </>
    )
  }

  return (
    <Grid container
    spacing={2}
    maxWidth='full'
    sx={{
        py: 3,
        px: 6,
        display: 'flex',
        justifyContent: 'space-between',
        minHeight: '60vh'
    }}>
    <Grid item xs={12} xl={6} >
      <Box component={Paper} elevation={5} sx={{
        // minHeight: '68vh',
        // width: '55vw'
      }}>

        <TableContainer component={Paper}>
          <Table sx={{minWidth : '100%'}}>
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell align='right'>GPA</TableCell>
                <TableCell align='right'>Campus</TableCell>
                <TableCell align='right'>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {_DATA.currentData().map((value, idx) => {
                return (<DataVisual data={value} key={idx} />)
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Container sx={{
          py: '8px'
        }}>
          <Pagination
          count={count}
          size='small'
          page={page}
          variant='outlined'
          shape='rounded'
          onChange={handleChange} />
        </Container>
      </Box>
    </Grid>

    <Grid item xs={12} xl={6}>
      <Box component={Paper} elevation={5} sx={{
        minHeight: '68vh',
        width: '100%'
      }}>



      {/* for visual width  */}

        <Box component={Paper} elevation={5} sx={{
        minHeight: '68vh',
        // width: '55vw'
      }}>

        <TableContainer component={Paper}>
          <Table sx={{minWidth : '100%'}}>
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell align='right'>GPA</TableCell>
                <TableCell align='right'>Campus</TableCell>
                <TableCell align='right'>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {_DATA.currentData().map((value, idx) => {
                return (<DataVisual data={value} key={idx} />)
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
        count={count}
        size='small'
        page={page}
        variant='outlined'
        shape='rounded'
        onChange={handleChange} />
      </Box>


      {/* end */}



      </Box>
    </Grid>


    </Grid>
  )
}

export default ViewAll
