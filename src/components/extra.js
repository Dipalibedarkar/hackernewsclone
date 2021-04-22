import React, { useState } from 'react';
import './footer.css';
import useStyles from './AboutUs'
import Link from "react-router-dom";
import Navbar from "react-bootstrap";


function Footer() {
    const [about, setAbout] = useState(false)
    console.log(about)

    const changeAbout = () => {
        setAbout(!about)
    }

    
        
        {/*{about ? <div><p>This is our About Section :)</p></div> : <div><p>This is our Normal Content</p></div>}
            <div class="footer" >
                <button onClick={changeAbout} to='/AboutUs'>About Us</button>     
            </div>
            */}
        </>
    )
}
        