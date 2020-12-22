import './App.css';
import React from 'react'
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from 'react-google-maps'
class App extends React.Component {

    state = {
        address: "",
        city: "",
        area: "",
        state: "",
        zoom: 15,
        height: 400,
        mapPosition: {
           lat: 0,
           lng: 0
        },
        markerPosition: {
            lat: 0,
            lng: 0
        }


    }

  render() {
      const MyMapComponent = withScriptjs(withGoogleMap(props =>
          <GoogleMap
              defaultZoom={8}
              defaultCenter={{ lat: -34.397, lng: 150.644 }}
          >
              {props.isMarkerShown  && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
          </GoogleMap>
      ))
    return (
        <div className="App">
          <MyMapComponent
              googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAhEqwDYyJ0jEtIFYo6aeL3jrdlQD8oSM4&callback=myMap&libraries=geometry,drawing,places"
              loadingElement ={<div style={{height: `100%`}} />}
              containerElement={<div style={{height: `400px`}} />}
              mapElement={<div style={{height: `100%`}} />}
          />

        </div>
    );
  }
}

export default App;
