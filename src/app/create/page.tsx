// "use client";

// import React, { useState } from "react";
// import Image from "next/image";
// import FireIcon from "../src/images/fire.svg";
// import Button from "../components/Button";
// import Message from "../components/Message";
// import YesNoButton from "../components/card/YesNoButton";
// import StreakDisplay from "../components/card/StreakDisplay";
// import DetailsButton from "../components/card/DetailsButton";
// import Counter from "../components/card/Counter";
// import Timer from "../components/card/Timer";
// import Card from "../components/card/Card";
// import { TextField } from "@mui/material";
// import TextInput from "../components/input/TextInput";
// import Modal from "../components/Modal";
// import Form from "../components/input/Form";

// export default function Create() {
//     const [isOpen, setIsOpen] = useState(false);

//     const handleClose = () => {
//         setIsOpen(false);
//     };

//     const handleOpen = () => {
//         setIsOpen(true);
//     };

//     const handleTimerSubmit = (duration: { hours: number; minutes: number }) => {
//         console.log("Submitted duration:", duration);
//       };
    
//       const [name, setName] = useState('');
//       const handleTimerCancel = () => {
//         console.log("Canceled");
//       };
    
//       const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setName(e.target.value);
//       };
    
//       return (
//         <div className="flex">
//         {/* <Button
//           variant="primary"
//           onClick={() => console.log("Primary clicked")}
//         >
//           Primary Button
//         </Button>
//         <Button
//           variant="secondary"
//           onClick={() => console.log("Secondary clicked")}
//         >
//           Secondary Button
//         </Button> */}
//         <img src="/images/logo.svg" alt="logo" className="w-12 h-12 rounded-full object-cover inline-flex"/>
//         <Message variant="secondary">
//           <div className="flex items-center space-x-4">
//             <span>Nice words for myself</span>
//             <img src="/images/login.jpg" alt="login-photo" className="w-12 h-12 rounded-full object-cover" />
//           </div>
//         </Message>

//         <Form>
//         <TextInput
//               label="Goal Name"
//               onChange={handleChange}
//               value={name}
//             />
//         </Form>
//         </div>
//       );
// }
