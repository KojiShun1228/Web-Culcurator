let count = 0; /*計算回数カウンタ*/
let isResultDisplayed = false; /*計算結果が表示されているか*/

function append(value) {
  const display = document.getElementById("display");
    const operators = ['+', '-', '×', '÷'];
    const lastChar = display.value.slice(-1);

  if (isResultDisplayed) {
    /*計算結果の後に演算子が来た場合*/ 
    if (operators.includes(value)) {
      isResultDisplayed = false;
      display.value += value;
      return;
      display.value = display.value; /*結果のまま、演算子追加*/
  } else {
    /*数字が来たら新しい計算として上書き*/
    display.value = value;
    isResultDisplayed = false;
    return;
  }
}

  /*直前の文字が演算子で、今回の入力も演算子なら置き換える*/
  if (operators.includes(lastChar) && operators.includes(value)) {
    display.value = display.value.slice(0, -1) + value;
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
