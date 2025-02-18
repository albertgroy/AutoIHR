import Dexie from "dexie";

// Initialize database
const db = new Dexie("BossData");
db.version(1).stores({
  jobs: "++id, position, salary, company, timestamp",
  tokens: "++id, value, expireTime",
});

// Job data operations
export const jobDB = {
  async addJob(job) {
    return db.jobs.add(job);
  },

  async getJobs(limit = 50) {
    return db.jobs.orderBy("timestamp").reverse().limit(limit).toArray();
  },

  async clearOldJobs() {
    const count = await db.jobs.count();
    if (count > 1000) {
      const oldest = await db.jobs.orderBy("timestamp").limit(50).toArray();
      return db.jobs.bulkDelete(oldest.map((j) => j.id));
    }
  },
};

// Token operations
export const tokenDB = {
  async addToken(token) {
    return db.tokens.add({
      value: token,
      expireTime: Date.now() + 3600 * 1000, // 1 hour expiration
    });
  },

  async getValidToken() {
    return db.tokens.where("expireTime").above(Date.now()).first();
  },

  async clearExpiredTokens() {
    return db.tokens.where("expireTime").belowOrEqual(Date.now()).delete();
  },
};

// Initialize cleanup tasks
setInterval(() => {
  jobDB.clearOldJobs();
  tokenDB.clearExpiredTokens();
}, 3600 * 1000); // Run every hour
