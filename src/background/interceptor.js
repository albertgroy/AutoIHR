import { storeJobData } from "./db.js";

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
  ["extraHeaders"]
);

function extractToken(headers) {
  return headers
    .find((h) => h.name === "Set-Cookie")
    ?.value.match(/token=([^;]+)/)[1];
}

function parseQuery(url) {
  const params = new URL(url).searchParams;
  return {
    positionName: params.get("positionName"),
    salaryRange: params.get("salaryRange"),
    brandName: params.get("brandName"),
  };
}
