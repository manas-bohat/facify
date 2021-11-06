import React from 'react'
import './Rank.css'

const Rank = (props) => {
	return (
		<div className="container">
            <div className='f4'>
                {`${props.name}, your current entry count is ...`}
            </div>
            <div className='f2 center'>
                {props.entries}
            </div>
		</div>
	);
}

export default Rank;