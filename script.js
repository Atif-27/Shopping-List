const itemForm=document.querySelector('#item-form');
const itemInput=document.querySelector('#item-input');
const itemList=document.querySelector('#item-list');

function onSubmit(e){
  e.preventDefault();
  const newItem=itemInput.value;
  // Validate
  if(newItem===''){
    alert('Please Add an Item');
    return;
  }
  const li=document.createElement('li');
  li.appendChild(document.createTextNode(newItem));
  itemList.appendChild(li);
  const button=createButton('remove-item btn-link text-red');
  const icon=createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  li.appendChild(button);
  itemInput.value='';
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
// Event Listener
itemForm.addEventListener('submit',onSubmit);