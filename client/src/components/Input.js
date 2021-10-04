import React, { useState } from 'react';
import axios from 'axios';

function Input(props) {
    const [item, setItem] = useState([]);
    const addItem = () => {

        if (item && item.length > 0) {
            axios.post('/api/shoppinglist', { 'item': item })
                .then(res => {
                    if (res.data) {
                        props.getItems();
                        setItem("");
                    }
                })
                .catch(err => console.log(err))
        } else {
            console.log('Item required')
        }
    }

    const handleChange = (e) => {
        setItem(e.target.value);
    }

    return (
        <div>
            <input type="text" onChange={handleChange} value={item} />
            <button onClick={addItem}>add item</button>
        </div>
    )
}

export default Input