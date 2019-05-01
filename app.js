let usersArray = [];

document.querySelector('#buttons').addEventListener('click', (event)=>{
  let id = event.target.id;

  switch (id) {
    case 'addGuestStart':
    {
      let userInput = document.querySelector('#userInput').value;
      if(userInput !== ''){
        usersArray.push(userInput);
      }
      break;
    }
    case 'addGuestEnd':{
      let userInput = document.querySelector('#userInput').value;
      if(userInput !== ''){
        usersArray.unshift(userInput);
        }
      break;
      }
    case 'removeGuestFirst':
      usersArray.shift(userInput);
      break;
      case 'removeGuestLast':
      usersArray.pop(userInput);
      break;
    case 'reverse':
      usersArray.reverse();
      break;
    case 'clearLocalStorage':
      clearLocalStorage('guests');
      clearList();
      clearInput();
      usersArray = [];
      break;
    case 'removeFromTo':
      let spliceStart = document.querySelector('#spliceStart').value;
      let spliceDelete = document.querySelector('#spliceDelete').value;
      usersArray.splice(Number(spliceStart)-1, spliceDelete);
      break;
    default:
      break;
  }
  clearList();
  document.querySelector('#guests').appendChild(createList(usersArray));
  window.localStorage.setItem('guests', JSON.stringify(usersArray));
});

window.addEventListener('load', (event)=>{
  let data = window.localStorage.getItem('guests');
  if(data != null) {
    data = JSON.parse(data)
    document.querySelector('#guests').appendChild(createList(data));
    usersArray = data;
  }
});

function clearList() {
  document.querySelector('#guests').innerHTML = '';
}

function clearLocalStorage(key) {
  window.localStorage.removeItem(key);
}

function clearInput() {
  let user = document.querySelector('#userInput');
  user.value = '';
}

function createList(usersArray) {
  let container = document.createElement('ul');

  usersArray.forEach((user)=>{
    let element = document.createElement('li');
    element.textContent = user;
    container.appendChild(element);
  });

  return container;
}
