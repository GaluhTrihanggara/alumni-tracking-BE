// const bcrypt = require('bcrypt');

// const password = 'Galuh01';
// const hash = bcrypt.hashSync(password, 10);
// console.log(hash);

// const { Alumni } = require('./models');
// const bcrypt = require('bcrypt');

// async function updatePasswords() {
//   try {
//     const alumni = await Alumni.findAll();
//     for (let alum of alumni) {
//       if (alum.password === '12345') {
//         const hashedPassword = await bcrypt.hashSync('12345', 10);
//         await alum.update({ password: hashedPassword });
//         console.log(`Updated password for ${alum.nama}`);
//       }
//     }
//     console.log('All passwords updated');
//   } catch (error) {
//     console.error('Error updating passwords:', error);
//   }
// }

// updatePasswords();

// const { Alumni } = require('./models');
// const bcrypt = require('bcrypt');

// async function checkAndUpdatePasswords() {
//   try {
//     const alumni = await Alumni.findAll();
//     console.log(`Total alumni found: ${alumni.length}`);

//     for (let alum of alumni) {
//       console.log(`Checking alumni: ${alum.nama}, Current password: ${alum.password}`);
      
//       // Cek apakah password sudah di-hash
//       const isHashed = alum.password.startsWith('$2b$') || alum.password.startsWith('$2a$');
      
//       if (!isHashed) {
//         const hashedPassword = await bcrypt.hash(alum.password, 10);
//         await alum.update({ password: hashedPassword });
//         console.log(`Updated password for ${alum.nama}`);
//       } else {
//         console.log(`Password for ${alum.nama} is already hashed`);
//       }
//     }
//     console.log('All passwords checked and updated if necessary');
//   } catch (error) {
//     console.error('Error updating passwords:', error);
//   }
// }

// checkAndUpdatePasswords();

const { Alumni } = require('./models');
const bcrypt = require('bcrypt');

async function resetPassword(nomor_induk_mahasiswa, newPassword) {
  try {
    const alumni = await Alumni.findOne({ where: { nomor_induk_mahasiswa } });
    if (!alumni) {
      console.log('Alumni not found');
      return;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await alumni.update({ password: hashedPassword });
    console.log(`Password reset for ${alumni.nama}`);
  } catch (error) {
    console.error('Error resetting password:', error);
  }
}

// Ganti dengan NIM yang sesuai dan password yang diinginkan
resetPassword('20200801839', '12345');