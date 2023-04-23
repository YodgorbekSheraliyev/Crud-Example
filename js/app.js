const form = document.querySelector(".form"),
  name = document.querySelector("#name"),
  price = document.querySelector("#price"),
  itemId = document.querySelector("#itemId"),
  itemList = document.querySelector(".itemList");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (itemId.value) {
    item = JSON.parse(localStorage.getItem(itemId.value));
    item.name = name.value;
    item.price = price.value;
  } else {
    item = {
      name: name.value,
      price: price.value
    };

    itemId.value = Date.now();
  }

  if(name.value && price.value)
  {localStorage.setItem(itemId.value, JSON.stringify(item))
  }else if(!name.value  && price.value) {
    alert(`Enter the name`)
  }else if(!price.value && name.value){
    alert('Enter the price')
  }else{
    alert('Please fill the form')
  }
  form.reset();
  itemId.value = '';
  render();
});

function render() {
  itemList.innerHTML = "";

  for (const key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      const item = JSON.parse(localStorage.getItem(key));

      const li = document.createElement("li");
      li.innerHTML = ` <span>Name : ${item.name} </span> <span> Price : ${item.price}</span>`;

      itemList.appendChild(li);

      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.classList.add('editBtn')
      li.appendChild(editButton);
      editButton.addEventListener("click", () => {
        name.value = item.name;
        price.value = item.price;
        itemId.value = key;
        render();
      });

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.classList.add('deleteBtn');
      deleteButton.addEventListener('click', ()=>{
        localStorage.removeItem(key);

        render(); 
      })
      const checkbox = document.createElement('input');
      checkbox.setAttribute('type', 'checkbox');
      checkbox.classList.add('checkbox');
      checkbox.addEventListener('click', () =>{
        if (checkbox.checked){
          li.style.textDecoration = 'line-through';
        }
        else {
          li.style.textDecoration = 'none';
        }
      })
      
      li.appendChild(checkbox);
      li.appendChild(deleteButton);
    }
  }
}

render();
