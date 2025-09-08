async function getUser(username) {
    return await manager.query(`SELECT * FROM users WHERE name = ${username}`);
}
