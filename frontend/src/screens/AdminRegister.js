import axios from "axios";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Register } from "../actions/userActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import "./Student.css";
const StudentRegister = ({ history }) => {
  const dispatch = useDispatch();
  const [uploading, setUploading] = useState(false);
  const [valid, setValid] = useState(false);
  const [time, setTime] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [image, setImage] = useState("");
  const uploadFileHandler = async (e) => {
    const { data: CLOUDINARY_URL } = await axios.get("/api/config/cloudinary");

    const { data: CLOUDINARY_UPLOAD_PRESET } = await axios.get(
      "/api/config/cloudinarypreset"
    );

    setTime(true);
    setTimeout(() => {
      setTime(false);
    }, 10000);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    setUploading(true);
    await axios({
      url: CLOUDINARY_URL,
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: formData,
    })
      .then(function (res) {
        setImage(res.data.url);
      })
      .catch(function (err) {
        console.error(err);
      });
    setUploading(false);
    console.log("url is", image);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    setValid(true);
    dispatch(
      Register(
        name,

        email,
        password,
        image
      )
    );
    setName("");
    setPassword("");
    // setImage('')
    setTimeout(() => {
      setValid(false);
    }, 10000);
  };
  const userLogin = useSelector((state) => state.userLogin);
  // const userLogin = useSelector((state) => state.userLogin)

  const { userCred } = userLogin;

  // const studentRegister = useSelector((state) => state.studentRegister)
  const studentRegister = useSelector((state) => state.studentRegister);

  const { loading, success, error } = studentRegister;

  return (
    <div className="container1" style={{ marginTop: "0px" }}>
      {loading ? (
        <Loader />
      ) : (
        <div className="outer-layout">
          <h1>REGISTER ADMIN</h1>
          <form onSubmit={submitHandler}>
            <div className="form-inner">
              <div className="form-control">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-control">
                <label htmlFor="name">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>{" "}
              <div className="form-control">
                <label htmlFor="name">Password</label>
                <input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>{" "}
              {console.log("image url is", image)}
              <div className="form-control">
                <label htmlFor="name">
                  Upload Picture
                  <input
                    className="custom-file-input"
                    onChange={uploadFileHandler}
                    type="file"
                    required
                  />
                </label>
                {uploading && <Loader />}
                {time && image && (
                  <Message
                    variant="success"
                    message="Picture uploaded successfully"
                  />
                )}
              </div>
              {/* <div className="register-btn"> */}
              {/* </div> */}
            </div>
            {success && valid && (
              <Message
                style={{ marginBottom: "3px" }}
                variant="success"
                message={success.message}
              />
            )}

            <button className="btn-register" type="submit">
              Register Admin
            </button>
          </form>
          {valid && error && <Message variant="danger" message={error} />}
        </div>
      )}
    </div>
  );
};

export default StudentRegister;
