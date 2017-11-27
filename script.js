const createStartTable = (investments, count, stepValue) => {
  // conditions calculate
  let startConditions = [];
  let rowNumber = 0;

  for (let x = 0; x < investments + stepValue; x += stepValue) {
    let value = Math.round(x * 10) / 10;
    if (value > investments) {
      value = investments;
    }
    let rowValues = [];

    for (let i = 0; i < count; i += 1) {
      const incValue = +(Math.random() * (0 - 0.5) + 0.5).toFixed(1); // random value from 0.1 to 0.5
      let val = startConditions[rowNumber - 1]
        ? startConditions[rowNumber - 1].rowValues[i] + incValue
        : 0;
      rowValues.push(Math.round(val * 10) / 10);
    }

    startConditions.push({ x: value, rowValues });
    rowNumber += 1;
  }

  // generate table of conditions

  let tableHead = [];
  let tableBody = [];

  tableHead.push('<thead><tr><th>x</th>');
  for (let i = 1; i <= count; i += 1) {
    tableHead.push(`<th>f${i}(x)</th>`);
  }
  tableHead.push('</tr></thead>');

  tableBody = startConditions.map(item => {
    let row = [];
    row.push(`<tr><th>${item.x}</th>`);
    const values = item.rowValues.map(val => `<td>${val}</td>`);
    row = [...row, ...values];
    row.push('</tr>');
    return row.join('');
  });

  return { values: startConditions, tableMarkup: [...tableHead, ...tableBody].join('') };
};

const process = () => {
  const investments = document.getElementById('investments').value;
  const count = document.getElementById('count').value;
  const stepValue = document.getElementById('stepValue').value;

  const conditionsTable = document.getElementById('conditions');
  const startConditions = createStartTable(+investments, +count, +stepValue);
  conditionsTable.innerHTML = startConditions.tableMarkup;
};

(() => {
  const processBtn = document.getElementById('process');
  processBtn.addEventListener('click', process);
})();
