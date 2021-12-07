import {
  MDBContainer,
  MDBInput,
  MDBNavbar,
  MDBNavbarBrand,
} from "mdb-react-ui-kit";
import React, { useEffect, useRef, useState } from "react";

const AddProject = () => {
  const editorRef = useRef();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [github, setGithub] = useState(null);
  const [demo, setDemo] = useState(null);
  const [blog, setBlog] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [editor, setEditor] = useState(null);
  const { CKEditor, ClassicEditor } = editorRef.current || {};

  useEffect(() => {
    editorRef.current = {
      // CKEditor: require('@ckeditor/ckeditor5-react'), // depricated in v3
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
    setMounted(true);
  });

  return (
    <>
      <MDBNavbar light bgColor="light">
        <MDBContainer fluid>
          <MDBNavbarBrand>Admin</MDBNavbarBrand>
        </MDBContainer>
      </MDBNavbar>
      <div className="container">
        <form>
          <MDBInput label="Project name" id="projectName" type="text" />
          <br />
          <MDBInput label="Description" id="projectDescription" type="text" />
          <br />
          <MDBInput label="Github link" id="githubLink" type="url" />
          <br />
          <MDBInput label="Demo link" id="demoLink" type="url" />
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
        </form>
      </div>
    </>
  );
};

export default AddProject;
