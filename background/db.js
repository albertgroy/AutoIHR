import Dexie from "dexie";

// 初始化数据库
const db = new Dexie("BossData");
db.version(1).stores({
  jobs: "++id, position, salary, company, timestamp",
  tokens: "++id, value, expireTime",
});

// 设置TTL过期时间自动清理旧token
db.on("ready", () => {
  setInterval(async () => {
    const now = Date.now();
    await db.tokens.where("expireTime").below(now).delete();
  }, 60 * 60 * 1000); // 每小时清理一次
});

// 存储职位数据
export async function storeJobData(job) {
  await db.jobs.add({
    position: job.position,
    salary: job.salary,
    company: job.company,
    timestamp: Date.now(),
  });
}

// 获取职位数据
export async function getJobs(limit = 50) {
  return await db.jobs.orderBy("timestamp").reverse().limit(limit).toArray();
}

// 存储Token
export async function storeToken(token) {
  await db.tokens.add({
    value: token,
    expireTime: Date.now() + 24 * 60 * 60 * 1000, // 24小时过期
  });
}

// 获取最新Token
export async function getLatestToken() {
  return await db.tokens.orderBy("expireTime").reverse().first();
}
