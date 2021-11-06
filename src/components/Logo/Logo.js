import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css'
// import brain from './brain.png'
import facify from './facify.png'

const Logo = () => {
	return (
		<div className="ib">
            <Tilt className="Tilt br3 shadow-2" options={{ max : 55 }} style={{ height: 125, width: 125 }} >
                <div className="Tilt-inner"> 
                    <img src={facify} alt="logo" /> 
                </div>
            </Tilt>
		</div>
	);
}

export default Logo;