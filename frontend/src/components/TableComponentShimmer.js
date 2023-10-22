import { TransitionGroup, Transition } from "react-transition-group";
import React from "react";
import { Card, Table } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { ShimmerTable } from "react-shimmer-effects";


export default function TableComponentShimmer(){

    const array= new Array(10).fill(1);

    return (
        <SkeletonTheme baseColor="#e8e8e8" highlightColor="#c0c0c0" >
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
                        array.map((el, index) => {
                          
                             const bgColor = "success";
                            return (
                                <tr key={index} className={`bg-${bgColor} text-light`}>
                                    <td>
                                    <Skeleton/>
                                    </td>
                                    <td>
                                    <Skeleton/>
                                    </td>
                                    <td>
                                    <Skeleton/>
                                    </td>
                                    <td>
                                    <Skeleton/>
                                    </td>
                                    <td>
                                    <Skeleton/>
                                    </td>
                                
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
            </Card.Body>
        </Card >
        </SkeletonTheme>
        // <ShimmerTable row={5} col={5} />
    )
}