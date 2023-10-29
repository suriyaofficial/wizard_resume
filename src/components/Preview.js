import React, { useEffect } from 'react'
import "../components/preview.css"
import { db } from "./firebaseconfig";
import { getDoc, doc } from "firebase/firestore";
import GeneratePDF from './GeneratePDF';
import Grid from "@mui/material/Grid";
import { Watermark } from 'antd';



function Preview() {
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
    useEffect(() => {
        data();
    }, []);
    const data = async () => {

        let id = localStorage.getItem("email");
        console.log("🚀 ~ file: Home.js:100 ~ getResumeData ~ id:", id)
        try {
            if (id) {
                const docRef = doc(db, "resume", id);
                const docSnap = await getDoc(docRef);
                let resumeData = docSnap.data();
                console.log("🚀 ~ file: Home.js:123 ~ getResumeDat pa ~ resumeData:", resumeData)
                if (Object.keys(resumeData).length > 1) {
                    setFormData(resumeData);
                } else (
                    alert("no data--please save your details ")
                )
            }
        } catch (error) {
            console.error("🚀 ~ file: Log.jsx:44 ~ getResumeData ~ error:", error);
        }
    }


    return (<>
        <Grid container spacing={0} direction="row" justifyContent="center" alignItems="center">
            <Grid item xs={12} md={6}>
                <div id='all'>
                    <Watermark zIndex={9} content={['WIZARD RESUME BUILDER', `copy right`]}                    >
                        <div id="page">
                            <div className="left">
                                <h1 className="name">
                                    {formData.firstName} {formData.lastName}
                                </h1>
                                <h3 className="objective">career Objective</h3>
                                <p className="objective-des">{formData.objective}</p>
                                <h5 className=" uc section">expreience</h5>
                                {formData.jobHistory?.map((job, index) => (
                                    <>
                                        <div className="p-2">
                                            <h3>{job?.orgName}</h3>
                                            <p><b>
                                                worked as a {job?.jobTitle}</b>
                                            </p>
                                        </div>
                                        <div>
                                            <p>{job?.startDate} -
                                                {job?.endDate}</p>
                                        </div>
                                        <hr></hr>
                                    </>
                                ))}
                                <h5 className=" uc section">education</h5>
                                {formData.educationHistory?.map((edu, index) => (
                                    <>
                                        <p>
                                            completed <b>{edu?.eduTitle} </b>
                                            {edu?.degree} in <b>{edu?.universityName}</b>
                                        </p>

                                        <hr></hr>
                                    </>
                                ))}


                            </div>
                            <div className="right">
                                <img className='ppimg' width={200} height={200} src={formData.url}></img>
                                <h5 className=" uc section">personal info</h5>
                                <div className='iconn'>
                                    <span class="material-symbols-outlined symbol">
                                        call
                                    </span>
                                    <p>phone No: {formData.phoneNumber}</p>
                                </div>
                                <div className='iconn'>
                                    <span class="material-symbols-outlined symbol">
                                        mail
                                    </span>
                                    <p>Email: {formData.email}</p>
                                </div>
                                <div className='iconn'>
                                    <span className="material-symbols-outlined symbol">
                                        home
                                    </span>
                                    <p>address: {formData.address}<p>city: {formData.city}</p>
                                        <p>state: {formData.state}</p>
                                        <p>pincode: {formData.pincode}</p>
                                    </p>
                                </div>

                                <h5 className=" uc section">skills</h5>
                                <ul>
                                    {formData.skills?.map((skill, index) => (
                                        <li>{skill?.skill}</li>
                                    ))}
                                </ul>

                            </div>
                        </div>
                    </Watermark>
                </div>
            </Grid>


            <Grid item xs={6} md={6}>

                <GeneratePDF content={<div id='all'>
                    <div id="page">
                        <div className="left">
                            <h1 className="name">
                                {formData.firstName} {formData.lastName}
                            </h1>
                            <h3 className="objective">career Objective</h3>
                            <p className="objective-des">{formData.objective}</p>
                            <h5 className=" uc section">expreience</h5>
                            {formData.jobHistory?.map((job, index) => (
                                <>
                                    <div className="p-2">
                                        <h3>{job?.orgName}</h3>
                                        <p><b>
                                            worked as a {job?.jobTitle}</b>
                                        </p>
                                    </div>
                                    <div>
                                        <p>{job?.startDate} -
                                            {job?.endDate}</p>
                                    </div>
                                    <hr></hr>
                                </>
                            ))}
                            <h5 className=" uc section">education</h5>
                            {formData.educationHistory?.map((edu, index) => (
                                <>
                                    <p>
                                        completed <b>{edu?.eduTitle} </b>
                                        {edu?.degree} in <b>{edu?.universityName}</b>
                                    </p>

                                    <hr></hr>
                                </>
                            ))}

                        </div>
                        <div className="right">
                            <img className='ppimg' width={200} height={200} src={formData.url}></img>
                            <h5 className=" uc section">personal info</h5>
                            <div className='iconn'>
                                <span class="material-symbols-outlined symbol">
                                    call
                                </span>
                                <p>phone No: {formData.phoneNumber}</p>
                            </div>
                            <div className='iconn'>
                                <span class="material-symbols-outlined symbol">
                                    mail
                                </span>
                                <p>Email: {formData.email}</p>
                            </div>
                            <div className='iconn'>
                                <span className="material-symbols-outlined symbol">
                                    home
                                </span>
                                <p>address: {formData.address}<p>city: {formData.city}</p>
                                    <p>state: {formData.state}</p>
                                    <p>pincode: {formData.pincode}</p>
                                </p>
                            </div>

                            <h5 className=" uc section">skills</h5>
                            <ul>
                                {formData.skills?.map((skill, index) => (
                                    <li>{skill?.skill}</li>
                                ))}
                            </ul>

                        </div>
                    </div>
                </div>} />
            </Grid>
        </Grid>

    </>
    );
}

export default Preview;