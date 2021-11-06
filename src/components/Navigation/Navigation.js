import React from 'react';
import './Navigation.css'

// SIGN OUT GUY
const Navigation = ({resetImageUrl, onRouteChange, isSignedIn}) => {

	function onSignOut(){
		resetImageUrl();
		// second argument is for isSignedIn
		onRouteChange('signin', false);
	}

	if(isSignedIn)
	{
		return (
			<nav className='custom' style = {{display: "flex", justifyContent: "flex-end"}}>
				<p onClick={onSignOut}
				className= 'para f4 link dim black underline pointer'> Sign Out </p>
			</nav>
		);
	}
	else
	{
		return (
				<nav className='custom' style = {{display: "flex", justifyContent: "flex-end"}}>
					<p onClick={() => onRouteChange('signin', false)} className= 'para f4 link dim black underline pointer'> Sign In </p>
					<p onClick={() => onRouteChange('register', false)} className= 'para f4 link dim black underline pointer'> Register </p>
				</nav>
		);
	}
}

export default Navigation;