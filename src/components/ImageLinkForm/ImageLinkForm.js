import React from 'react';
// import { ParticlesOptions } from 'tsparticles/Options/Classes/Particles/ParticlesOptions';
import './ImageLinkForm.css'

const ImageLinkForm = (props) => {
	return (
		<div className="target w-100">
            <p className = 'f5 center'> {'Facify will detect faces in your pictures. Give it a try.'}</p>
            <div className='mine br3 shadow-5 center'>
                <input onChange= {props.onInputChange} onKeyPress={props.onEnter} className='w-70 f5 pa2' type='text'/>
                <button onClick={props.onSubmit} className='w-30 grow f5 link pv2 dib white bg-light-purple'> Detect </button>
            </div>
		</div>
	);
}

export default ImageLinkForm;