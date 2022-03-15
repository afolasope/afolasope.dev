import React, { Component } from "react";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import db, { storage } from "../../../firebase";
import { MDBCol, MDBContainer, MDBInput, MDBRow } from "mdb-react-ui-kit";
import Select from "react-select";
import AdminHeader from "../../../components/AdminHeader";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Alert from "../../../components/Alert";

export default class Project extends Component {
  // get query form the server side as props
  static async getInitialProps({ query }) {
    return query;
  }

  constructor(props) {
    super(props);
    this.state = {
      project: null,
      stackOptions: [],
      newMainImage: null,
      newScreenShots: {},
      ckeditorReady: false,
      editor: null,
      alert: null,
      stack: "",
    };
    this.editorRef = {};
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    // prepare ckeditor for use
    this.editorRef = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
    this.setState({ ckeditorReady: true });

    // get project with id matching the id query gotten from the server, this gets the the project current state and is used to populate the form fields for update
    const getProject = async () => {
      const docRef = doc(db, "projects", this.props.id);
      const document = await getDoc(docRef);
      const data = { ...document.data() };
      this.setState({ project: data });
    };

    // get skills from the database and map it into react-select option objects
    const getSkills = async () => {
      const skillsRef = collection(db, "skills");
      const getSkills = await getDocs(skillsRef);
      const options = getSkills.docs.map((doc) => ({
        label: doc.data().tech,
        value: doc.data(),
      }));
      this.setState({ stackOptions: options });
    };

    getProject();
    getSkills();
  }

  handleChange(e) {
    this.setState((prevState) => ({
      project: {
        ...prevState.project,
        [e.target.name]: e.target.value,
      },
    }));
  }

  render() {
    const { CKEditor, ClassicEditor } = this.editorRef || {};

    // handleMainImageChange uploads our new main image to firebase storage when the admin selects a new main image, then updates the state with our new main image url which will be stored in the database when the form is submitted
    const handleMainImageChange = async () => {
      if (!this.state.newMainImage) return;

      const imageRef = ref(storage, this.state.newMainImage.name);
      const uploadImage = await uploadBytes(imageRef, this.state.newMainImage);

      getDownloadURL(uploadImage.ref).then((imageUrl) => {
        this.setState((prevState) => ({
          project: {
            ...prevState.project,
            image: imageUrl,
          },
        }));
      });
    };

    // handleScreenshotsChange uploads new screenshots to firebase storage when the admin selects new screenshots, then updates the state with an array of new screnshot urls which will be stored in the database when the form is submitted
    const handleScreenshotsChange = () => {
      const numberOfFiles = this.state.newScreenShots.length;

      const screenshotUrls = []; //screenshot urls would be pushed here after each screenshot is uploaded, which would then be stored in the project state

      try {
        for (const [key, value] of Object.entries(this.state.newScreenShots)) {
          const uploadScreenshot = async (screenshot) => {
            const screenshotRef = ref(storage, screenshot.name);
            const uploadScreenshot = await uploadBytes(
              screenshotRef,
              screenshot
            );

            getDownloadURL(uploadScreenshot.ref).then((screenshorUrl) => {
              screenshotUrls.push({ image: screenshorUrl });
              // update project state when all screenshots has been uploaded
              if (numberOfFiles === screenshotUrls.length) {
                this.setState((prevState) => ({
                  project: {
                    ...prevState.project,
                    screenshots: [
                      ...prevState.project.screenshots,
                      ...screenshotUrls,
                    ],
                  },
                }));
              }
            });
          };

          uploadScreenshot(value);
        }
      } catch (error) {
        this.setState({ alert: { message: error, type: "danger" } });
      }
    };

    // submit the for and save all changes to firestore
    const saveChanges = async (e) => {
      e.preventDefault();

      try {
        const docRef = doc(db, "projects", this.props.id);
        await setDoc(docRef, this.state.project);
        this.setState({ alert: { message: "Saved", type: "success" } });
      } catch (error) {
        this.setState({ alert: { message: error, type: "danger" } });
      }
    };

    return (
      <>
        <AdminHeader />
        <MDBContainer>
          {this.state.project && (
            <form onSubmit={saveChanges}>
              <label className="form-label" htmlFor="mainImage">
                Main image
              </label>
              <br />
              <img
                src={this.state.project.image}
                alt="project screenshot"
                width={"100%"}
              />
              <br />
              <input
                type="file"
                className="form-control"
                id="mainImage"
                name="image"
                onChange={(e) => {
                  this.setState({ newMainImage: e.target.files[0] });
                  handleMainImageChange();
                }}
              />
              <br />
              <MDBInput
                label="Project name"
                id="projectName"
                type="text"
                name="name"
                value={this.state.project.name}
                onChange={this.handleChange}
              />
              <br />
              <MDBInput
                label="Description"
                id="projectDescription"
                textarea
                name="description"
                value={this.state.project.description}
                rows={3}
                onChange={this.handleChange}
              />
              <br />
              <MDBRow>
                {this.state.project.screenshots.map((screenshot) => (
                  <MDBCol
                    key={this.state.project.screenshots.indexOf(screenshot)}
                  >
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
                  this.setState({ newScreenShots: e.target.files });
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
                defaultValue={this.state.project.stack.map((tech) => ({
                  label: tech.tech,
                  value: tech,
                }))}
                options={this.state.stackOptions}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={(values) => {
                  this.setState((prevState) => ({
                    project: {
                      ...prevState.project,
                      stack: values.map((option) => option.value),
                    },
                  }));
                }}
              />

              <br />
              <MDBInput
                label="Github link"
                id="githubLink"
                name="github"
                value={this.state.project.github}
                type="url"
                onChange={this.handleChange}
              />
              <br />
              <MDBInput
                label="Demo link"
                name="demoUrl"
                value={this.state.project.demoUrl}
                id="demoLink"
                type="url"
                onChange={this.handleChange}
              />
              <br />
              {this.state.ckeditorReady && (
                <CKEditor
                  editor={ClassicEditor}
                  data={this.state.project.blog}
                  onReady={(editor) => {
                    // You can store the "editor" and use when it's needed.
                    this.setState({ editor: editor });
                  }}
                  onChange={() => {
                    const data = this.state.editor.getData();
                    this.setState((prevState) => ({
                      project: {
                        ...prevState.project,
                        blog: data,
                      },
                    }));
                  }}
                />
              )}
              <br />
              <MDBInput type="submit" value="Save" />
              <br />
            </form>
          )}
          {this.state.alert && (
            <Alert
              message={this.state.alert.message}
              type={this.state.alert.type}
              close={() => {
                this.setState({ alert: null });
              }}
            />
          )}
        </MDBContainer>
      </>
    );
  }
}
