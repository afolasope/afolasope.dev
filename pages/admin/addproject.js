import { addDoc, collection, getDocs } from "@firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { async } from "@firebase/util";
import {
  MDBContainer,
  MDBInput,
  MDBNavbar,
  MDBNavbarBrand,
} from "mdb-react-ui-kit";
import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import Alert from "../../components/Alert";
import db, { storage } from "../../firebase";

const AddProject = ({ stackOptions }) => {
  const editorRef = useRef();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [github, setGithub] = useState(null);
  const [demoUrl, setDemoUrl] = useState(null);
  const [blog, setBlog] = useState("");
  const [image, setImage] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  const [stack, setStack] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [editor, setEditor] = useState(null);
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
    setMounted(true);
  });

  const submitForm = async (e) => {
    e.preventDefault();
    if (!name) return;
    if (!description) return;
    if (!github) return;
    if (!demoUrl) return;
    if (!image) return;
    if (!stack) return;

    //upload all images to firebase storage and then get the image url which is then saved to the database
    try {
      // Main image will be uploaded first, if successful other screenshots will then be uploaded
      console.log("uploading image");
      const imageRef = ref(storage, image.name);
      const uploadImage = await uploadBytes(imageRef, image);
      getDownloadURL(uploadImage.ref).then((imageUrl) => {
        const screenshotUrls = [];
        console.log("uploading screenshots");
        try {
          for (const [key, value] of Object.entries(screenshots)) {
            const uploadScreenshot = async (screenshot) => {
              const screenshotRef = ref(storage, screenshot.name);
              const uploadScreenshot = await uploadBytes(
                screenshotRef,
                screenshot
              );
              getDownloadURL(uploadScreenshot.ref).then((screenshorUrl) =>
                screenshotUrls.push(screenshorUrl)
              );
            };

            uploadScreenshot(value);

            // submit form to firestore
            if (screenshots.length === screenshotUrls.length) {
              submitToFirestore(imageUrl, screenshotUrls);
            }
          }
        } catch (error) {
          setAlert({ message: error, type: "danger" });
        }
      });
    } catch (error) {
      setAlert({ message: error, type: "danger" });
    }

    const submitToFirestore = async (imageUrl, screenshotUrls) => {
      console.log("submitting to firestore");
      try {
        addDoc(collection(db, "projects"), {
          name,
          description,
          demoUrl,
          github,
          stack: stack.map((option) => option.value),
          image: imageUrl,
          screenshots: screenshotUrls.map((screenshotUrl) => ({
            image: screenshotUrl,
          })),
          blog,
        });
        setAlert({ message: "Project added", type: "success" });
      } catch (error) {
        setAlert({ message: error, type: "danger" });
      }
    };
  };

  return (
    <>
      <MDBNavbar light bgColor="light">
        <MDBContainer fluid>
          <MDBNavbarBrand>Admin</MDBNavbarBrand>
        </MDBContainer>
      </MDBNavbar>
      <div className="container">
        <form onSubmit={submitForm}>
          <label className="form-label" htmlFor="mainImage">
            Main image
          </label>
          <input
            type="file"
            className="form-control"
            id="mainImage"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
          <br />
          <MDBInput
            label="Project name"
            id="projectName"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <MDBInput
            label="Description"
            id="projectDescription"
            textarea
            rows={3}
            onChange={(e) => setDescription(e.target.value)}
          />
          <br />
          <label className="form-label" htmlFor="screenshots">
            Extra screenshots
          </label>
          <input
            type="file"
            multiple
            className="form-control"
            id="screenshots"
            onChange={(e) => {
              console.log(e.target.files);
              setScreenshots(e.target.files);
            }}
          />
          <br />
          <Select
            isMulti
            name="stack"
            id="long-value-select"
            instanceId="long-value-select"
            options={stackOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={(values) => {
              setStack(values);
            }}
          />
          <br />
          <MDBInput
            label="Github link"
            id="githubLink"
            type="url"
            onChange={(e) => setGithub(e.target.value)}
          />
          <br />
          <MDBInput
            label="Demo link"
            id="demoLink"
            type="url"
            onChange={(e) => setDemoUrl(e.target.value)}
          />
          <br />
          {mounted && (
            <CKEditor
              editor={ClassicEditor}
              data="<p>Little blog about the project</p>"
              onReady={(editor) => {
                // You can store the "editor" and use when it's needed.
                setEditor(editor);
              }}
              onChange={() => {
                const data = editor.getData();
                setBlog(data);
              }}
            />
          )}
          <br />
          <MDBInput type="submit" />
        </form>
        {alert && (
          <Alert
            message={alert.message}
            type={alert.type}
            close={() => {
              setAlert(null);
            }}
          />
        )}
      </div>
    </>
  );
};

export const getServerSideProps = async () => {
  const getSkills = await getDocs(collection(db, "skills"));
  const skills = getSkills.docs.map((doc) => ({
    label: doc.data().name,
    value: doc.data(),
  }));

  return {
    props: {
      stackOptions: skills,
    },
  };
};

export default AddProject;
