const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function createAdminUser() {
  try {
    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = await prisma.user.create({
      data: {
        name: "Admin User",
        email: "admin@mediscript.com",
        password: hashedPassword,
        role: "ADMIN",
      },
    });

    console.log("✅ Admin user created successfully!");
    console.log("Email: admin@mediscript.com");
    console.log("Password: admin123");
    console.log("User ID:", admin.id);
  } catch (error) {
    if (error.code === "P2002") {
      console.log("⚠️  Admin user already exists!");
    } else {
      console.error("❌ Error creating admin user:", error);
    }
  } finally {
    await prisma.$disconnect();
  }
}

createAdminUser();
