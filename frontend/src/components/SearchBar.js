<<<<<<< HEAD
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
const SearchBar = ({ doOnSubmit }) => {

    return (
        <Form onSubmit={doOnSubmit}>
            <InputGroup size="lg" >
                <InputGroup.Text id="inputGroup-sizing-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                </InputGroup.Text>
                <Form.Control
                    aria-label="Large"
                    aria-describedby="inputGroup-sizing-sm"
                    placeholder="Type website you want to search"
                    name="searchWebsite"
                    autoComplete="off"

                />
                <Button variant="warning" type="submit">Search</Button>
            </InputGroup>
        </Form >
    )

}

=======
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
const SearchBar = ({ doOnSubmit }) => {

    return (
        <Form onSubmit={doOnSubmit}>
            <InputGroup size="lg" >
                <InputGroup.Text id="inputGroup-sizing-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                </InputGroup.Text>
                <Form.Control
                    aria-label="Large"
                    aria-describedby="inputGroup-sizing-sm"
                    placeholder="Type website you want to search"
                    name="searchWebsite"
                    autoComplete="off"

                />
                <Button variant="warning" type="submit">Search</Button>
            </InputGroup>
        </Form >
    )

}

>>>>>>> 48a0671e23921b69ac4d74f0f571313769951a48
export default SearchBar; 