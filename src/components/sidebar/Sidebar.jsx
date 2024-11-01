
import React from 'react'
import { useState } from 'react';
import './Sidebar.css'
import MobileScreenShareIcon from '@mui/icons-material/MobileScreenShare';
import DevicesIcon from '@mui/icons-material/Devices';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import { Modal } from "@mui/material";
// import { storage } from "./firebase/firebase.js";  // or .ts if TypeScript
import { storage,db } from "../firebase/firebase.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";



const Sidebar = () => {
    const [open, setopen] = useState(false);
    const [uploading, setUploding] = useState(false);
    const [file, setfile] = useState(null);

    const handleClose = () => {
        setopen(false);
    }

    const handleOpen = () => {
        setopen(true);
    }

    const handleCloseBtn = () => {
        setopen(false);
    }

    const handleChange = (e) => {
        console.log(e.target.files[0]);
        if (e.target.files[0]) {
            setfile(e.target.files[0]);
        }
    }

    // const handleUpload = (e) => {
    //     e.preventDefault();
    //     console.log(e.target.value);
    //     setUploding(true);

    //     const storageRef =ref(`files/${File.name}`).put(file).then(snapshot => {
    //         console.log(snapshot);
    //         console.log(storageRef);
    //     });

    //     const storageRef = ref(storage, `files/${file.name}`);

    //     console.log(storageRef);
    //     const snapshot = uploadBytes(storageRef, file);
    //     const url = getDownloadURL(snapshot.ref);
    //     console.log(url);


        

    // }

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) return; // Ensure a file is selected
    
        setUploding(true);
        
        try {
            // Create a reference to the file path in Firebase Storage
            const storageRef = ref(storage, `files/${file.name}`);
            
            // Upload the file to Firebase Storage
            const snapshot = await uploadBytes(storageRef, file);
            console.log(snapshot);
            
            // Get the download URL after upload is complete
            const downloadURL = await getDownloadURL(snapshot.ref);
            
            console.log("File uploaded successfully. Download URL:", downloadURL);

            // Add file metadata to Firestore
        await addDoc(collection(db, "myfiles"), {
            userId: "user_id_placeholder",  // Replace with actual user ID if available
            timestamp: serverTimestamp(),
            filename: file.name,
            fileURL: downloadURL,
            size: snapshot.metadata.size,
            contentType: snapshot.metadata.contentType,
            starred: false,
        });
        
        // Reset the state
        setopen(false);
        setfile(null);
        setUploding(false);;
            
            // Optionally, you can store the downloadURL in your database or use it as needed
        } catch (error) {
            console.error("File upload failed:", error);
            setUploding(false);
        }
    };
    
    return (
        <>
            <Modal open={open} onClose={handleClose} >
                <div className='Model_pop'>
                    <form>
                        <div className='model_Heading'>
                            <h3>Select file you want to upload </h3>

                            <img className='closebtn' onClick={handleCloseBtn} src='http://res.freestockphotos.biz/pictures/15/15107-illustration-of-a-red-close-button-pv.png' />


                        </div>
                        <div className='model_body'>
                            {
                                uploading ? (<p className='uploading'>File Uploading....</p>) :
                                    <>
                                        <input type='file' onChange={handleChange} />

                                        <input type='submit' className='post_submit' onClick={handleUpload} />

                                    </>

                            }
                        </div>
                    </form>
                </div>
            </Modal>
            <div className='sidebr'>
                <div className='sidebar_btn'>
                    <button className='new' onClick={handleOpen} >
                        +   <span>New</span>
                    </button>
                </div>

                <div className='options'>

                    <div className='data data_active'>
                        <MobileScreenShareIcon />
                        <span><b>My Drive</b></span>
                    </div>
                    <div className='data'>
                        <DevicesIcon />
                        <span>Computer</span>
                    </div>
                    <div className='data'>
                        <QueryBuilderIcon />
                        <span>Share with me</span>
                    </div>
                    <div className='data'>
                        <PeopleAltIcon />
                        <span>Recent</span>
                    </div>
                    <div className='data'>
                        <StarBorderIcon />
                        <span>Starred</span>
                    </div>
                    <div className='data'>
                        <DeleteIcon />
                        <span>Tash</span>
                    </div>

                </div>
                <hr />
                <div className='options'>
                    <div className='data'>
                        <CloudQueueIcon />
                        <span>storage</span>
                    </div>

                    <div className='progressBar'>
                        <progress size='tiny' value='50' max='100' />
                        <span>6.45 GB of 15 GB used</span>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Sidebar
