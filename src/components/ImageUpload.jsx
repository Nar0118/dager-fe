import React, { useState } from "react";
import axios from "axios";
import { Button } from "antd";

import "./styles.css";

const ImageUpload = ({ upload }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");

  const onFileChange = async (e) => {
    setFile(e.target.files[0]);
    // setPreview(URL.createObjectURL(e.target.files[0]));
  // };

  // const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", e.target.files[0]); // This should match the field name in the backend

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setPreview(data.filePath);
      await upload(data.filePath);
      setMessage("File uploaded successfully");
    } catch (err) {
      console.error(11111, err);
      if (err?.response?.status === 500) {
        setMessage("There was a problem with the server");
      } else {
        setMessage(err?.response?.data);
      }
    }
  };

  return (
    <div style={{
        marginBottom: "20px"
    }}>
      <form>
        <div className="formGroup form-group">
          <label htmlFor="imageUpload" className="inputContainera">
            <img
              src="https://ik.imagekit.io/2zlgs27bjo/public/icons/uploadFile.svg"
              alt="uploadFile"
            />
            Upload Image
          </label>
          <input
            id="imageUpload"
            // className={`uploadFileInput uploadFileInput`}
            disabled={!!preview}
            onChange={onFileChange}
            name="file"
            type="file"
          />
        </div>
        {/* <Button
          // onClick={onSubmit}
          style={{
            float: "right",
            marginTop: "20px"
    }}
        >
          Upload
        </Button> */}
      </form>
      <div>{message}</div>
    </div>
  );
};

export default ImageUpload;
