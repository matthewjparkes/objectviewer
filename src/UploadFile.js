import React, {useState} from "react";
import axios from 'axios';
// import * as THREE from "three";

 export default function UploadFile({onSuccess}) {
    const [file, setFile] = useState(null);
    
    const onFileChange = (e) => {
        console.log(e.target.files[0]);
        setFile(e.target.files[0]);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('file', file);
        axios.post('https://main.dixpz34edvvvb.amplifyapp.com/upload', data)
        .then((e) => {
            console.log('success');
            onSuccess(e.data);
        })
        .catch((e) => {
            console.log('Error', e);
        })
    }
   
    return(
        <div className = 'absolute bottom-0 bg-red-200'>
            <form action="./public/index.html" onSubmit={onSubmit}>
                <input type='file' name='filename' onChange = {onFileChange}></input>
                <input type='submit' ></input>
            </form>
        </div>

    )

}

