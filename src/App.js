import React from 'react'
import './App.css';
// import Clarifai from 'clarifai'
import Navigation from './components/Navigation/Navigation.js'
import Logo from './components/Logo/Logo.js'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank.js'
import Signin from './components/Signin/Signin.js'
import Register from './components/Register/Register.js'
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js'
// import ParticleBackground from './ParticleBackground';

// const app = new Clarifai.App({
//   apiKey: '64d073fe8eb74a5ebe1a0bae97b65db0'
// })

window.onbeforeunload = function(e) {
  console.log("I was called");
  return "Dialog text";
};

// this box is an array of objects; objects that contain faces and their coordinates
class App extends React.Component {

  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: [],
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  // get information from the server located at port 3000 of our machine
  // check to see if it's working
  // componentDidMount() {
  //   fetch('http://localhost:3000/').then(response => response.json())
  //   .then(console.log);
  // }

// array: in that, region info and bounding box

  loadUser = (data) => {
    this.setState({user : {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    });
  }

  resetImageUrl = () => {
    this.setState({box: []})
    this.setState({imageUrl: ''})
  }

  calculateFaceLocation = (data) => {
    // console.log(data);
    const array = data.outputs[0].data.regions;
    let clarifaiFaces = [];
    for(let i=0; i<array.length; i++)
    {
      clarifaiFaces.push(array[i].region_info.bounding_box);
    }
    // let clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);

    // an array of objects, basically coordinates of all faces.
    let obj = [];
    for(let i=0; i<clarifaiFaces.length; i++)
    {
      const x = clarifaiFaces[i];
      obj.push(
        {
          leftCol: x.left_col * width,
          topRow: x.top_row * height,
          rightCol: width - (x.right_col * width),
          bottomRow: height - (x.bottom_row * height)
        });
    }

    return obj;
  }

  displayFaceBox = (box) => {
    this.setState({box: box})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
    // console.log(event.target.value);
  }

  // had to do this becasue the count wasn't getting updating properly
  // using Object.assign
  setUser = (count) => {
    this.setState({
      user: {
        id: this.state.user.id,
        name: this.state.user.name,
        email: this.state.user.email,
        entries: count,
        joined: this.state.user.joined
      }
    })
  }

  // had to change the response and err functions into arrow functions for this
  // to work (just remember whenever we use 'this', we must not use normal functions,
  // only arrow functions)
  // actually on Picture submit
    onSubmit = () => {
    this.setState({imageUrl: this.state.input})
    const obj = {
      id: this.state.user.id
    }

    const inp = {
      input: this.state.input
    }
    // console.log('click-clack')
    fetch("https://rocky-bastion-94687.herokuapp.com/imageurl", {
                method: 'POST', 
                headers: {  'Content-Type': 'application/json' },
                body: JSON.stringify(inp)
            }).then(response => response.json()).then(
      (response) => {
        this.displayFaceBox(this.calculateFaceLocation(response));
          if(response)
          {
              fetch("https://rocky-bastion-94687.herokuapp.com/image", {
                method: 'PUT', 
                headers: {  'Content-Type': 'application/json' },
                body: JSON.stringify(obj)
            }).then(response => response.json())
            .then(count => {
                this.setUser(count);
            })
          }
        // console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
      },
      (err) => {
        // console.log(err);
      }
    ).catch(err => { 
        console.log(err);
        this.setState({box: []})
    });
  }

  onEnter = (event) => {
    if(event.which === 13)
      this.onSubmit();
  }

  onRouteChange = (route, isSignedIn) => {
    this.setState({isSignedIn: isSignedIn});
    this.setState({route: route});

  }

  // had to use ternary operator in route because we need a javascript expression
  // in the curly braces, if else is not allowed
  
  // actually, if else is allowed but not inside a return statement. Add an if-else
  // block and individual return statements in each block
  render() {
    return (
      <div className="App">
        {/* <ParticleBackground/> */}
        <Navigation resetImageUrl={this.resetImageUrl} onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
        {
          this.state.route === 'signin' ?
            <Signin resetImageUrl={this.resetImageUrl} loadUser={this.loadUser} onRouteChange={this.onRouteChange} onEnter={this.onEnter} isSignedIn={this.state.isSignedIn}/> 
            :
            ( this.state.route === 'register' ?
            <Register resetImageUrl={this.resetImageUrl} loadUser={this.loadUser} onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/> 
            :
            <div className="target">
              <div className="messiah">
                <Logo/>
                <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              </div>
              <ImageLinkForm onInputChange={this.onInputChange} 
                            onSubmit={this.onSubmit}
                            onEnter={this.onEnter}
                            isSignedIn={this.state.isSignedIn}
              />
              <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
            </div>)
        }
      </div>
    );
  }
}

export default App;
