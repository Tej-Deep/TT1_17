const bcrypt = require('bcrypt');
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '', // add password
    database: 'techtrek24',
    connectionLimit: 10, // Adjust as needed
  });

const updateExistingPasswords = async () => {
  const query = 'SELECT id, password FROM user';
  pool.query(query, async (error, results) => {
    if (error) {
      console.error('Error retrieving passwords:', error);
      return;
    }

    for (const user of results) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const updateQuery = 'UPDATE user SET password = ? WHERE id = ?';
      const updateValues = [hashedPassword, user.id];
      pool.query(updateQuery, updateValues, (updateError, updateResults) => {
        if (updateError) {
          console.error('Error updating password:', updateError);
        } else {
          console.log(`Password updated for user with ID ${user.id}`);
        }
      });
    }
  });
};

// Run the update script
updateExistingPasswords();
