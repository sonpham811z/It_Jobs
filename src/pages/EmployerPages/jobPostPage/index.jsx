import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  MenuItem,
  TextField,
  Select,
  InputLabel,
  FormControl,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Pagination,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CreateJobModal from './createJobModal';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentEmployer } from '~/redux/employer/employerSlice';
import { getJobsByEmployerIdAPI, selectCurrentJobs } from '~/redux/job/jobSlice';
import { formatDate } from '~/utils/formatter';

const JobPost = () => {
  const [searchTitle, setSearchTitle] = useState('');
  const [postStatus, setPostStatus] = useState('');
  const [approvalStatus, setApprovalStatus] = useState('');

  const  [openModal, setOpenModal] = useState(false)

  const dispatch = useDispatch()
  const employerId = useSelector(selectCurrentEmployer)._id
  const currentJobs = useSelector(selectCurrentJobs)


  console.log(employerId);
  useEffect(() => {
    if(employerId) {
      dispatch(getJobsByEmployerIdAPI(employerId))
    }
  }, [employerId, dispatch])

 
   // Replace with actual data

  return (
    <Box px={3} bgcolor={'white'} sx={{boxShadow: 3, marginTop: 2, height: 550}} >
      <Grid container spacing={2} my={2} alignItems="center">
        <Grid item xs={12} sm={7}>
          <TextField
            fullWidth
            label="Nhập tên tin đăng"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <InputLabel>Trạng thái tuyển dụng</InputLabel>
            <Select
              value={postStatus}
              label="Trạng thái tuyển dụng"
              onChange={(e) => setPostStatus(e.target.value)}
            >
              <MenuItem value="tất cả">Tất cả</MenuItem>
              <MenuItem value="đang tuyển">Đang tuyển</MenuItem>
              <MenuItem value="đã đóng">Đã đóng</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={2} display="flex" gap={1}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<SearchIcon />}
            color="primary"
            sx={{fontSize: '12px'}}
          >
            Tìm kiếm
          </Button>
        </Grid>

        <Grid item xs={12} display="flex" justifyContent="flex-end" gap={1}>
          <Button
              variant="contained"
              startIcon={<DownloadOutlinedIcon />}
              color="secondary"
              sx={{fontSize: '12px'}}
            >
              TẢI DANH SÁCH
            </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            color="secondary"
            sx={{fontSize: '12px'}}
            onClick={()  => setOpenModal(true)}
          >
            TẠO TIN MỚI
          </Button>

        </Grid>  
      </Grid>

      <CreateJobModal open ={openModal} onClose = {() => setOpenModal(false)}/>

      <Box sx={{ height: '300', overflow: 'auto', borderRadius: 2 }}>
        <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
          <Table stickyHeader aria-label="job posts table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ backgroundColor: '#f5f5f5', zIndex: 1, fontWeight: 'bold' }}>Tên tin đăng</TableCell>
                <TableCell sx={{ backgroundColor: '#f5f5f5', zIndex: 1, fontWeight: 'bold' }}>Ngày đăng</TableCell>
                <TableCell sx={{ backgroundColor: '#f5f5f5', zIndex: 1, fontWeight: 'bold' }}>Thời hạn nộp</TableCell>
                <TableCell sx={{ backgroundColor: '#f5f5f5', zIndex: 1, fontWeight: 'bold' }}>Vị trí</TableCell>
                <TableCell sx={{ backgroundColor: '#f5f5f5', zIndex: 1, fontWeight: 'bold' }}>Lượt nộp</TableCell>
                <TableCell sx={{ backgroundColor: '#f5f5f5', zIndex: 1, fontWeight: 'bold' }}>Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentJobs?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <img
                      src="https://res.cloudinary.com/sonpham811205/image/upload/v1745043588/no_data_found_rspjz5.jpg"
                      alt="Empty"
                      style={{ height: 100, marginBottom: 8 }}
                    />
                    <Typography sx={{ fontSize: '11px', color: 'grey' }}>
                      Bạn chưa có tin tuyển dụng nào
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                currentJobs?.map((post, index) => (
                  <TableRow key={index}>
                   <TableCell>{post.title}</TableCell>
                  <TableCell>{formatDate(post.createdAt)}</TableCell>
                  <TableCell>{formatDate(post.deadline)}</TableCell>
                  <TableCell>{post.position}</TableCell>
                  <TableCell>{post.workplace}</TableCell>

                    <TableCell>
                      <IconButton size="small">
                        <CreateOutlinedIcon sx={{ color: '#dec22c' }} />
                      </IconButton>
                      <IconButton size="small" color="error">
                        <DeleteOutlineOutlinedIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default JobPost;