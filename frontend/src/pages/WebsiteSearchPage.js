import axios from "axios";
import { useState, useRef } from "react";
import { Button, Col, Form, InputGroup, Row, Spinner } from "react-bootstrap";
import { Transition } from "react-transition-group";
import HitsChart from "../components/HitsChart";
import SearchBar from "../components/SearchBar";
import Sidebar from "../components/Sidebar";
import TableComponent from "../components/TableComponent";
import TableComponentData from "../components/tableComponentData";
import HitsChartData from "../components/HitsChartData";

const WebsiteSearchPage = () => {

    const [data, setData] = useState(null);
    const [spinner, setSpinner] = useState(false);

    const duration = 500;

    const defaultStyle = {
        transition: `opacity ${duration}ms ease-in`,
        opacity: 0,
    }

    const transitionStyles = {
        entering: { opacity: 0 },
        entered: { opacity: 1 },
        exiting: { opacity: 1 },
        exited: { opacity: 0 },
    };
    const nodeRef = useRef(null);

    const doOnSubmit = async (e) => {
        console.log(e);
        console.log(e.target[0].value);
        setSpinner(true);
        axios.post('/api/websites', {
            host: e.target[0].value
        }).then((response) => {
            console.log(response.data);
            setSpinner(false);
            if (response.data.length)
                setData(response.data);
            else setData(null);
        });
        e.preventDefault();
        // axios.post('/api/websites', {

        // })

    }

    return (
        <Row style={{ minHeight: "100vh" }}>
            <Col md={3}>
                <Sidebar />
            </Col>
            <Col md={6} className="p-5">

                <SearchBar doOnSubmit={doOnSubmit} />
                {
                    !spinner ? null : <Spinner animation="border" variant="dark" />
                }

                {
                    data == null ? null : (
                        <Transition nodeRef={nodeRef} in={true} appear={true} timeout={duration}>
                            {
                                state => (<div ref={nodeRef} style={{ ...defaultStyle, ...transitionStyles[state] }}>
                                    <Row>
                                        <Col>
                                            <TableComponentData data={Array.from(data)} />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <HitsChartData data={Array.from(data)} />
                                        </Col>
                                    </Row>
                                </div>
                                )
                            }
                        </Transition>
                    )
                }

            </Col>
        </Row>
    );

}

export default WebsiteSearchPage; 