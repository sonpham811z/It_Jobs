// src/pages/candidate/SchedulePage.jsx
import Grid from '@mui/material/Grid'; 
import CircularProgress from '@mui/material/CircularProgress';
import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { fetchScheduleEvents, confirmSchedule, declineSchedule } from '../../data/mockSchedule';

// Import MUI components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack'; // Dùng Stack để xếp các lịch hẹn theo chiều dọc
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link'; // MUI Link
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip'; // Thêm Tooltip

// Import Icons
import EventIcon from '@mui/icons-material/Event'; // Lịch hẹn chung
import InterviewIcon from '@mui/icons-material/People'; // Phỏng vấn
import TestIcon from '@mui/icons-material/Quiz'; // Bài test
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LinkIcon from '@mui/icons-material/Link';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Đã xác nhận/Hoàn thành
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'; // Chờ xác nhận
import CancelIcon from '@mui/icons-material/Cancel'; // Đã hủy
import NotesIcon from '@mui/icons-material/Notes'; // Ghi chú

// Helper để format ngày giờ
const formatDateTime = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) + ' - ' +
           date.toLocaleDateString('vi-VN', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' });
}

// Helper lấy icon và màu cho status
const getStatusInfo = (status) => {
     switch (status?.toLowerCase()) {
        case 'đã xác nhận': return { icon: <CheckCircleIcon fontSize="small" color="success"/>, color: 'success' };
        case 'chờ xác nhận': return { icon: <HelpOutlineIcon fontSize="small" color="warning"/>, color: 'warning' };
        case 'đã từ chối': return { icon: <CancelIcon fontSize="small" />, color: 'error' };
        case 'đã hủy': return { icon: <CancelIcon fontSize="small" color="error"/>, color: 'error' };
        case 'đã hoàn thành': return { icon: <CheckCircleIcon fontSize="small" color="disabled"/>, color: 'default' }; // Màu xám
        default: return { icon: <EventIcon fontSize="small"/>, color: 'default' };
    }
}

function CandidateSchedulePage() {
  const { authState } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [confirmingId, setConfirmingId] = useState(null); // State để biết đang xác nhận event nào
  const [decliningId, setDecliningId] = useState(null);
  const loadEvents = async () => {
    if (!authState.user?.id) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchScheduleEvents(authState.user.id);
      setEvents(data);
    } catch (err) {
      console.error("Lỗi khi tải lịch hẹn:", err);
      setError("Không thể tải lịch hẹn.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, [authState.user?.id]);

  // Xử lý xác nhận lịch hẹn
  const handleConfirm = async (eventId) => {
      if (!authState.user?.id) return;
      setConfirmingId(eventId); // Đánh dấu đang xử lý
      try {
          const success = await confirmSchedule(authState.user.id, eventId);
          if (success) {
              setSnackbarMessage('Đã xác nhận lịch hẹn thành công!');
              // Cập nhật lại state để thay đổi status trên UI ngay lập tức
              setEvents(prevEvents => prevEvents.map(e =>
                  e.eventId === eventId ? { ...e, status: 'Đã xác nhận' } : e
              ));
          } else {
              setSnackbarMessage('Lỗi! Không thể xác nhận lịch hẹn.');
          }
      } catch (err) {
          console.error("Lỗi khi xác nhận:", err);
          setSnackbarMessage('Lỗi! Không thể xác nhận lịch hẹn.');
      } finally {
          setSnackbarOpen(true);
          setConfirmingId(null); // Hoàn thành xử lý
      }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };
  // --- THÊM HÀM NÀY ---
  const handleDecline = async (eventId) => {
    if (!authState.user?.id) return;
    setDecliningId(eventId); // Đánh dấu đang xử lý
    setSnackbarMessage(''); // Xóa thông báo cũ
    try {
        const success = await declineSchedule(authState.user.id, eventId);
        if (success) {
            setSnackbarMessage('Đã từ chối lịch hẹn.');
            // Cập nhật lại state để thay đổi status trên UI ngay lập tức
            setEvents(prevEvents => prevEvents.map(e =>
                e.eventId === eventId ? { ...e, status: 'Đã từ chối' } : e
            ));
        } else {
            setSnackbarMessage('Lỗi! Không thể từ chối lịch hẹn.');
        }
    } catch (err) {
        console.error("Lỗi khi từ chối:", err);
        setSnackbarMessage('Lỗi! Không thể từ chối lịch hẹn.');
    } finally {
        setSnackbarOpen(true);
        setDecliningId(null); // Hoàn thành xử lý
    }
};
// --- KẾT THÚC THÊM HÀM ---
  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Lịch hẹn sắp tới
      </Typography>

      {loading && <LoadingSpinner />}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {!loading && !error && (
        <Stack spacing={2}> {/* Dùng Stack để xếp các Paper theo chiều dọc */}
          {events.length > 0 ? (
            events.map((event) => {
              const statusInfo = getStatusInfo(event.status);
              const isConfirmable = event.status?.toLowerCase() === 'chờ xác nhận';
              return (
                <Paper key={event.eventId} sx={{ p: 2 }} elevation={2}>
                  <Grid container spacing={1} alignItems="center" justifyContent="space-between">
                    {/* Icon Type */}
                    <Grid item xs={1}>
                       <Tooltip title={event.type}>
                            {event.type === 'Phỏng vấn' ? <InterviewIcon color="primary"/> : <TestIcon color="secondary"/>}
                       </Tooltip>
                    </Grid>
                    {/* Info */}
                    <Grid item xs={11} sm={7} md={8}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                        {event.type}: {event.jobTitle}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Tại: {event.companyName}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5, color: 'text.secondary' }}>
                          <AccessTimeIcon sx={{ fontSize: '1rem', mr: 0.5 }}/>
                          <Typography variant="body2">{formatDateTime(event.dateTime)}</Typography>
                          {event.durationMinutes && <Typography variant="body2" sx={{ml:0.5}}>({event.durationMinutes} phút)</Typography>}
                      </Box>
                       <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5, color: 'text.secondary' }}>
                          {event.location === 'Online' ? <LinkIcon sx={{ fontSize: '1rem', mr: 0.5 }}/> : <LocationOnIcon sx={{ fontSize: '1rem', mr: 0.5 }}/>}
                          {event.link ? (
                               <Link href={event.link} target="_blank" rel="noopener noreferrer" variant="body2">{event.location} - Nhấn để tham gia</Link>
                          ) : (
                                <Typography variant="body2">{event.location}</Typography>
                          )}
                      </Box>
                       {event.notes && (
                           <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5, color: 'text.secondary' }}>
                               <NotesIcon sx={{ fontSize: '1rem', mr: 0.5 }}/>
                               <Typography variant="caption">Ghi chú: {event.notes}</Typography>
                           </Box>
                       )}
                    </Grid>
                     {/* Status & Actions */}
                    <Grid item xs="auto" sx={{ ml: 'auto', textAlign: { xs: 'left', sm: 'right' }, mt:{xs:1, sm:0} }}>
                        <Chip
                            icon={statusInfo.icon}
                            label={event.status}
                            color={statusInfo.color}
                            size="small"
                            sx={{ mb: 1 }}
                        />
                        {isConfirmable && (
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ width: '100%'}}>
                            {/* Nút Xác nhận */}
                            <Button
                                size="small"
                                variant="contained"
                                color="success"
                                onClick={() => handleConfirm(event.eventId)}
                                disabled={confirmingId === event.eventId || decliningId === event.eventId}
                                startIcon={confirmingId === event.eventId ? <CircularProgress size={16} color="inherit"/> : <CheckCircleIcon />}
                                fullWidth
                            >
                                Xác nhận
                            </Button>
                            {/* Nút Từ chối */}
                            <Button
                              size="small"
                              variant="outlined" // Kiểu outlined cho khác biệt
                              color="error"
                              onClick={() => handleDecline(event.eventId)} // Gọi hàm handleDecline
                              disabled={confirmingId === event.eventId || decliningId === event.eventId} // Disable khi đang xử lý nút khác
                              startIcon={decliningId === event.eventId ? <CircularProgress size={16} color="inherit"/> : <CancelIcon />} // Icon và loading
                              fullWidth // Luôn rộng hết
                          >
                              Từ chối
                          </Button>
                        </Stack>
                    )}
                        {/* Thêm các nút khác nếu cần: Hủy lịch, Xem chi tiết job... */}
                         {/* <Button size="small" variant='text' component={RouterLink} to={`/jobs/${event.jobId}`} sx={{mt: isConfirmable ? 1:0}}>Xem Job</Button> */}
                    </Grid>
                  </Grid>
                </Paper>
              )
           })
          ) : (
            <Typography sx={{ textAlign: 'center', mt: 4 }}>
              Bạn không có lịch hẹn nào sắp tới.
            </Typography>
          )}
        </Stack>
      )}

       <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  );
}

export default CandidateSchedulePage;