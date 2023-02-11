import "../App.css";
import { SidebarData } from "./SidebarData"

function Sidebar () {
    return (
<div className="Sidebar">
<ul className="SidebarList">
{SidebarData.map((val, key)=>{
    return (
        <li key={key} className='row' onClick={()=>{window.location.href=val.link}}>
        <div>{val.icon}</div>
        <div>{val.title}</div>
        </li>
    )
})}
</ul>
      <p>Hello sidebar</p>
  </div>

    )
    
}

export default Sidebar; 