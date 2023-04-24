import Sidebar from "../components/Sidebar";
import Piechart from "../components/Piechart";
import "../App.css";
import { Card, Col, Row } from "react-bootstrap";
import HitsChart from "../components/HitsChart";
import { useEffect, useState } from "react";
import axios from "axios";
import TableComponent from "../components/TableComponent";


const Dashboard = () => {

    //const userEmail = userService.getCurrentUser();
    const hitsChartQuery = {
        numPage: 1,
        sort_by_hits: true
    };
    const tableComponentQuery = {
        numPage: 1,
        sort_by_emmission: true
    };


    return (
        <div>
            <Row style={{ minHeight: "100vh" }}>
                <Col md={3}>
                    <Sidebar />
                </Col>
                <Col md={8} className="p-5">

                    <Row><Col><p className="h1">Most Visited Websites</p><HitsChart query={hitsChartQuery} /></Col></Row>
                    <hr className="p-5" />
                    <Row><Col><p className="h1">Websites With Least Carbon Emmission</p><TableComponent query={tableComponentQuery}></TableComponent></Col></Row>
                    <hr className="p-5 fs-1" />

                </Col>
            </Row>
        </div>
    )
}

export default Dashboard; 