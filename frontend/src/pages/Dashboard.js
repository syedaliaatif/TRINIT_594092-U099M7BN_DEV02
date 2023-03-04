import Sidebar from "../components/Sidebar";
import Piechart from "../components/Piechart";
import "../App.css";
import { Card, Col, Row } from "react-bootstrap";
import HitsChart from "../components/HitsChart";
import { useEffect, useState } from "react";
import axios from "axios";
import TableComponent from "../components/TableComponent";


const Dashboard = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        try {
            axios.get('/api/websites').then((response) => {
                setData(response.data);
            });
        }
        catch (error) {
            console.log(error);

        }
    }, []);


    return (
        <div>
            <Row style={{ minHeight: "100vh" }}>
                <Col md={3}>
                    <Sidebar />
                </Col>
                <Col md={8} className="p-5">

                    <Row><Col><p className="h1">Most Visited Websites</p><HitsChart data={Array.from(data)} /></Col></Row>
                    <hr className="p-5" />
                    <Row><Col><p className="h1">Websites With Least Carbon Emmission</p><TableComponent data={Array.from(data)}></TableComponent></Col></Row>
                    <hr className="p-5 fs-1" />

                </Col>
            </Row>
        </div>
    )
}

export default Dashboard; 