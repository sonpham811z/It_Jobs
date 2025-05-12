// src/pages/candidate/SavedJobsPage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { fetchSavedJobs, unsaveJob } from '../../data/mockJobs'; // Import hàm fetch và unsave
import JobCard from '../../components/jobs/JobCard'; // Import JobCard

// Import MUI components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar'; // Để hiển thị thông báo nhỏ

function SavedJobsPage() {
  const { authState } = useAuth();
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State cho thông báo nhỏ
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Nội dung thông báo

  const loadSavedJobs = async () => { // Tách hàm load ra riêng
    if (!authState.user?.id) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchSavedJobs(authState.user.id);
      setSavedJobs(data);
    } catch (err) {
      console.error("Lỗi khi tải danh sách việc làm đã lưu:", err);
      setError("Không thể tải danh sách việc làm đã lưu.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSavedJobs();
  }, [authState.user?.id]);

  // Hàm xử lý khi bấm nút "Bỏ lưu" trên JobCard
  const handleUnsaveJob = async (jobId) => {
     if (!authState.user?.id) return;
     console.log("Attempting to unsave job:", jobId);
     // Gọi hàm unsave giả lập
     try {
        const success = await unsaveJob(authState.user.id, jobId);
        if (success) {
            // Tải lại danh sách sau khi bỏ lưu thành công
            // loadSavedJobs();
            // Hoặc cập nhật state trực tiếp để nhanh hơn
            setSavedJobs(prevJobs => prevJobs.filter(job => job.id !== jobId));
            setSnackbarMessage('Đã bỏ lưu việc làm thành công!');
            setSnackbarOpen(true);
        } else {
             setSnackbarMessage('Lỗi! Không thể bỏ lưu việc làm.');
             setSnackbarOpen(true);
        }
     } catch(err) {
         console.error("Lỗi khi bỏ lưu:", err);
         setSnackbarMessage('Lỗi! Không thể bỏ lưu việc làm.');
         setSnackbarOpen(true);
     }
  };

  // Đóng Snackbar
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Việc làm đã lưu
      </Typography>

      {loading && <LoadingSpinner />}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {!loading && !error && (
        <Grid container spacing={2}>
          {savedJobs.length > 0 ? (
            savedJobs.map((job) => (
              <Grid item xs={12} sm={6} md={4} key={job.id}>
                {/* Truyền hàm handleUnsaveJob vào prop onUnsave */}
                <JobCard job={job} onUnsave={handleUnsaveJob} />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}> {/* Đặt Typography trong Grid item */}
              <Typography sx={{ textAlign: 'center', mt: 4 }}>
                Bạn chưa lưu việc làm nào.
              </Typography>
            </Grid>
          )}
        </Grid>
      )}

      {/* Snackbar để hiển thị thông báo ngắn */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000} // Tự động ẩn sau 3 giây
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} // Vị trí
      />
    </Box>
  );
}

export default SavedJobsPage;