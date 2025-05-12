// src/pages/candidate/DashboardPage.jsx
import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { fetchAppliedJobs, fetchJobs } from '../../data/mockJobs'; // Fetch applied và jobs (cho gợi ý)
import { fetchScheduleEvents } from '../../data/mockSchedule'; // Fetch lịch hẹn

// Import MUI components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress'; // Thanh tiến trình
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon'; // Thêm icon cho list
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link'; // MUI Link
import Chip from '@mui/material/Chip'; // Dùng lại Chip trạng thái
import LoadingSpinner from '../../components/ui/LoadingSpinner'; // Spinner chung
import Alert from '@mui/material/Alert';

// Import Icons
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import LightbulbIcon from '@mui/icons-material/Lightbulb'; // Icon gợi ý
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EventIcon from '@mui/icons-material/Event'; // Icon lịch hẹn
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Các icon status
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CancelIcon from '@mui/icons-material/Cancel';


// Hàm helper lấy màu chip (có thể import nếu đã tách ra file riêng)
const getStatusChipColor = (status) => { /* ... như cũ ... */
    switch (status?.toLowerCase()) {
        case 'mời phỏng vấn': case 'mời làm bài test': case 'trúng tuyển': return 'success';
        case 'đang xét duyệt': return 'warning';
        case 'từ chối': return 'error';
        case 'đã nộp': default: return 'info';
    }
};
// Hàm helper lấy icon status (có thể import nếu đã tách ra file riêng)
const getStatusInfo = (status) => { /* ... như cũ ... */
     switch (status?.toLowerCase()) {
        case 'đã xác nhận': return { icon: <CheckCircleIcon fontSize="small" color="success"/>, color: 'success' };
        case 'chờ xác nhận': return { icon: <HelpOutlineIcon fontSize="small" color="warning"/>, color: 'warning' };
        case 'đã hủy': return { icon: <CancelIcon fontSize="small" color="error"/>, color: 'error' };
        case 'đã hoàn thành': return { icon: <CheckCircleIcon fontSize="small" color="disabled"/>, color: 'default' };
        default: return { icon: <EventIcon fontSize="small"/>, color: 'default' };
    }
};
// Hàm format ngày giờ (có thể import)
const formatDateTimeSimple = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) + ', ' +
           date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

// Hàm tính % hoàn thiện hồ sơ (giả lập)
const calculateProfileCompletion = (user) => {
    let score = 0;
    const totalFields = 10; // Giả sử có 10 trường quan trọng để tính
    if (user?.fullName) score++;
    if (user?.email) score++; // Email thường luôn có
    if (user?.phone) score++;
    if (user?.address) score++;
    if (user?.dateOfBirth) score++;
    if (user?.summary) score++;
    if (user?.education?.length > 0) score++;
    if (user?.experience?.length > 0) score++;
    if (user?.skills?.length > 0) score++;
    if (user?.uploadedCVs?.length > 0) score++;
    return Math.round((score / totalFields) * 100);
};


function CandidateDashboardPage() {
  const { authState } = useAuth();
  const navigate = useNavigate();
  const user = authState.user;

  // State cho các widget
  const [recentApps, setRecentApps] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [suggestedJobs, setSuggestedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const profileCompletion = user ? calculateProfileCompletion(user) : 0;

  useEffect(() => {
    const loadDashboardData = async () => {
      if (!user?.id) {
          setLoading(false);
          setError("Không tìm thấy thông tin người dùng.");
          return;
      };
      setLoading(true);
      setError(null);
      try {
        // Gọi các API giả lập song song
        const [appliedData, scheduleData, jobsData] = await Promise.all([
          fetchAppliedJobs(user.id),
          fetchScheduleEvents(user.id),
          fetchJobs() // Lấy tất cả jobs để giả lập gợi ý
        ]);

        // Lấy 3 ứng tuyển gần nhất
        setRecentApps(appliedData.slice(0, 3));
        // Lấy 2 lịch hẹn gần nhất
        setUpcomingEvents(scheduleData.slice(0, 2));
        // Lấy 3 job đầu tiên làm gợi ý (logic gợi ý thật sẽ phức tạp hơn)
        setSuggestedJobs(jobsData.slice(0, 3));

      } catch (err) {
        console.error("Lỗi khi tải dữ liệu dashboard:", err);
        setError("Không thể tải dữ liệu cho bảng điều khiển.");
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [user?.id]); // Dependency là userId

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
     return <Alert severity="error">{error}</Alert>;
  }

  if (!user) {
     return <Alert severity="warning">Vui lòng đăng nhập lại.</Alert>;
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Chào mừng trở lại, {user.fullName}!
      </Typography>
      <Typography variant="body1" gutterBottom sx={{ mb: 3 }}>
        {/* --- Widget Profile Completeness --- */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
               <AccountBoxIcon color="primary" sx={{ mr: 1 }}/>
               <Typography variant="h6">Tiến độ hồ sơ</Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body2" gutterBottom>
              Hồ sơ của bạn đã hoàn thiện {profileCompletion}%. Cập nhật đầy đủ thông tin sẽ giúp nhà tuyển dụng chú ý hơn!
            </Typography>
            <Box sx={{ width: '100%', mr: 1, mb: 1 }}>
              <LinearProgress variant="determinate" value={profileCompletion} />
            </Box>
             {/* Thêm Box để đẩy nút xuống dưới nếu dùng height: 100% */}
             <Box sx={{ mt: 'auto', pt: 1, textAlign:'right' }}>
                <Button
                    variant="contained"
                    size="small"
                    component={RouterLink}
                    to="/candidate/profile"
                >
                    Cập nhật hồ sơ
                </Button>
            </Box>
          </Paper>
        </Grid>

        {/* --- Widget Lịch hẹn sắp tới --- */}
        <Grid item xs={12} md={6}>
           <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
             <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
               <EventAvailableIcon color="primary" sx={{ mr: 1 }}/>
               <Typography variant="h6">Lịch hẹn sắp tới</Typography>
             </Box>
             <Divider sx={{ mb: 1 }} />
             {upcomingEvents.length > 0 ? (
                <List dense disablePadding>
                    {upcomingEvents.map(event => (
                        <ListItem disableGutters key={event.eventId} sx={{display: 'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
                            <ListItemText
                                primary={`${event.type}: ${event.jobTitle} (${event.companyName})`}
                                secondary={formatDateTimeSimple(event.dateTime)}
                            />
                            <Chip
                                icon={getStatusInfo(event.status).icon}
                                label={event.status}
                                color={getStatusInfo(event.status).color}
                                size="small"
                                sx={{ml: 1, mt: 0.5, flexShrink: 0}}
                             />
                        </ListItem>
                    ))}
                </List>
             ) : (
                 <Typography variant="body2" color="text.secondary" sx={{mt: 2, textAlign: 'center'}}>Không có lịch hẹn nào sắp tới.</Typography>
             )}
             <Box sx={{ mt: 'auto', pt: 1, textAlign:'right' }}>
                 <Button size="small" component={RouterLink} to="/candidate/schedule" endIcon={<ArrowForwardIcon/>}>Xem tất cả</Button>
             </Box>
           </Paper>
        </Grid>

        {/* --- Widget Việc làm đã ứng tuyển gần đây --- */}
        <Grid item xs={12} md={6}>
           <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
             <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <WorkHistoryIcon color="primary" sx={{ mr: 1 }}/>
                <Typography variant="h6">Ứng tuyển gần đây</Typography>
             </Box>
             <Divider sx={{ mb: 1 }}/>
              {recentApps.length > 0 ? (
                <List dense disablePadding>
                    {recentApps.map(app => (
                         <ListItem disableGutters key={app.applicationId} sx={{display: 'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
                            <ListItemText
                                primary={<Link component={RouterLink} to={`/jobs/${app.jobId}`} underline="hover">{app.jobTitle}</Link>}
                                secondary={app.companyName}
                            />
                             <Chip
                                label={app.status}
                                color={getStatusChipColor(app.status)}
                                size="small"
                                sx={{ml: 1, mt: 0.5, flexShrink: 0}}
                             />
                        </ListItem>
                    ))}
                </List>
             ) : (
                 <Typography variant="body2" color="text.secondary" sx={{mt: 2, textAlign: 'center'}}>Bạn chưa ứng tuyển việc làm nào gần đây.</Typography>
             )}
             <Box sx={{ mt: 'auto', pt: 1, textAlign:'right' }}>
                 <Button size="small" component={RouterLink} to="/candidate/applications" endIcon={<ArrowForwardIcon/>}>Xem tất cả</Button>
             </Box>
           </Paper>
        </Grid>

         {/* --- Widget Việc làm gợi ý --- */}
        <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
             <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <LightbulbIcon color="primary" sx={{ mr: 1 }}/>
                <Typography variant="h6">Việc làm gợi ý</Typography>
             </Box>
             <Divider sx={{ mb: 1 }}/>
              {suggestedJobs.length > 0 ? (
                 <List dense disablePadding>
                    {suggestedJobs.map(job => (
                         <ListItem disableGutters key={job.id}>
                            <ListItemText
                                primary={<Link component={RouterLink} to={`/jobs/${job.id}`} underline="hover">{job.title}</Link>}
                                secondary={`${job.companyName} - ${job.location}`}
                            />
                            {/* Có thể thêm nút Lưu nhanh */}
                             <Button size="small" variant="text" sx={{ml: 1, flexShrink: 0}}>Lưu</Button>
                        </ListItem>
                    ))}
                </List>
             ) : (
                 <Typography variant="body2" color="text.secondary" sx={{mt: 2, textAlign: 'center'}}>Chưa có việc làm gợi ý phù hợp.</Typography>
             )}
             <Box sx={{ mt: 'auto', pt: 1, textAlign:'right' }}>
                 <Button size="small" component={RouterLink} to="/jobs" endIcon={<ArrowForwardIcon/>}>Tìm thêm việc</Button>
             </Box>
           </Paper>
        </Grid>
      </Typography>
    </Box>
  );
}

export default CandidateDashboardPage;