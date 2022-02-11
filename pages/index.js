import {
  MDBCarousel,
  MDBCarouselElement,
  MDBCarouselInner,
  MDBCarouselItem,
} from "mdb-react-ui-kit";
import { collection, getDocs } from "@firebase/firestore";
import db from "../firebase";
import safeJsonStringify from "safe-json-stringify";

export default function Home({ skills, projects }) {
  return (
    <div>
      <div className="header">
        <header>
          <div className="image-container">
            <img src="/gbolahan.jpg" alt="image" />
          </div>
          <div className="info">
            <h1>Hi, I&apos;m Afeez</h1>
            <p>
              And I build amazing stuff on the web by converting ideas from
              pixels to pixel perfect, scalable web applications
            </p>
            <a className="contact-me" href="mailto: afeezlg@gmail.com">
              Contact me
            </a>
          </div>
        </header>
      </div>
      <div className="container skillset" id="skillset">
        <h1 className="heading">Technical Skills</h1>
        <div className="skills">
          {skills.map((skill) => (
            <div className="skill" key={skills.id}>
              <img src={skill.data.icon} alt={`${skill.data.tech} icon`} />
              <h4>{skill.data.tech}</h4>
            </div>
          ))}
        </div>
      </div>
      <div className="container projects" id="projects">
        <h2 className="heading">Live Projects</h2>
        <div className="grids">
          {projects.map((project) => (
            <div className="grid project" key={project.id}>
              <div className="grid-img">
                <MDBCarousel showControls>
                  <MDBCarouselInner>
                    <MDBCarouselItem className="active">
                      <MDBCarouselElement
                        src={project.data.image}
                        alt="Project Screenshot"
                        className="project-screenshot"
                      />
                    </MDBCarouselItem>
                    {project.data.screenshots.map((screenshot) => (
                      <MDBCarouselItem
                        key={project.data.screenshots.indexOf(screenshot)}
                      >
                        <MDBCarouselElement
                          src={screenshot.image}
                          alt="Project Screenshot"
                          className="project-screenshot"
                        />
                      </MDBCarouselItem>
                    ))}
                  </MDBCarouselInner>
                </MDBCarousel>
              </div>
              <div className="grid-body">
                <div className="site-info">
                  <h4>{project.data.name}</h4>
                  <p>{project.data.description}</p>
                </div>
                <div className="stack">
                  {project.data.stack.map((tech) => (
                    <img
                      src={tech.icon}
                      height={25}
                      alt={`${tech.tech} icon`}
                      className="img-icon"
                      key={project.data.stack.indexOf(tech)}
                    />
                  ))}
                </div>
                <a
                  href={project.data.github}
                  target="_blank"
                  rel="noreferrer"
                  className="github-link"
                >
                  <i className="fab fa-github"></i>code{"  "}
                  <i className="fas fa-external-link-alt"></i>
                </a>
                {project.data.isNative ? (
                  <a
                    href={project.data.demoUrl}
                    download
                    className="btn site-link"
                  >
                    Download app
                  </a>
                ) : (
                  <a
                    href={project.data.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn site-link"
                  >
                    View site
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="container" id="contact">
        <div className="contact">
          <h2>Contact me:</h2>
          <div className="contact-links">
            <a href="mailto: afeezlg@gmail.com">
              <i className="fas fa-envelope"></i>Email
            </a>
            <a href="https://twitter.com/AfeezGL">
              <i className="fab fa-twitter"></i>Twitter
            </a>
            <a href="https://github.com/AfeezGL">
              <i className="fab fa-github"></i>Github
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  // get skills from database
  const skillsref = await getDocs(collection(db, "skills"));
  const skills = skillsref.docs.map((doc) => ({
    id: doc.id,
    data: JSON.parse(safeJsonStringify(doc.data())),
  }));
  // get projects from firebase
  const projectsRef = await getDocs(collection(db, "projects"));
  const projects = projectsRef.docs.map((doc) => ({
    id: doc.id,
    data: JSON.parse(safeJsonStringify(doc.data())),
  }));
  return {
    props: {
      projects,
      skills,
    },
  };
};
