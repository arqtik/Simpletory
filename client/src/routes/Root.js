import { Outlet, Link } from "react-router-dom";
import Scan from "./Scan";

export default function Root(){
    return(
        <div className="container-fluid">
            <div id="detail">
                <Outlet />
            </div>

            <div className="fixed-bottom list-group list-group-horizontal text-center">
                <Link to={`inventory`} className="list-group-item list-group-item-action active">
                    Inventory
                </Link>
                <Link to={`scan`} className="list-group-item list-group-item-action">
                    Scan
                </Link>
            </div>
        </div>
    );
}