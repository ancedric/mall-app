import { useState } from "react"
import { useForm } from 'react-hook-form'
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types'
import axios from "axios";
import FileUploader from "../FileUploader";
import{ user } from '../../Authentication/user';

function PostForm() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: {errors}} = useForm();
  const [file, setFile] = useState(null)

  const onSubmit = async (data) => {
    const formData = new FormData();
      formData.append('userId', user.id);
      formData.append('author', user.username);
      formData.append('content', data.content);
      formData.append('tags', data.tags);
      formData.append('file', file);
      formData.append('notifId', data.notifId);
      formData.append('catalogLink', data.catalogLink);

      try {
        const response = await axios.post('http://localhost:8081/create-post', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        console.log(response.data);
        handleSendNotif(formData.notifId);
        navigate('/home');
      } catch (error) {
        console.error('Erreur lors de l\'envoi des données du post:', error)
      }
  }

  const handleSendNotif = async (id) => {
    try{
      const response = await axios.post('http://localhost:8081/create-notif', id)
        console.log(response.data);
    }catch(error){
      console.error('Erreur lors de la création de la notification :', error);
    }
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  }

  const handleDragOver = (e) => {
    e.preventDefault();
  }
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
  }

  return (
    <div className="create-post-container">
      <form onSubmit={handleSubmit(onSubmit)}
        className="post-form"
        onDrop={handleDrop}
        onDragOver={handleDragOver}>
        <div className="form-group">
        {
          file && (
            <div className="file-preview">
              {file.type.startsWith('image/') && <img src={URL.createObjectURL(file)} height={200} width={220} alt="uploaded-file"/>}
              {file.type.startsWith('video/') && <video src={URL.createObjectURL(file)} controls height={200} width={220} alt="uploaded-file"/>}
              {file.type.startsWith('audio/') && <audio src={URL.createObjectURL(file)} controls height={200} width={220} alt="uploaded-file"/>}
            </div>
          )
        }
          <label htmlFor="file">Image</label>
          <input type="file" id="file" accept="image/*, video/*, audio/*" onChange={handleFileChange} />
          <FileUploader/>
          {errors.image && 
            <span className="error">An image is required</span>
          }
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea id="content" {...register('content', {required: true})} />
          {errors.content && 
            <span className="error">Content is required</span>
          }
        </div>
        <div className="form-group">
          <label htmlFor="tags">Tags</label>
          <input type="text" id="tags" {...register('tags', {required: false})} />
        </div>
        <div className="form-group">
          <input type="checkbox" id="catalogLink" {...register('catalogLink', {required: false})} />
          <label htmlFor="catalogLink">Include catalog link ?</label>
        </div>
        <div className="form-group hidden">
          <label htmlFor="notifId">Tags</label>
          <input type="text" id="notifId" value={`${user.id}${Date.now()}`} {...register('notifId', {required: false})} />
        </div>
        <button type="submit" className="create-post-btn">Create post</button>
      </form>
    </div>
  )
}

PostForm.propTypes = {
  post: PropTypes.object.isRequired,
}

export default PostForm