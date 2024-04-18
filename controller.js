async function getUser(username) {
    return await prisma.$queryRaw(`SELECT * FROM users WHERE name = ${username}`);
}
