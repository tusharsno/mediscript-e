const bcrypt = require("bcryptjs");

async function testPassword() {
  const plainPassword = "admin123";
  const hash = "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy";
  
  const isMatch = await bcrypt.compare(plainPassword, hash);
  console.log("Password match:", isMatch);
  
  // Generate new hash
  const newHash = await bcrypt.hash(plainPassword, 10);
  console.log("\nNew hash for 'admin123':");
  console.log(newHash);
}

testPassword();
