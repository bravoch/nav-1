const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");

const x = localStorage.getItem("x");
const xObject = JSON.parse(x);

const hashMap = xObject || [
  { logo: "A", url: "https://www.acfun.cn" },
  { logo: "B", url: "https://bilibili.com" },
];

const simplifyUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, ""); //删除 / 开头的内容;
};

const render = () => {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach((node, index) => {
    console.log(index);
    const $li = $(`
    <li>
      <div class="site">
        <div class="logo">${node.logo}</div>
        <div class="link">${simplifyUrl(node.url)}</div>
        <div class='close'>
          <svg class="icon" >
            <use xlink:href="#icon-close"></use>
          </svg>
        </div>
      </div>
  </li>
    `).insertBefore($lastLi);

    $li.on("click", () => {
      window.open(node.url);
    });

    $li.on("click", ".close", (e) => {
      console.log("这里");
      e.stopPropagation(); //阻止冒泡
      console.log(hashMap);
      hashMap.splice(index, 1);
      render();
    });
  });
};

render();

$(".addButton").on("click", () => {
  let url = window.prompt("请问你要添加的网址是啥？");
  console.log(url);

  if (url.indexOf("http" !== 0)) {
    url = "https://" + url;
  }
  console.log(url);

  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    url: url,
  });

  render();

  //   const $li = $(`
  //   <li>
  //   <a href="${url}">
  //     <div class="site">
  //       <div class="logo">${url[0]}</div>
  //       <div class="link">${url}</div>
  //     </div>
  //   </a>
  // </li>
  // `);

  //   $li.insertBefore($lastLi);
});

window.onbeforeunload = () => {
  console.log("页面要关闭了");
  const string = JSON.stringify(hashMap);
  localStorage.setItem("x", string);
};

// document.addEventListener

$(document).on("keypress", (e) => {
  // const key = e.key
  const { key } = e;
  console.log(key);

  for (let i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
});
