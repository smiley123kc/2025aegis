let timeLeft = 600; //10分鐘
let currentLevel = 0;
let timerRunning=true; //倒數計時器是否繼續

let clickedCart = false;
let clickedBuy = false;

const levels = [
    { url: "http://amaz0n.com", message: "🚩 這是釣魚網站，網址拼寫錯誤！🚩", card: "", square: "❤️" },
    { url: "http://paypa1.com", message: "🚩 這是假冒的客服，想要詐騙你的個人資料！🚩", card: "", square: "✌️" }
];

function stopTimer(){
  timerRunning=false; //停止倒數 
}

// 更新倒數計時器
function updateTimer() {
    if (timeLeft > 0 && timerRunning) {
        timeLeft--;
        document.getElementById("minute").textContent = String(Math.floor(timeLeft / 60)).padStart(2, "0");
        document.getElementById("second").textContent = String(timeLeft % 60).padStart(2, "0");

        let progress = (timeLeft / 600) * 100;
        document.getElementById("progressBar").firstElementChild.style.width = progress + "%";

        setTimeout(updateTimer, 1000);
    } // if
  else if(timeLeft<=0) {
        alert("⚠️時間到！遊戲結束！⚠️");
                document.getElementById("gameOverScreen").style.display = "flex";    
        location.reload();
    } //else if
}

// 檢查答案
function checkAnswer() {
   /*alert(levels[currentLevel].message); */
  document.getElementById("popup-text").textContent = levels[currentLevel].message;
    
 if(currentLevel==0){
document.getElementById("popup-1").style.display = "block";
 } // if
  else if(currentLevel==1) { document.getElementById("popup-2").style.display = "block";
document.querySelector("#popup-2 #popup-text").innerText = levels[currentLevel].message;
  } // else if
 
}

// 產品資料，依據產品標題設定對應的詳細資訊
const productData = {
  "Sony WH-1000XM5 Wireless Headphones": {
    description: "可自動依偑戴狀況和環境自動降噪，將不受干擾的聆聽體驗和通話清晰度提升至全新境界。",
    reviews: [
      { rating: 5, comment: "Sony藍芽耳機外觀超美，音色也完美!!", author: "Wendy" },
      { rating: 4, comment: "質感很好，但很昂貴。", author: "Patty" },
      { rating: 5, comment: "降噪能力超級好!!", author: "Chen" }
    ],
    imageUrl: "https://store.sony.com.tw/resource/file/product_files/WH-1000XM5-P/48_f4ed13641.jpg"
  }, 
  
  "Apple Watch Series 10": {
    description: "首款提供廣視角OLED 顯示器的Apple 產品，從特定角度觀看時，顯示器的亮度高出40%，使閱讀變得更輕易、快速。",
    reviews: [
      { rating: 5, comment: "Apple手錶質感就是好!!", author: "Andy" },
      { rating: 4, comment: "價格過於昂貴。", author: "Alex" }
    ],
    imageUrl: "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/MXM83ref_FV99_VW_34FR+watch-case-46-aluminum-rosegold-nc-s10_VW_34FR+watch-face-46-aluminum-rosegold-s10_VW_34FR?wid=750&hei=712&trim=1%2C0&fmt=p-jpg&qlt=95&.v=1725645481882"
  }, 
  
  "Samsung QLED 4K Q60C TV": {
    description: "擁有金屬量子點顯色技術的QLED 4K Q60C可以呈現完整的色彩，搭載Quantum HDR技術，可以展現影像中的細節。",
    reviews: [
      { rating: 5, comment: "三星電視外型很完美!", author: "Cindy" },
      { rating: 3, comment: "寄送速度太慢!", author: "Ruby" }
    ],
    imageUrl: "https://m.media-amazon.com/images/I/71bmtncxa+L.jpg"
  }, 
  
  "Apple iPad Pro 11-inch": {
    description: "具備ProMotion 自動適應更新頻率、P3 廣色域與原彩顯示等先進技術。",
    reviews: [
      { rating: 5, comment: "Ipad很方便攜帶!", author: "Omo" },
    ],
    imageUrl: "https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/ipad-pro-11-inch-13-inch.png"
  }, 
  
   "Nintendo Switch OLED Model": {
    description: "家庭用遊戲機，不單止可連接電視來玩，也可配合遊戲方式，自由選擇3中模式。",
    reviews: [
      { rating: 5, comment: "Switch超級好玩!", author: "Tim" },
      { rating: 5, comment: "後悔晚買了 :( ", author: "Henry" },
      { rating: 3, comment: "可以多人連線，聚會玩很開心。", author: "Anita" }
    ],
    imageUrl: "https://i0.wp.com/uploads.saigacdn.com/2021/07/nintendo-switch-oled-model-00.jpg"
  }, 
  
  "Kindle Paperwhite (16GB)": {
    description: "Amazon推出的電子紙閱讀器，採用7吋300ppi的Paperwhite顯示器，具備IPX8防水等級，可以在浴室或泳池邊安心閱讀。",
    reviews: [
      { rating: 5, comment: "電子書很方便攜帶!", author: "Henry" },
      { rating: 3, comment: "電子紙閱讀器畫質不夠高。", author: "Percy" }
    ],
    imageUrl: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1667850366/Croma%20Assets/Computers%20Peripherals/Tablets%20and%20iPads/Images/251101_0_cjns1e.png"
  }, 
  
  "Bose QuietComfort Earbuds II": {
    description: "將耳塞放入耳朵時，麥克風會捕捉並評估響起的聲響，藉此判斷最適合每個耳朵的設定，以確保聲音到達耳膜時能夠達成完美平衡。",
    reviews: [
      { rating: 5, comment: "藍芽耳機超有質感!!", author: "Sky" },
    ],
    imageUrl: "https://assets.bose.com/content/dam/cloudassets/Bose_DAM/Web/consumer_electronics/global/products/headphones/qc_earbuds_ii/product_silo_image/CTP-36312_ECOM_QCEII_Triple_Black_2.png/jcr:content/renditions/cq5dam.web.1920.1920.png"
  }, 
  
  "Marshall Acton III": {
    description: "透過上方的高音、低音、音量等黃銅旋鈕和多項控制按鍵，無需使用你的電子設備即可輕鬆控制音樂。",
    reviews: [
      { rating: 5, comment: "喇叭本人超級有質感!", author: "Monica" },
      { rating: 5, comment: "除了價格以外，其他都很完美!", author: "Kelly" },
      { rating: 5, comment: "外型超美!", author: "Christina" }
    ],
    imageUrl: "https://down-tw.img.susercontent.com/file/tw-11134207-7r98u-lo2biksh534t91"
  }, 
  
  "MacBook Air M4": {
    description: "M4晶片配備強大的10核心CPU、最多10 核心GPU，且支援高達32GB的統一記憶體，速度最快可達兩倍。",
    reviews: [
      { rating: 5, comment: "筆電超有質感!", author: "Benny" },
      { rating: 4, comment: "會一直購買蘋果的電腦!", author: "Charles" },
      { rating: 5, comment: "筆電CPU運算快速!", author: "Alan" }
    ],
    imageUrl: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1741278345/Croma%20Assets/Computers%20Peripherals/Laptop/Images/314077_czjks8.png"
  },
  
  "Canon EOS R50": {
    description: "最輕最小的EOS R相機，EOS R50機身僅重375g，具備無裁切6K超取樣4K 30p短片及「近拍展示」模式令拍攝VLOG更方便。",
    reviews: [
      { rating: 5, comment: "用相機拍照還是比較好看!", author: "Alice" },
      { rating: 3, comment: "效果不錯，但稍微貴一點。", author: "Andy" }
    ],
    imageUrl: "https://cdn.shoplightspeed.com/shops/650021/files/52365725/1652x1652x1/canon-canon-eos-r50-mirrorless-camera.jpg"
  },
    
  "PlayStation 5 Console": {
    description: "透過觸覺回饋、自適應板機與3D音效技術支援，發掘更深刻的遊戲體驗。",
    reviews: [
      { rating: 5, comment: "超級好玩!!!", author: "Jay" }
    ],
    imageUrl: "https://action-v2-backend.b-cdn.net/38168/Pw36eX3hHQuH7i1jTjWD5iZluLYgP53wKtns2B2j.png"
  },
  
  "Dyson Airstraight": {
    description: "利用氣流，從濕髮吹乾同時順直髮絲。沒有加熱面板以避免熱傷害。",
    reviews: [
      { rating: 5, comment: "吹完的頭髮很好看!", author: "Alice" },
      { rating: 4, comment: "效果不錯，但稍微貴一點。", author: "Bob" }
    ],
    imageUrl: "https://m.media-amazon.com/images/I/514zE5WSO9L._AC_UF894,1000_QL80_.jpg"
  }
  

  // 若有其他產品，可繼續加入
};

// 取得顯示詳情的 modal 元素與關閉按鈕
const productDetail = document.getElementById('productDetail');
const closeBtn = document.getElementById('closeBtn');

// 取得所有產品卡片（假設 class 為 .product-card）
const cards = document.querySelectorAll('.product-card');

// 為每個產品卡片加上點擊事件，點擊後顯示該產品的詳情
cards.forEach(card => {
  card.addEventListener('click', () => {
    // 取得產品資訊
    const title = card.querySelector('h3').textContent;
    const price = card.querySelector('.price').textContent;
    // 這裡假設產品卡片的結構為：
    // <img>、<h3>、<div class="price">、<div>(評價內容)</div>、<button>
    // 使用 querySelector('div:nth-child(4)') 取得第四個子元素的文字內容作為評價
    const rating = card.querySelector('div:nth-child(4)').textContent;
    const rateNum = card.querySelector('ratenum').textContent;  
    
    // 將基本資訊填入 modal
    document.getElementById('detailTitle').textContent = title;
    document.getElementById('detailPrice').textContent = price;
    document.getElementById('detailRating').textContent = rating;
    document.getElementById('detailRateNum').textContent = rateNum;  
    
    // 根據產品標題取得額外資料，若找不到則使用預設資料
    const data = productData[title] || {
      description: "Detailed product description coming soon...",
      reviews: [],
      imageUrl: ""
    };
    
    document.getElementById('detailDescription').textContent = data.description;
    
    // 清空評論容器，然後依序建立評論元素
    const reviewsContainer = document.getElementById('reviewsContainer');
    reviewsContainer.innerHTML = '';
    data.reviews.forEach(review => {
      const reviewElement = document.createElement('div');
      reviewElement.className = 'review';
      reviewElement.innerHTML = `
        <div class="star-rating">${'⭐'.repeat(review.rating)}</div>
        <p>${review.comment}</p>
        <small>- ${review.author}</small>
      `;
      reviewsContainer.appendChild(reviewElement);
    });
    
    // 設定產品圖片，並顯示 modal
    document.getElementById('detailImage').src = data.imageUrl;
    productDetail.style.display = 'block';
  });
});

// 當使用者點擊關閉按鈕時，隱藏產品詳情 modal
closeBtn.addEventListener('click', () => {
  productDetail.style.display = 'none';
});

// 當使用者點擊 modal 區塊背景時，若點擊位置為 modal 本身（非內部內容），也隱藏 modal
productDetail.addEventListener('click', e => {
  if (e.target === productDetail) {
    productDetail.style.display = 'none';
  }
});




function showCard(level) {
/*alert(level); */ document.getElementById(`popup-${level}`).style.display = "none";
    document.getElementById(`card-${level}`).style.display = "block";
    document.getElementById("card-text").textContent = levels[level - 1].card;
    document.getElementById("square-card").textContent = levels[level - 1].square;
  document.querySelector("#card-2 #square-card").innerText = levels[currentLevel].square;
}


function showCompletionScreen() { 
stopTimer(); document.getElementById('completion-screen').style.display = 'block';
}

function createFirework() {
  document.getElementById('fireworks-container').style.display = 'block';
  
    const container = document.querySelector('.fireworks-container');

    for (let i = 0; i < 20; i++) {
        let particle = document.createElement('div');
        particle.classList.add('firework-particle');
        
        // 隨機位置
        let x = (Math.random() - 0.5) * 200 + 'px';
        let y = (Math.random() - 0.5) * 200 + 'px';
        
        particle.style.setProperty('--x', x);
        particle.style.setProperty('--y', y);
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 50 + 'vh';
        container.appendChild(particle);

        setTimeout(() => particle.remove(), 1500);
    }
}

// 觸發煙花
function showFireworks() {
    setInterval(createFirework, 500);
}

// 在通關時顯示煙花
document.addEventListener("DOMContentLoaded", () => {
    showFireworks();
});

function nextLevel() {
 // alert("進入 nextLevel 函式，currentLevel=" + currentLevel);
 /* console.log("currentLevel:", currentLevel); // 確認變數值
    console.log("level-2:", document.getElementById("level-2")); // 確認元素是否存在  
 */ 
    document.getElementById(`card-${currentLevel + 1}`).style.display = "none";

    currentLevel++;
    if (currentLevel === 1) {
      /*alert("切換到第二關！");*/
        document.getElementById("level-1").style.display = "none";
      
        document.getElementById("level-2").style.display = "block";
 /*     
document.getElementById("level-2").style.visibility = "visible";
document.getElementById("level-2").style.opacity = "1";
*/
    } else {
      document.getElementById("level-2").style.display = "none";
      
showCompletionScreen();
        /*document.body.innerHTML = "<h1 style='text-align:center;color:green;'>🎉 恭喜你完成所有關卡！</h1>";*/
    }
}

document.addEventListener("DOMContentLoaded", updateTimer);

document.querySelector(".cart-now-btn").addEventListener("click", function () {
      if (!clickedCart) {
        alert("⚠️ 這是釣魚網站！⚠️");
        clickedCart = true;
        checkGameOver();
      } // if
    });  // function

    document.querySelector(".buy-now-btn").addEventListener("click", function () {
      if (!clickedBuy) {
        alert("⚠️ 這是釣魚網站！⚠️");
        clickedBuy = true;
        checkGameOver();
      }  // if
    }); // function

function checkGameOver() {
      if (clickedCart || clickedBuy) {
        document.getElementById("gameOverScreen").style.display = "flex";
      } // if
} // checkGameOver
