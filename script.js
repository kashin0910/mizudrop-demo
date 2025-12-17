// ==========================
// データ（デモ用）
// ==========================

// ユーザー
let userState = {
  name: "Kexin",
  drops: 12,
  completedTasks: 3,
};

// いま近くで起きていること（タスク/イベント）
const tasks = [
  {
    id: 1,
    title: "親子絵本ワークショップの協力",
    desc: "駒込の皆さん、こんにちは。絵本専門士のなおみです。2月3日に淀む庭で親子絵本ワークショップを行います。会場準備など、協力してくれる方を探しています。",
    reward: 4,
    meta: "2月3日｜＠淀む庭",
    done: false,
    ctaPrimary: "協力する",
    ctaSecondary: "詳細を見る",
  },
  {
    id: 2,
    title: "生活用品の買い物を手伝ってほしい",
    desc: "こんにちは、山田です（78歳）。少し重たい買い物があり、手伝ってくれる方を探しています。",
    reward: 3,
    meta: "本日 16:00 まで",
    done: false,
    ctaPrimary: "手伝う",
    ctaSecondary: "メッセージを送る",
  },
  {
    id: 3,
    title: "中国文化シェア会",
    desc: "駒込の皆さん、こんにちは。Kexin です。1月6日に淀む庭で中国文化について気軽にお話しします。ぜひ遊びに来てください。",
    reward: 2,
    meta: "1月6日｜＠淀む庭",
    done: false,
    ctaPrimary: "参加する",
    ctaSecondary: "詳細を見る",
  },
  {
    id: 4,
    title: "Carrot Cake教室",
    desc: "Cherish Foodsのキャロットケーキは子供の頃、母が作ってくれた人ケーキに触れ味を再現したものです。1980年代、日本でも作られていたトラディションナルな焼き菓子です。ご家庭でも楽しめるよう一緒に作りませんか。",
    reward: 1,
    meta: "12月10日　Cherish Foods｜チェリッシュフーズ",
    done: false,
    ctaPrimary: "申込する",
    ctaSecondary: "詳細を見る",
  },
  {
    id: 5,
    title: "ひだまりマルシェ",
    desc: "ひだまりマルシェはハンドメイド作家による販売イベントです。ぜひお立ち寄りください。",
    reward: 1,
    meta: "12月13–14日 10:00–16:00｜霜降り銀座商店街 金魚亭",
    done: false,
    ctaPrimary: "のぞいてみる",
    ctaSecondary: "詳細を見る",
  },
];

// 水滴はどこへ？（折りたたみ内の“広がり”）
const rights = [
  {
    id: 1,
    title: "顔なじみの特典",
    desc: "関わりを重ねることで、商店街の店舗からささやかなサービス（ドリンクのおかわり、試食、小鉢など）を受けられるようになります。",
    cost: 5,
  },
  {
    id: 2,
    title:"イベントへの優先参加",
    desc: "大きな市集（マルシェ）などで、優先的に申し込みできます。",
    cost: 15,
  },
  {
    id: 3,
    title: "あなたのストーリー展示",
    desc: "インタビューを通して、連庭の壁にあなたの物語を残します。",
    cost: 25,
  },
  {
    id: 4,
    title: "淀む庭の一時利用",
    desc: "淀む庭を、短時間・限定的に個人やグループで利用できます。小さな集まりや試みの場として開放されます。",
    cost: 50,
  },
];

// 商店（ユーザー向け表示）
const shops = [
  {
    id: 1,
    name: "昭和の小さな雑貨店",
    drops: 38,
    support: "店主の思い出話を、展示として残す準備中。",
  },
  {
    id: 2,
    name: "世界食堂 Komagome",
    drops: 26,
    support: "多言語メニュー制作とSNS発信を準備中。",
  },
  {
    id: 3,
    name: "霜降り銀座商店街 金魚亭",
    drops: 18,
    support: "ひだまりマルシェの会場として参加中。",
  },
];

// 展示ページ（公共視点）
// いま流れている水滴（今日の例）
const displayFlow = [
  { label: "親子絵本ワークショップの準備", plus: 4 },
  { label: "山田さんの買い物サポート", plus: 3 },
  { label: "中国文化シェア会の開催", plus: 2 },
  { label: "ひだまりマルシェへの参加", plus: 1 },
];

// 最近の痕跡
const displayTraces = [
  "Kexinが絵本ワークショップを手伝いました",
  "山田さんの買い物が、無事に終わりました",
  "淀む庭で、新しい集まりが生まれました",
  "はじめて参加した人が、3人いました",
];

// 静かなランキング（最近の関わり）
const displayRanking = [
  { name: "Kexin", drops: 12, desc: "親子絵本ワークショップの協力" },
  { name: "キコさん", drops: 8, desc: "買い物サポート・マルシェ参加" },
  { name: "なおみ", drops: 6, desc: "中国文化シェア会への参加" },
  { name: "昭和の小さな雑貨店", drops: 10, desc: "商店街イベントへの協力" },
  { name: "はじめての参加", drops: 3, desc: "初回の小さな手伝い" },
];

// 展示：商店の関わり
const displayShopsSoft = [
  "霜降り銀座商店街 金魚亭 — マルシェ会場として参加中",
  "世界食堂 駒込 — 多言語メニュー準備中",
  "昭和の小さな雑貨店 — 店主の思い出話を展示予定",
];

// ==========================
// レンダリング（ユーザーページ）
// ==========================

function renderUserHeader() {
  document.getElementById("user-drops").textContent = userState.drops;
  document.getElementById("user-tasks-count").textContent = userState.completedTasks;
}

// タスクカード
function renderTasks() {
  const container = document.getElementById("task-list");
  container.innerHTML = "";

  tasks.forEach((t) => {
    const card = document.createElement("article");
    card.className = "card";

    card.innerHTML = `
      <div class="card-tag">＋${t.reward}💧</div>
      <h4>${t.title}</h4>
      <p>${t.desc}</p>
      <p class="card-meta">${t.meta}</p>
      <div class="card-bottom-row">
        <span class="reward">＋${t.reward} 💧</span>
        <div style="display:flex; gap:.4rem;">
          <button class="btn btn-primary" ${t.done ? "disabled" : ""} data-task-id="${t.id}">
            ${t.done ? "完了" : t.ctaPrimary}
          </button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });

  container.querySelectorAll("button[data-task-id]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.getAttribute("data-task-id"));
      completeTask(id);
    });
  });
}

// 完了（デモ：水滴が増える）
function completeTask(taskId) {
  const t = tasks.find((x) => x.id === taskId);
  if (!t || t.done) return;

  t.done = true;
  userState.drops += t.reward;
  userState.completedTasks += 1;

  renderUserHeader();
  renderTasks();
}

// 折りたたみ内：水滴の行き先
function renderRights() {
  const container = document.getElementById("rights-list");
  container.innerHTML = "";

  rights.forEach((r) => {
    const card = document.createElement("article");
    card.className = "card";

    card.innerHTML = `
      <h4>${r.title}</h4>
      <p>${r.desc}</p>
      <div class="card-bottom-row">
        <span class="reward">必要：${r.cost} 💧</span>
        <button class="btn btn-primary" data-right-id="${r.id}">
          交換する
        </button>
      </div>
    `;

    container.appendChild(card);
  });

  container.querySelectorAll("button[data-right-id]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.getAttribute("data-right-id"));
      redeemRight(id);
    });
  });
}

function redeemRight(rightId) {
  const r = rights.find((x) => x.id === rightId);
  if (!r) return;

  if (userState.drops < r.cost) {
    const diff = r.cost - userState.drops;
    alert(`水滴が足りません。あと ${diff} 💧`);
    return;
  }

  userState.drops -= r.cost;
  renderUserHeader();
  alert(`「${r.title}」を交換しました（デモ）`);
}

// 商店カード（ユーザー向け）
function renderShops() {
  const container = document.getElementById("shop-list");
  container.innerHTML = "";

  shops.forEach((s) => {
    const card = document.createElement("article");
    card.className = "card";

    card.innerHTML = `
      <h4>${s.name}</h4>
      <p>${s.support}</p>
      <p class="card-meta">水滴：${s.drops} 💧</p>
    `;

    container.appendChild(card);
  });
}

// ==========================
// レンダリング（展示ページ）
// ==========================

function renderDisplayFlow() {
  const ul = document.getElementById("display-flow-list");
  ul.innerHTML = "";

  let total = 0;
  displayFlow.forEach((x) => {
    total += x.plus;
    const li = document.createElement("li");
    li.textContent = `${x.label}　＋${x.plus}💧`;
    ul.appendChild(li);
  });

  document.getElementById("display-flow-total").textContent = `本日 合計：${total} 💧`;
}

function renderDisplayTraces() {
  const ul = document.getElementById("display-trace-list");
  ul.innerHTML = "";
  displayTraces.forEach((t) => {
    const li = document.createElement("li");
    li.textContent = t;
    ul.appendChild(li);
  });
}

function renderDisplayRankingSoft() {
  const ol = document.getElementById("display-ranking-soft");
  ol.innerHTML = "";

  const sorted = [...displayRanking].sort((a, b) => b.drops - a.drops);

  sorted.forEach((x) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="name">${x.name}</span>
      <span class="drop">${x.drops} 💧</span>
      <span class="desc">${x.desc}</span>
    `;
    ol.appendChild(li);
  });
}

function renderDisplayShopsSoft() {
  const ul = document.getElementById("display-shop-list-soft");
  ul.innerHTML = "";
  displayShopsSoft.forEach((s) => {
    const li = document.createElement("li");
    li.textContent = s;
    ul.appendChild(li);
  });
}

// ==========================
// 展示モード切り替え + 自動スクロール
// ==========================

function setupDisplayMode() {
  const btn = document.getElementById("display-toggle");
  const main = document.getElementById("main-content");
  const display = document.getElementById("display-mode");

  let isDisplay = false;

  btn.addEventListener("click", () => {
    isDisplay = !isDisplay;

    if (isDisplay) {
      main.classList.add("hidden");
      display.classList.remove("hidden");
      btn.textContent = "展示モード：ON";
      display.scrollTo({ top: 0, behavior: "auto" });
    } else {
      main.classList.remove("hidden");
      display.classList.add("hidden");
      btn.textContent = "展示モード：OFF";
    }
  });

  setInterval(() => {
    if (!isDisplay) return;

    display.scrollBy({ top: 220, behavior: "smooth" });

    if (display.scrollTop + display.clientHeight >= display.scrollHeight - 10) {
      display.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, 5000);
}

// ==========================
// 初期化
// ==========================

function init() {
  renderUserHeader();
  renderTasks();
  renderRights();
  renderShops();

  renderDisplayFlow();
  renderDisplayTraces();
  renderDisplayRankingSoft();
  renderDisplayShopsSoft();

  setupDisplayMode();
}

document.addEventListener("DOMContentLoaded", init);