import { Fragment, useEffect } from "react";
import "../styles/globals.css";
import Script from "next/script";

useEffect(() => {
  window.fbAsyncInit = function() {
    window.FB.init({
      appId            : 'your-app-id',
      xfbml            : true,
      version          : 'v21.0'
    });
  };
}, []);

function Facebook() {
    return (
        <Fragment>
            <Script async defer crossOrigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js"/>
        </Fragment>
    );
}