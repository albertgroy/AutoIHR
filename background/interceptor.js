// HTTP请求拦截核心
chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    if (/\/api\/login/.test(details.url)) {
      const token = extractToken(details.requestHeaders);
      chrome.storage.local.set({ bossToken: token });
    }

    if (/\/job\/list/.test(details.url)) {
      storeJobData(parseQuery(details.url));
    }
  },
  { urls: ["*://www.zhipin.com/*"] },
  ["requestHeaders", "extraHeaders"]
);

// Token提取示例(需处理Set-Cookie头)
function extractToken(headers) {
  return headers
    .find((h) => h.name === "Set-Cookie")
    ?.value.match(/token=([^;]+)/)[1];
}

// 解析URL查询参数
function parseQuery(url) {
  const params = new URLSearchParams(new URL(url).search);
  return Object.fromEntries(params.entries());
}

// 存储职位数据
async function storeJobData(params) {
  const jobData = {
    position: params.positionName,
    salary: params.salaryRange,
    company: params.brandName,
    timestamp: Date.now(),
  };
  chrome.storage.local.set({ bossJobs: jobData });
}
