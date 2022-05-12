import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'



import styles from './upload.scss'

export default function Upload() {
  
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  },[])
  
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();

  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function(onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    }

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  async function handleOnSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(({ name }) => name === 'file');

    console.log('fileInput', fileInput);
    console.log('fileInput.files', fileInput.files);

    const formData = new FormData();

    for ( const file of fileInput.files ) {
      formData.append('file', file);
      formData.append('upload_preset', 'my-uploads');
    }

    const data = await fetch('https://api.cloudinary.com/v1_1/francisxvaz/image/upload', {
      method: 'POST',
      body: formData
    }).then(r => r.json());

    setImageSrc(data.secure_url);
    setUploadData(data);
  }

  return (
    <div className={styles.container}>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Image Uploader
        </h1>

        <p className={styles.description}>
          Upload your image to Cloudinary!
        </p>

        <form className={styles.form} method="post" onChange={handleOnChange} onSubmit={handleOnSubmit}>
          <p>
            <input type="file" name="file" />
          </p>
          
          <div className='characters'>
            <img src={imageSrc} />
          </div>
          
          {imageSrc && !uploadData && (
            <p>
              <button>Upload Files</button>
            </p>
          )}

          {uploadData && (
            <code><pre>{JSON.stringify(uploadData, null, 2)}</pre></code>
          )}
        </form>
      </main>
    </div>
  )
}