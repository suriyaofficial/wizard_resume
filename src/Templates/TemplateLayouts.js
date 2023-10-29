import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.jpg'
import temp1 from '../assets/temp1.JPG'
import temp2 from '../assets/temp2.JPG'


import './TemplateLayouts.css'
import Preview from '../components/Preview';
import GeneratePDF from '../components/GeneratePDF';

function TempleteLayout() {
    return (
        <div id="image">

            <p className='imgThumb'>
                <img className='temp' src={temp1} alt="" />
                <Link to="temp1">
                    <span><button >Get Templete</button></span>


                </Link>
            </p>


            <p className='imgThumb'>
                <img className='temp' src={temp2} alt="" />
                <Link to="temp2">
                    <span><button >Get Templete</button></span>
                </Link>
            </p>

            <p className='imgThumb'>
                <img className='temp' src={logo} alt="" />
                <Link to="temp3">
                    <span><button >under developing</button></span>
                </Link>
            </p>
            <p className='imgThumb'>
                <img className='temp' src={logo} alt="" />
                <Link to="temp4">
                    <span><button >under developing</button></span>
                </Link>
            </p>
        </div>

    )

}

export default TempleteLayout
