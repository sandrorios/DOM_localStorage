const itemForm = document.getElementById('form-item');
const inputField = document.getElementById('input-field');
const listItem = document.getElementById('list-item');
const filterItems = document.getElementById('filter');
const clearBtn = document.getElementById('clear');
function displayItems(){
    let itemsFromStorage = getItemsFromStorage();
    itemsFromStorage = itemsFromStorage.forEach((item) => addItemToDOM(item));
}
function onAddItemSubmit(e) {
    e.preventDefault();
    const newItem = inputField.value;
    if(newItem === ''){
        alert("Please add an item");
        return;
    }
    addItemToDOM(newItem);
    addItemToStorage(newItem)
}

function addItemToDOM(item){
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));
    listItem.appendChild(li);
    const button = createButton('remove-item text-red');
    li.appendChild(button);
    inputField.value = '';
    inputField.focus();
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
    }
}

function removeItem(item) {
    item.remove();
    removeItemFroStorage(item.textContent);
}

function clearItems(item){
    while(listItem.firstChild){
        listItem.firstChild.remove(listItem.firstChild);

    }
    localStorage.removeItem('items')
}

function removeItemFroStorage(item) {
    let itemsFromStorage = getItemsFromStorage();
    itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

itemForm.addEventListener('submit', onAddItemSubmit);
listItem.addEventListener('click', onClickItem);
clearBtn.addEventListener('click', clearItems)
document.addEventListener('DOMContentLoaded', displayItems);