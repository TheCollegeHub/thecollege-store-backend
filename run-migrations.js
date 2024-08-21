const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// MongoDB URI
const uri = 'mongodb://localhost:27017/thecollegestore';

// Define a function to run migrations
async function runMigrations() {
  try {
    // Connect to MongoDB
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Path to migrations folder
    const migrationsPath = path.join(__dirname, 'migrations');

    // Read files from migrations folder
    const files = fs.readdirSync(migrationsPath);

    for (const file of files) {
      const filePath = path.join(migrationsPath, file);
      try {
        // Read migration file content
        const migrationContent = fs.readFileSync(filePath, 'utf8');

        // Create a new function to execute migration
        const runMigration = new Function('db', 'ObjectId', migrationContent);

        // Pass the database connection and ObjectId
        await runMigration(mongoose.connection.db, mongoose.Types.ObjectId);

        console.log(`Migration ${file} executed successfully`);
      } catch (err) {
        console.error(`Error executing migration ${file}:`, err);
        throw err; // Propagate the error up
      }
    }

    console.log('All migrations executed successfully');

    // Wait for 10 seconds before disconnecting to ensure all operations have completed
    console.log('Waiting all migrations before disconnecting...');
    await new Promise(resolve => setTimeout(resolve, 10000));

  } catch (err) {
    console.error('Error during migrations:', err);
  } finally {
    // Disconnect from MongoDB and close the process gracefully
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  }
}

// Execute migrations
runMigrations();
