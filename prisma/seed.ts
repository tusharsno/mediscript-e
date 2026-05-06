import bcrypt from "bcryptjs";
import db from "../src/lib/db.js";

const prisma = db;

async function main() {
  console.log("🌱 Starting database seeding...");

  // Admin credentials from environment variables with fallbacks
  const adminEmail = process.env.ADMIN_EMAIL || "admin@mediscript.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
  const adminName = process.env.ADMIN_NAME || "System Administrator";

  console.log(`📧 Admin Email: ${adminEmail}`);

  try {
    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminEmail },
    });

    if (existingAdmin) {
      console.log("✅ Admin user already exists. Updating if needed...");

      // Update admin to ensure they're verified and have admin role
      await prisma.user.update({
        where: { email: adminEmail },
        data: {
          role: "ADMIN",
          emailVerified: true,
          verificationToken: null,
          verificationExpires: null,
        },
      });

      console.log("✅ Admin user updated successfully!");
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // Create admin user
    const admin = await prisma.user.create({
      data: {
        email: adminEmail,
        name: adminName,
        password: hashedPassword,
        role: "ADMIN",
        emailVerified: true, // Admin is pre-verified
        verificationToken: null,
        verificationExpires: null,
      },
    });

    console.log("✅ Admin user created successfully!");
    console.log(`   ID: ${admin.id}`);
    console.log(`   Email: ${admin.email}`);
    console.log(`   Name: ${admin.name}`);
    console.log(`   Role: ${admin.role}`);
    console.log(`   Email Verified: ${admin.emailVerified}`);

  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log("🏁 Seeding completed!");
  });
