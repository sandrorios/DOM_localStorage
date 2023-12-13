const itemForm = document.getElementById('form-item');
const inputField = document.getElementById('input-field');
const listItem = document.getElementById('list-item');
const filter = document.getElementById('filter');
const formBtn = itemForm.querySelector('button');
const clearBtn = document.getElementById('clear');
let isEditMode = false;

function displayItems(){
    let itemsFromStorage = getItemsFromStorage();
    itemsFromStorage = itemsFromStorage.forEach((item) => addItemToDOM(item));

    checkUI();
}
function onAddItemSubmit(e) {
    e.preventDefault();
    const newItem = inputField.value;
    if(newItem === ''){
        alert("Please add an item");
        return;
    }

    if(isEditMode){
        const itemToEdit = listItem.querySelector('.edit-mode');

        removeItemFromStorage(itemToEdit.textContent);
        itemToEdit.classList.remove('edit-mode');
        itemToEdit.remove();
        isEditMode = false;
    }
    addItemToDOM(newItem);
    addItemToStorage(newItem)

    inputField.value = '';
    inputField.focus();

    checkUI();
}

function addItemToDOM(item){
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));
    listItem.appendChild(li);
    const button = createButton('remove-item text-red');
    li.appendChild(button);

    checkUI();
}

function createButton(classes) {
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
}

function createIcon(classes){
    const icon = document.createElement("i");
    icon.className = classes;
    return icon
}

function addItemToStorage(item) {
        const itemsFromStorage = getItemsFromStorage();
        itemsFromStorage.push(item);
        localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage(item){
    let itemsFromStorage;
    if(localStorage.getItem('items') === null){
        itemsFromStorage = [];
    }else{
        itemsFromStorage = JSON.parse(localStorage.getItem('items'))
    }
    return itemsFromStorage;
}

function onClickItem(e) {
    if(e.target.parentElement.classList.contains('remove-item')){
        removeItem(e.target.parentElement.parentElement);
    }else{
        setItemToEdit(e.target);
    }
}

function setItemToEdit(item) {
    isEditMode = true;
    listItem.querySelectorAll('li').forEach((i) => i.classList.remove('edit-mode'));

    item.classList.add('edit-mode');
    formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
    formBtn.style.backgroundColor = '#228B22';
    inputField.value = item.textContent;
}

function removeItem(item) {
    item.remove();
    removeItemFromStorage(item.textContent);

    checkUI();
}

function clearItems(item){
    while(listItem.firstChild){
        listItem.firstChild.remove(listItem.firstChild);

    }
    localStorage.removeItem('items')

    checkUI();
}

function removeItemFromStorage(item) {
    let itemsFromStorage = getItemsFromStorage();
    itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function filterItems(e){
    const items = listItem.querySelectorAll('li');
    const text = e.target.value.toLowerCase();

    items.forEach((items) => {
        const itemName = items.firstChild.textContent.toLowerCase();
        if(itemName.indexOf(text)!= -1){
            items.style.display = 'flex';
        }else{
            items.style.display = 'none';
        }
    })
}

function checkUI(){
    inputField.value = '';
    const items = listItem.querySelectorAll('li');
    if(items.length === 0){
        clearBtn.style.display = 'none';
        filter.style.display = 'none';
    }else{
        clearBtn.style.display = 'block';
        filter.style.display = 'block';
    }
    formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
    formBtn.style.backgroundColor = '#333';
    
    isEditMode = false;
}


itemForm.addEventListener('submit', onAddItemSubmit);
listItem.addEventListener('click', onClickItem);
clearBtn.addEventListener('click', clearItems)
filter.addEventListener('input', filterItems);
document.addEventListener('DOMContentLoaded', displayItems);

checkUI();