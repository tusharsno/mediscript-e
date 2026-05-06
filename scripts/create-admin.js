const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: 'admin@mediscript.com' }
    });

    if (existingAdmin) {
      console.log('✅ Admin already exists!');
      return;
    }

    // Create admin user
    const hashedPassword = await bcrypt.hashSync('admin123', 10);
    
    const admin = await prisma.user.create({
      data: {
        email: 'admin@mediscript.com',
        name: 'Admin',
        password: hashedPassword,
        role: 'ADMIN',
      }
    });

    console.log('✅ Admin created successfully!');
    console.log('Email:', admin.email);
    console.log('Password: admin123');
    console.log('⚠️  Please change the password after first login!');
  } catch (error) {
    console.error('❌ Error creating admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
