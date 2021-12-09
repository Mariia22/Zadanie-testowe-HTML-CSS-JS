//I. Przeglądarka
document.querySelector('.browser__button').addEventListener('click', addNumbersToTable);
const arrayHeadTable = ['Parzyste', 'Nieparzyste'];
const minNumber = 1;
const maxNumber = 100;
const lengthNumber = 20;

function addNumbersToTable() {
  createTable(arrayHeadTable);
  const resultEven = [];
  const resultOdd = [];
  generateSortedNumbers(lengthNumber, minNumber, maxNumber)
    .forEach((item) => { item % 2 === 0 ? resultEven.push(item) : resultOdd.push(item) });
  if (resultEven.length > resultOdd.length) {
    outputArrayToTable(resultEven, resultOdd);
  }
  else {
    outputArrayToTable(resultOdd, resultEven);
  }
}

function generateSortedNumbers(length, min, max) {
  const result = [];
  for (let i = 0; i < length; i++) {
    let number = generateRandomNumbers(min, max);
    result.push(number);
  }
  return result.sort((a, b) => a - b);
}

function generateRandomNumbers(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function createTable(array) {
  document.querySelector('.browser__table').innerHTML = '<table class="table"></table>';
  const tableBrowser = document.querySelector('table');
  const thead = document.createElement('thead');
  tableBrowser.append(thead);
  const row = document.createElement('tr');
  thead.append(row);
  array.forEach((item) => {
    row.insertAdjacentHTML('beforeend', `<th>${item}</th>`);
  });
  const tbody = document.createElement('tbody');
  tableBrowser.append(tbody);
}

function outputArrayToTable(arrayFirst, arraySecond) {
  const tableBody = document.querySelector('tbody');
  arrayFirst.forEach((item, index) => {
    const row = document.createElement('tr');
    tableBody.append(row);
    if (item % 2 === 0) {
      row.insertAdjacentHTML('beforeend', `<td>${item}</td><td>${arraySecond[index] || ""}</td>`)
    }
    else {
      row.insertAdjacentHTML('beforeend', `<td>${arraySecond[index] || ""}</td><td>${item}</td>`)
    }
  });
}
