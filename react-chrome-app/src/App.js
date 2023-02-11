import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import Header from "./Components/Header";
import Footer from "./Components/Footer";


const App = () => {
  return (
    <>
      <Header />
      <div className="main-background">
        <Card style={{ width: '18rem' }}>

          <Card.Body>
            <Card.Title>CO2 Emmission</Card.Title>
            <Card.Text>

            </Card.Text>
          </Card.Body>
        </Card>

      </div>
      <Footer />
    </>
  )
}

export default App;
