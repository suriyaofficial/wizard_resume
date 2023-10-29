import React from "react";
import "./Aboutus.css";
import Navlogo from "../assets/Navlogo copy.jpg";
import Grid from "@mui/material/Grid";


function Aboutus() {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} md={12}>
        <div className="about">
          <div>
            <h1>Resume Builder Website</h1>
            <Grid item xs={12} md={12}>
              <img width="25%" src={Navlogo} alt="" />
            </Grid>
            <p>
              A web application using which you can create your professional work
              resume in a few minutes.{" "}
            </p>
            <p>
              We will provide you form to enter to details ,after all the details just give submit .{" "}
            </p>
            <p>
              Then go to Templetes tab We will provide you with a set of templates to choose click to open and which one is like for you from and {" "}
            </p>
            <p>Then click 'Download PDF ' </p>
            <p>Its redirect to payment popup after completion of your payment  </p>

            <p>
              Tada!!💐 Your resume is created and ready to be downloaded as a pdf
              file.
            </p>
            <h1>Developed by</h1>
            <h3>Web3 Wizards</h3>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}

export default Aboutus;
