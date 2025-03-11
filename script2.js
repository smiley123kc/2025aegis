let timeLeft = 600;
let currentLevel = 0;

const levels = [
    { url: "http://amaz0n.com", message: "這是釣魚網站，網址拼寫錯誤！", card: "📖 小知識：釣魚網站常用相似字母來偽造網址，例如 amaz0n.com！", square: "❤️" },
    { url: "http://paypa1.com", message: "這是釣魚網站，網址拼寫錯誤！", card: "📖 小知識：官方網站通常使用 HTTPS，若看到 HTTP，請小心！", square: "盾" },
    { url: "http://bank-secure.com", message: "這是釣魚網站，官方銀行網址不會這樣！", card: "📖 小知識：銀行不會透過 Email 或簡訊要求提供帳戶密碼！", square: "盃" }
];

// 更新倒數計時器
function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        document.getElementById("minute").textContent = String(Math.floor(timeLeft / 60)).padStart(2, "0");
        document.getElementById("second").textContent = String(timeLeft % 60).padStart(2, "0");

        let progress = (timeLeft / 600) * 100;
        document.getElementById("progressBar").firstElementChild.style.width = progress + "%";

        setTimeout(updateTimer, 1000);
    } else {
        alert("時間到！遊戲結束！");
        location.reload();
    }
}

// 檢查答案
function checkAnswer() {
    document.getElementById("popup-text").textContent = levels[currentLevel].message;
    document.getElementById("popup").style.display = "block";
    
  
}

// 顯示翻頁提示字卡
function showCard() {
    document.getElementById("popup").style.display = "none";
    document.getElementById("card-text").textContent = levels[currentLevel].card;
    /*document.getElementById("square-card").textContent = levels[currentLevel].square;
    */
  document.getElementById("square-card").textContent = "❤️";
    document.getElementById("card").style.display = "block";
}

// 進入下一關
function nextLevel() {
    currentLevel++;
    if (currentLevel < levels.length) {
        document.getElementById("fake-url").textContent = levels[currentLevel].url;
        document.getElementById("card").style.display = "none";
    } else {
        alert("🎉 恭喜你完成所有關卡！");
        location.reload();
    }
}

document.addEventListener("DOMContentLoaded", updateTimer);


function endGame() {
  alert("🎉 恭喜你過關！");
  location.reload();

}