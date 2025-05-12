import React, { useState } from 'react';
import {
  Box, Modal, Typography, TextField, Button, MenuItem, Select,
  InputLabel, FormControl, Chip, OutlinedInput, Grid, ListSubheader
  ,FormControlLabel, Checkbox, Autocomplete, TextareaAutosize
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { toast } from 'react-toastify';
import { createNewJobsAPI } from '~/apis';
import { useSelector } from 'react-redux';
import { selectCurrentEmployer } from '~/redux/employer/employerSlice';
import { getJobByIdAPI } from '~/apis';
import { useDispatch } from 'react-redux';
import { addJobs } from '~/redux/job/jobSlice';
import RichTextEditor from '~/components/RichTextEditor/RichTextEditor';



const skillOptions = [
  'C++',
  'Node.js',
  'JavaScript',
  'TypeScript',
  'Python',
  'Java',
  'C#',
  'Go',
  'Ruby',
  'PHP',
  'Kotlin',
  'Swift',
  'React',
  'Vue.js',
  'Angular',
  'Next.js',
  'NestJS',
  'Django',
  'Flask',
  'Spring Boot',
  'Express.js',
  '.NET',
  'SQL',
  'Oracle',
  'MongoDB',
  'PostgreSQL',
  'Firebase',
  'Docker',
  'Kubernetes',
  'AWS',
  'Azure',
  'GCP',
  'Linux',
  'Git',
  'CI/CD',
  'DevOps',
  'Cloud',
  'AI/ML',
  'Unity',
  'English'
];


const CreateJobModal = ({ open, onClose }) => {
  const defaultForm = {
    title: '',
    position: '',
    workplace: '',
    jobType: '',
    salary: { min: '', max: '' },
    deadline: '',
    jobDescription: '',
    jobRequirement: '',
    benefits: '',
    locations: [],
    skills: [],
    acceptFresher: false
  };

  const [form, setForm] = useState(defaultForm);
  const dispatch = useDispatch();


  const currentEmployer = useSelector(selectCurrentEmployer)

  const handleChange = (field, value) => {
    if (field.startsWith('salary.')) {
      const subField = field.split('.')[1];
      setForm((prev) => ({
        ...prev,
        salary: { ...prev.salary, [subField]: value },
      }));
    } else {
      setForm((prev) => ({ ...prev, [field]: value }));
    }
  };

  const [skillMenuOpen, setSkillMenuOpen] = useState(false);

  const handleSkillsChange = (event) => {
    const { value } = event.target;
    const newValue = typeof value === 'string' ? value.split(',') : value;

    if (newValue.length <= 3) {
      setForm((prev) => ({
        ...prev,
        skills: newValue,
      }));

      if (newValue.length === 3) {
        setSkillMenuOpen(false)
      }
    }
  };

  const isFormValid = () => {
    // Kiểm tra tất cả các trường quan trọng đã được điền, trừ trường 'acceptFresher'
    return form.title && form.position && form.workplace && form.jobType && form.salary.min && form.salary.max &&
           form.deadline && form.jobDescription && form.jobRequirement && form.benefits && form.locations.length > 0;
  };


  const handleSubmit = async () => {
    if(!isFormValid())
    {
      toast.error('Vui lòng điền đủ thông tin công việc')
      return
    }
    const  jobData = {
      ...form,
      employerId : currentEmployer._id
    }
    console.log(jobData);
    try {
      const response = await createNewJobsAPI(jobData)
      const insertedId = response.insertedId

      const newJob = await getJobByIdAPI(insertedId)
      dispatch(addJobs(newJob))
      console.log('Response:', response);
      setForm(defaultForm)

      onClose();

    }catch (error) {
      toast.error(error)
    }


   
  };

  return (
    <Modal open={open} aria-labelledby="modal-title">
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        maxHeight: '90vh',
        overflowY: 'auto',
        bgcolor: 'white',
        boxShadow: 24,
        borderRadius: 2,
        p: 3,
      }}>
        <Box sx={{ position: 'absolute', top: 10, right: 10, cursor: 'pointer' }}>
          <CancelIcon color="error" onClick={onClose} />
        </Box>

        <Typography variant="h6" mb={2}>Tạo tin tuyển dụng mới</Typography>

        <TextField label="Tiêu đề" fullWidth margin="normal" value={form.title}
          onChange={(e) => handleChange('title', e.target.value)} />

<Grid container spacing={2} mt={1}>
  <Grid item xs={6}>
    <FormControl fullWidth>
      <InputLabel id="position-label">Vị trí công việc</InputLabel>
      <Select
        labelId="position-label"
        id="position-select"
        value={form.position}
        label="Vị trí công việc"
        onChange={(e) => handleChange('position', e.target.value)}
      >
        <ListSubheader>Phát triển phần mềm</ListSubheader>
        <MenuItem value="Frontend Developer">Frontend Developer</MenuItem>
        <MenuItem value="Backend Developer">Backend Developer</MenuItem>
        <MenuItem value="Fullstack Developer">Fullstack Developer</MenuItem>
        <MenuItem value="Mobile Developer">Mobile Developer</MenuItem>
        <MenuItem value="Game Developer">Game Developer</MenuItem>

        <ListSubheader>Hạ tầng & DevOps</ListSubheader>
        <MenuItem value="DevOps Engineer">DevOps Engineer</MenuItem>
        <MenuItem value="System Administrator">System Administrator</MenuItem>
        <MenuItem value="Cloud Engineer">Cloud Engineer</MenuItem>

        <ListSubheader>Dữ liệu & Trí tuệ nhân tạo</ListSubheader>
        <MenuItem value="Data Engineer">Data Engineer</MenuItem>
        <MenuItem value="Data Scientist">Data Scientist</MenuItem>
        <MenuItem value="AI Engineer">AI Engineer</MenuItem>
        <MenuItem value="Machine Learning Engineer">Machine Learning Engineer</MenuItem>

        <ListSubheader>Kiểm thử & An toàn</ListSubheader>
        <MenuItem value="QA/QC Engineer">QA/QC Engineer</MenuItem>
        <MenuItem value="Automation Tester">Automation Tester</MenuItem>
        <MenuItem value="Security Engineer">Security Engineer</MenuItem>

        <ListSubheader>Khác</ListSubheader>
        <MenuItem value="Project Manager">Project Manager</MenuItem>
        <MenuItem value="Business Analyst">Business Analyst</MenuItem>
        <MenuItem value="UI/UX Designer">UI/UX Designer</MenuItem>
        <MenuItem value="Product Owner">Product Owner</MenuItem>
      </Select>
    </FormControl>
  </Grid>

  {/* Thêm trường deadline vào đây */}
  <Grid item xs={6}>
    <TextField
      label="Hạn nộp hồ sơ"
      type="date"
      fullWidth
      value={form.deadline}
      onChange={(e) => handleChange('deadline', e.target.value)}
      InputLabelProps={{
        shrink: true,
      }}
    />
  </Grid>
</Grid>


        {/* Nơi làm việc & Loại công việc cùng hàng */}
        <Grid container spacing={2} mt={1}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Nơi làm việc</InputLabel>
              <Select value={form.workplace} label="Nơi làm việc"
                onChange={(e) => handleChange('workplace', e.target.value)}>
                <MenuItem value="remote">Remote</MenuItem>
                <MenuItem value="at-office">At Office</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Loại công việc</InputLabel>
              <Select value={form.jobType} label="Loại công việc"
                onChange={(e) => handleChange('jobType', e.target.value)}>
                <MenuItem value="full-time">Full-time</MenuItem>
                <MenuItem value="part-time">Part-time</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Lương min & max cùng hàng */}
        <Grid container spacing={2} mt={1}>
          <Grid item xs={6}>
            <TextField label="Lương tối thiểu" type="number" fullWidth
              value={form.salary.min} onChange={(e) => handleChange('salary.min', e.target.value)} />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Lương tối đa" type="number" fullWidth
              value={form.salary.max} onChange={(e) => handleChange('salary.max', e.target.value)} />
          </Grid>
        </Grid>

        <Grid container spacing={2} mt={1}>
          <Grid item xs={12}>
            <RichTextEditor
              label="Mô tả công việc"
              value={form.jobDescription}
              onChange={(value) => handleChange('jobDescription', value)}
            />
          </Grid>
          <Grid item xs={12}>
            <RichTextEditor
              label="Yêu cầu công việc"
              value={form.jobRequirement}
              onChange={(value) => handleChange('jobRequirement', value)}
            />
          </Grid>
          <Grid item xs={12}>
            <RichTextEditor
              label="Quyền lợi"
              value={form.benefits}
              onChange={(value) => handleChange('benefits', value)}
            />
          </Grid>
        </Grid>

          <Autocomplete
            multiple
            freeSolo
            options={[]} // Không cần gợi ý có sẵn
            value={form.locations}
            onChange={(event, newValue) => handleChange('locations', newValue)}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip variant="outlined" label={option} {...getTagProps({ index })} />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Địa điểm làm việc"
                placeholder="Nhập và nhấn Enter"
                margin="normal"
                fullWidth
              />
            )}
          />
        <FormControl fullWidth margin="normal">
          <InputLabel>Kỹ năng</InputLabel>
          <Select
            multiple
            open={skillMenuOpen}
            onOpen={() => setSkillMenuOpen(true)}
            onClose={() => setSkillMenuOpen(false)}
            value={form.skills}
            onChange={handleSkillsChange}
            input={<OutlinedInput label="Kỹ năng" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 300,
                  width: 250,
                },
              },
            }}
          >
            {skillOptions.map((skill) => (
              <MenuItem key={skill} value={skill} disabled={form.skills.length === 3 && !form.skills.includes(skill)}>
                {skill}
              </MenuItem>
            ))}
          </Select>

        </FormControl>

        <FormControlLabel
          control={
            <Checkbox
              checked={form.acceptFresher}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  acceptFresher: e.target.checked,
                }))
              }
            />
          }
          label="Chấp nhận Fresher"
        />

        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Tạo tin
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateJobModal;

