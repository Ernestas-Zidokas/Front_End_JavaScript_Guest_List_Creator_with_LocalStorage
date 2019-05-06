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
    case 'sortAZ':
    usersArray.sort((a, b)=> {
      return a.localeCompare(b);
    });
    break;
    case 'sortZA':
    usersArray.sort((a, b)=> {
      return b.localeCompare(a);
    });
    break;
    case 'replace':
    let lookingName = document.querySelector('#lookingName').value;
    let replaceName = document.querySelector('#replaceName').value;
    findAndReplaceUser(usersArray, lookingName, replaceName);
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

function findAndReplaceUser(arr, str1, str2) {
  arr.find((name, index)=>{
    if(name === str1){
      arr.splice(index, 1, str2);
      findAndReplaceUser(arr, str1, str2);
    }
  })

  return arr;
}

function findReplaceArrayFrom(arr, str1, str2) {
  Array.from(arr,(name)=>{
    if(name == str1) {
      arr.splice(arr.indexOf(str1), 1, str2);
    }
  })

  return arr;
}

function findReplaceForeach(arr, str1, str2) {
  arr.forEach((name, index) => {
    if(name == str1) {
      arr.splice(index, 1, str2);
    }
  })

return arr;
}
