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
