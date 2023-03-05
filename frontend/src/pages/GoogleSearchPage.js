import axios from "axios";
import { useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row, Spinner } from "react-bootstrap";
import SearchBar from "../components/SearchBar";
import SearchResultComponent from "../components/SearchResultComponent";


const GoogleSearchPage = () => {

    const [spinner, setSpinner] = useState(false);
    const [data, setData] = useState(null);
    const doOnSubmit = async (e) => {
        try {
            console.log(e.target[0]);
            console.log(e.target[0].value);
            setSpinner(true);
            axios.post('/api/search', {
                searchedWord: e.target[0].value
            }
            ).then((response) => {
                console.log(response.data);
                setSpinner(false);
                setData(response.data.result);

            })
            e.preventDefault();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Container>
            <Row className="justify-content-center p-5">
                <Col md={6} >
                    <SearchBar doOnSubmit={doOnSubmit} />
                    {spinner ? <Spinner animation="border" variant="dark" /> : null}


                </Col>
            </Row>
            {
                data ?
                    <Row>
                        <Col md={8}>
                            {
                                data.map((curData, key) => {
                                    return <SearchResultComponent key={key} data={curData} />
                                })
                            }
                        </Col>
                    </Row> : null
            }
        </Container>
    )

}

export default GoogleSearchPage; 