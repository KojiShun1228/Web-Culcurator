let count = 0; // 計算回数カウンタ
let isResultDisplayed = false; // 計算結果が表示されているか

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
  try {
    const expression = document.getElementById("display").value;
    const result = eval(expression);
    document.getElementById("display").value = result;

    // 計算履歴を追加
    const historyList = document.getElementById("history");
    const newEntry = document.createElement("li");
    newEntry.textContent = `${expression} = ${result}`;
    historyList.prepend(newEntry);

    // 計算回数をカウント
    count++;
    document.getElementById("count").textContent = `Calculations: ${count}`;

    // 結果表示フラグON
    isResultDisplayed = true;
  } catch {
    document.getElementById("display").value = "Error";
    isResultDisplayed = false;
  }
}
