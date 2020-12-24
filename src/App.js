import './App.css';
import React from 'react'
import {withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow} from 'react-google-maps'
import Geocode from 'react-geocode';
import { Descriptions, Badge } from 'antd';
Geocode.setApiKey("AIzaSyAhEqwDYyJ0jEtIFYo6aeL3jrdlQD8oSM4&callback=myMap")

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

    getCity = (addressArray) => {
        let city = '';
        for (let index = 0; index < addressArray.length; index++) {
            if (addressArray[index].types[0] && 'administrative_area_level_2' === addressArray[index].types[0]) {
                city = addressArray[index].long_name;
                return city;
            }
        }
    }

    getArea = (addressArray) => {
        let area = '';
        for (let index = 0; index < addressArray.length; index++){
            if (addressArray[index].types[0]) {
                for (let j = 0; j < addressArray.length; j++) {
                    if('sublocality_level_1' === addressArray[index].types[j] || 'locality' === addressArray[j].types[j]) {
                        area = addressArray[index].long_name
                        return area
                    }
                }
            }
        }
    }
    getsState = (addressArray) => {
        let state = '';
        for (let index = 0; index < addressArray.length; index++){
            for (let index = 0; index < addressArray.length; index++){
                if(addressArray[index].types[0] && 'administrative_area_level_1' === addressArray[index].types[0]) {
                    state = addressArray[index].long_name
                    return state
                }
            }
        }
    }


    onMarkerDragEnd = (event) => {
        let newLat = event.latLng.lat();
        let newLng = event.latLng.lng();

        Geocode.fromLatLng(newLat, newLng)
            .then(res => {
                const address = res.results[0].formatted_address,
                    addressArray = res.results[0].address_components,
                    city = this.getCity(addressArray),
                    area = this.getArea(addressArray),
                    state = this.getsState(addressArray)

                this.setState({
                    address: (address) ? address : "",
                    area: (area) ? area : "",
                    city: (city) ? city : "",
                    state: (state) ? state : "",
                    markerPosition: {
                        lat: newLat,
                        lng: newLng
                    },
                    mapPosition: {
                        lat: newLat,
                        lng: newLng
                    },

                })
            })
    }

  render() {
      const MyMapComponent = withScriptjs(withGoogleMap(props =>
          <GoogleMap
              defaultZoom={8}
              defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
          >
           <Marker
           draggable={true}
           onDragEnd={this.onMarkerDragEnd}
               position={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}>
               <InfoWindow>
                   <div>
                      hello
                   </div>
               </InfoWindow>
           </Marker>
          </GoogleMap>
      ))
    return (
        <div className="App">
            <div>
                <Descriptions title="User Info" bordered>
                    <Descriptions.Item label="Product">Cloud Database</Descriptions.Item>
                    <Descriptions.Item label="Billing Mode">Prepaid</Descriptions.Item>
                    <Descriptions.Item label="Automatic Renewal">YES</Descriptions.Item>
                    <Descriptions.Item label="Order time">2018-04-24 18:00:00</Descriptions.Item>
                    <Descriptions.Item label="Usage Time" span={2}>
                        2019-04-24 18:00:00
                    </Descriptions.Item>
                    <Descriptions.Item label="Status" span={3}>
                        <Badge status="processing" text="Running" />
                    </Descriptions.Item>
                    <Descriptions.Item label="Negotiated Amount">$80.00</Descriptions.Item>
                    <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
                    <Descriptions.Item label="Official Receipts">$60.00</Descriptions.Item>
                    <Descriptions.Item label="Config Info">
                        Data disk type: MongoDB
                        <br />
                        Database version: 3.4
                        <br />
                        Package: dds.mongo.mid
                        <br />
                        Storage space: 10 GB
                        <br />
                        Replication factor: 3
                        <br />
                        Region: East China 1<br />
                    </Descriptions.Item>
                </Descriptions>,
            </div>
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
