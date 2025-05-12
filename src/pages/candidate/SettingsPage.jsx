// src/pages/candidate/SettingsPage.jsx
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

// Import MUI components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack'; // Dùng Stack cho form đổi mật khẩu
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';

// Import Icons
import LockResetIcon from '@mui/icons-material/LockReset';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function CandidateSettingsPage() {
  const { authState } = useAuth(); // Lấy authState nếu cần user ID cho API sau này

  // State cho form đổi mật khẩu
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  // State cho loading và message
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Handler cho input change
  const handlePasswordChange = (event) => {
    const { name, value } = event.target;
    setPasswords(prev => ({ ...prev, [name]: value }));
    // Xóa lỗi/thành công khi người dùng bắt đầu gõ lại
    setError(null);
    setSuccessMessage(null);
  };

  // Handlers cho ẩn/hiện password
  const toggleShowCurrentPassword = () => setShowCurrentPassword(show => !show);
  const toggleShowNewPassword = () => setShowNewPassword(show => !show);
  const toggleShowConfirmNewPassword = () => setShowConfirmNewPassword(show => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  // Handler submit đổi mật khẩu
  const handleChangePasswordSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccessMessage(null);

    // --- Validation cơ bản ---
    if (!passwords.currentPassword || !passwords.newPassword || !passwords.confirmNewPassword) {
      setError("Vui lòng nhập đầy đủ các mật khẩu.");
      return;
    }
    if (passwords.newPassword !== passwords.confirmNewPassword) {
      setError("Mật khẩu mới và xác nhận mật khẩu không khớp.");
      return;
    }
    if (passwords.newPassword.length < 6) {
      setError("Mật khẩu mới phải có ít nhất 6 ký tự.");
      return;
    }
    if (passwords.newPassword === passwords.currentPassword) {
         setError("Mật khẩu mới không được trùng với mật khẩu hiện tại.");
        return;
    }

    setLoading(true);

    // --- Gọi API đổi mật khẩu (Placeholder) ---
    console.log("Attempting to change password (mock):", {
      // Không log currentPassword ra console vì lý do bảo mật
      newPasswordLength: passwords.newPassword.length, // Chỉ log độ dài ví dụ
      userId: authState.user?.id
    });
    // API thật: await api.changePassword(authState.user.id, passwords.currentPassword, passwords.newPassword);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Giả lập độ trễ

    // Giả lập kết quả
    const success = true; // Giả sử thành công (có thể đổi thành false để test lỗi)
    // const mockApiError = "Mật khẩu hiện tại không đúng."; // Ví dụ lỗi từ API

    if (success) {
      setSuccessMessage("Đổi mật khẩu thành công!");
      setSnackbarOpen(true);
      // Xóa các trường mật khẩu sau khi thành công
      setPasswords({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
    } else {
      // setError(mockApiError || "Đã xảy ra lỗi khi đổi mật khẩu.");
       setError("Đã xảy ra lỗi khi đổi mật khẩu (demo).");
    }

    setLoading(false);
  };

   // Đóng Snackbar
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
    setSuccessMessage(null); // Xóa message khi snackbar đóng
  };


  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Cài đặt tài khoản
      </Typography>

      {/* --- Phần Đổi mật khẩu --- */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          <LockResetIcon sx={{ verticalAlign: 'middle', mr: 1 }}/> Bảo mật
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle1" gutterBottom>Đổi mật khẩu</Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {/* Hiển thị success message bằng Snackbar thay vì Alert ở đây */}
        {/* {successMessage && <Alert severity="success" sx={{ mb: 2 }}>{successMessage}</Alert>} */}

        <Box component="form" onSubmit={handleChangePasswordSubmit}>
          <Stack spacing={2}>
            <TextField
              required
              fullWidth
              name="currentPassword"
              label="Mật khẩu hiện tại"
              type={showCurrentPassword ? 'text' : 'password'}
              id="currentPassword"
              value={passwords.currentPassword}
              onChange={handlePasswordChange}
              disabled={loading}
              variant="outlined"
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={toggleShowCurrentPassword} onMouseDown={handleMouseDownPassword} edge="end">
                      {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
             <TextField
              required
              fullWidth
              name="newPassword"
              label="Mật khẩu mới"
              type={showNewPassword ? 'text' : 'password'}
              id="newPassword"
              value={passwords.newPassword}
              onChange={handlePasswordChange}
              disabled={loading}
              variant="outlined"
              size="small"
               helperText="Ít nhất 6 ký tự"
               InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={toggleShowNewPassword} onMouseDown={handleMouseDownPassword} edge="end">
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
             <TextField
              required
              fullWidth
              name="confirmNewPassword"
              label="Xác nhận mật khẩu mới"
              type={showConfirmNewPassword ? 'text' : 'password'}
              id="confirmNewPassword"
              value={passwords.confirmNewPassword}
              onChange={handlePasswordChange}
              disabled={loading}
              variant="outlined"
              size="small"
              error={passwords.newPassword !== passwords.confirmNewPassword && passwords.confirmNewPassword !== ''}
              helperText={
                  passwords.newPassword !== passwords.confirmNewPassword && passwords.confirmNewPassword !== ''
                  ? "Mật khẩu không khớp" : ""
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={toggleShowConfirmNewPassword} onMouseDown={handleMouseDownPassword} edge="end">
                      {showConfirmNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Box sx={{ textAlign: 'right' }}> {/* Căn phải nút bấm */}
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
              >
                Đổi mật khẩu
              </Button>
            </Box>
          </Stack>
        </Box>
      </Paper>

      {/* --- Phần Tùy chọn thông báo (Placeholder) --- */}
       <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
           <NotificationsIcon sx={{ verticalAlign: 'middle', mr: 1 }}/> Thông báo
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body2" color="text.secondary">
           (Chức năng cài đặt thông báo qua email/sms sẽ được phát triển sau)
        </Typography>
        {/* Thêm các FormControlLabel với Switch/Checkbox ở đây sau */}
      </Paper>

      {/* --- Phần Xóa tài khoản (Placeholder) --- */}
       <Paper sx={{ p: 3, mb: 3, backgroundColor: '#fff0f0' /* Màu nền cảnh báo */ }}>
        <Typography variant="h6" gutterBottom color="error">
           <DeleteForeverIcon sx={{ verticalAlign: 'middle', mr: 1 }}/> Xóa tài khoản
        </Typography>
        <Divider sx={{ my: 2 }} />
         <Typography variant="body2" sx={{ mb: 2 }}>
           Hành động này không thể hoàn tác. Tất cả dữ liệu hồ sơ và lịch sử ứng tuyển của bạn sẽ bị xóa vĩnh viễn.
        </Typography>
        <Button variant="contained" color="error" disabled> {/* Disable nút tạm thời */}
            Yêu cầu xóa tài khoản
        </Button>
      </Paper>

       {/* Snackbar để hiển thị thông báo thành công/lỗi ngắn */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        message={successMessage || error} // Hiển thị success hoặc error message (nếu có lỗi thì error state đã được set)
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        // Tùy chỉnh màu nền dựa trên success/error
        ContentProps={{
            sx: {
                backgroundColor: successMessage ? 'success.main' : 'error.main',
            },
        }}
      />

    </Box>
  );
}

export default CandidateSettingsPage;