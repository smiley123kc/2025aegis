
// 設定總時間（10 分鐘 = 600 秒）
let timeLeft = 600;
let currentLevel = 0;

// 假的關卡資料
const levels = [
    { url: "http://amaz0n.com", content: `<h2>歡迎來到「Amazon」</h2><p>我們有超值優惠等你拿！🔥</p><button>立即購買</button>`, message: "這是釣魚網站，網址拼寫錯誤！", card: "📖 小知識：釣魚網站常用相似字母來偽造網址，例如 amaz0n.com！", square: "神" },
    { url: "http://paypa1.com", content: `<h2>歡迎來到「PayPal」</h2><p>請輸入你的帳戶資訊來領取獎勵！</p><button>確認</button>`, message: "這是釣魚網站，網址拼寫錯誤！", card: "📖 小知識：官方網站通常使用 HTTPS，若看到 HTTP，請小心！", square: "盾" },
    { url: "http://bank-secure.com", content: `<h2>您的銀行通知</h2><p>您的帳戶有異常登入，請立即驗證！</p><button>立即驗證</button>`, message: "這是釣魚網站，官方銀行網址不會這樣！", card: "📖 小知識：銀行不會透過 Email 或簡訊要求提供帳戶密碼！", square: "盃" }
];

// 倒數計時器函式
function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;

        document.getElementById("minute").textContent = minutes.toString().padStart(2, "0");
        document.getElementById("second").textContent = seconds.toString().padStart(2, "0");

        // 更新進度條
        let progressBar = document.getElementById("progressBar").firstElementChild;
        let progress = (timeLeft / 600) * 100;
        progressBar.style.width = progress + "%";

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
    document.getElementById("square-card").textContent = levels[currentLevel].square;
    document.getElementById("card").style.display = "block";
}

// 進入下一關
function nextLevel() {
    currentLevel++;
    if (currentLevel < levels.length) {
        document.getElementById("fake-url").textContent = levels[currentLevel].url;
        document.getElementById("fake-content").innerHTML = levels[currentLevel].content;
        document.getElementById("card").style.display = "none";
    } else {
        alert("🎉 恭喜你完成所有關卡！");
        location.reload();
    }
}

// 頁面載入後啟動倒數計時
document.addEventListener("DOMContentLoaded", function () {
    updateTimer();
});