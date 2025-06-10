let count = 0; /*計算回数カウンタ*/
let isResultDisplayed = false; /*計算結果が表示されているか*/

function append(value) {
  const display = document.getElementById("display");

  if (isResultDisplayed) {
    display.value = value;
    isResultDisplayed = false;
  } else {
    display.value += value;
  }
}

function clearDisplay() {
  document.getElementById("display").value = "";
  isResultDisplayed = false;
}

function calculate() {
  /*すでに計算結果が表示されていたら、再計算しない*/
  if (isResultDisplayed) return;

  try {
    let expression = document.getElementById("display").value;
    /*掛け算割り算時に×と÷を置換*/
    expression = expression.replace(/×/g, '*').replace(/÷/g, '/');
    const result = eval(expression);
    document.getElementById("display").value = result;

    /*計算履歴を追加*/
    const historyList = document.getElementById("history");
    const newEntry = document.createElement("li");
    /*こちらも置換*/
    newEntry.textContent = `${expression.replace(/\*/g, '×').replace(/\//g, '÷')} = ${result}`;
    historyList.prepend(newEntry);

    /*計算回数をカウント*/
    count++;
    document.getElementById("count").textContent = `Calculations: ${count}`;

    /*結果表示*/
    isResultDisplayed = true;
  } catch {
    document.getElementById("display").value = "Error";
    isResultDisplayed = false;
  }
}
