let count = 0; /*計算回数カウンタ*/
let isResultDisplayed = false; 

function append(value) {
  const display = document.getElementById("display");
  const operators = ['+', '-', '×', '÷'];
  const lastChar = display.value.slice(-1);

  if (isResultDisplayed) { 
    if (operators.includes(value)) {
       /*計算結果の後に演算子が来た場合*/
      isResultDisplayed = false;
      display.value += value;
      return;
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
    const display = document.getElementById("display");
    let expression = display.value.replace(/×/g, '*').replace(/÷/g, '/');
    /*掛け算割り算時に×と÷を置換*/
    const result = eval(expression);
    display.value = result;

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
