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

    inputField.value = '';
    inputField.focus();
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
        removeItem(e.parentElement.parentElement);
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

itemForm.addEventListener('submit', onAddItemSubmit);
listItem.addEventListener('click', onClickItem);
clearBtn.addEventListener('click', clearItems)
document.addEventListener('DOMContentLoaded', displayItems);