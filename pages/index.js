import {
  MDBCarousel,
  MDBCarouselElement,
  MDBCarouselInner,
  MDBCarouselItem,
} from "mdb-react-ui-kit";
import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Afeez G. Lawal</title>
        <meta name="description" content="Frontend engineer" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://use.fontawesome.com/releases/v5.15.1/css/all.css"
          rel="stylesheet"
        />
      </Head>

      <div className="header">
        <header>
          <div className="image-container">
            <img src="/gbolahan.jpg" alt="image" />
          </div>
          <div className="info">
            <h1>Hi,</h1>
            <h1>I'm Afeez G. Lawal</h1>
            <p>
              A highly motivated web developer with a passion for coding and
              embracing challenges. On a journey of professional growth, I am
              open to learning from and collaborating with other creatives.
            </p>
          </div>
        </header>
      </div>
      <div className="container skillset" id="skillset">
        <h1 className="heading">Technical Skills</h1>
        <div className="skills">
          <div className="skill">
            <i className="fab fa-html5 html"></i>
            <h4>html5</h4>
          </div>
          <div className="skill">
            <i className="fab fa-css3-alt css"></i>
            <h4>css3</h4>
          </div>
          <div className="skill">
            <img src="/images/logo-javascript.svg" alt="Javascript icon" />
            <h4>javascript</h4>
          </div>
          <div className="skill">
            <img src="/images/python-5.svg" alt="Python icon" />
            <h4>python</h4>
          </div>
          <div className="skill">
            <image src="/images/django.svg" alt="Django logo" />
            <h4>django</h4>
          </div>
          <div className="skill">
            <img src="/images/bootstrap-4.svg" alt="Bootstrap icon" />
            <h4>bootstrap</h4>
          </div>
        </div>
      </div>
      <div className="container projects" id="projects">
        <h2 className="heading">Live Projects</h2>
        <div className="grids">
          <div className="grid project">
            <div className="grid-img">
              <MDBCarousel showControls>
                <MDBCarouselInner>
                  <MDBCarouselItem className="active">
                    <MDBCarouselElement src="/images/djecomm1.png" alt="..." />
                  </MDBCarouselItem>
                  <MDBCarouselItem>
                    <MDBCarouselElement src="/images/djecomm2.png" alt="..." />
                  </MDBCarouselItem>
                </MDBCarouselInner>
              </MDBCarousel>
            </div>
            <div className="grid-body">
              <div className="site-info">
                <h4>Fabric Shop</h4>
                <p>
                  A one stop shop for stylists and fashion designers to buy
                  clothing materials. Ready to wear (ready-made) clothes are
                  also available for interested customers.
                </p>
              </div>
              <div className="stack">
                <img
                  src="/images/python-5.svg"
                  alt="Python icon"
                  className="img-icon"
                />{" "}
                <img
                  src="/images/django.svg"
                  alt="Django logo"
                  className="img-icon"
                />{" "}
                <i className="fab fa-html5 html"></i>{" "}
                <i className="fab fa-css3-alt css"></i>{" "}
                <img
                  src="/images/logo-javascript.svg"
                  alt="Javascript icon"
                  className="img-icon"
                />
              </div>
              <a
                href="https://github.com/AfeezGL/django-ecommerce-app"
                target="_blank"
              >
                <i className="fab fa-github"></i>code
              </a>
              <a
                href="https://prj-django-ecomm.herokuapp.com/"
                target="_blank"
                className="btn site-link"
              >
                View site
              </a>
            </div>
          </div>
          <div className="grid project">
            <div className="grid-img">
              <Image
                src="/images/blog.png"
                alt="Project screenshot"
                className="display"
                width="100%"
                height="100%"
              />
              <Image
                src="/images/blogposts.png"
                alt="Project screenshot"
                className="display"
                width="100%"
                height="100%"
              />
              <Image
                src="/images/blogpost.png"
                alt="Project screenshot"
                className="display"
                width="100%"
                height="100%"
              />
            </div>
            <div className="grid-body">
              <div className="site-info">
                <h3>Django Blog</h3>
                <p>
                  A simple blog app created with the Django framework just to
                  check how fast I can plug an app into a template. Well, it was
                  a quick one.
                </p>
              </div>
              <div className="stack">
                <Image
                  src="/images/python-5.svg"
                  alt="Python icon"
                  className="img-icon"
                  height={19}
                  width={19}
                />
                <Image
                  src="/images/django.svg"
                  alt="Django logo"
                  className="img-icon"
                  height={19}
                  width={19}
                />{" "}
                <i className="fab fa-html5 html"></i>{" "}
                <i className="fab fa-css3-alt css"></i>{" "}
                <Image
                  src="/images/logo-javascript.svg"
                  alt="Javascript icon"
                  className="img-icon"
                  height={19}
                  width={19}
                />
              </div>
              <a
                href="https://github.com/AfeezGL/django-blog-app"
                target="_blank"
              >
                <i className="fab fa-github"></i>code
              </a>
              <a
                href="https://prj-django-blog.herokuapp.com"
                target="_blank"
                className="btn site-link"
              >
                View site
              </a>
            </div>
          </div>
          <div className="grid project simi">
            <div className="grid-img">
              <Image
                src="/images/simi.png"
                alt="Project screenshot"
                className="display"
                width="100%"
                height="100%"
              />
              <Image
                src="/images/simiplans.png"
                alt="Project screenshot"
                className="display"
                width="100%"
                height="100%"
              />
              <Image
                src="/images/simicontact.png"
                alt="Project screenshot"
                className="display"
                width="100%"
                height="100%"
              />
            </div>
            <div className="grid-body">
              <div className="site-info">
                <h3>Simi</h3>
                <p>
                  A colour rich mobile responsive landing page website for a
                  Nigerian based rice production company.
                </p>
              </div>
              <div className="stack">
                <i className="fab fa-html5 html"></i>{" "}
                <i className="fab fa-css3-alt css"></i>
              </div>
              <a href="https://github.com/AfeezGL/simi" target="_blank">
                <i className="fab fa-github"></i>code
              </a>
              <a
                href="http://simi-redesign.netlify.app"
                target="_blank"
                className="btn site-link"
              >
                View site
              </a>
            </div>
          </div>
          <div className="grid project">
            <div className="grid-img">
              <Image
                src="/images/hello-fetch.png"
                alt="Project screenshot"
                className="display"
                width="100%"
                height="100%"
              />
            </div>
            <div className="grid-body">
              <div className="site-info">
                <h4>Github API Search</h4>
                <p>
                  Just a fun little one page website that searches github for a
                  given username and returns a little thing about the user using
                  Fetch API
                </p>
              </div>
              <div className="stack">
                <i className="fab fa-html5 html"></i>{" "}
                <i className="fab fa-css3-alt css"></i>{" "}
                <Image
                  src="/images/logo-javascript.svg"
                  alt="Javascript icon"
                  className="img-icon"
                  height={19}
                  width={19}
                />
                <i className="fab fa-bootstrap bootstrap"></i>
              </div>
              <a href="https://github.com/AfeezGL/hello-fetch" target="_blank">
                <i className="fab fa-github"></i>code
              </a>
              <a
                href="https://afeezgl.github.io/hello-fetch"
                target="_blank"
                className="btn site-link"
              >
                View site
              </a>
            </div>
          </div>
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
