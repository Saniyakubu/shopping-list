"use strict";
const formInput = document.getElementById('item-form');
const Input = document.getElementById('item-input');
const submitBtn = document.querySelector('.btn');
const listItem = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const formInputFilter = document.querySelector('.form-input-filter');
let isEdit = false;
const displayItems = () => {
    const saveToStorage = getItemFromLocalStorage();
    saveToStorage.map((items) => {
        addNewItem(items);
    });
    updateUi();
};
const onAddNewItem = (e) => {
    e.preventDefault();
    const inputValue = Input.value;
    if (!inputValue) {
        alert('input is empty');
        return;
    }
    if (isEdit) {
        const li = listItem.querySelector('.edit-mode');
        li === null || li === void 0 ? void 0 : li.remove();
        addNewItem(Input.value);
        li === null || li === void 0 ? void 0 : li.classList.remove();
        isEdit = false;
        addToLocalStorage(Input.value);
        Input.value = '';
        submitBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
        submitBtn.style.backgroundColor = '#333';
        updateUi();
        return;
    }
    addNewItem(inputValue);
    addToLocalStorage(inputValue);
    updateUi();
    Input.value = '';
};
const addNewItem = (value) => {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(value));
    const Btn = createButton('remove-item btn-link text-red');
    li.appendChild(Btn);
    listItem.appendChild(li);
};
const addToLocalStorage = (item) => {
    let saveToStorage = getItemFromLocalStorage();
    saveToStorage.push(item);
    localStorage.setItem('list', JSON.stringify(saveToStorage));
};
const getItemFromLocalStorage = () => {
    let saveToStorage;
    if (localStorage.getItem('list') === null) {
        saveToStorage = [];
    }
    else {
        saveToStorage = JSON.parse(localStorage.getItem('list'));
    }
    return saveToStorage;
};
const removeFromLocalStorage = (item) => {
    let saveToStorage = getItemFromLocalStorage();
    saveToStorage = saveToStorage.filter((savedItem) => savedItem !== item);
    localStorage.setItem('list', JSON.stringify(saveToStorage));
    console.log(saveToStorage);
};
const filterItems = (e) => {
    var _a, _b;
    const li = listItem.querySelectorAll('li');
    const text = (_b = (_a = e.target) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.toLowerCase();
    console.log(text);
    li.forEach((liEl) => {
        var _a, _b;
        const liElText = (_b = (_a = liEl.firstChild) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.toLowerCase();
        if ((liElText === null || liElText === void 0 ? void 0 : liElText.indexOf(text)) !== -1) {
            liEl.style.display = 'flex';
        }
        else {
            liEl.style.display = 'none';
        }
    });
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
const removeItem = (e) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    const item = e.target;
    if (item.className === 'fa-solid fa-xmark') {
        console.log((_c = (_b = (_a = item.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.firstChild) === null || _c === void 0 ? void 0 : _c.textContent);
        removeFromLocalStorage((_f = (_e = (_d = item.parentElement) === null || _d === void 0 ? void 0 : _d.parentElement) === null || _e === void 0 ? void 0 : _e.firstChild) === null || _f === void 0 ? void 0 : _f.textContent);
        (_h = (_g = item.parentElement) === null || _g === void 0 ? void 0 : _g.parentElement) === null || _h === void 0 ? void 0 : _h.remove();
    }
    else if (item.className === 'remove-item btn-link text-red') {
        console.log((_k = (_j = item.parentElement) === null || _j === void 0 ? void 0 : _j.firstChild) === null || _k === void 0 ? void 0 : _k.textContent);
        (_l = item.parentElement) === null || _l === void 0 ? void 0 : _l.remove();
    }
    else {
        isEdit = true;
        item.className = 'edit-mode';
        console.log(item);
        submitBtn.innerHTML = '<i class="fa-solid fa-edit"></i> Edit Item';
        submitBtn.style.backgroundColor = 'green';
        editItem();
    }
    updateUi();
};
const editItem = () => {
    var _a, _b, _c;
    if (isEdit) {
        const li = listItem.querySelector('.edit-mode');
        Input.value = (_b = (_a = li === null || li === void 0 ? void 0 : li.firstChild) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim();
        li === null || li === void 0 ? void 0 : li.remove();
        removeFromLocalStorage((_c = li === null || li === void 0 ? void 0 : li.firstChild) === null || _c === void 0 ? void 0 : _c.textContent);
        console.log(li === null || li === void 0 ? void 0 : li.firstChild);
    }
};
const clearItems = () => {
    const listItem = document.getElementById('item-list');
    listItem.innerHTML = '';
    updateUi();
};
const updateUi = () => {
    const filterInput = document.querySelector('.filter');
    const clearBtn = document.getElementById('clear');
    const listItem = document.getElementById('item-list');
    if (listItem.children.length === 0) {
        filterInput.style.display = 'none';
        clearBtn.style.display = 'none';
    }
    else {
        filterInput.style.display = 'block';
        clearBtn.style.display = 'block';
    }
};
// Events Listeners
formInput.addEventListener('submit', onAddNewItem);
listItem.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);
formInputFilter.addEventListener('input', filterItems);
window.addEventListener('DOMContentLoaded', displayItems);
//# sourceMappingURL=script.js.map