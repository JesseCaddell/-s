import React, { useState } from 'react';
import { useImmer } from 'use-immer';

const ShoppingListWithImmer = () => {
    //state init
    const [shoppingList, setShoppingList] = useImmer([
        { id: 1, name: 'Banana', quantity: 2, details: { category: 'Fruit', notes: 'Organic' } },
        { id: 2, name: 'Bread', quantity: 1, details: { category: 'Bakery', notes: 'Whole-Grain' } }

    ]);

    const [newItemName, setNewItemName] = useState('');

    // add new items
    const addItem = () => {
        if (newItemName.trim() !== '') {
            setShoppingList(draft => {
                draft.push({
                    id: Date.now(),
                    name: newItemName,
                    quantity: 1,
                    details: { category: 'Other', notes: ''}
                });
            });
            setNewItemName(''); //clear input after adding
        }
    };


    //update an existing item
    const updateItem = (itemId, updatedItem) => {
        setShoppingList(draft => {
            const itemIndex = draft.findIndex(item => item.id === itemId);
            if (itemIndex !== -1) {
                draft[itemIndex] = updatedItem;
            }
        });
    };

    //remove item from list
    const removeItem = itemId => {
        setShoppingList(draft => {
            draft.splice(draft.findIndex(item => item.id === itemId), 1);
        });
    };

    return (
        <div>
            <h2>Shopping List</h2>
            <div>
                <input
                    type="text"
                    value={newItemName}
                    onChange={e => setNewItemName(e.target.value)}
                    placeholder="Enter item name"
                />
                <button onClick={addItem}>Add Item</button>
            </div>
            <ul>
                {shoppingList.map(item => (
                    <li key={item.id}>
                        <span>{item.name}</span>
                        <span> - Quality: {item.quantity}</span>
                        <span> - Category: {item.details.category}</span>
                        <span> - Notes: {item.details.notes}</span>
                        <button onClick={() => updateItem(item.id, {...item, quantity: item.quantity + 1 })}>Increase Quantity</button>
                        <button onClick={() => removeItem(item.id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ShoppingListWithImmer;