import { Col, Container, Row } from "react-bootstrap";

const footer=()=>{
    return (
        <footer>
        <Container fluid>
            <Row className="mt-5">
                <Col className="bg-dark text-center text-light py-5">Copyright  &copy; BEST ONLINE SHOP 2022</Col>
            </Row>
        </Container>
        </footer>
    );
}

export default footer; 