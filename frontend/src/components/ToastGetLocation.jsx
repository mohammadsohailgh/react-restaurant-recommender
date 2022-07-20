import React from 'react'
import { toast } from "react-toastify";
import { useEffect, useState } from "react"; //

function ToastGetLocation() {

    const [locationEnabled, setLocationEnabled] = useState(true)
    const toastId = React.useRef(null);

    const getLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            // Success function
            setLocationTrue,
            // Error function
            setLocationFalse,
            // Options. See MDN for details.
            {
              enableHighAccuracy: true,
              timeout: 5000,
              maximumAge: 0,
            }
          );
        } else {
          console.log("Geolocation is not supported by this browser.")
        }
      }

     const setLocationTrue = () => {
        setLocationEnabled(true) 
      }

      const setLocationFalse = () => {
        setLocationEnabled(false) 
      }

      const locationFail = () =>
        toast.warn("Please enable location for full application features", 
        {autoClose: false })
    
      const locationSuccess = () => {
        toast.success("Location successfully shared", 
        {autoClose: false })
        }

      useEffect(() => { 
          if(!locationEnabled) {
             toastId.current = toast.warn("Please enable location for full application features", 
             {autoClose: false })
          } else {
            toast.dismiss(toastId.current);
            setLocationEnabled(true) 
          }
      }, [locationEnabled, locationEnabled] )

    getLocation()

  return (

    <>
    </>
    )
}

export default ToastGetLocation