const formInput = document.getElementById('item-form') as HTMLElement;
const Input = document.getElementById('item-input') as HTMLInputElement;
const submitBtn = document.querySelector('.btn') as HTMLElement;
const listItem = document.getElementById('item-list') as HTMLElement;

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
  console.log(li);
  listItem.appendChild(li);
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

// Events Listeners
formInput.addEventListener('submit', addNewItem);
console.log(formInput);
