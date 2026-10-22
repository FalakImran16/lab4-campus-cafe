document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('order-form');
  const ordersBody = document.getElementById('orders-body');
  const clearBtn = document.getElementById('clear-orders');

  // Load orders from LocalStorage
  function loadOrders() {
    const saved = localStorage.getItem('cafe_orders');
    return saved ? JSON.parse(saved) : [];
  }

  // Save orders to LocalStorage
  function saveOrders(orders) {
    localStorage.setItem('cafe_orders', JSON.stringify(orders));
  }

  // Render orders table safely
  function renderOrders() {
    const orders = loadOrders();
    ordersBody.innerHTML = '';

    if (orders.length === 0) {
      ordersBody.innerHTML = '<tr><td colspan="4">No orders saved yet.</td></tr>';
      return;
    }

    orders.forEach(order => {
      const tr = document.createElement('tr');
      
      const tdName = document.createElement('td');
      tdName.textContent = order.name;
      
      const tdDrink = document.createElement('td');
      tdDrink.textContent = order.drink;
      
      const tdQty = document.createElement('td');
      tdQty.textContent = order.quantity;
      
      const tdTime = document.createElement('td');
      tdTime.textContent = order.pickupTime;

      tr.appendChild(tdName);
      tr.appendChild(tdDrink);
      tr.appendChild(tdQty);
      tr.appendChild(tdTime);

      ordersBody.appendChild(tr);
    });
  }

  // Handle Form Submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('customer-name').value.trim();
    const drink = document.getElementById('drink-select').value;
    const quantity = document.getElementById('quantity').value;
    const pickupTime = document.getElementById('pickup-time').value;

    if (!name || !drink || !pickupTime) {
      alert('Please fill in all required fields.');
      return;
    }

    const newOrder = { name, drink, quantity, pickupTime };
    const orders = loadOrders();
    orders.push(newOrder);

    saveOrders(orders);
    renderOrders();
    form.reset();
  });

  // Handle Clear Orders
  clearBtn.addEventListener('click', () => {
    localStorage.removeItem('cafe_orders');
    renderOrders();
  });

  // Initial Load
  renderOrders();
});