import React, { useEffect, useState } from "react";
import { db, storage } from "./firebaseconfig";
import { getDownloadURL, ref } from "firebase/storage";
import Avatar from '@mui/material/Avatar';
import { getDoc, doc } from "firebase/firestore";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { uploadBytes } from "firebase/storage";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { notification } from 'antd'
import logo from '../assets/logoo.png'
import { collection, setDoc } from "firebase/firestore";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}
function Home() {
  useEffect(() => {
    getResumeData();
  }, []);
  const [start, setStart] = useState(false);
  const [value, setValue] = React.useState(0);
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, msg, des, placement) => {
    try {
      api[type]({
        message: msg,
        description: des,
        placement
      });
    } catch (error) {
      console.log("🚀 ~ file: Home.js:90 ~ openNotificationWithIcon ~ error:", error)

    }
  };
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    let id = localStorage.getItem("email");

    if (file) {
      const storageRef = ref(storage, `profileImages/${id}/dp`);
      try {
        await uploadBytes(storageRef, file);
        console.log("🚀 ~ file: Home.js:101 ~ handleImageUpload ~ storageRef:", storageRef)
        console.log("Image uploaded successfully!");
        const link = await getDownloadURL(storageRef);
        console.log("🚀 ~ file: Home.js:105 ~ handleImageUpload ~ link:", link)
        setFormData({ ...formData, url: link });
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const [formData, setFormData] = React.useState({
    url: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    objective: "",
    jobHistory: [
      { jobTitle: "", orgName: "", startDate: "", endDate: "" }
    ],
    educationHistory: [
      { eduTitle: "", universityName: "", degree: "", startDate: "", endDate: "" }
    ], skills: [
      { skill: "" }]
  });

  const handleAddJob = () => {
    const lastJob = formData.jobHistory[formData.jobHistory.length - 1];
    if (
      lastJob.jobTitle !== "" &&
      lastJob.orgName !== "" &&
      lastJob.startDate !== "" &&
      lastJob.endDate !== ""
    ) {
      setFormData({
        ...formData,
        jobHistory: [
          ...formData.jobHistory,
          { jobTitle: "", orgName: "", startDate: "", endDate: "" }
        ]
      });
    } else {
      openNotificationWithIcon('warning', 'FILL THE REQUIRED FIELD', 'Please fill in the previous job details before adding a new one.', 'bottomRight')
    }
  };
  const handleJobChange = (index, field, value) => {
    const updatedJobHistory = [...formData.jobHistory];
    updatedJobHistory[index][field] = value;
    setFormData({ ...formData, jobHistory: updatedJobHistory });
  };
  const handleDeleteJob = (index) => {
    if (formData.jobHistory.length > 1) {
      const updatedJobHistory = [...formData.jobHistory];
      updatedJobHistory.splice(index, 1);
      setFormData({ ...formData, jobHistory: updatedJobHistory });
    } else {
      openNotificationWithIcon('error', 'Error', 'You Cant Delete ', 'bottomRight')
    }
  };


  const handleAddEdu = () => {
    const lastEdu = formData.educationHistory[formData.educationHistory.length - 1];

    if (
      lastEdu.eduTitle !== "" &&
      lastEdu.universityName !== "" &&
      lastEdu.degree !== "" &&
      lastEdu.startDate !== "" &&
      lastEdu.endDate !== ""
    ) {
      setFormData({
        ...formData,
        educationHistory: [
          ...formData.educationHistory,
          { eduTitle: "", universityName: "", degree: "", startDate: "", endDate: "" }
        ]
      });
    } else {
      openNotificationWithIcon('warning', 'FILL THE REQUIRED FIELD', 'Please fill in the previous education details before adding a new one.', 'bottomRight')

    }
  };
  const handleEduChange = (index, field, value) => {
    const updatedEduHistory = [...formData.educationHistory];
    updatedEduHistory[index][field] = value;
    setFormData({ ...formData, educationHistory: updatedEduHistory });
  };
  const handleDeleteEdu = (index) => {
    if (formData.educationHistory.length > 1) {

      const updatedEduHistory = [...formData.educationHistory];
      updatedEduHistory.splice(index, 1);
      setFormData({ ...formData, educationHistory: updatedEduHistory });
    } else {
      openNotificationWithIcon('error', 'Error', 'You Cant Delete ', 'bottomRight')
    }
  };
  const handleAddSkill = () => {
    const lastSkill = formData.skills[formData.skills.length - 1];
    if (lastSkill.skill !== "") {
      setFormData({
        ...formData,
        skills: [...formData.skills, { skill: "" }]
      });
    } else {
      openNotificationWithIcon('warning', 'FILL THE REQUIRED FIELD', 'Please fill in the previous skill before adding a new one.', 'bottomRight')

      // alert("Please fill in the previous skill before adding a new one.");
    }
  };
  const handleSkillChange = (index, field, value) => {
    const updatedSkill = [...formData.skills];
    updatedSkill[index][field] = value;
    setFormData({ ...formData, skills: updatedSkill });
  };
  const handleDeleteSkill = (index) => {
    if (formData.skills.length > 1) {

      const updatedSkill = [...formData.skills];
      updatedSkill.splice(index, 1);
      setFormData({ ...formData, skills: updatedSkill });
    } else {
      openNotificationWithIcon('error', 'Error', 'You Cant Delete ', 'bottomRight')
    }
  };


  const next = () => {
    setValue(value + 1);
  };
  const back = () => {
    setValue(value - 1);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    // Check if any of the required fields are empty
    const requiredFields = ["firstName", "lastName", "email", "phoneNumber", "address", "city", "state", "pincode", "objective"];

    // Check if any of the job fields are empty
    const jobFields = formData.jobHistory.some((job) => {
      return job.jobTitle === "" || job.orgName === "" || job.startDate === "" || job.endDate === "";
    });

    // Check if any of the education fields are empty
    const eduFields = formData.educationHistory.some((edu) => {
      return edu.eduTitle === "" || edu.universityName === "" || edu.degree === "" || edu.startDate === "" || edu.endDate === "";
    });

    // Check if any of the skill fields are empty
    const skillFields = formData.skills.some((skill) => skill.skill === "");

    let isFormValid = true;

    // Check required fields
    // for (const field of requiredFields) {
    //   if (!formData[field]) {
    //     isFormValid = false;
    //     break; // Stop checking if one required field is empty
    //   }
    // }

    // Check job, education, and skill fields
    if (jobFields || eduFields || skillFields) {
      isFormValid = false;
    }

    if (!isFormValid) {
      openNotificationWithIcon('error', 'FILL THE REQUIRED FIELD', 'Please check all the text field is not to be blank', 'bottomRight')
      return;
    }
    try {
      console.log("🚀 ~ file: Home.js:88 ~ handelSubmit ~ formData:", formData)
      let id = localStorage.getItem("email");
      const usersCollectionRef = collection(db, "resume");
      const userDocRef = doc(usersCollectionRef, id); // Replace 'userId' with your desired ID
      let result = await setDoc(userDocRef, formData);
      openNotificationWithIcon('success', 'SUCCESS', 'Your Data is Submitted successfully.', 'bottomRight')
      setStart(false)

    } catch (error) {
      console.error(
        "🚀 ~ file: ResumeContent.jsx:97 ~ handelSubmit ~ error:",
        error
      );
    }
  };

  const getResumeData = async () => {
    let id = localStorage.getItem("email");
    console.log("🚀 ~ file: Home.js:100 ~ getResumeData ~ id:", id)
    try {
      if (id) {
        const docRef = doc(db, "resume", id);
        const docSnap = await getDoc(docRef);
        let resumeData = docSnap.data();
        console.log("🚀 ~ file: Home.js:322 ~ getResumeData ~ resumeData:", resumeData)
        if (Object.keys(resumeData).length > 1) {
          setFormData(resumeData);
        }
      } else {
      }
    } catch (error) {
      console.error("🚀 ~ file: Log.jsx:44 ~ getResumeData ~ error:", error);
    }
  };
  const getStart = async () => {
    setStart(true)
  };

  const handelOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <>
      {start ? (
        <>
          <form onSubmit={handelSubmit}>
            <Grid container spacing={0}>
              {contextHolder}
              <Grid item xs={4} md={2}>
                <Tabs orientation="vertical" variant="scrollable" value={value} onChange={handleChange} aria-label="Vertical tabs example" sx={{ borderRight: 1, borderColor: "divider" }}                >
                  <Tab className="tab-label" label="Personal Info"{...a11yProps(0)} />
                  <Tab className="tab-label" label="Work Experience"{...a11yProps(1)} />
                  <Tab className="tab-label" label="Education" {...a11yProps(2)} />
                  <Tab className="tab-label" label="Skills" {...a11yProps(3)} />
                </Tabs>
              </Grid>

              <Grid item xs={8} md={10}>
                <TabPanel value={value} index={0}>
                  <Grid item xs={4} md={1}>
                    <Stack direction="row" spacing={2}>
                      <Avatar src={formData.url} sx={{ width: 250, height: 250 }} />
                    </Stack>
                  </Grid>
                  <Grid item xs={8} md={11}>
                    <Stack direction="row" spacing={2}>
                      <Button variant="contained" component="label" onChange={handleImageUpload}>
                        Upload
                        <input hidden accept="image/*" multiple type="file" />
                      </Button>
                    </Stack>
                  </Grid>
                  <Grid container spacing={1}>
                    <Grid item xs={6} md={3}>
                      <TextField required label="firstname" name="firstName" value={formData?.firstName} onChange={handelOnChange} />
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <TextField required label="lastname" name="lastName" value={formData?.lastName} onChange={handelOnChange} />
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <TextField label="email" name="email" value={formData?.email} onChange={handelOnChange} />
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <TextField label="phonenumber" name="phoneNumber" value={formData?.phoneNumber} onChange={handelOnChange} />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField fullWidth label="address" name="address" value={formData?.address} onChange={handelOnChange} />
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <TextField label="city" name="city" value={formData?.city} onChange={handelOnChange} />
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <TextField label="state" name="state" value={formData?.state} onChange={handelOnChange} />
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <TextField label="pincode" name="pincode" value={formData?.pincode} onChange={handelOnChange} />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <TextField rows={4} fullWidth multiline label="objective" name="objective" value={formData?.objective} onChange={handelOnChange} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Stack spacing={1} direction="row">
                        <Button variant="contained" onClick={next}>
                          next
                        </Button>
                      </Stack>
                    </Grid>
                  </Grid>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <h1> Work Experience</h1>
                  <h4>Experience 1</h4>
                  <Divider variant="middle" />
                  <br />
                  {formData.jobHistory?.map((job, index) => (
                    <>
                      <Grid container spacing={1}>
                        <Grid item xs={6} md={3}>
                          <TextField label="job title" name="jobTitle" value={job?.jobTitle} onChange={(e) => handleJobChange(index, "jobTitle", e.target.value)} />
                        </Grid>
                        <Grid item xs={6} md={3}>
                          <TextField label="org Name" name="orgName" value={job?.orgName} onChange={(e) => handleJobChange(index, "orgName", e.target.value)} />
                        </Grid>
                        <Grid item xs={6} md={3}>
                          <TextField label="Start Date" name="startDate" value={job?.startDate} onChange={(e) => handleJobChange(index, "startDate", e.target.value)} />
                        </Grid>
                        <Grid item xs={6} md={3}>
                          <TextField label=" END Date" name="endDate" value={job?.endDate} onChange={(e) => handleJobChange(index, "endDate", e.target.value)} />
                          <IconButton onClick={() => handleDeleteJob(index)} aria-label="delete" size="large">
                            <DeleteIcon fontSize="inherit" />
                          </IconButton>
                        </Grid>
                      </Grid>
                      <br />
                      <Divider variant="middle" />
                      <br />
                    </>
                  ))}
                  <Button variant="outlined" onClick={handleAddJob}>Add New</Button>
                  <Grid item xs={12} md={4}>
                    <Stack spacing={1} direction="row">
                      <Button variant="outlined" onClick={back}>
                        back
                      </Button>
                      <Button variant="contained" onClick={next}>
                        next
                      </Button>
                    </Stack>
                  </Grid>
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <h1> Education</h1>

                  <Divider variant="middle" />
                  <br />
                  {formData.educationHistory?.map((edu, index) => (
                    <>
                      <Grid container spacing={1}>
                        <Grid item xs={12} md={12}>
                          <TextField label="Edu title" name="eduTitle" value={edu?.eduTitle} onChange={(e) => handleEduChange(index, "eduTitle", e.target.value)} />
                        </Grid>
                        <Grid item xs={6} md={3}>
                          <TextField label="University Name" name="universityName" value={edu?.universityName} onChange={(e) => handleEduChange(index, "universityName", e.target.value)} />
                        </Grid>
                        <Grid item xs={6} md={3}>
                          <TextField label="Degree" name="degree" value={edu?.degree} onChange={(e) => handleEduChange(index, "degree", e.target.value)} />
                        </Grid>
                        <Grid item xs={6} md={3}>
                          <TextField label="Start Date" name="startDate" value={edu?.startDate} onChange={(e) => handleEduChange(index, "startDate", e.target.value)} />
                        </Grid>
                        <Grid item xs={6} md={3}>
                          <TextField label=" END Date" name="endDate" value={edu?.endDate} onChange={(e) => handleEduChange(index, "endDate", e.target.value)} />
                          <IconButton onClick={() => handleDeleteEdu(index)} aria-label="delete" size="large">
                            <DeleteIcon fontSize="inherit" />
                          </IconButton>

                        </Grid>

                      </Grid>
                      <br />
                      <Divider variant="middle" />
                      <br />
                    </>
                  ))}
                  <Button variant="outlined" onClick={handleAddEdu}>Add New</Button>

                  <Grid item xs={12} md={4}>
                    <Stack spacing={1} direction="row">
                      <Button variant="outlined" onClick={back}>
                        back
                      </Button>
                      <Button variant="contained" onClick={next}>
                        next
                      </Button>
                    </Stack>
                  </Grid>
                </TabPanel>
                <TabPanel value={value} index={3}>
                  <h1> Skills</h1>
                  <Divider variant="middle" />
                  <br />
                  <Grid container spacing={1}>
                    {formData.skills?.map((skill, index) => (
                      <>
                        <Grid item xs={6} md={3}>
                          <TextField label="Skill" name="skill" value={skill?.skill} onChange={(e) => handleSkillChange(index, "skill", e.target.value)} />
                          <IconButton onClick={() => handleDeleteSkill(index)} aria-label="delete" size="large">
                            <DeleteIcon fontSize="inherit" />
                          </IconButton>
                        </Grid>
                      </>
                    ))}
                    <br />
                    <Divider variant="middle" />
                    <Button variant="outlined" onClick={handleAddSkill}>Add New</Button>
                    <br />
                    <br />
                    <Grid item xs={12} >
                      <Stack spacing={1} direction="row">
                        <Button variant="outlined" onClick={back}>back</Button>
                        <Button onClick={() => setStart(false)} variant="contained" >Home</Button>
                        <Button variant="contained" type="submit" endIcon={<SendIcon />}>Submit</Button>
                      </Stack>
                    </Grid>
                  </Grid>
                </TabPanel>
              </Grid>
            </Grid>
          </form >
        </>
      ) : (
        <>
          {formData.firstName ? (<>
            <Grid container spacing={0} direction="row" justifyContent="center" alignItems="center" >
              {contextHolder}
              <Grid item >
                {contextHolder}
                <Card sx={{ margin: 10, maxWidth: 400 }}>
                  <CardMedia component="img" alt="green iguana" image={formData.url} sx={{ width: 400, height: 450 }} />
                  <CardContent>
                    <Typography gutterBottom variant="h4" textTransform='uppercase' fontWeight='bold' component="div">
                      {formData.firstName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {formData.objective}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={getStart}>EDIT data</Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </>
          ) : (
            <>
              <Grid container spacing={0} className="home" direction="row"
                justifyContent="center"
                alignItems="center">
                {contextHolder}

                <Grid item xs={6} md={6}>
                  <img width="100%" src={logo} />
                </Grid>
                <Grid item xs={6} md={3}>
                  <Card sx={{ margin: 2 }}>
                    <CardContent>
                      <Typography gutterBottom variant="h1" textTransform='uppercase' fontWeight='bold' component="div">
                        HI!
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Create Your Resume In Less Than A Minute
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button variant="contained" size="large" onClick={getStart}>get started </Button>
                    </CardActions>
                  </Card>
                </Grid>
              </Grid>
            </>)
          }
        </>
      )
      }
    </>
  );
}

export default Home;
