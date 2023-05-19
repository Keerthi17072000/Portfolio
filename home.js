import Container from 'react-bootstrap/Container';
import NavbarBrand from 'react-bootstrap/esm/NavbarBrand';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import NavLink from 'react-bootstrap/esm/NavLink';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Carousel from 'react-bootstrap/Carousel'
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import "./home.css"
import Button from 'react-bootstrap/esm/Button';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import ProgressBar from 'react-bootstrap/ProgressBar'
import Accordion from 'react-bootstrap/Accordion'
import React, { useState } from 'react';
import {Link} from 'react-scroll'
import Offcanvas from 'react-bootstrap/Offcanvas'
import OffcanvasHeader from 'react-bootstrap/esm/OffcanvasHeader';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHouse,faBriefcase,faLocationDot,faCalendar,faEnvelope,faPhone,faP,} from '@fortawesome/free-solid-svg-icons'
function Home(){

  const [show,  setshow] = useState(false);

  const handleshow =()=>{

    setshow(true);
  }
  const handlehide =()=>{

    setshow(false);
  }
return(

<>

<Navbar bg="primary"  expand="md">
<Container>
<NavbarBrand><FontAwesomeIcon icon={faP} />  Portfolio</NavbarBrand>
<NavbarToggle/>
<NavbarCollapse > 
  <Nav className='ms-auto me-5'>
    <NavLink><FontAwesomeIcon icon={faHouse} /> Home</NavLink>
    <NavDropdown title="About" className='text-white dropdown-fade'>
     <NavDropdown.Item ><Link to="skills" spy={true} smooth={true} offset={-100} duration={500}>Skills</Link></NavDropdown.Item>
     <NavDropdown.Item><Link to="qualification" spy={true} smooth={true} offset={-100} duration={500}>Qualification</Link></NavDropdown.Item>
     <NavDropdown.Item><Link to="projects" spy={true} smooth={true} offset={-100} duration={500}>projects</Link></NavDropdown.Item>
     <NavDropdown.Item><Link to="personal details" spy={true} smooth={true} offset={10} duration={600}>personal details</Link></NavDropdown.Item>
    </NavDropdown>
    <NavDropdown title="contact" className=''>
      <DropdownItem><FontAwesomeIcon icon={faEnvelope}/><small> Keerthivasan@gmail.com</small></DropdownItem>
      <DropdownItem><FontAwesomeIcon icon={faPhone}/><small> 9894240128</small></DropdownItem>
    </NavDropdown>
  </Nav>
</NavbarCollapse>
</Container>
</Navbar>

<div className='bg-img ' expand="md" >
  <Container className='text-white ' expand="md">
  <Row className='content'>
    <Col md={6}>
      <h1>I am a Web Developer</h1>
      <p>	A fresher Software Developer in Design, Development and Implementation of Website and Android applications using technologies HTML, CSS, Java script, React.js Having knowledge in creating Responsive web page creation.</p>
      <Button onClick={handleshow} type='button' className='bs-5'>About me</Button>
      <Offcanvas className="bg-dark text-white" show={show} onHide={handlehide}>
<Offcanvas.Header closeButton>
  <Offcanvas.Title>About me</Offcanvas.Title>
</Offcanvas.Header>
<Offcanvas.Body>
  <h3>Keerthivasan.R</h3>
  <small>Web Developer/Job seeker/Fresher</small>
  <Card className='text-dark mt-5'>
    <Card.Title className='my-3 ms-3'>Basic details</Card.Title>
    <Card.Body className='bg-dark text-white'>
      <ul>
        <li><FontAwesomeIcon icon={faBriefcase} /> Fresher</li>
        <li><FontAwesomeIcon icon={faLocationDot} /> perambalur,India</li>
        <li><FontAwesomeIcon icon={faCalendar} /> Available to join in 15 days or less</li>
        <li><FontAwesomeIcon icon={faEnvelope} /> Keerthivasan17072000@gmail.com</li>
        <li><FontAwesomeIcon icon={faPhone} /> 9894240128</li>
      </ul>
    </Card.Body>
  </Card>
</Offcanvas.Body>

      </Offcanvas>
    </Col>
  </Row>
  </Container>
</div>
<h1 className='mt-5 text-center under'>Skills</h1>
<Row className='ms-5 p-auto'>
  <Col md={2}>
<Card className=' my-5 ms-5 h-70 card-img' id='skills' style={{ width: '12rem' }}>
<Card.Img className='my-1 img' variant='top' src="https://cdn-icons-png.flaticon.com/512/732/732212.png"></Card.Img>
<Card.Body className='bg-dark text-white'>
  <Card.Title>Technical Skills</Card.Title>
  <Card.Text>HTML(Hypertext markup language)</Card.Text>
</Card.Body>
</Card>
</Col>
<Col md={2}>
<Card className=' my-5 ms-5 card-img' style={{ width: '12rem'}}>
<Card.Img className='my-1 img' variant='top' src="https://brandeps.com/logo-download/C/CSS-3-logo-vector-01.svg"></Card.Img>
<Card.Body className='bg-dark text-white'>
  <Card.Title>Technical Skills</Card.Title>
  <Card.Text>Css (cascadind style sheet)</Card.Text>
</Card.Body>
</Card>
</Col>
<Col md={2}>
<Card className=' my-5 ms-5 h-70 card-img' style={{ width: '12rem' }}>
<Card.Img className='my-1 img' variant='top' src="https://www.freepnglogos.com/uploads/javascript/javascript-online-logo-for-website-0.png"></Card.Img>
<Card.Body className='bg-dark text-white'>
  <Card.Title>Technical Skills</Card.Title>
  <Card.Text>Javascript</Card.Text>
</Card.Body>
</Card>
</Col>
<Col md={2}>
<Card className=' my-5 ms-5 h-50 card-img' style={{ width: '12rem' }}>
<Card.Img className='my-1 img1' variant='top' src="https://www.shareicon.net/download/2016/07/10/119874_apps_512x512.png"></Card.Img>
<Card.Body className='bg-dark text-white'>
  <Card.Title>Technical Skills</Card.Title>
  <Card.Text>React.js</Card.Text>
</Card.Body>
</Card>
</Col>
<Col md={2}>
<Card className=' my-5 ms-5 h-50 card-img' style={{ width: '12rem' }}>
<Card.Img className='my-1 img1' variant='top' src="https://img.freepik.com/premium-vector/bootstrap-icon-b-letter-logo_781017-7.jpg"></Card.Img>
<Card.Body className='bg-dark text-white'>
  <Card.Title>Technical Skills</Card.Title>
  <Card.Text>Bootstrap</Card.Text>
</Card.Body>
</Card>
</Col>
</Row>
<h1 className='my-5 text-center'>Qualification</h1>
 <Carousel id='qualification' >
<Carousel.Item expand="md">
  <img src='https://www.peripherydigital.com/wp-content/uploads/2021/10/922683_SalesWpBanner2000px_121620.png' className='d-block w-100 ' alt='first slide'></img>
  <Carousel.Caption expand="md">
    <h3>	Bachelor of Engineering (B.E-CSE) </h3>
    <p>At M.A.M College of Engineering and Technology in Trichy.</p>
    <Badge className="bg-success">CGPA : 7.53</Badge>
  </Carousel.Caption>
</Carousel.Item>
<Carousel.Item expand="md">
  <img src='https://www.peripherydigital.com/wp-content/uploads/2021/10/922683_SalesWpBanner2000px_121620.png' className='d-block w-100' alt='second slide'></img>
  <Carousel.Caption expand="md">
    <h3>Class 12th at St.joseph’s Matricultion.Hr.Sec.School in perambalur</h3>
    <Badge className="bg-success">Percentage: 66%</Badge>
  </Carousel.Caption>
</Carousel.Item>
<Carousel.Item expand="md">
  <img src='https://www.peripherydigital.com/wp-content/uploads/2021/10/922683_SalesWpBanner2000px_121620.png' className='d-block w-100' alt='third slide'></img>
  <Carousel.Caption expand="md">
    <h3>Class 10th at St.joseph’s Matricultion.Hr.Sec.School in perambalur</h3>
    <Badge className="bg-success">Percentage: 86%</Badge>
  </Carousel.Caption>
</Carousel.Item>
</Carousel>

<h1 className='mt-5 text-center'>projects</h1>
<Container expand='md'>
  <Card id='projects' className='mt-5 bg-dark text-white'>
    <Row>
      <Col md={4}>
        <img className='card-img hcard' src='https://www.skoolbeep.com/blog/wp-content/uploads/2020/12/WHAT-IS-THE-PURPOSE-OF-A-LIBRARY-MANAGEMENT-SYSTEM-min.png' ></img>
      </Col>
     <Col md={8}>
      <Card.Title className='mt-2'>Library Management System</Card.Title>
      <Card.Body className='card-hower'>
      It manages and stores books information electronically according to students needs. It allows both staff and the student to search for desired book. It useful for admin to keep a continuous check on the books issued and returned details and also calculate fine as a automatically.
      </Card.Body>
      </Col>
      </Row>
      </Card>
      <Card className='mt-5 bg-dark text-white'>
        <Row>
      <Col md={4}>
        <img className='card-img hcard' src='https://play-lh.googleusercontent.com/EJPEdk8Jl0Qp1NZ_WpeGrMjcB0tKyF1ZDlHO_8785J-JAr7jqGRgoRwxCUptLhYQ2LQ=w3840-h2160-rw'></img>
      </Col>
     <Col md={8}>
      <Card.Title className='mt-2'>Expense Tracker</Card.Title>
      <Card.Body className='card-hower'>
      Expense Tracker this project is about calculating the income,expenses of the user and also show the transaction history of the user and this project is developed by using the react.js 
      </Card.Body>
      </Col>
      </Row>
      </Card>
      <Card className='mt-5 bg-dark text-white'>
        <Row>
      <Col md={4}>
        <img className='card-img hcard' src='https://mycodelesswebsite.com/wp-content/uploads/2022/02/F-Modern-Furniture-Website-Example.jpg'></img>
      </Col>
     <Col md={8}>
      <Card.Title className='mt-2'>Furniwoods</Card.Title>
      <Card.Body className='card-hower'>
      It is a furniture website and its used for viewing the modern furniture design and also used to buy a needed furniture items through this website and this website is totally developed by using HTML&CSS.
      </Card.Body>
      </Col>
      </Row>
      </Card>
      <Card className='mt-5 bg-dark text-white'>
        <Row>
      <Col md={4}>
        <img className='card-img hcard ' src='https://www.fortech.ro/wp-content/uploads/2020/09/Interoperability-in-Healthcare_EHR.jpg'></img>
      </Col>
     <Col md={8}>
      <Card.Title className='mt-2'>Communication application for medical sector</Card.Title>
      <Card.Body className='card-hower'>
      It’s a mobile based health care application to developed community based interaction between medical student and medical experts like social network application, and also providing a platform for tweeting, short messaging, posting medical news among healthcare professionals.
      </Card.Body>
      </Col>
      </Row>
      </Card>
</Container>

<h1 className='mt-5 text-center'>personal details</h1>
<Container>
  <Card id='personal details' className='mt-5 bg-info'>
    <Row>
      <Col md={6}>
        <Carousel>
          <Carousel.Item>
        <img className='card-img mt-4 ms-3 ' src='https://media.istockphoto.com/id/1137470880/vector/people-vector-illustration-flat-cartoon-character-landing-page-template.jpg?s=612x612&w=0&k=20&c=_HPRNiholF1vID12DPaip2xqGJYBQmQvB4wXZ4psES8='></img>
        </Carousel.Item>
        <Carousel.Item>
        <img className='card-img mt-4 ms-3 ' src='https://media.istockphoto.com/id/1137470880/vector/people-vector-illustration-flat-cartoon-character-landing-page-template.jpg?s=612x612&w=0&k=20&c=_HPRNiholF1vID12DPaip2xqGJYBQmQvB4wXZ4psES8='></img>
        </Carousel.Item>
        <Carousel.Item>
        <img className='card-img mt-4 ms-3 ' src='https://media.istockphoto.com/id/1137470880/vector/people-vector-illustration-flat-cartoon-character-landing-page-template.jpg?s=612x612&w=0&k=20&c=_HPRNiholF1vID12DPaip2xqGJYBQmQvB4wXZ4psES8='></img>
        </Carousel.Item>
        </Carousel>
        <Col className='ms-5 mt-5'>
         <h4>certification</h4>
         <Col md={2}>
          
         </Col>
         <Col md={4}>
         <h5>Frontend Developer</h5>
         <h6>Besant Technology</h6>
         </Col>
         </Col>
      </Col>
      <Col md={6}>
        <Card.Body>
          <Card className='bg-dark text-white'>
          <Card.Body>
            <h4>personal details</h4>
            <h6 className='text-muted'>Name</h6>
             R.keerthivasan
             <h6 className='text-muted'>Gender</h6>
            Male, single/unmarried
            <h6 className='text-muted'>Date of birth</h6>
            17 jul 2000
            <h6 className='text-muted'>Career break</h6>
             No
             <h6 className='text-muted'>Work permit</h6>
             India
             <h6 className='text-muted'>Address</h6>
             51,small south street perambalur <br></br>
          </Card.Body>
          </Card>
          <Card className='mt-2 bg-dark text-white'>
            <Card.Body>
              <h4>Language</h4>
              <h6>English</h6>
              <small className='text-muted'>Read/Write/Speak</small>
              <h6>Tamil</h6>
              <small className='text-muted'>Read/Write/Speak</small>
            </Card.Body>
          </Card>
        </Card.Body>
      </Col>
    </Row>
  </Card>
</Container>


</>
 

);


}
export default Home;