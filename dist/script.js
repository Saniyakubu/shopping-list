"use strict";
const formInput = document.getElementById('item-form');
const Input = document.getElementById('item-input');
const submitBtn = document.querySelector('.btn');
const listItem = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const formInputFilter = document.querySelector('.form-input-filter');
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
    listItem.appendChild(li);
    updateUi();
    Input.value = '';
};
const filterItems = (e) => {
    const li = listItem.querySelectorAll('li');
    const text = e.target.value.toLowerCase();
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
    var _a, _b;
    const item = e.target;
    if (item.className === 'fa-solid fa-xmark') {
        (_b = (_a = item.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.remove();
    }
    updateUi();
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
formInput.addEventListener('submit', addNewItem);
listItem.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);
formInputFilter.addEventListener('input', filterItems);
//# sourceMappingURL=script.js.map