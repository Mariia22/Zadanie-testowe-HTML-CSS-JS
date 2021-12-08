//II.Formularze
const form = document.querySelector('.library__form');
const tbody = document.querySelector('tbody');
const headerElement = document.getElementById('item__header');
const authorElement = document.getElementById('item__author');
const priorityElement = document.getElementById('item__priority');
const categoryElement = document.getElementById('item__category');
const elements = [headerElement, authorElement, priorityElement, categoryElement];
let library;

document.addEventListener('DOMContentLoaded', () => {
  library = JSON.parse(localStorage.getItem('library')) || [];
  if (library.length > 0) {
    library.forEach(book => {
      createTable(book)
    })
  }
})

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const headerValue = headerElement.value.trim();
  const authorValue = authorElement.value.trim();
  const priorityValue = priorityElement.value;
  const categoryValue = categoryElement.value;
  const book = {
    header: headerValue,
    author: authorValue,
    priority: priorityValue,
    category: categoryValue
  };

  elements.forEach(item => {
    if (item.parentElement.classList.contains('error')) {
      item.parentElement.classList.remove('error');
      item.parentElement.removeAttribute('data-errormsg');
    }
  });
  const fails = checkForm(headerValue, authorValue);
  if (fails.length === 0) {
    createTable(book);
    library.push(book);
    localStorage.setItem('library', JSON.stringify(library))
  }
  else {
    fails.forEach(item => {
      let field = document.getElementById(item.input)
      field.parentElement.classList.add('error');
      field.parentElement.setAttribute('data-errormsg', item.message);
    })
  }
});

function createTable(values) {
  var row = document.createElement('tr');
  row.insertAdjacentHTML('beforeend', `<td>${values.header}</td><td>${values.author}</td>
  <td>${values.priority}</td><td>${values.category}</td>`)
  tbody.append(row);
  form.reset();
}

function checkForm(header, author) {
  let errors = [];
  if (header === '') {
    errors.push({ input: 'item__header', message: 'Required field' })
  }
  if (author.length < 3) {
    errors.push({ input: 'item__author', message: 'Field must contains at least 3 letters' })
  }
  if (priorityElement.selectedIndex === 0) {
    errors.push({ input: 'item__priority', message: 'Choose priority' })
  }
  if (categoryElement.selectedIndex === 0) {
    errors.push({ input: 'item__category', message: 'Choose category' })
  }
  return errors;
}
