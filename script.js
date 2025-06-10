let count = 0; /*計算回数カウンタ*/
let isResultDisplayed = false; 
let isError = false;/*エラー状態フラグを追加*/

function append(value) {
  const display = document.getElementById("display");
  const operators = ['+', '-', '×', '÷'];
  const lastChar = display.value.slice(-1);

  // 最初の「0」を置き換える（演算子じゃない場合）
  if (display.value === "0" && !operators.includes(value)) {
    display.value = value;
    return;
  }

  /*エラー状態は無視*/
  if (isError) return;

  if (isResultDisplayed) { 
    if (operators.includes(value)) {
      display.value += value;
    } else {
      display.value = value;
    }
    isResultDisplayed = false;
    return;
  }

  /*直前の文字が演算子で、今回の入力も演算子なら置き換える*/
  if (operators.includes(lastChar) && operators.includes(value)) {
    display.value = display.value.slice(0, -1) + value;
  } else {
    display.value += value;
  }
}

function clearLastEntry() {
  const display = document.getElementById("display");

  // 結果表示中 or エラー中 → "0"に戻す
  if (isError || isResultDisplayed || display.value.length <= 1) {
    display.value = "0";
    isError = false;
    isResultDisplayed = false;
    return;
  }

  // 1文字削除
  display.value = display.value.slice(0, -1);
}


function allClear() {
  document.getElementById("display").value = "0";
  document.getElementById("history").innerHTML = "";
  count = 0;
  document.getElementById("count").textContent = "Calculations: 0";
  isResultDisplayed = false;
  isError = false;
}

function calculate() {
  /*すでに計算結果が表示されていたら、再計算しない*/
  if (isResultDisplayed) return;

  if (isResultDisplayed || isError) return;

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
    isError = true;/*エラー状態フラグ*/
  }
}
