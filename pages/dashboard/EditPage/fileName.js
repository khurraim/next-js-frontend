import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Admin from '@/pages/layouts/Admin';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

function EditPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const editorRef = useRef();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor } = editorRef.current || {};

  const router = useRouter(); // Use the useRouter hook to access the router object
  const { fileName } = router.query; // Extract the fileName from the query

  // Loading CK Editor
  useEffect(() => {
    // Dynamically load CKEditor and ClassicEditor
    import('@ckeditor/ckeditor5-react')
      .then((module) => {
        editorRef.current = {
          CKEditor: module.CKEditor,
          ClassicEditor: require('@ckeditor/ckeditor5-build-classic'),
        };
        setEditorLoaded(true);
      })
      .catch((error) => {
        console.error('Error loading CKEditor:', error);
      });
  }, []);

  useEffect(() => {
    async function fetchFileContent() {
      try {
        const response = await axios.get(`/api/getContent?fileName=${fileName}`);
        const { title, description } = response.data;
        console.log("Response is : ", response.data);
        setTitle(title);
        setDescription(description);
      } catch (error) {
        console.error('Error fetching file content:', error);
        toast.error('Error fetching file content');
      }
    }

    if (fileName) {
      fetchFileContent(); // Fetch data only when fileName is defined
    }
  }, [fileName]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSave = async () => {
    try {
      // Update the title and description using the API
      await axios.post('/api/editFile', {
        fileName,
        title,
        description,
      });
      toast.success('File content updated successfully!');
    } catch (error) {
      console.error('Error updating file:', error);
      toast.error('Error updating file content');
    }
  };

  return (
    <Admin>
      <div className='container-fluid my-5'>
        <div className='card'>
          <div className='card-header'>
            <h2 className='text-center'>Edit Page: {fileName}</h2>
          </div>

          <div className='card-body'>
            <div className='form-group'>
              <label className='form-label'>Title</label>
              <input className='form-control' name='title' type="text" value={title} onChange={handleTitleChange} />
            </div>

            <div className='form-group'>
              <label>Description:</label>
              {/* <textarea
                className='form-control'
                value={description}
                name='description'
                onChange={handleContentChange}
              ></textarea> */}
              {editorLoaded ? (
                  <CKEditor
                    editor={ClassicEditor}
                    data={description}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setDescription(data);
                    }}
                  />
                ) : (
                  <div>Loading CKEditor...</div>
                )}
            </div>

            <div className='form-group'>
              <button className='btn btn-primary w-100' onClick={handleSave}>
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </Admin>
  );
}

export default EditPage;
