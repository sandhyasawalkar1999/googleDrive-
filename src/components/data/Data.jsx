import React, { useEffect, useState } from 'react'
import './Data.css'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import InfoIcon from '@mui/icons-material/Info';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
// import { db } from "../firebase/firebase.js";

import { collection, getDocs } from 'firebase/firestore';

import { db } from '../firebase/firebase.js';


const Data = () => {
const [files,setfile] = useState([]);

console.log(db);


useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'myfiles'));
        const documents = querySnapshot.docs.map(doc => ({ 
            id: doc.id,
            data:doc.data()
         }));
        setfile(documents);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' +sizes[i];
}
   
    return (
        <div className='data'>
            <div className='data_header'>
                <div className='data_left'>
                    <p>My Drive</p>
                    <ArrowDropDownIcon />
                </div>
                <div className='data_right'>
                    <FormatListBulletedIcon />
                    <InfoIcon />
                </div>
            </div>

           <div className='data_content'>
            
               <div className='data_grid'>
                {
                    files.map((file)=>{
                        return(
                            <div className='data_file'>
                                 <InsertDriveFileIcon />
                                 <p>{file.data.filename}</p>
                            </div>
                        )
                    })
                }
                     
                 </div>
                 <div className='data_list'>
                     <div className='detailRow'>
                         <p><b>Name <ArrowDownwardIcon /> </b></p>
                         <p><b>Owner</b></p>
                         <p><b>Last Modification</b></p>
                         <p><b>File Size</b></p>
                     </div>
                {
                    files.map(file =>{
                        return(

                            <div className='detailRow'>
                            <p> <a href ={file.data.fileURL} target ="_blank" >
                                <InsertDriveFileIcon /> {file.data.filename}
                                </a>
                            </p>
                            <p>Me</p>
                            <p>{new Date(file.data.timestamp?.seconds*1000).toUTCString()}</p>
                            <p>{formatBytes(file.data.size)}</p>
                        </div>
                        )
                    })
                }
                   
                 </div>
             </div>
         </div>
    )
}

export default Data