// IndexedDB操作模块
const db = new Dexie("BossData");
db.version(1).stores({
  jobs: "++id, position, salary, company",
  tokens: "++id, value, expireTime",
});

// 数据写入示例
async function storeJobData(params) {
  await db.jobs.add({
    position: params.positionName,
    salary: params.salaryRange,
    company: params.brandName,
    timestamp: Date.now(),
  });
}

// 自动清理旧token
setInterval(async () => {
  const now = Date.now();
  await db.tokens.where("expireTime").below(now).delete();
}, 60 * 60 * 1000); // 每小时清理一次
