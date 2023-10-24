import {
    Link,
    useLoaderData,
  } from "react-router-dom";
  import { getItems } from "../items";

export async function loader() {
    const items = await getItems();
    return { items };
}

export default function Inventory(){
    const items = useLoaderData();

    return(
        <div>
            Inventory Not Implemented
        </div>
    );
}