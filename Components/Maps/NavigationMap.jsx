import React, { useEffect, useRef, useState } from 'react'
import { Button, Image, StyleSheet, View } from 'react-native'
import {  Block, Input, theme,Text} from 'galio-framework';
import { StatusBar } from 'expo-status-bar';

import Icon from "./Icons/IconM.png"
import Car from "./Icons/CarLocationIcon.png"
import Geolocation from 'react-native-geolocation-service';
import MapView, { Marker,Polyline,PROVIDER_GOOGLE,MarkerAnimated,AnimatedRegion  } from 'react-native-maps';
import { Dimensions } from "react-native";
import * as Location from 'expo-location';
import MapStyle from "./MapStyle.json"
import { Ionicons } from '@expo/vector-icons'; 
import * as TaskManager from "expo-task-manager";
import Geocoder from 'react-native-geocoding';
import { useAppContext } from '../../Context/AppContext';
import MapViewDirections from 'react-native-maps-directions';
Geocoder.init("AIzaSyDj2Rwz6KiE4UWz60_y-aCP6PJJR3xQeVU");
const {width,height} = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const latitude_Delta=0.02;
const Longitude_Delta = latitude_Delta * ASPECT_RATIO;
const customMarkers = [
  {
    id: 1,
    coordinate: {
      latitude: 37.78825,
      longitude: -122.4324,
    },
    title: 'Marker 1',
    icon: Icon
  },
  {
    id: 2,
    coordinate: {
      latitude: 37.77845,
      longitude: -122.4224,
    },
    title: 'Marker 2',
  },
  // Add more custom markers as needed
];

const GOPoints ={
  latitude:28.7041,
  longitude:77.1025,
}
export const NavigationMap = ({navigation}) => {
  const [UserLocation, setUserLocation] = useState(false);
  const [CurrentRegionMarker, setCurrentRegionMarker] = useState(null)
   const [MapRef, setMapRef] = useState("")
  const initialRegion2 = {
    latitude:26.78133114154805,
    longitude:75.87922824062501,
    latitudeDelta:0.25,
    longitudeDelta:0.25,
  }
  const [initalRegion,setinitalRegion] = useState(initialRegion2)
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(12);
  const [isMarkerModalVisible, setMarkerModalVisible] = useState(false);
  const [selectedMarker, setSelectedMarker]=useState([])
  // const [Address,setAddress] = useState([]);
  const {SelectedAddressFromMap,setSelectedAddressFromMap} =useAppContext()
  const mapRef = useRef(null);
  const LOCATION_TASK_NAME = "background-location-task";
  const origin = {latitude: 37.3318456, longitude: -122.0296002};
const destination = {latitude: 37.771707, longitude: -122.4053769};
const GOOGLE_MAPS_APIKEY = 'AIzaSyDj2Rwz6KiE4UWz60_y-aCP6PJJR3xQeVU';
  const startNavigationToGO = () => {
    console.log("In navigation function")
    if (mapRef.current) {
      mapRef.current.animateCamera(
        {
          center: GOPoints,
          pitch: 45, // Tilt angle
          heading: 0, // Heading angle
          altitude: 1000, // Altitude
          zoom: 15, // Zoom level
        },
        { duration: 1000 } // Animation duration in milliseconds
      );
    }
  };

  async function getCurrentLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      try {
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        setUserLocation({
          latitude,
          longitude,
          latitudeDelta: 0.25,
          longitudeDelta: 0.25,
        });
        setinitalRegion({
          latitude,
          longitude,
          latitudeDelta: 0.25,
          longitudeDelta: 0.25,
        });
      } catch (error) {
        console.error('Error getting current location:', error);
      }
  }

  const handleMarkerPress = (marker) => {
    // setSelectedMarker(marker)
    AnimationGoToPoint(marker.lat,marker.lng)
   
    // setMarkerModalVisible(true)
  };
  
const initialRegion = {
    latitude:26.78133114154805,
    longitude:75.87922824062501,
    latitudeDelta:30,
    longitudeDelta:30,
  }
  

  const [region] = useState(new AnimatedRegion(initalRegion));
  const onRegionChange = (region) => {
    // console.log('onRegionChange',region)
    // region.setValue(animatedRegion);
     setCurrentRegionMarker(region);
  };
  const AnimationGoToPoint=(lat,lng)=>{
   
      if (mapRef.current) {
        mapRef.current.animateCamera(
          {
            center: {
              latitude:lat,
              longitude:lng,
              latitudeDelta: 0.25,
              longitudeDelta: 0.25,
            },
            pitch: 45, // Tilt angle
            heading: 0, // Heading angle
            altitude: 1000, // Altitude
            zoom: 15, // Zoom level
          },
          { duration: 1000 } // Animation duration in milliseconds
        );
      }
    
  }
  useEffect(() => {
    console.log("in use effect ")
    setTimeout(()=>{
      if (mapRef.current) {
        setMapRef(mapRef);
        mapRef.current.animateCamera(
          {
            center: initalRegion,
            pitch: 45, // Tilt angle
            heading: 0, // Heading angle
            altitude: 1000, // Altitude
            zoom: 15, // Zoom level
          },
          { duration: 1000 } // Animation duration in milliseconds
        );
      }
    },2000)
    
  }, [UserLocation,initalRegion]);

  const startBackgroundTracking = async () => {
    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      //Location Task Options
      
    });
  };

  useEffect(()=>{
    getCurrentLocation();

    TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
      if (error) {
        console.error(error);
        return;
      }
      if (data) {
        // Extract location coordinates from data
        const { locations } = data;
        const location = locations[0];
        if (location) {
          console.log("Location in if ===>",location)
          // Do something with captured location coordinates
          const { latitude, longitude } = location.coords;
      setUserLocation({
          latitude,
          longitude,
          latitudeDelta: 0.25,
          longitudeDelta: 0.25,
        });

       

        setinitalRegion( {
          latitude,
          longitude,
          latitudeDelta: 0.25,
          longitudeDelta: 0.25,
        });
        }
      }
    });

    startNavigationToGO()
  },[])
  
  return (
    <MapView  ref={mapRef} 
    style={styles.map}
    initialRegion={initialRegion}
    zoomEnabled={true}
      provider={PROVIDER_GOOGLE} 
    customMapStyle={MapStyle}
    onPress={() => {
      if (isMarkerModalVisible) {
        setMarkerModalVisible(false);
      }
    }}
  //  onRegionChange={onRegionChange}
  
    >
    <MapViewDirections
    origin={origin}
    destination={destination}
    apikey={GOOGLE_MAPS_APIKEY}
    strokeColor='hotpink'
    strokeWidth={5}
  />
    {UserLocation && (
      <Marker
        coordinate={UserLocation}
        title="You are here"
        description="This is your current location"
      >
        <Image source={Car} style={{ width: 15, height: 46 }} />
      </Marker>
    )} 
  
      <Marker
        coordinate={GOPoints}
        title="Selected Location"
        description="This is your Selected location"
      >
      
      <Image source={Car} style={{ width: 15, height: 46 }} />

        
      </Marker>
   
  </MapView>

  )
}


const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    height: Dimensions.get("window").height,
},
  });