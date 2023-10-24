import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

const api = "http://127.0.0.1:8080/api/";

export async function getItems() {
    let items;
    await fetch(`${api}items`)
    .then((response) => response.json())
    .then((data) => {
       items = data;
    })
    .catch((err) => {
       console.log(err.message);
    });
  if (!items) items = [];
  return items;
}

export async function getItem(id) {
    let item;
    await fetch(`${api}items/${id}`)
    .then((response) => response.json())
    .then((data) => {
       item = data;
    })
    .catch((err) => {
       console.log(err.message);
    });
    return item ?? null;
  }

export async function createItem(item) {
    await fetch(`${api}items`, {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
           'Content-type': 'application/json; charset=UTF-8',
        },
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
           console.log(err.message);
        });
}


export async function updateItem(id, updates) {
    await fetch(`${api}items/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
        headers: {
           'Content-type': 'application/json; charset=UTF-8',
        },
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
           console.log(err.message);
        });
}

export async function deleteItem(id) {
    await fetch(`${api}items/${id}`, {method: 'DELETE'})
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            console.log(err.message);
        });
    }