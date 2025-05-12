import { Box, Typography } from "@mui/material";
import ReactQuill from 'react-quill'; // Import ReactQuill
import 'react-quill/dist/quill.snow.css'; // Import CSS của Quill

const RichTextEditor = ({ label, value, onChange }) => {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="body1" sx={{ mb: 1, fontWeight: 'medium' }}>
        {label}
      </Typography>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        style={{
          backgroundColor: '#fff',
          borderRadius: '4px',
          border: '1px solid rgba(252, 7, 7, 0.5)',
          '&:hover': {
            borderColor: 'rgba(0, 0, 0, 0.87)',
          },
        }}
        modules={{
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ align: [] }],
            ['clean'],
          ],
        }}
      />
    </Box>
  );
};
export default RichTextEditor