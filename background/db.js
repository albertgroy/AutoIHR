import Dexie from "dexie";

const db = new Dexie("BossData");
db.version(1).stores({
  jobs: "++id, position, salary, company, timestamp",
  tokens: "++id, value, expireTime",
});

// Add TTL cleanup for tokens
db.tokens.hook("creating", (primKey, obj, trans) => {
  if (obj.expireTime) {
    setTimeout(() => {
      db.tokens.delete(primKey);
    }, obj.expireTime - Date.now());
  }
});

// Add automatic cleanup for old job records
db.jobs.hook("creating", (primKey, obj, trans) => {
  // Keep only the last 1000 records
  db.jobs.orderBy("timestamp").reverse().offset(1000).delete();
});

export default db;
