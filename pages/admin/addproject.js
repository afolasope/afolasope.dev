import { getAuth } from "@firebase/auth";
import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from "@firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { MDBCheckbox, MDBInput } from "mdb-react-ui-kit";
import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import AdminHeader from "../../components/AdminHeader";
import Alert from "../../components/Alert";
import Login from "../../components/Login";
import Spinner from "../../components/Spinner";
import db, { storage } from "../../firebase";

const AddProject = ({ stackOptions }) => {
  const editorRef = useRef();
  const [user, setUser] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [github, setGithub] = useState(null);
  const [demoUrl, setDemoUrl] = useState(null);
  const [blog, setBlog] = useState("");
  const [image, setImage] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  const [stack, setStack] = useState(null);
  const [isNative, setIsNative] = useState(false);
  const [ckeditorReady, setCkeditorReady] = useState(false);
  const [editor, setEditor] = useState(null);
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    let mounted = true;
    const auth = getAuth();
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };

    if (mounted) {
      setCkeditorReady(true);
    }

    auth.onAuthStateChanged((response) => {
      if (mounted) {
        setUser(response);
        setLoaded(true);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

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
      const imageRef = ref(storage, `${Date.now()} ${image.name}`);
      const uploadImage = await uploadBytes(imageRef, image);
      getDownloadURL(uploadImage.ref).then((imageUrl) => {
        const screenshotUrls = [];
        console.log("uploading screenshots");
        try {
          for (const [key, value] of Object.entries(screenshots)) {
            const uploadScreenshot = async (screenshot) => {
              const screenshotRef = ref(
                storage,
                `${Date.now()} ${screenshot.name}`
              );
              const uploadScreenshot = await uploadBytes(
                screenshotRef,
                screenshot
              );
              getDownloadURL(uploadScreenshot.ref).then((screenshorUrl) => {
                screenshotUrls.push(screenshorUrl);
                // submit form to firestore
                if (screenshots.length === screenshotUrls.length) {
                  submitToFirestore(imageUrl, screenshotUrls);
                }
              });
            };

            uploadScreenshot(value);
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
          isNative,
          blog,
          timestamp: serverTimestamp(),
        });
        setAlert({ message: "Project added", type: "success" });
      } catch (error) {
        setAlert({ message: error, type: "danger" });
      }
    };
  };

  if (user && loaded)
    return (
      <>
        <AdminHeader />
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
            <label className="form-label" htmlFor="long-value-select">
              Select stack
            </label>
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
            <MDBCheckbox
              name="flexCheck"
              value={isNative}
              id="flexCheckDefault"
              label="Native app"
              onChange={() => {
                setIsNative(!isNative);
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
            {ckeditorReady && (
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

  if (loaded) return <Login />;

  return <Spinner />;
};

export const getServerSideProps = async () => {
  const getSkills = await getDocs(collection(db, "skills"));
  const skills = getSkills.docs.map((doc) => ({
    label: doc.data().tech,
    value: doc.data(),
  }));

  return {
    props: {
      stackOptions: skills,
    },
  };
};

export default AddProject;
