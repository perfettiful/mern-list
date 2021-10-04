import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Input from './Input';
import ListItems from './ListItems';

function Item() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        getItems();
    }, []);

    const getItems = () => {
        axios.get('/api/shoppinglist')
            .then(res => {
                if (res.data) {
                    setItems(res.data)
                }
            })
            .catch(err => console.log(err))
    }

    const deleteItem = (id) => {

        axios.delete(`/api/shoppinglist/${id}`)
            .then(res => {
                if (res.data) {
                    getItems()
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <h1>Shopping List</h1>
            <Input getItems={getItems} />
            <ListItems items={items} deleteItem={deleteItem} />
        </div>
    );
}

export default Item;

