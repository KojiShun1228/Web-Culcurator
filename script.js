function append(value) {
  document.getElementById("display").value += value;
}

function clearDisplay() {
  document.getElementById("display").value = "";
}

function calculate() {
  try {
    const result = eval(document.getElementById("display").value);
    document.getElementById("display").value = result;
  } catch {
    document.getElementById("display").value = "Error";
  }
}

let count = 0; // 計算回数カウンタ

function append(value) {
  document.getElementById("display").value += value;
}

function clearDisplay() {
  document.getElementById("display").value = "";
}

function calculate() {
  try {
    const expression = document.getElementById("display").value;
    const result = eval(expression);
    document.getElementById("display").value = result;

    // ✅ 計算履歴を追加
    const historyList = document.getElementById("history");
    const newEntry = document.createElement("li");
    newEntry.textContent = `${expression} = ${result}`;
    historyList.prepend(newEntry); // 新しい履歴を上に追加

    // ✅ 計算回数をカウント
    count++;
    document.getElementById("count").textContent = `Calculations: ${count}`;
  } catch {
    document.getElementById("display").value = "Error";
  }
}
