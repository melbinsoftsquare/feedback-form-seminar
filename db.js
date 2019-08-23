require('dotenv').config();
const Client = require('pg').Client;
const client = new Client(process.env.DATABASE_URL);

const connectDb = () => {
    return new Promise((resolve, reject) => {
        client.connect();
        console.log('Database connected.');
        resolve();
    })
}

const createFeedbackTable = () => {
    return new Promise((resolve, reject) => {
        client.query('CREATE TABLE IF NOT EXISTS feedback (id SERIAL PRIMARY KEY, name VARCHAR(50), email VARCHAR(50), phone VARCHAR(50), feedback TEXT, created_at TIMESTAMP WITH TIME ZONE default CURRENT_TIMESTAMP);', (err, result) => {
            if(!!err === false) {
                console.log('Table Feedback created successfully!');
                resolve();
            } else {
                reject(err);
            }
        });
    });
}

const terminateConnection = () => {
    client.end();
}

const executeDb = () => {
    connectDb()
    .then(createFeedbackTable)
    .then(terminateConnection)
    .then(() => console.log('Db Execution completed.'))
    .catch(err => {
        console.log(err);
    });
}

executeDb();
