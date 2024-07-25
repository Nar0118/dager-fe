import { useEffect } from "react";
import GoogleMapReact from "google-map-react";
import { Tooltip } from "antd";
import { EnvironmentOutlined } from '@ant-design/icons';
import axios from "axios"

import "./styles.css";

// this is details for 28 Vardanants St, Yerevan 0070 address
export const location = {
  lat: 40.1250905,
  lng: 44.5054108,
};

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
const address = process.env.REACT_APP_ADDRESS;

// async function getLatLng(address) {
//     const encodedAddress = encodeURIComponent("3/4 Arin-Berd St, Yerevan, Armenia");
//     const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;
  
//     try {
//       const response = await axios.get(url);
//       const data = response.data;
  
//       if (data.status === 'OK') {
//         const location = data.results[0].geometry.location;
//         console.log(`Latitude: ${location.lat}, Longitude: ${location.lng}`);
//         return location;
//       } else {
//         console.log('Geocoding failed:', data.status);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   }

  
  const Map = () => {
    // useEffect(() => {
    //   getLatLng();
    // }, [])

    return (
  <div className={"map"}>
    {apiKey && (
      <GoogleMapReact
        bootstrapURLKeys={{ key: apiKey }}
        defaultCenter={location}
        defaultZoom={15}
      >
        {/* <AnyReactComponent
          lat={location.lat}
          lng={location.lng}
          text={address}
        /> */}
        <EnvironmentOutlined width={120} />
      </GoogleMapReact>
    )}
  </div>
)};

const AnyReactComponent = ({ text }) => (
  <div className={"anyReactComponent"}>
    <Tooltip placement="top" title={text}>
      <img src="/images/location.gif" alt="location" className={"location"} />
    </Tooltip>
  </div>
);

export default Map;
