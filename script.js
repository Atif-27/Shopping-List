const itemForm=document.querySelector('#item-form');
const itemInput=document.querySelector('#item-input');
const itemList=document.querySelector('#item-list');
const itemClear=document.querySelector('#clear');
const itemFilter=document.querySelector('#filter');

function displayItems(){
  const itemFromStorage=getItemFromStorage();
  itemFromStorage.forEach((item)=>{
    addItemToDOM(item);
  })
  checkUI();
}
// ! Addding Element
function onAddItemSubmit(e){
  e.preventDefault();
  const newItem=itemInput.value;
  // Validate
  if(newItem===''){
    alert('Please Add an Item');
    return;
  }
  addItemToDOM(newItem);
  addItemToStorage(newItem);
  itemInput.value='';
  checkUI();
}
function addItemToDOM(item){
  const li=document.createElement('li');
  li.appendChild(document.createTextNode(item));
  itemList.appendChild(li);
  const button=createButton('remove-item btn-link text-red');
  const icon=createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  li.appendChild(button);
}
function createButton(cl){
  const btn=document.createElement('button');
  btn.className=cl;
  return btn;
}
function createIcon(cl){
  const icn=document.createElement('i');
  icn.className=cl;
  return icn;
}

function addItemToStorage(item){
  let itemFromStorage=getItemFromStorage();

  itemFromStorage.push(item);
  localStorage.setItem('items',JSON.stringify(itemFromStorage));
}


function getItemFromStorage(){
  let itemFromStorage;
  if(localStorage.getItem('items')===null)
  itemFromStorage=[];
else
  itemFromStorage=JSON.parse(localStorage.getItem('items'));

  return itemFromStorage;
}
// ! Remove Element
function removeOnClick(e){
  // if(e.target.tagName==='I'){
    //   e.target.parentElement.parentElement.remove();
    // }
    if(e.target.parentElement.classList.contains('remove-item')){
      deleteItem(e.target.parentElement.parentElement);
    }
  }
function deleteItem(item){
    if(confirm('Are you sure?')){
      //Delete Item From DOM
      item.remove();
      // Delete Item From Storage
      deleteFromStorage(item.innerText);
      checkUI();
    }
  } 
function deleteFromStorage(item){
      let itemFromStorage=getItemFromStorage();
      // Filter to be removed
      itemFromStorage=itemFromStorage.filter((i)=> i!==item);

      
      localStorage.setItem('items',JSON.stringify(itemFromStorage));
    }
// !Clear List
function clearList(){
  // itemList.remove();
  // itemList.innerHTML='';

  //Removing From DOM
  // ? FASTER METHOD
  while(itemList.firstChild){
    itemList.removeChild(itemList.firstChild);
  }
  // REMOVING FROM storage
  localStorage.removeItem('items')
  checkUI();
}
// ! CHECK UI
function checkUI(){
  const items=itemList.querySelectorAll('li');
  if(items.length===0)
  {
    itemClear.style.display='none';
    itemFilter.style.display='none';
  }
  else
  {
    itemClear.style.display='block';
    itemFilter.style.display='block';
  }
}
// ! Filter List
function filterList(e){
  const items=itemList.querySelectorAll('li');
  const search=e.target.value.toLowerCase();
    items.forEach((i)=>{
      const itemName=i.innerText.toLowerCase();
      // if(itemName.startsWith(search))
      // {
      //   i.style.display='flex';
      // }
      // else
      // {
      //   i.style.display='none';
      // }
      // * 2nd METHOD- BRADS
      if(itemName.indexOf(search)!=-1)
      {
        i.style.display='flex';
      }
      else
      {
        i.style.display='none';
      }
      
    })
}

// Initializing
function init(){
  // Event Listener
itemForm.addEventListener('submit',onAddItemSubmit);
itemList.addEventListener('click',removeOnClick);
itemClear.addEventListener('click',clearList);
itemFilter.addEventListener('input',filterList);
document.addEventListener('DOMContentLoaded',displayItems);
// run checkUI on page Load
checkUI();
}

init();