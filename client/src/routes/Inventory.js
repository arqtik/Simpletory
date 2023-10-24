import {
    Link,
    useLoaderData,
  } from "react-router-dom";
  import { getItems } from "../items";

export async function loader() {
    const items = await getItems();
    return items;
}

export default function Inventory(){
    const items = useLoaderData();

    return(
        <table className="table table">
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Mass</th>
                    <th scope="col">#</th>
                    <th scope="col">Location</th>
                    <th scope="col">View</th>
                </tr>
            </thead>
            <tbody>
                {
                    items.map((item) => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.mass}{item.unit}</td>
                                <td>{item.count}</td>
                                <td>{item.location}</td>
                                <td><Link to={`item/${item.id}`} className="btn btn-primary btn-sm">View</Link></td>
                            </tr>
                    ))
                }
            </tbody>
        </table>
    );
}