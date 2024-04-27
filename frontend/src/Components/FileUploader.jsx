//import {useCallback, useState} from 'react'
import  { useDropzone } from 'react-dropzone';
//import PropTypes from 'prop-types'

const FileUploader = () => {
  const {getRootProps, getInputProps, open, acceptedFiles} = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true
  });

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));
  return (
      <><div {...getRootProps({ className: 'dropzone' })}>
      <input {...getInputProps()} className='dropzone-input' />
      {files[0] ? 
      (
          <><div className="file_uploader-box">
            {files[0].type.startsWith('image/') && <img src={URL.createObjectURL(files[0])} height={77} width={96} alt="uploaded-file"/>}
            {files[0].type.startsWith('video/') && <video src={URL.createObjectURL(files[0])} controls height={77} width={96} alt="uploaded-file"/>}
            {files[0].type.startsWith('audio/') && <audio src={URL.createObjectURL(files[0])} controls height={77} width={96} alt="uploaded-file"/>}
          </div>
          <p className='file_uploader-label'>Click or drag another file to replace</p></>


        
      ):(
      <div className='file_uploader-box'>
            <img src="frontend\src\assets\icons\file-upload.svg"
              height={77}
              width={96}
              alt="file-upload" />
            <h3 className="file_upload-caption">Drag photo here</h3>
            <p className='file_upload-refs'>SVG, PNG, JPG</p>
      <button className='file_upload-button' type="button" onClick={open}>
        select from device
      </button>
      </div>)}
    </div>
    <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
      
      {/*<div {...getRootProps()} className='dropzone'>
        <input {...getInputProps()} className='dropzone-input' />
        {fileUrl ? (
          <div>
            test1
          </div>
        ) : (
          <div className='file_uploader-box'>
            <img src="frontend\src\assets\icons\file-upload.svg"
              height={77}
              width={96}
              alt="file-upload" />
            <h3 className="file_upload-caption">Drag photo here</h3>
            <p className='file_upload-refs'>SVG, PNG, JPG</p>
            <button className='file_upload-button'>Select from device</button>
          </div>
        )}
      </div>*/}</>
  )
}

/*FileUploader.propTypes = {
  fieldChange: PropTypes.file.isRequired,
  mediaUrl: PropTypes.string.isRequired,
}*/
export default FileUploader