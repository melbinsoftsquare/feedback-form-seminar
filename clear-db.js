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

const dropTable = () => {
    return new Promise((resolve, reject) => {
        client.query('drop table if exists feedback;', (err, result) => {
            if(!!err === false) {
                console.log('Table Feedback deleted successfully!');
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
    .then(dropTable)
    .then(terminateConnection)
    .then(() => console.log('Db Execution completed.'))
    .catch(err => {
        console.log(err);
    });
}

executeDb();
