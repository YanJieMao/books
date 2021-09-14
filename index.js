let bookContainer = document.querySelector(".search");
let searchBooks = document.getElementById("search-box");

/** @start 添加元素 */
[
  
  
  { id: "cloud", title: "云原生、k8s、服务网格、监控", icon: "" },
  //{ id: "front", title: "vue、react、javascript", icon: "" },
  { id: "backend", title: "服务端、微服务、数据库、高可用、Spring", icon: "" },
  
  
  
].forEach(({ id, title, icon }) => {
  document.addEventListener("DOMContentLoaded", () => {
    drawChartBook(id);
  });

  document.querySelector("#foryou").innerHTML =
    document.querySelector("#foryou").innerHTML +
    `
      <section id=${id} class="results">
        <div class="flex">
          <h1 class="section-title">${title}</h1>
          <div>
            <button id="${id}-prev" class="pagination prev" onclick="prev('${id}')">◀</button>
            <button id="${id}-next" class="pagination next" onclick="next('${id}')">▶</button>
          </div>
        </div>
        <div class="list-book ${id} categories">
          <div class='prompt'>
            <div class="loader"></div>
          </div>
        </div>
        <div class="fade left"></div>
        <div class="fade right"></div>
      </section>
  `;
});

/** @end 添加元素 */

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const getCover = (title) => {
  return `https://orly-appstore.herokuapp.com/generate?title=${title}&top_text=Just%20Coder&author=awesome&image_code=${randomIntFromInterval(
    1,
    40
  )}&theme=${randomIntFromInterval(
    0,
    16
  )}&guide_text=&guide_text_placement=bottom_right`;
};

/** 执行书籍抓取 */
const getBooks = async (book) => {
  let data = [];

  switch (book) {


    case "cloud": {
      data = [
        {
          volumeInfo: {
            title: "istio服务网格进阶实战",
            repo: "istio-handbook",
            previewLink: "https://www.jianso.tech/istio-handbook/",
            imageLinks: {
              thumbnail: getCover("istio服务网格进阶实战"),
            },
            categories: ["istio", "服务网格"],
          },
        },
        {
          volumeInfo: {
            title: "k8s中文指南",
            repo: "k8s-handbook",
            previewLink: "https://www.jianso.tech/k8s-handbook/",
            imageLinks: {
              thumbnail: getCover("k8s中文指南"),
            },
            categories: ["k8s"],
          },
        }
      
      ]
       
      break;
    }
    
    case "backend": {
      data = [
        {
          volumeInfo: {
            title: "软件架构设计",
            repo: "SoftwareArchitecture-Series",
            previewLink: "https://ng-tech.icu/SoftwareArchitecture-Series/",
            imageLinks: {
              thumbnail: getCover("Software Architecture"),
            },
            categories: ["风格与模式", "复杂性与设计原则", "架构设计方式"],
          },
        },
        {
          volumeInfo: {
            title: "服务端功能域",
            repo: "Backend-Series",
            previewLink: "https://ng-tech.icu/Backend-Series/",
            imageLinks: {
              thumbnail: getCover("Backend Series"),
            },
            categories: ["Backend"],
          },
        },

        {
          volumeInfo: {
            title: "Spring 实战",
            repo: "Spring-Series",
            previewLink: "https://ng-tech.icu/Spring-Series/",
            imageLinks: {
              thumbnail: getCover("Spring Series"),
            },
            categories: ["Spring", "Spring Boot"],
          },
        },
        {
          volumeInfo: {
            title: "数据库",
            repo: "Database-Series",
            previewLink: "https://ng-tech.icu/Database-Series/#/",
            imageLinks: {
              thumbnail: getCover("Database Series"),
            },
            categories: ["Middleware", "Database"],
          },
        },
        {
          volumeInfo: {
            title: "MySQL 实战",
            repo: "MySQL-Series",
            previewLink: "https://ng-tech.icu/MySQL-Series/#/",
            imageLinks: {
              thumbnail: getCover("MySQL Series"),
            },
            categories: ["Middleware", "MySQL"],
          },
        },
        {
          volumeInfo: {
            title: "微服务与云原生",
            repo: "MicroCN-Series",
            previewLink: "https://ng-tech.icu/MicroCN-Series/",
            imageLinks: {
              thumbnail: getCover("MicroService Series"),
            },
            categories: ["RPC", "接入网关", "配置中心", "权限隔离"],
          },
        },
        {
          volumeInfo: {
            title: "测试与高可用保障",
            repo: "HA-Series",
            previewLink: "https://ng-tech.icu/HA-Series/",
            imageLinks: {
              thumbnail: getCover("测试与高可用保障"),
            },
            categories: ["Backend", "Test"],
          },
        },
        {
          volumeInfo: {
            title: "软件工程：整洁与重构",
            repo: "SoftwareEngineering-Series",
            previewLink: "https://ng-tech.icu/SoftwareEngineering-Series/",
            imageLinks: {
              thumbnail: getCover("Refactor"),
            },
            categories: ["Software Engineering", "Refactor"],
          },
        },
      ];
      break;
    }

  }

  data.forEach((d) => {
    d.volumeInfo.authors = ["awesome"];
  });

  return { totalItems: data.length, items: data };
};

const drawChartBook = async (subject, startIndex = 0) => {
  let cbookContainer = document.querySelector(`.${subject}`);
  cbookContainer.innerHTML = `<div class='prompt'><div class="loader"></div></div>`;
  const cdata = await getBooks(subject);
  if (cdata.error) {
    cbookContainer.innerHTML = `<div class='prompt'>ツ Limit exceeded! Try after some time</div>`;
  } else if (cdata.totalItems == 0) {
    cbookContainer.innerHTML = `<div class='prompt'>ツ No results, try a different term!</div>`;
  } else if (cdata.totalItems == undefined) {
    cbookContainer.innerHTML = `<div class='prompt'>ツ Network problem!</div>`;
  } else {
    cbookContainer.innerHTML = cdata.items;
    cbookContainer.innerHTML = cdata.items
      .map(
        ({ volumeInfo }) =>
          `<div class='book' style='background: linear-gradient(` +
          getRandomColor() +
          `, rgba(0, 0, 0, 0));'><a href='${volumeInfo.previewLink}' target='_blank'><img class='thumbnail' src='` +
          (volumeInfo.imageLinks.thumbnail === undefined
            ? "icons/logo.svg"
            : volumeInfo.imageLinks.thumbnail.replace("http://", "https://")) +
          `' alt='cover'></a><div class='book-info'><h3 class='book-title'><a href='${volumeInfo.previewLink}' target='_blank'>${volumeInfo.title}</a></h3><div class='book-authors' style='display: inline-flex;align-items:center' onclick='updateFilter(this,"author");'><span>${volumeInfo.authors}</span><img style='margin-left:16px' src='https://img.shields.io/github/stars/yanjiemao/${volumeInfo.repo}' /></div><div class='info' onclick='updateFilter(this,"subject");' style='background-color: ` +
          getRandomColor() +
          `;'>` +
          (volumeInfo.categories === undefined
            ? "Others"
            : volumeInfo.categories) +
          `</div></div></div>`
      )
      .join("");
  }
};

const drawListBook = async () => {
  if (searchBooks.value != "") {
    bookContainer.style.display = "flex";
    bookContainer.innerHTML = `<div class='prompt'><div class="loader"></div></div>`;
    const data = await getBooks(`${searchBooks.value}&maxResults=6`);
    if (data.error) {
      bookContainer.innerHTML = `<div class='prompt'>ツ Limit exceeded! Try after some time</div>`;
    } else if (data.totalItems == 0) {
      bookContainer.innerHTML = `<div class='prompt'>ツ No results, try a different term!</div>`;
    } else if (data.totalItems == undefined) {
      bookContainer.innerHTML = `<div class='prompt'>ツ Network problem!</div>`;
    } else {
      bookContainer.innerHTML = data.items
        .map(
          ({ volumeInfo }) =>
            `<div class='book' style='background: linear-gradient(` +
            getRandomColor() +
            `, rgba(0, 0, 0, 0));'><a href='${volumeInfo.previewLink}' target='_blank'><img class='thumbnail' src='` +
            (volumeInfo.imageLinks.thumbnail === undefined
              ? "icons/logo.svg"
              : volumeInfo.imageLinks.thumbnail.replace(
                  "http://",
                  "https://"
                )) +
            `' alt='cover'></a><div class='book-info'><h3 class='book-title'><a href='${volumeInfo.previewLink}' target='_blank'>${volumeInfo.title}</a></h3><div class='book-authors' onclick='updateFilter(this,"author");'>${volumeInfo.authors}</div><div class='info' onclick='updateFilter(this,"subject");' style='background-color: ` +
            getRandomColor() +
            `;'>` +
            (volumeInfo.categories === undefined
              ? "Others"
              : volumeInfo.categories) +
            `</div></div></div>`
        )
        .join("");
    }
  } else {
    bookContainer.style.display = "none";
  }
};
const updateFilter = ({ innerHTML }, f) => {
  document.getElementById("main").scrollIntoView({
    behavior: "smooth",
  });
  let m;
  switch (f) {
    case "author":
      m = "inauthor:";
      break;
    case "subject":
      m = "subject:";
      break;
  }
  searchBooks.value = m + innerHTML;
  debounce(drawListBook, 1000);
};
const debounce = (fn, time, to = 0) => {
  to ? clearTimeout(to) : (to = setTimeout(drawListBook, time));
};

// searchBooks.addEventListener("input", () => debounce(drawListBook, 1000));
/* searchBooks.addEventListener("click", function name(params) {
  window.location.href = "/search";
}); */

let mainNavLinks = document.querySelectorAll(".scrolltoview");
window.addEventListener("scroll", (event) => {
  let fromTop = window.scrollY + 64;
  mainNavLinks.forEach(({ hash, classList }) => {
    if (!hash) {
      return;
    }

    let section = document.querySelector(hash);

    if (
      section.offsetTop <= fromTop &&
      section.offsetTop + section.offsetHeight > fromTop
    ) {
      classList.add("current");
    } else {
      classList.remove("current");
    }
  });
});
const getRandomColor = () =>
  `#${Math.floor(Math.random() * 16777215).toString(16)}40`;
const toggleSwitch = document.querySelector(
  '.theme-switch input[type="checkbox"]'
);
if (localStorage.getItem("marcdownTheme") == "dark") {
  document.documentElement.setAttribute("data-theme", "dark");
  document
    .querySelector("meta[name=theme-color]")
    .setAttribute("content", "#090b28");
  toggleSwitch.checked = true;
  localStorage.setItem("marcdownTheme", "dark");
} else {
  document.documentElement.setAttribute("data-theme", "light");
  document
    .querySelector("meta[name=theme-color]")
    .setAttribute("content", "#ffffff");
  toggleSwitch.checked = false;
  localStorage.setItem("marcdownTheme", "light");
}
const switchTheme = ({ target }) => {
  if (target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    document
      .querySelector("meta[name=theme-color]")
      .setAttribute("content", "#090b28");
    localStorage.setItem("marcdownTheme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    document
      .querySelector("meta[name=theme-color]")
      .setAttribute("content", "#ffffff");
    localStorage.setItem("marcdownTheme", "light");
  }
};
toggleSwitch.addEventListener("change", switchTheme, false);
let startIndex = 0;
const next = (subject) => {
  startIndex += 6;
  if (startIndex >= 0) {
    document.getElementById(`${subject}-prev`).style.display = "inline-flex";
    drawChartBook(subject, startIndex);
  } else {
    document.getElementById(`${subject}-prev`).style.display = "none";
  }
};
const prev = (subject) => {
  startIndex -= 6;
  if (startIndex <= 0) {
    startIndex = 0;
    drawChartBook(subject, startIndex);
    document.getElementById(`${subject}-prev`).style.display = "none";
  } else {
    document.getElementById(`${subject}-prev`).style.display = "inline-flex";
    drawChartBook(subject, startIndex);
  }
};

let pwaInstalled = localStorage.getItem("pwaInstalled") == "yes";
if (window.matchMedia("(display-mode: standalone)").matches) {
  localStorage.setItem("pwaInstalled", "yes");
  pwaInstalled = true;
}
if (window.navigator.standalone === true) {
  localStorage.setItem("pwaInstalled", "yes");
  pwaInstalled = true;
}
if (pwaInstalled) {
  document.getElementById("installPWA").style.display = "none";
} else {
  document.getElementById("installPWA").style.display = "inline-flex";
}
let deferredPrompt = null;
window.addEventListener("beforeinstallprompt", (e) => {
  deferredPrompt = e;
});
async function installPWA() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(({ outcome }) => {
      if (outcome === "accepted") {
        console.log("Your PWA has been installed");
      } else {
        console.log("User chose to not install your PWA");
      }
      deferredPrompt = null;
    });
  }
}
window.addEventListener("appinstalled", (evt) => {
  localStorage.setItem("pwaInstalled", "yes");
  pwaInstalled = true;
  document.getElementById("installPWA").style.display = "none";
});

