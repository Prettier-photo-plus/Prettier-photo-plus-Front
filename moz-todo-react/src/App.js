import './App.css';
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import {buttonLock, buttonOpen} from './component/changeButton.js'
import Header from './component/Header';
import { LoadingIndicator } from './component/constants';
import { trackPromise } from 'react-promise-tracker';

function App() {
  
  const [files, setFiles] = useState(null);
  let flag = false
  const btnlist = [useRef(), useRef(), useRef()];   // 순서대로 import, upload, download
  const arrowimgs = [useRef(), useRef(), useRef()];

  const handleFileChange = (event) => {
    const file = event.target.files;
    console.log(file);
    setFiles(file);
  };

  useEffect(() => {
    preview();
    return () => preview();
  });

  const preview = (event) => {

    if (!files) {
      buttonLock(btnlist[1], arrowimgs[1])
      buttonLock(btnlist[2], arrowimgs[2])
      return false;
    } 

    const imgInput = document.querySelector('.img-input');
    const reader = new FileReader();
      reader.onloadend = () => {
        imgInput.style.backgroundImage = `url(${reader.result})`;
    };

    reader.readAsDataURL(files[0]);

    buttonOpen(btnlist[1], arrowimgs[1]);
  }

  const handleClick = (event) => {
    buttonOpen(btnlist[1], arrowimgs[1]);

    event.preventDefault();
    const formdata = new FormData();
    formdata.append('img', files[0]);

    trackPromise(
      axios.post(
        'http://localhost:5000/img',
        formdata,
        {responseType:"blob"}
      )).then(res => {
        const resultImg = document.querySelector('.result-img');
        const url = window.URL.createObjectURL(new Blob([res.data]));
        flag = true
        resultImg.style.display = `inline-block`;
        resultImg.src = url;
        document.querySelector('.img-output').style.background = `#9BAECB`
        document.querySelector('.img-output').style.border = `2em solid #7E94B7`
        buttonLock(btnlist[1], arrowimgs[1]);
        buttonOpen(btnlist[2], arrowimgs[2]);
      }).catch(err => {
          console.error(err);
          alert(err)
    });
  }

  const handleFileDownload = (event) => {
    axios.get(
      'http://localhost:5000/img',
      {responseType: 'blob'}
    ).then(res=>{
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement('a');
      if(flag){
        a.href = url;
        a.download = 'Image.png';
        a.click();
      }
    })
  }

  return (
    <div className="App">
      <Header />
      <div className='form-area' method="post">
        <div className='image-box'>

          <div className='img-input'>
            <input type='file' id='low-quality' accept='image/*' name='file' onChange={handleFileChange} />
          </div>

          <div className='input-button-area'>
            <label className="input-file-button" id='import-button' for="low-quality" ref={btnlist[0]}>
              <img className='button-image' ref={arrowimgs[0]} alt="Arrow" />
              <p className='button-name'>Import</p>
            </label>

            <button className="input-file-button" id='upload-button' onClick={handleClick} ref={btnlist[1]}>
              <img className='button-image' ref={arrowimgs[1]} alt="Arrow" />
              <p className='button-name'>Upload</p>
            </button>
          </div>

        </div>

        <div className='image-box'>

          <div className='img-output'>
            <LoadingIndicator />
            <img className='result-img' alt='asdf'/>
          </div>

          <div className='input-button-area'>
            <button className="input-file-button" id='download-button' onClick={handleFileDownload} ref={btnlist[2]}>
              <img className='button-image' ref={arrowimgs[2]} alt="Arrow" />
              <p className='button-name'>Down</p>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

export default App;
