// src/pages/candidate/AppliedJobsPage.jsx
import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Để lấy candidateId (nếu cần)
import { fetchAppliedJobs } from '../../data/mockJobs'; // Import hàm fetch giả lập

// Import MUI components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link'; // MUI Link
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import Alert from '@mui/material/Alert';

// Hàm helper để lấy màu cho Chip trạng thái
const getStatusChipColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'mời phỏng vấn':
    case 'mời làm bài test':
    case 'trúng tuyển':
      return 'success';
    case 'đang xét duyệt':
      return 'warning';
    case 'từ chối':
      return 'error';
    case 'đã nộp':
    default:
      return 'info';
  }
};

function AppliedJobsPage() {
  const { authState } = useAuth();
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAppliedJobs = async () => {
      if (!authState.user?.id) return; // Cần user id để fetch đúng

      setLoading(true);
      setError(null);
      try {
        const data = await fetchAppliedJobs(authState.user.id); // Truyền ID ứng viên
        setAppliedJobs(data);
      } catch (err) {
        console.error("Lỗi khi tải danh sách việc làm đã ứng tuyển:", err);
        setError("Không thể tải danh sách việc làm đã ứng tuyển.");
      } finally {
        setLoading(false);
      }
    };

    loadAppliedJobs();
  }, [authState.user?.id]); // Fetch lại nếu user id thay đổi (thường không cần thiết sau login)

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Việc làm đã ứng tuyển
      </Typography>

      {loading && <LoadingSpinner />}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {!loading && !error && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="Applied jobs table">
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}> {/* Thêm màu nền cho header */}
              <TableRow>
                <TableCell>Chức danh</TableCell>
                <TableCell>Công ty</TableCell>
                <TableCell align="center">Ngày ứng tuyển</TableCell>
                <TableCell align="center">Trạng thái</TableCell>
                {/* <TableCell align="right">Hành động</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {appliedJobs.length > 0 ? (
                appliedJobs.map((app) => (
                  <TableRow
                    key={app.applicationId}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {/* Link đến trang chi tiết việc làm */}
                      <Link component={RouterLink} to={`/jobs/${app.jobId}`} underline="hover">
                        {app.jobTitle}
                      </Link>
                    </TableCell>
                    <TableCell>{app.companyName}</TableCell>
                    <TableCell align="center">
                      {new Date(app.dateApplied).toLocaleDateString('vi-VN')}
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={app.status}
                        color={getStatusChipColor(app.status)} // Dùng hàm helper để lấy màu
                        size="small"
                      />
                    </TableCell>
                    {/* <TableCell align="right"> */}
                      {/* Có thể thêm nút xem chi tiết đơn ứng tuyển sau */}
                      {/* <Button size="small" variant="outlined">Chi tiết</Button> */}
                    {/* </TableCell> */}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center"> {/* colSpan bằng số lượng cột */}
                    Bạn chưa ứng tuyển vào vị trí nào.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

export default AppliedJobsPage;