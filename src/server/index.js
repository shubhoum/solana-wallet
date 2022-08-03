export function init() {
    const mysql = require('mysql');
    const connection = mysql.createConnection({
        host: "josh.cguzbwyfvfsq.us-east-2.rds.amazonaws.com",
        database: "joshsol",
        user: "admin",
        password: "GameOnJosh",
        port: 3306
    });

    connection.connect((err) => {
        if (err) {
            console.error('Database connection failed: ' + err.stack);
            return;
        }

        console.log('Connected to database.');
    });

    connection.end();
}

