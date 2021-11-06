import React from "react";
import './FaceRecognition.css'

// this box is an array of objects; objects that contain faces and their coordinates
// STAR MARK THIS WHOLE BLOODY FUNCTION
const FaceRecognition = ({box, imageUrl}) => {
	
	// each div is a face.
	let array_of_divs = [];
	// console.log(box.length);
	for(let i=0; i<box.length; i++)
	{
		array_of_divs.push(
		<div
		key={i}
		className="bounding-box"
		style={{
		  top: box[i].topRow,
		  right: box[i].rightCol,
		  bottom: box[i].bottomRow,
		  left: box[i].leftCol
		}}
	   />);
	}

	// console.log(array_of_divs);
	return (
		<div className='center ma'>
			<div className='absolute mt2'>
            	<img id="inputimage" alt='' src={imageUrl} width='450px' height='auto'/>
				<div>
					{array_of_divs}
				</div>
			</div>
        </div>
	);
}

export default FaceRecognition;