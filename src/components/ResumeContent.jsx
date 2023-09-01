import * as React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
// import "./Templete.css";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import { useDispatch, useSelector } from "react-redux";
import { db } from "./firebaseconfig";
import { app } from "./firebaseconfig";
import { getDoc } from "firebase/firestore";

import { collection, setDoc, doc } from "firebase/firestore";

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

export default function VerticalTabs() {
  useEffect(() => {
    getResumeData();
  });
  const [value, setValue] = React.useState(0);
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    objective: "",
  });

  const dispatch = useDispatch();
  //   let navigate = useNavigate();

  const next = () => {
    setValue(value + 1);
  };
  const back = () => {
    setValue(value - 1);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handelOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handelSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(
        "🚀 ~ file: ResumeContent.jsx:78 ~ handelSubmit ~ formData:",
        formData
      );
      dispatch({ type: "Templete1data", payload: formData });
      let id = localStorage.getItem("email");
      const usersCollectionRef = collection(db, "resume");

      const userDocRef = doc(usersCollectionRef, id); // Replace 'userId' with your desired ID
      await setDoc(userDocRef, formData);
    } catch (error) {
      console.error(
        "🚀 ~ file: ResumeContent.jsx:97 ~ handelSubmit ~ error:",
        error
      );
    }
  };
  const getResumeData = async () => {
    let id = localStorage.getItem("email");
    console.log("🚀 ~ file: Log.jsx:26 ~ getResumeData ~ email:", id);
    try {
      if (id) {
        const docRef = doc(db, "resume", id);
        const docSnap = await getDoc(docRef);
        let resumeData = docSnap.data();
        console.log(
          "🚀 ~ file: Login.jsx:33 ~ getResumeData ~ resumeData:",
          resumeData
        );
        if (resumeData) {
          dispatch({ type: "Templete1data", payload: resumeData });
        } else {
          console.error("nodata");
        }
      }
    } catch (error) {
      console.error("🚀 ~ file: Log.jsx:44 ~ getResumeData ~ error:", error);
    }
  };

  return (
    <>
      <form onSubmit={handelSubmit}>
        <Grid container spacing={0}>
          <Grid item xs={4} md={2}>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              sx={{ borderRight: 1, borderColor: "divider" }}
            >
              <Tab
                className="tab-label"
                label="Personal Info"
                {...a11yProps(0)}
              />
              <Tab
                className="tab-label"
                label="Work Experience"
                {...a11yProps(1)}
              />
              <Tab className="tab-label" label="Education" {...a11yProps(2)} />
              <Tab className="tab-label" label="Skills" {...a11yProps(3)} />
            </Tabs>
          </Grid>

          <Grid item xs={8} md={10}>
            <TabPanel value={value} index={0}>
              <Grid container spacing={1}>
                <Grid item xs={6} md={3}>
                  <input
                    placeholder="firstname"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handelOnChange}
                  />
                </Grid>

                <Grid item xs={6} md={3}>
                  <input
                    placeholder="lastname"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handelOnChange}
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  <input
                    placeholder="email"
                    name="email"
                    value={formData.email}
                    onChange={handelOnChange}
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  <input
                    placeholder="phonenumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handelOnChange}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <input
                    fullWidth
                    placeholder="address"
                    name="address"
                    value={formData.address}
                    onChange={handelOnChange}
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  <input
                    placeholder="city"
                    name="city"
                    value={formData.city}
                    onChange={handelOnChange}
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  <input
                    placeholder="state"
                    name="state"
                    value={formData.state}
                    onChange={handelOnChange}
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  <input
                    placeholder="pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handelOnChange}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <input
                    placeholder="objective"
                    name="objective"
                    value={formData.objective}
                    onChange={handelOnChange}
                  />
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
              <Grid container spacing={1}>
                <Grid item xs={6} md={3}>
                  <input placeholder="job title" />
                </Grid>
                <Grid item xs={6} md={3}>
                  <input placeholder="organisation name" />
                </Grid>
                <Grid item xs={6} md={3}>
                  <input placeholder="start date" />
                </Grid>
                <Grid item xs={6} md={3}>
                  <input placeholder="end date" />
                </Grid>
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
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <h1> Education</h1>

              <Divider variant="middle" />
              <Grid container spacing={1}>
                <Grid item xs={12} md={12}>
                  <input placeholder="title" />
                </Grid>
                <Grid item xs={6} md={3}>
                  <input placeholder="university" />
                </Grid>
                <Grid item xs={6} md={3}>
                  <input placeholder="Degree" />
                </Grid>
                <Grid item xs={6} md={3}>
                  <input placeholder="start date" />
                </Grid>
                <Grid item xs={6} md={3}>
                  <input placeholder="end date" />
                </Grid>
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
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={3}>
              <h1> Skills</h1>

              <Divider variant="middle" />
              <Grid container spacing={1}>
                <Grid item xs={6} md={3}>
                  <input placeholder="Skill 1" />
                </Grid>
                <Grid item xs={6} md={3}>
                  <input placeholder="Skill 2" />
                </Grid>
                <Grid item xs={6} md={3}>
                  <input placeholder="Skill 3" />
                </Grid>
                <Grid item xs={6} md={3}>
                  <input placeholder="Skill 4" />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Stack spacing={1} direction="row">
                    <Button variant="outlined" onClick={next}>
                      back
                    </Button>
                    {/* <Button type="submit" id="submit"
                    placeholder="submit" variant="contained" onClick={handleSubmit}>submit</Button> */}
                    {/* <Link to="temp1Pv"> */}
                    <input type="submit" />
                    {/* </Link> */}
                  </Stack>
                </Grid>
              </Grid>
            </TabPanel>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
