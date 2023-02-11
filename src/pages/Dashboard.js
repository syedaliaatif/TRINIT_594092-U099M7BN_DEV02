import Sidebar from "../components/Sidebar";
import Piechart from "../components/Piechart";
import "../App.css";


const Dashboard = () => {
    return (
       
        <div>  
            <div className="App" style={{ display: "flex" }}><Sidebar/><Piechart/></div>
            <p>Hello </p> </div>
    )        
}

export default Dashboard; 