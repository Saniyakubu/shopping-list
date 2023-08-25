const formInput = document.getElementById('item-form') as HTMLElement;
const Input = document.getElementById('item-input') as HTMLInputElement;
const submitBtn = document.querySelector('.btn') as HTMLElement;
const listItem = document.getElementById('item-list') as HTMLElement;
const clearBtn = document.getElementById('clear') as HTMLElement;
const formInputFilter = document.querySelector(
  '.form-input-filter'
) as HTMLInputElement;

let isEdit: boolean = false;
const displayItems = () => {
  updateUi();
  const saveToStorage = getItemFromLocalStorage();
  saveToStorage.map((items) => {
    addNewItem(items);
  });
};

const onAddNewItem = (e: SubmitEvent): void => {
  e.preventDefault();
  const inputValue = Input.value;

  if (!inputValue) {
    alert('input is empty');
    return;
  }
  if (isEdit) {
    const li = listItem.querySelector('.edit-mode');
    li?.remove();
    removeFromLocalStorage(li?.firstChild?.textContent!);
    addNewItem(Input.value);
    li?.classList.remove();
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

const addNewItem = (value: string) => {
  const li: HTMLLIElement = document.createElement('li');

  li.appendChild(document.createTextNode(value));
  const Btn = createButton('remove-item btn-link text-red');
  li.appendChild(Btn);

  listItem.appendChild(li);
};

const addToLocalStorage = (item: string) => {
  let saveToStorage = getItemFromLocalStorage();

  saveToStorage.push(item);

  localStorage.setItem('list', JSON.stringify(saveToStorage));
};

const getItemFromLocalStorage = () => {
  let saveToStorage: string[];

  if (localStorage.getItem('list') === null) {
    saveToStorage = [];
  } else {
    saveToStorage = JSON.parse(localStorage.getItem('list')!);
  }

  return saveToStorage;
};

const removeFromLocalStorage = (item: string) => {
  let saveToStorage = getItemFromLocalStorage();
  saveToStorage = saveToStorage.filter((savedItem) => savedItem !== item);

  localStorage.setItem('list', JSON.stringify(saveToStorage));
  console.log(saveToStorage);
};

const filterItems = (e: any) => {
  const li: NodeListOf<HTMLLIElement> = listItem.querySelectorAll('li');
  const text = e.target.value.toLowerCase();

  li.forEach((liEl) => {
    const liElText = liEl.firstChild?.textContent?.toLowerCase();
    if (liElText?.indexOf(text) !== -1) {
      liEl.style.display = 'flex';
    } else {
      liEl.style.display = 'none';
    }
  });
};

const createButton = (btnClass: string): HTMLButtonElement => {
  const button: HTMLButtonElement = document.createElement('button');
  button.className = btnClass;
  const btnIcon = createButtonIcon('fa-solid fa-xmark');
  button.appendChild(btnIcon);
  return button;
};

const createButtonIcon = (iconClass: string): HTMLElement => {
  const icon = document.createElement('i');
  icon.className = iconClass;
  return icon;
};

const removeItem = (e: MouseEvent): void => {
  const item = e.target as HTMLElement;
  if (item.className === 'fa-solid fa-xmark') {
    console.log(item.parentElement?.parentElement?.firstChild?.textContent);
    removeFromLocalStorage(
      item.parentElement?.parentElement?.firstChild?.textContent!
    );
    item.parentElement?.parentElement?.remove();
  } else if (item.className === 'remove-item btn-link text-red') {
    console.log(item.parentElement?.firstChild?.textContent);
    item.parentElement?.remove();
  } else {
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
  if (isEdit) {
    const li = listItem.querySelector('.edit-mode');
    Input.value = li?.firstChild?.textContent?.trim()!;
    li?.remove();

    console.log(li?.firstChild);
  }
};

const clearItems = (): void => {
  const listItem = document.getElementById('item-list') as HTMLElement;
  listItem.innerHTML = '';
  updateUi();
};

const updateUi = (): void => {
  const filterInput = document.querySelector('.filter') as HTMLElement;
  const clearBtn = document.getElementById('clear') as HTMLElement;
  const listItem = document.getElementById('item-list') as HTMLElement;
  if (listItem.children.length === 0) {
    filterInput.style.display = 'none';
    clearBtn.style.display = 'none';
  } else {
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
