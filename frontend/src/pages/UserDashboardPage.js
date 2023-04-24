import { Row, Col } from "react-bootstrap";
import userService from "../services/user.service";
import Sidebar from "../components/Sidebar";
import HitsChart from "../components/HitsChart";
import TableComponent from "../components/TableComponent";

const UserDashboardPage = () => {

    const userEmail = userService.getCurrentUser().email;
    const hitsChartQuery = {
        numPage: 1,
        sort_by_hits: true,
        email: userEmail
    };
    const tableComponentQuery = {
        numPage: 1,
        sort_by_emmission: true,
        email: userEmail
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
        </div>)


}

export default UserDashboardPage