import { Alert, Button, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

export default function DashProfile() {
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(0);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  const filePickerRef = useRef();

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = () => {
    // Reset previous errors and progress
    setImageFileUploadError(null);
    setImageFileUploadProgress(0);

    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setImageFileUploadProgress(progress);
      },
      (error) => {
        // Handle upload error
        setImageFileUploadError(
          "Could not upload image (File must be less than 2MB)"
        );
        // Reset state related to file upload
        setImageFile(null);
        setImageFileUrl(null);
      },
      () => {
        // Upload completed successfully
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            setImageFileUrl(downloadURL);
          })
          .catch((error) => {
            setImageFileUploadError("Could not get image download URL");
          });
      }
    );
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-8 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-3">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadProgress > 0 && (
            <CircularProgressbar
              value={imageFileUploadProgress}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(50, 50, 50, ${imageFileUploadProgress / 100})`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="User Image"
            className={`rounded-full w-full h-full object-cover border-8 border-[#26235b62] ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              "opacity-35"
            }`}
          />
        </div>
        {/* File upload error handling */}
        {imageFileUploadError && (
          <Alert color="failure">{imageFileUploadError}</Alert>
        )}
        <TextInput
          placeholder="Username"
          id="username"
          type="text"
          defaultValue={currentUser.username}
        />
        <TextInput
          placeholder="Email"
          id="email"
          type="email"
          defaultValue={currentUser.email}
        />
        <TextInput placeholder="Password" id="password" type="password" />
        <Button type="submit" gradientDuoTone="purpleToPink" outline>
          Update
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-7">
        <span>Delete Account</span>
        <span>Sign Out</span>
      </div>
      {/* Display upload progress */}
      {imageFileUploadProgress > 0 && (
        <div className="text-gray-500 text-sm">
          Update Progress: {`${imageFileUploadProgress}% Uploaded`}
        </div>
      )}
    </div>
  );
}
