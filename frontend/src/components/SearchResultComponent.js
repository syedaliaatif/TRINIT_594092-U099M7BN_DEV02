<<<<<<< HEAD
import { Card, Col, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Round = (n) => {
    return Math.round(n * 100) / 100;
}
const SearchResultComponent = ({ data }) => {


    const bgColor = data.averageEmmission > 0.2 ? "danger" : "success";
    const averageEmmission = Round(data.averageEmmission);
    return (
        <Card className="m-5 p-0" style={{ fontFamily: 'arial san-serif' }}>
            <Card.Body className="p-0">

                <Row>
                    <Col md={10} className="py-3 px-5">
                        <Link to={data.link}><h5 dangerouslySetInnerHTML={{ __html: data.htmlTitle }}></h5></Link>
                        <p style={{ fontFamily: 'arial san-serif' }} className="text-muted m-0" dangerouslySetInnerHTML={{ __html: data.htmlSnippet }}></p>
                        <Link className="text-success m-0" to={data.formattedUrl}>{data.displayLink}</Link>
                    </Col>
                    <Col md={2} className={`bg-${bgColor} text-light py-5`} >
                        {averageEmmission + ' g per visit'}
                    </Col>
                </Row>


            </Card.Body>
        </Card>

    )
}

=======
import { Card, Col, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Round = (n) => {
    return Math.round(n * 100) / 100;
}
const SearchResultComponent = ({ data }) => {


    const bgColor = data.averageEmmission > 0.2 ? "danger" : "success";
    const averageEmmission = Round(data.averageEmmission);
    return (
        <Card className="m-5 p-0" style={{ fontFamily: 'arial san-serif' }}>
            <Card.Body className="p-0">

                <Row>
                    <Col md={10} className="py-3 px-5">
                        <Link to={data.link}><h5 dangerouslySetInnerHTML={{ __html: data.htmlTitle }}></h5></Link>
                        <p style={{ fontFamily: 'arial san-serif' }} className="text-muted m-0" dangerouslySetInnerHTML={{ __html: data.htmlSnippet }}></p>
                        <Link className="text-success m-0" to={data.formattedUrl}>{data.displayLink}</Link>
                    </Col>
                    <Col md={2} className={`bg-${bgColor} text-light py-5`} >
                        {averageEmmission + ' g per visit'}
                    </Col>
                </Row>


            </Card.Body>
        </Card>

    )
}

>>>>>>> 48a0671e23921b69ac4d74f0f571313769951a48
export default SearchResultComponent; 