import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Col, Container, Row, Table } from "react-bootstrap";
import TableComponent from "../components/TableComponent";
import HitsChart from "../components/HitsChart";
import { Transition } from 'react-transition-group';

const HomePage = () => {

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

    const [data, setData] = useState([]);

    useEffect(() => {

        (
            async () => {
                try {
                    axios.get('/api/websites').then((response) => {
                        setData(response.data);
                        console.log(response.data);
                    });
                    // console.log(curData.data);
                    // setData(curData.data);
                } catch (error) {
                    console.log(error);
                }
            }

        )();


    }, []);

    data.sort((a, b) => {
        if (a.averageEmmission < b.averageEmmission) return -1;
        else return 1;
    })
    return (
        <Transition nodeRef={nodeRef} in={true} appear={true} timeout={duration}>
            {
                state => (
                    <Container ref={nodeRef} style={{ ...defaultStyle, ...transitionStyles[state] }} className="add-bg-image">
                        <Row className="justify-content-center" >

                            <p class="h1 mt-5">Websites with least carbon emmission</p>
                            <Col md={9} className="p-3">


                                <TableComponent data={Array.from(data)} />

                            </Col>

                        </Row>
                        <hr className="text-dark p-5" />

                        <Row className="justify-content-center">
                            <p class="h1">Piechart showing number of hits for top websites</p>
                            <Col md={6}>

                                <HitsChart data={Array.from(data)} />
                            </Col>
                        </Row>
                        <hr className="text-dark p-5" />

                    </Container>
                )
            }

        </Transition>

    )
}

export default HomePage; 