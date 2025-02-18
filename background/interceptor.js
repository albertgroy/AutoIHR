// HTTP request interceptor
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

// Token extraction from headers
function extractToken(headers) {
  return headers
    .find((h) => h.name === "Set-Cookie")
    ?.value.match(/token=([^;]+)/)[1];
}

// Parse URL query parameters
function parseQuery(url) {
  const params = new URL(url).searchParams;
  return {
    positionName: params.get("positionName"),
    salaryRange: params.get("salaryRange"),
    brandName: params.get("brandName"),
  };
}

// Store job data in IndexedDB
async function storeJobData(params) {
  const db = await getDB();
  await db.jobs.add({
    position: params.positionName,
    salary: params.salaryRange,
    company: params.brandName,
    timestamp: Date.now(),
  });
}

// Get IndexedDB instance
async function getDB() {
  const db = new Dexie("BossData");
  db.version(1).stores({
    jobs: "++id, position, salary, company",
    tokens: "++id, value, expireTime",
  });
  return db;
}
