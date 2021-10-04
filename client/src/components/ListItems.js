import React from 'react';

const ListItems = ({ items, deleteItem }) => {

    return (
        <ul>
            {
                items &&
                    items.length > 0 ?
                    (
                        items.map(item => {
                            return (
                                <li key={item._id} onClick={() => deleteItem(item._id)}>{item.item}</li>
                            )
                        })
                    )
                    :
                    (
                        <li>No Items left</li>
                    )
            }
        </ul>
    )
}

export default ListItems