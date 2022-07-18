  const addItems = document.querySelector('.add-items');
  const itemsList = document.querySelector('.plates');
  const checkBtn = document.querySelector('.check-btn');
  const deleteAllBtn = document.querySelector('.delete-all-btn');
  const orderBtn = document.querySelector('.order-btn');

  let items = JSON.parse(localStorage.getItem('items')) || [];

  function addDish(e) {
    e.preventDefault();

    const text = (this.querySelector('[name=item]')).value;
    const item = {
      text,
      added: true
    }

    items.push(item);

    populateDish(items, itemsList);
    localStorage.setItem('items', JSON.stringify(items));

    this.reset();
  }

  function populateDish(plates = [], platesList) {
    platesList.innerHTML = plates.map((plate, i) => {
      return `
        <li>
          <input type="checkbox" data-index="${i}" id="item${i}" ${plate.added ? 'checked' : ''}>
          <label for="item${i}">${plate.text}</label>
          <button class="delete-btn" data-index="${i}" type="button">❌</button>
        </li>
      `
    }).join('');
  }

  function toggleDish(e) {

    if (e.target.matches('input')) {
      const el = e.target;
      const index = el.dataset.index;

      items[index].added = !items[index].added;
      localStorage.setItem('items', JSON.stringify(items));
      

    } 
    else if (e.target.matches('button')) {
      const el = e.target;
      const index = el.dataset.index;

      items.splice(index, 1);
      localStorage.setItem('items', JSON.stringify(items)); 
      populateDish(items, itemsList); 

    }
  }

  function toggleCheck() {
    if (!checked) {
      items.forEach( item => {
        item.added = true;
      });
      checked = !checked;
      this.textContent = 'Uncheck All'
    } 
    else {
      items.forEach( item => {
        item.added = false;
      });
      checked = !checked;
      this.textContent = 'Check All'
    }
    
    localStorage.setItem('items', JSON.stringify(items));

    populateDish(items, itemsList);
  }

  function deleteAll() {
    items = [];
    localStorage.setItem('items', JSON.stringify(items));
    populateDish(items, itemsList);
  }

  function order() {
    let dishes = "";
    const orders = items.filter(order =>{
      if (order.added) {
        dishes += ` ${order.text}`;
        return true
      }
    })
    alert(`Your Orders: ${dishes}`);
  }
  
  addItems.addEventListener('submit', addDish)
  itemsList.addEventListener('click', toggleDish)
  let checked = false;
  checkBtn.addEventListener('click', toggleCheck);
  deleteAllBtn.addEventListener('click', deleteAll);
  orderBtn.addEventListener('click', order);
  populateDish(items, itemsList);