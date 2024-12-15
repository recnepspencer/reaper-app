import React, { useEffect, useState } from "react";
// import "../styles/globals.css";
import Button from "../Button";
import { FaFacebook } from "react-icons/fa";

interface FacebookProps {
  currentGoal: string;
  setCurrentGoal: React.Dispatch<React.SetStateAction<string>>;
}

const Facebook: React.FC<FacebookProps> = () => {
  const [currentGoal, setCurrentGoal] = useState("Run 5 miles this week!");

  useEffect(() => {
    // Initialize the Facebook SDK
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "896808095976607", // Replace with your actual Facebook App ID
        cookie: true,
        xfbml: true,
        version: "v17.0", // Use the latest Facebook Graph API version
      });

      FB.AppEvents.logPageView(); 

      // Optional: Check login status when the component mounts
      window.FB.getLoginStatus(function (response) {
        console.log("Initial login status:", response);
      });
    };
  }, []);

  const handleShare = () => {
    // Check if the user is logged in
    window.FB.getLoginStatus(function (response) {
      if (response.status === "connected") {
        // User is logged in, proceed with sharing
        shareContent(currentGoal);
      } else {
        // User is not logged in, log them in first
        console.log("User not logged in. Redirecting to login...");
        window.FB.login(
          (loginResponse) => {
            if (loginResponse.authResponse) {
              console.log("Logged in successfully:", loginResponse);
              shareContent(currentGoal); // After login, proceed to share
            } else {
              console.log("Login failed.");
            }
          },
          { scope: "public_profile,email" } // Request permissions
        );
      }
    });
  };

  const shareContent = (currentGoal: any) => {
    // Share content on Facebook
    window.FB.ui(
      {
        method: "share",
        href: "https://reaper-app-vert.vercel.app/home", // The URL to share
        quote: `Check out my current goal: ${currentGoal}!`, // Custom message
        hashtag: "#reapergoals", // Optional hashtag
      },
      function (response) {
        if (response) {
          console.log("Content shared successfully:", response);
        } else {
          console.log("Sharing was cancelled or failed.");
        }
      }
    );
  };

  return (
    <Button onClick={handleShare}>
      <FaFacebook
        style={{ color: "#4267B2", fontSize: "24px", marginRight: "8px" }}
      />
      Share on Facebook
    </Button>
  );
};

export default Facebook;
