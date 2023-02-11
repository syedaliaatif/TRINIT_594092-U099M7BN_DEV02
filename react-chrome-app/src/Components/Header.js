import { Container, Navbar } from "react-bootstrap";

const Header = () => {

    return (
        <Navbar bg="dark">
            <Container>
                <Navbar.Brand >
                    <h1 className="text-white">Go Green</h1>
                </Navbar.Brand>
            </Container>
        </Navbar>)
};

export default Header; 