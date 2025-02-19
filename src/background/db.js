import Dexie from "dexie";

const db = new Dexie("BossData");
db.version(1).stores({
  jobs: "++id, position, salary, company, timestamp",
  tokens: "++id, value, expireTime",
});

export async function storeJobData(params) {
  await db.jobs.add({
    position: params.positionName,
    salary: params.salaryRange,
    company: params.brandName,
    timestamp: Date.now(),
  });
}

export async function getJobs() {
  return db.jobs.toArray();
}

export async function clearOldJobs() {
  const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000; // 30 days
  await db.jobs.where("timestamp").below(cutoff).delete();
}
