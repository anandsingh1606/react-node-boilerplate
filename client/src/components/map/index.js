/* eslint-disable */
import React, { Component } from "react";
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import { Paper, Grid } from "@material-ui/core";
import Geocode from "react-geocode";
import Autocomplete from "react-google-autocomplete";
import keys from "Configs/keys";
import { withStyles } from "@material-ui/styles";
import styles from "./styles";
import Button from "CommonComponents/button";


console.log("GoogleMapsAPI,GoogleMapsAPI", keys, keys.GoogleMapsAPI);
Geocode.setApiKey(keys.GoogleMapsAPI);
Geocode.enableDebug();

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      city: "",
      area: "",
      state: "",
      mapPosition: {
        lat: this.props.center.lat,
        lng: this.props.center.lng,
      },
      markerPosition: {
        lat: this.props.center.lat,
        lng: this.props.center.lng,
      },
    };
  }

  /**
   * Get the current address from the default map position and set those values in the state
   */
  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setInitialLatLong(position.coords.latitude, position.coords.longitude);
      });
    }
  }

  setInitialLatLong(lat, long) {
    console.log("lat, long", lat, long);
    const initLat = typeof lat !== "undefined" ? lat : this.state.mapPosition.lat;
    const initLng = typeof long !== "undefined" ? long : this.state.mapPosition.lng;

    this.setState({
      mapPosition: {
        lat: initLat,
        lng: initLng,
      },
      markerPosition: {
        lat: initLat,
        lng: initLng,
      },
    });
    Geocode.fromLatLng(initLat, initLng).then(
      (response) => {
        const address = response.results[0].formatted_address;
        const addressArray = response.results[0].address_components;
        const city = this.getCity(addressArray);
        const area = this.getArea(addressArray);
        const state = this.getState(addressArray);

        console.log("city", city, area, state);

        this.setState({
          address: address || "",
          area: area || "",
          city: city || "",
          state: state || "",
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  /**
   * Component should only update ( meaning re-render ), when the user selects the address, or drags the pin
   *
   * @param nextProps
   * @param nextState
   * @return {boolean}
   */
  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.state.markerPosition.lat !== this.props.center.lat ||
      this.state.address !== nextState.address ||
      this.state.city !== nextState.city ||
      this.state.area !== nextState.area ||
      this.state.state !== nextState.state
    ) {
      return true;
    }
    if (this.props.center.lat === nextProps.center.lat) {
      return false;
    }
  }

  /**
   * Get the city and set the city input value to the one selected
   *
   * @param addressArray
   * @return {string}
   */
  getCity = (addressArray) => {
    let city = "";
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0] && addressArray[i].types[0] === "administrative_area_level_2") {
        city = addressArray[i].long_name;
        return city;
      }
    }
  };

  /**
   * Get the area and set the area input value to the one selected
   *
   * @param addressArray
   * @return {string}
   */
  getArea = (addressArray) => {
    let area = "";
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0]) {
        for (let j = 0; j < addressArray[i].types.length; j++) {
          if (addressArray[i].types[j] === "sublocality_level_1" || addressArray[i].types[j] === "locality") {
            area = addressArray[i].long_name;
            return area;
          }
        }
      }
    }
  };

  /**
   * Get the address and set the address input value to the one selected
   *
   * @param addressArray
   * @return {string}
   */
  getState = (addressArray) => {
    let state = "";
    for (let i = 0; i < addressArray.length; i++) {
      for (let i = 0; i < addressArray.length; i++) {
        if (addressArray[i].types[0] && addressArray[i].types[0] === "administrative_area_level_1") {
          state = addressArray[i].long_name;
          return state;
        }
      }
    }
  };

  /**
   * And function for city,state and address input
   * @param event
   */
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  /**
   * This Event triggers when the marker window is closed
   *
   * @param event
   */
  onInfoWindowClose = (event) => {};

  /**
   * When the marker is dragged you get the lat and long using the functions available from event object.
   * Use geocode to get the address, city, area and state from the lat and lng positions.
   * And then set those values in the state.
   *
   * @param event
   */
  onMarkerDragEnd = (event) => {
    const newLat = event.latLng.lat();
    const newLng = event.latLng.lng();

    Geocode.fromLatLng(newLat, newLng).then(
      (response) => {
        const address = response.results[0].formatted_address;
        const addressArray = response.results[0].address_components;
        const city = this.getCity(addressArray);
        const area = this.getArea(addressArray);
        const state = this.getState(addressArray);
        this.setState({
          address: address || "",
          area: area || "",
          city: city || "",
          state: state || "",
          markerPosition: {
            lat: newLat,
            lng: newLng,
          },
          mapPosition: {
            lat: newLat,
            lng: newLng,
          },
        });
      },
      (error) => {
        console.error(error);
      }
    );
  };

  /**
   * When the user types an address in the search box
   * @param place
   */
  onPlaceSelected = (place) => {
    console.log("plc", place);
    const address = place.formatted_address;
    const addressArray = place.address_components;
    const city = this.getCity(addressArray);
    const area = this.getArea(addressArray);
    const state = this.getState(addressArray);
    const latValue = place.geometry.location.lat();
    const lngValue = place.geometry.location.lng();
    // Set these values in the state.
    this.setState({
      address: address || "",
      area: area || "",
      city: city || "",
      state: state || "",
      markerPosition: {
        lat: latValue,
        lng: lngValue,
      },
      mapPosition: {
        lat: latValue,
        lng: lngValue,
      },
    });
  };

  render() {
    const { classes } = this.props;
    const AsyncMap = withGoogleMap((props) => (
      <GoogleMap
        google={this.props.google}
        defaultZoom={this.props.zoom}
        defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}>
        {/* InfoWindow on top of marker */}
        <InfoWindow
          onClose={this.onInfoWindowClose}
          position={{ lat: this.state.markerPosition.lat + 0.0018, lng: this.state.markerPosition.lng }}>
          <div>
            <span style={{ padding: 0, margin: 0 }}>{this.state.address}</span>
          </div>
        </InfoWindow>
        {/* Marker */}
        <Marker
          google={this.props.google}
          name="Dolores park"
          draggable
          onDragEnd={this.onMarkerDragEnd}
          position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
        />
        <Marker />
      </GoogleMap>
    ));

    let map;
    if (this.props.center.lat !== undefined) {
      map = (
        <Grid container direction="column" className={classes.container}>
          <Grid item className={classes.header}>
            {/* For Auto complete Search Box */}
            <Autocomplete className={classes.autoComplete} onPlaceSelected={this.onPlaceSelected} types={[]} />
          </Grid>
          <Grid item className={classes.body}>
            <AsyncMap
              loadingElement={<div style={{ height: "100%" }} />}
              containerElement={<div style={{ height: "100%" }} />}
              mapElement={<div style={{ height: "100%" }} />}
            />
          </Grid>
          <Grid item className={classes.footer}>
              <Button>
                
              </Button>
          </Grid>
        </Grid>
      );
    } else {
      map = <div style={{ height: this.props.height }} />;
    }
    return <Paper className={classes.paperRoot}>{map}</Paper>;
  }
}
export default withStyles(styles)(Map);
