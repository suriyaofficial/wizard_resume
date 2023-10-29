import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import Button from '@mui/material/Button';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from "@mui/material/Typography";
import logo from '../assets/images.png'

const GeneratePDF = ({ content }) => {
    const componentRef = useRef();
    let option = {
        key: "rzp_test_vTISQYSv8QEh2r",
        key_secret: "eSPRHlBNYiYjuFYbt4IvCJvb",
        amount: 100 * 100,
        currency: "INR",
        name: "payment",
        description: "testing",
        handler: (response) => {
            if (response.razorpay_payment_id) {
                handlePrint()
            }
        }, prefill: {
            name: "name",
            email: "Email@gmail.com",
            contact: "+917092925555"
        }, notes: {
            address: "wizard resume & co"
        }, theme: {
            color: "#3399cc"
        }
    }
    const pay = () => {
        try {
            let pay = new window.Razorpay(option)
            pay.open()
        } catch (error) {
            console.error("🚀 ~ file: GeneratePDF.js:40 ~ pay ~ error:", error)
        }
    }
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div>
            <Card sx={{ margin: 1, maxWidth: 350 }}>
                <CardMedia
                    component="img"
                    alt="payment gateway logo"
                    image={logo}
                    sx={{ width: 350, height: 200 }}
                />
                <CardContent>
                    <Typography gutterBottom variant="h4" textTransform='uppercase' fontWeight='bold' component="div">
                        PAYMENT
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        you need to complete payment to Download PDF
                    </Typography>
                </CardContent>
                <CardActions>
                    {/* <Button size="small" onClick={getStart}>EDIT data</Button> */}
                    <Button size="large" variant="contained" startIcon={<FileDownloadIcon />} onClick={pay}>Download PDF</Button>
                    <div style={{ display: 'none' }}>
                        <content ref={componentRef}>
                            {content}
                        </content>
                    </div>
                    {/* <Button size="small">Learn More</Button> */}
                </CardActions>
            </Card>
        </div>
    );
};

export default GeneratePDF;
