// Lấy dữ liệu khách hàng từ localStorage
let customers = JSON.parse(localStorage.getItem('customers')) || [];

// Hiển thị danh sách khách hàng
function renderCustomers() {
  const tbody = document.querySelector('#customerTable tbody');
  tbody.innerHTML = '';
  customers.forEach((customer, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${idx + 1}</td>
      <td>${customer.name}</td>
      <td>${customer.phone}</td>
      <td><button class="delete-btn" onclick="deleteCustomer(${idx})">Xoá</button></td>
    `;
    tbody.appendChild(tr);
  });
}

// Thêm khách hàng mới
document.getElementById('customerForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  if (name && phone.match(/^[0-9]{10,11}$/)) {
    customers.push({ name, phone });
    localStorage.setItem('customers', JSON.stringify(customers));
    renderCustomers();
    this.reset();
  } else {
    alert('Vui lòng nhập đúng tên và số điện thoại (10-11 số).');
  }
});

// Xoá khách hàng
function deleteCustomer(idx) {
  if (confirm('Bạn có chắc muốn xoá khách này?')) {
    customers.splice(idx, 1);
    localStorage.setItem('customers', JSON.stringify(customers));
    renderCustomers();
  }
}

// Khởi tạo hiển thị
renderCustomers();
