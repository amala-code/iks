import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import "./CreateContent.css";

const CreateContent = () => {
  const [file, setFile] = useState(null);
  const [contentType, setContentType] = useState("Article");

  const handleDrop = (event) => {
    event.preventDefault();
    const uploadedFile = event.dataTransfer.files[0];
    setFile(uploadedFile);
  };

  const handleFileSelect = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
  };

  const allowDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="create-content">
      <h2 className="title">Create New Content</h2>
      <div className="content-form">
        <div className="content-type">
          {["Article", "Image", "Video", "Blog"].map((type) => (
            <button 
              key={type} 
              className={contentType === type ? "active" : ""} 
              onClick={() => setContentType(type)}
            >
              {type}
            </button>
          ))}
        </div>

        {contentType === "Article" && (
          <>
            <input type="text" className="input-field" placeholder="Enter article title..." />
            <textarea className="input-field" placeholder="Write your article..."></textarea>
          </>
        )}

        {contentType === "Image" && (
          <>
            <input type="text" className="input-field" placeholder="Image title..." />
            <div className="file-upload" onDrop={handleDrop} onDragOver={allowDragOver}>
              <label className="upload-label">
                <FaCloudUploadAlt className="upload-icon" />
                <p>Drag and drop an image or click to upload</p>
                <input type="file" className="file-input" accept="image/*" onChange={handleFileSelect} />
              </label>
              {file && <p className="file-name">{file.name}</p>}
            </div>
          </>
        )}

        {contentType === "Video" && (
          <>
            <input type="text" className="input-field" placeholder="Video title..." />
            <div className="file-upload" onDrop={handleDrop} onDragOver={allowDragOver}>
              <label className="upload-label">
                <FaCloudUploadAlt className="upload-icon" />
                <p>Drag and drop a video or click to upload</p>
                <input type="file" className="file-input" accept="video/*" onChange={handleFileSelect} />
              </label>
              {file && <p className="file-name">{file.name}</p>}
            </div>
          </>
        )}

        {contentType === "Blog" && (
          <>
            <input type="text" className="input-field" placeholder="Blog title..." />
            <textarea className="input-field" placeholder="Write your blog..."></textarea>
          </>
        )}

        {/* <div className="content-settings">
          <label className="toggle-label">
            <span>Make this content public</span>
            <input type="checkbox" defaultChecked />
          </label>
          <input type="date" className="input-field" />
          <input type="time" className="input-field" />
        </div> */}

        <div className="actions">
          <button className="save-draft">Save as Draft</button>
          <button className="cancel">Cancel</button>
          <button className="publish">Publish</button>
        </div>
      </div>
    </div>
  );
};

export default CreateContent;
