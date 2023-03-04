import { Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "../App.css";
import { SidebarData } from "./SidebarData";
import { useState } from "react";

function Sidebar() {
    const { isExpanded, setExpanded } = useState(true);

    return (

        <Navbar className="pt-5 justify-content-center" style={{ minHeight: "100%", lineHeight: "50px", fontSize: "25px", background: "rgba(4, 74, 66, .4)" }} >

            <Nav defaultActiveKey="/home" className="flex-column">
                {
                    SidebarData.map((val, key) => {
                        return (
                            <>
                                <LinkContainer to={val.link} key={key} className="text-light mb-1">
                                    <Nav.Link>
                                        <span>{val.icon}</span>{"  "}
                                        <span>{val.title}</span>
                                    </Nav.Link>
                                </LinkContainer>
                                <hr className="text-light" />
                            </>
                        )
                    })
                }
            </Nav>
        </Navbar>

        // <div className="Sidebar">
        //     <ul className="SidebarList">
        //         {SidebarData.map((val, key) => {
        //             return (
        //                 <li key={key} className='row' onClick={() => { window.location.href = val.link }}>
        //                     <div>{val.icon}</div>
        //                     <div>{val.title}</div>
        //                 </li>
        //             )
        //         })}
        //     </ul>
        //     <p>Hello sidebar</p>
        // </div>

    )

}

export default Sidebar; 