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

function extractToken(headers) {
  return headers
    .find((h) => h.name === "Set-Cookie")
    ?.value.match(/token=([^;]+)/)[1];
}

function parseQuery(url) {
  const params = new URL(url).searchParams;
  return Object.fromEntries(params.entries());
}

async function storeJobData(params) {
  const db = await import("./db.js");
  await db.default.jobs.add({
    position: params.positionName,
    salary: params.salaryRange,
    company: params.brandName,
    timestamp: Date.now(),
  });
}
