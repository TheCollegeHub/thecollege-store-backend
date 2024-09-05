const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// MongoDB URI
const uri = process.env.MONGO_URL || 'mongodb://localhost:27017';

// Define a function to run migrations
async function runMigrations() {
  try {
    // Connect to MongoDB
    await mongoose.connect(`${uri}/thecollegestore?`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

     const migrationsPath = path.join(__dirname, 'migrations');
    const files = fs.readdirSync(migrationsPath);
    
    // Use a coleção 'migrations' para registrar quais migrações foram executadas
    const migrationRecords = mongoose.connection.db.collection('migrations');

    for (const file of files) {
      const migrationName = path.basename(file, '.js');
      const migrationExists = await migrationRecords.findOne({ name: migrationName });

      if (migrationExists) {
        console.log(`Migration ${file} already executed.`);
        continue;
      }

      const filePath = path.join(migrationsPath, file);
      const migrationContent = fs.readFileSync(filePath, 'utf8');
      const runMigration = new Function('db', 'ObjectId', migrationContent);

      await runMigration(mongoose.connection.db, mongoose.Types.ObjectId);

      // Adiciona um registro indicando que a migração foi executada
      await migrationRecords.insertOne({ name: migrationName });
      console.log(`Migration ${file} executed successfully`);
    }

    console.log('All migrations executed successfully');
    await new Promise(resolve => setTimeout(resolve, 10000));

  } catch (err) {
    console.error('Error during migrations:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  }
}

runMigrations();
