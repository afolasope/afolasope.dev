import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import db, { storage } from "../../../firebase";
import { MDBCol, MDBContainer, MDBInput, MDBRow } from "mdb-react-ui-kit";
import Select from "react-select";
import AdminHeader from "../../../components/AdminHeader";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Alert from "../../../components/Alert";

const Project = () => {
  const router = useRouter();
  const { id } = router.query;
  const [project, setProject] = useState(null);
  const [stackOptions, setStackOptions] = useState([]);
  const [newMainImage, setNewMainImage] = useState(null);
  const [newScreenShots, setNewScreenShots] = useState({});
  const editorRef = useRef();
  const [user, setUser] = useState(null);
  const [ckeditorReady, setCkeditorReady] = useState(false);
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  const [editor, setEditor] = useState(null);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    let mounted = true;

    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
    setCkeditorReady(true);

    const getProject = async () => {
      const docRef = doc(db, "projects", id);
      const document = await getDoc(docRef);
      if (mounted) {
        const data = { ...document.data() };
        setProject(data);
      }
    };

    // get skills from the database and map it into react-select option objects
    const getSkills = async () => {
      const skillsRef = collection(db, "skills");
      const getSkills = await getDocs(skillsRef);
      const options = getSkills.docs.map((doc) => ({
        label: doc.data().tech,
        value: doc.data(),
      }));
      setStackOptions(options);
    };

    getProject();
    getSkills();

    return () => {
      mounted = false;
    };
  }, []);

  const changeProjectState = (e) => {
    setProject((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleMainImageChange = async () => {
    if (!newMainImage) return;

    const imageRef = ref(storage, newMainImage.name);
    const uploadImage = await uploadBytes(imageRef, newMainImage);

    getDownloadURL(uploadImage.ref).then((imageUrl) => {
      setProject((prevState) => ({
        ...prevState,
        image: imageUrl,
      }));
    });
  };

  const handleScreenshotsChange = () => {
    const numberOfFiles = newScreenShots.length;

    const screenshotUrls = []; //screenshot urls would be pushed here after each screenshot is uploaded, which would then be stored in the project state

    try {
      for (const [key, value] of Object.entries(newScreenShots)) {
        const uploadScreenshot = async (screenshot) => {
          const screenshotRef = ref(storage, screenshot.name);
          const uploadScreenshot = await uploadBytes(screenshotRef, screenshot);

          getDownloadURL(uploadScreenshot.ref).then((screenshorUrl) => {
            screenshotUrls.push({ image: screenshorUrl });

            // update project state when all screenshots has been uploaded
            if (numberOfFiles === screenshotUrls.length) {
              setProject((prevState) => ({
                ...prevState,
                screenshots: [...prevState.screenshots, ...screenshotUrls],
              }));
            }
          });
        };

        uploadScreenshot(value);
      }
    } catch (error) {
      setAlert({ message: error, type: "danger" });
    }
  };

  const saveChanges = async (e) => {
    e.preventDefault();

    try {
      const docRef = doc(db, "projects", id);
      await setDoc(docRef, project);
      setAlert({ message: "Saved", type: "success" });
    } catch (error) {
      setAlert({ message: error, type: "danger" });
    }
  };

  return (
    <>
      <AdminHeader />
      <MDBContainer>
        {project && (
          <form onSubmit={saveChanges}>
            <label className="form-label" htmlFor="mainImage">
              Main image
            </label>
            <br />
            <img src={project.image} alt="project screenshot" width={"100%"} />
            <br />
            <input
              type="file"
              className="form-control"
              id="mainImage"
              name="image"
              onChange={(e) => {
                setNewMainImage(e.target.files[0]);
                handleMainImageChange();
              }}
            />
            <br />
            <MDBInput
              label="Project name"
              id="projectName"
              type="text"
              name="name"
              value={project.name}
              onChange={changeProjectState}
            />
            <br />
            <MDBInput
              label="Description"
              id="projectDescription"
              textarea
              name="description"
              value={project.description}
              rows={3}
              onChange={changeProjectState}
            />
            <br />
            <MDBRow>
              {project.screenshots.map((screenshot) => (
                <MDBCol key={project.screenshots.indexOf(screenshot)}>
                  <img
                    src={screenshot.image}
                    alt="Project screenshot"
                    width={"100%"}
                  />
                </MDBCol>
              ))}
            </MDBRow>
            <label className="form-label" htmlFor="screenshots">
              Extra screenshots
            </label>
            <input
              type="file"
              multiple
              className="form-control"
              id="screenshots"
              name="screenshots"
              onChange={(e) => {
                setNewScreenShots(e.target.files);
                handleScreenshotsChange();
              }}
            />
            <br />
            <label className="form-label" htmlFor="stack">
              Stack
            </label>
            <Select
              isMulti
              name="stack"
              id="long-value-select"
              instanceId="long-value-select"
              defaultValue={project.stack.map((tech) => ({
                label: tech.tech,
                value: tech,
              }))}
              options={stackOptions}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={(values) => {
                setProject((prevState) => ({
                  ...prevState,
                  stack: values.map((option) => option.value),
                }));
              }}
            />

            <br />
            <MDBInput
              label="Github link"
              id="githubLink"
              name="github"
              value={project.github}
              type="url"
              onChange={changeProjectState}
            />
            <br />
            <MDBInput
              label="Demo link"
              name="demoUrl"
              value={project.demoUrl}
              id="demoLink"
              type="url"
              onChange={changeProjectState}
            />
            <br />
            {ckeditorReady && (
              <CKEditor
                editor={ClassicEditor}
                data={project.blog}
                onReady={(editor) => {
                  // You can store the "editor" and use when it's needed.
                  setEditor(editor);
                }}
                onChange={() => {
                  const data = editor.getData();
                  setProject((prevState) => ({
                    ...prevState,
                    blog: data,
                  }));
                }}
              />
            )}
            <br />
            <MDBInput type="submit" value="Save" />
            <br />
          </form>
        )}
        {alert && (
          <Alert
            message={alert.message}
            type={alert.type}
            close={() => {
              setAlert(null);
            }}
          />
        )}
      </MDBContainer>
    </>
  );
};

export default Project;
