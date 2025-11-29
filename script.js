// ------------ 假数据 ------------

// 当前用户
let userState = {
  name: "Kexin",
  drops: 12,
  completedTasks: 3,
};

const tasks = [
  {
    id: 1,
    title: "陪我去医院看诊",
    desc: "希望有人一起陪同就诊，帮忙听医生说明。",
    reward: 4,
    level: "高价值贡献",
    done: false,
  },
  {
    id: 2,
    title: "帮忙搬重物回家",
    desc: "从超市到家，步行约10分钟。",
    reward: 3,
    level: "据点贡献",
    done: false,
  },
  {
    id: 3,
    title: "日语交流一小时",
    desc: "和外国学生进行轻松日常对话练习。",
    reward: 2,
    level: "活动参与",
    done: false,
  },
];

// 可兑换权利（Level 2）
const rights = [
  {
    id: 1,
    title: "大型市集摊位优先申请",
    desc: "在年度商店街市集中，优先获得摊位。",
    cost: 20,
  },
  {
    id: 2,
    title: "官方SNS宣传一次",
    desc: "由商店街官方账号帮你转发活动或店铺介绍。",
    cost: 15,
  },
  {
    id: 3,
    title: "据点故事上墙展示",
    desc: "由社区志愿者采访并制作你的故事，长期在据点展示。",
    cost: 25,
  },
];

// 商店（Level 3）
const shops = [
  {
    id: 1,
    name: "昭和小杂货店",
    drops: 38,
    support: "获得设计学生协助更新招牌与店内导视。",
  },
  {
    id: 2,
    name: "世界食堂 Komagome",
    drops: 26,
    support: "用水滴换取英文＋中文菜单制作和SNS宣传。",
  },
  {
    id: 3,
    name: "亲子绘本屋 Yume",
    drops: 18,
    support: "在「故事上墙」中获得一整面亲子故事展示。",
  },
];

// 排行榜（住民 + 商店的混合示例）
const rankingEntries = [
  { name: "Kexin", drops: 12, type: "住民" },
  { name: "山田さん", drops: 19, type: "住民" },
  { name: "昭和小杂货店", drops: 38, type: "店铺" },
  { name: "世界食堂 Komagome", drops: 26, type: "店铺" },
  { name: "Naomi", drops: 15, type: "住民" },
];

// ------------ DOM 渲染 ------------

function renderUserHeader() {
  document.getElementById("user-drops").textContent = userState.drops;
  document.getElementById("user-tasks-count").textContent =
    userState.completedTasks;
}

// 任务列表
function renderTasks() {
  const container = document.getElementById("task-list");
  container.innerHTML = "";

  tasks.forEach((task) => {
    const card = document.createElement("article");
    card.className = "card";

    card.innerHTML = `
      <div class="card-tag">${task.level} +${task.reward}💧</div>
      <h4>${task.title}</h4>
      <p>${task.desc}</p>
      <div class="card-bottom-row">
        <span class="reward">奖励：+${task.reward} 💧</span>
        <button class="btn btn-primary" ${
          task.done ? "disabled" : ""
        } data-task-id="${task.id}">
          ${task.done ? "已完成" : "完成"}
        </button>
      </div>
    `;

    container.appendChild(card);
  });

  // 绑定按钮事件
  container.querySelectorAll("button[data-task-id]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.getAttribute("data-task-id"));
      completeTask(id);
    });
  });
}

// 完成任务：更新水滴 & 次数
function completeTask(taskId) {
  const task = tasks.find((t) => t.id === taskId);
  if (!task || task.done) return;

  task.done = true;
  userState.drops += task.reward;
  userState.completedTasks += 1;

  renderUserHeader();
  renderTasks();
}

// 权利列表（Level2）
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
        <span class="reward">消耗：${r.cost} 💧</span>
        <button class="btn btn-primary" data-right-id="${r.id}">
          兑换
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
  const r = rights.find((item) => item.id === rightId);
  if (!r) return;

  if (userState.drops < r.cost) {
    const diff = r.cost - userState.drops;
    alert(`水滴还不够哦，还差 ${diff} 滴 💧`);
    return;
  }

  // demo：直接扣除
  userState.drops -= r.cost;
  renderUserHeader();
  alert(`已兑换：「${r.title}」！（demo 演示效果）`);
}

// 商店列表（Level3）
function renderShops() {
  const container = document.getElementById("shop-list");
  container.innerHTML = "";

  shops.forEach((s) => {
    const card = document.createElement("article");
    card.className = "card";

    card.innerHTML = `
      <h4>${s.name}</h4>
      <p>${s.support}</p>
      <p class="card-meta">持有水滴：${s.drops} 💧</p>
    `;

    container.appendChild(card);
  });
}

// 展示模式：排行榜
function renderRanking() {
  const ul = document.getElementById("ranking-list");
  ul.innerHTML = "";

  // 按水滴从高到低排序
  const sorted = [...rankingEntries].sort((a, b) => b.drops - a.drops);

  sorted.forEach((item, idx) => {
    const li = document.createElement("li");
    li.className = "ranking-item";

    li.innerHTML = `
      <span>${idx + 1}. ${item.name} <span style="opacity:.7;font-size:.75rem;">(${item.type})</span></span>
      <span>${item.drops} 💧</span>
    `;
    ul.appendChild(li);
  });
}

function renderDisplayTasks() {
  const ul = document.getElementById("display-task-list");
  ul.innerHTML = "";

  tasks.forEach((t) => {
    const li = document.createElement("li");
    li.textContent = `${t.title} ｜ +${t.reward}💧`;
    ul.appendChild(li);
  });
}

function renderDisplayShops() {
  const ul = document.getElementById("display-shop-list");
  ul.innerHTML = "";

  shops.forEach((s) => {
    const li = document.createElement("li");
    li.textContent = `${s.name} ｜ ${s.support}`;
    ul.appendChild(li);
  });
}

// 展示模式开关
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
      btn.textContent = "展示模式：开";
    } else {
      main.classList.remove("hidden");
      display.classList.add("hidden");
      btn.textContent = "展示模式：关";
    }
  });

  // 自动小滚动（模拟大屏缓慢循环）
  setInterval(() => {
    if (!isDisplay) return;
    display.scrollBy({ top: 200, behavior: "smooth" });
    // 滚到底再回到顶部
    if (display.scrollTop + display.clientHeight >= display.scrollHeight - 5) {
      display.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, 4000);
}

// ------------ 初始化 ------------

function init() {
  renderUserHeader();
  renderTasks();
  renderRights();
  renderShops();

  renderRanking();
  renderDisplayTasks();
  renderDisplayShops();
  setupDisplayMode();
}

document.addEventListener("DOMContentLoaded", init);