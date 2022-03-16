const Sequelize = require('sequelize');

let seqInstance;
if (process.env.PGHOST) {
    seqInstance = new Sequelize(
        process.env.PGDATABASE || 'oauth',
        process.env.PGUSER || 'oauth',
        process.env.PGPASSWORD || '18091827Aa',
        {
            host:process.env.PGHOST,
            dialect:"postgres"
        }
    )
} else {
    seqInstance = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        ssl: true,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    });
}


exports.db = seqInstance