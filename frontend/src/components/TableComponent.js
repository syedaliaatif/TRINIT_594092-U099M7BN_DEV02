import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Card, Table } from "react-bootstrap";
import { TransitionGroup, Transition } from "react-transition-group"
const TableComponent = ({ query }) => {

    const [data, setData] = useState([]);



    const Round = (n) => {
        return Math.round(n * 100) / 100;
    }

    useEffect(() => {
        try {
            axios.get('/api/websites', {
                params: query

            }).then((response) => {
                setData(response.data);
                console.log(data);
            })
        }
        catch (error) {
            console.log(error);
        }
    }, []);

    return (


        <Card className="my-5 p-0" style={{ background: "#283739" }} >

            <Card.Body>
                <Table responsive className="table-borderless m-0">
                    <thead>
                        <tr className="text-light" style={{ background: "#283739" }}>
                            <th>#</th>
                            <th>Host</th>
                            <th>Average Emmission (g)</th>
                            <th>Total Emmission (g) </th>
                            <th>Total Hits</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((curData, _) => {
                                let averageEmmission = parseFloat(curData.averageEmmission['$numberDecimal']);
                                let totalEmmission = parseFloat(curData.totalEmmission['$numberDecimal']);
                                averageEmmission = Round(averageEmmission);
                                totalEmmission = Round(totalEmmission);
                                const bgColor = averageEmmission > 0.2 ? "danger" : "success";
                                return (
                                    <tr key={_} className={`bg-${bgColor} text-light`} >
                                        <td>
                                            {_ + 1}
                                        </td>
                                        <td>
                                            {curData._id}
                                        </td>
                                        <td>
                                            {averageEmmission}
                                        </td>
                                        <td>
                                            {totalEmmission}
                                        </td>
                                        <td>
                                            {curData.totalHits}
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </Card.Body>
        </Card >
    )




}

export default TableComponent; 