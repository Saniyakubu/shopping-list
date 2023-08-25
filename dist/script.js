"use strict";
const formInput = document.getElementById('item-form');
const Input = document.getElementById('item-input');
const submitBtn = document.querySelector('.btn');
const listItem = document.getElementById('item-list');
const addNewItem = (e) => {
    e.preventDefault();
    const inputValue = Input.value;
    if (!inputValue) {
        alert('input is empty');
        return;
    }
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(inputValue));
    const Btn = createButton('remove-item btn-link text-red');
    li.appendChild(Btn);
    console.log(li);
    listItem.appendChild(li);
};
const createButton = (btnClass) => {
    const button = document.createElement('button');
    button.className = btnClass;
    const btnIcon = createButtonIcon('fa-solid fa-xmark');
    button.appendChild(btnIcon);
    return button;
};
const createButtonIcon = (iconClass) => {
    const icon = document.createElement('i');
    icon.className = iconClass;
    return icon;
};
// Events Listeners
formInput.addEventListener('submit', addNewItem);
console.log(formInput);
//# sourceMappingURL=script.js.map