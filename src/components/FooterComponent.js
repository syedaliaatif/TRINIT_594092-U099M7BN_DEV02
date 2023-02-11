import { Col, Container, Row } from "react-bootstrap";
import "./Footer.css";

const FooterComponent=()=>{
    return (
        <footer className="ste-footer">
            <div className="footer-left">
                <h2>Join the conversation</h2>
            </div>
            <div className="footer-right">
                <div className="carbon">
                 <img src="/wp-content/themes/swdorg/public/images/Lightning-Icon.svg" alt="Website Carbon"></img>   
                 <p class="carbon-text">
                   " This page is loaded in"
                 </p>

                </div>

            </div>
        <Container fluid>
            <Row className="mt-5">
                <Col className="bg-dark text-center text-light py-5">Copyright  &copy; BEST ONLINE SHOP 2022</Col>
            </Row>
        </Container>
        </footer>
    );
}

export default FooterComponent; 