const formInput = document.getElementById('item-form') as HTMLElement;
const Input = document.getElementById('item-input') as HTMLInputElement;
const submitBtn = document.querySelector('.btn') as HTMLElement;
const listItem = document.getElementById('item-list') as HTMLElement;
const clearBtn = document.getElementById('clear') as HTMLElement;
const formInputFilter = document.querySelector(
  '.form-input-filter'
) as HTMLInputElement;

const addNewItem = (e: SubmitEvent) => {
  e.preventDefault();
  const inputValue = Input.value;

  if (!inputValue) {
    alert('input is empty');
    return;
  }

  const li: HTMLLIElement = document.createElement('li');

  li.appendChild(document.createTextNode(inputValue));
  const Btn = createButton('remove-item btn-link text-red');
  li.appendChild(Btn);

  listItem.appendChild(li);
  updateUi();
  Input.value = '';
};

const filterItems = (e: any) => {
  const li = listItem.querySelectorAll('li');
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

const createButton = (btnClass: string) => {
  const button = document.createElement('button');
  button.className = btnClass;
  const btnIcon = createButtonIcon('fa-solid fa-xmark');
  button.appendChild(btnIcon);
  return button;
};

const createButtonIcon = (iconClass: string) => {
  const icon = document.createElement('i');
  icon.className = iconClass;
  return icon;
};

const removeItem = (e: MouseEvent) => {
  const item = e.target as HTMLElement;
  if (item.className === 'fa-solid fa-xmark') {
    item.parentElement?.parentElement?.remove();
  }
  updateUi();
};

const clearItems = () => {
  const listItem = document.getElementById('item-list') as HTMLElement;
  listItem.innerHTML = '';
  updateUi();
};

const updateUi = () => {
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
formInput.addEventListener('submit', addNewItem);
listItem.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);
formInputFilter.addEventListener('input', filterItems);
