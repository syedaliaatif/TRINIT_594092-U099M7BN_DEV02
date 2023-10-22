import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Col, Container, Row, Table } from "react-bootstrap";
import TableComponent from "../components/TableComponent";
import TableComponentShimmer from "../components/TableComponentShimmer";
import HitsChart from "../components/HitsChart";
import { Transition } from 'react-transition-group';

const HomePage = () => {

    
    const tableComponentQuery = {
        numPage: 1,
        sort_by_emmission: true
    };
    const hitsChartQuery = {
        numPage: 1,
        sort_by_hits: true
    };
 
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

    // data.sort((a, b) => {
    //     if (a.averageEmmission < b.averageEmmission) return -1;
    //     else return 1;
    // })
    return (
        <Transition nodeRef={nodeRef} in={true} appear={true} timeout={duration}>
            {
                state => (
                    <Container ref={nodeRef} style={{ ...defaultStyle, ...transitionStyles[state] }} className="add-bg-image">
                        <Row className="justify-content-center" >

                            <p class="h1 mt-5">Websites with least carbon emmission</p>
                            <Col md={9} className="p-3">
                                

                                <TableComponent query={tableComponentQuery} />

                            </Col>

                        </Row>
                        <hr className="text-dark p-5" />

                        <Row className="justify-content-center">
                            <p class="h1">Piechart showing number of hits for top websites</p>
                            <Col md={6}>

                                <HitsChart query={hitsChartQuery} />
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