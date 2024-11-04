func findUserByUsername(conn *pgx.Conn, username string) (string, error) {
	query := "SELECT username FROM users WHERE username = '" + username + "'"

	var foundUsername string
	err := conn.QueryRow(context.Background(), query).Scan(&foundUsername)
	if err != nil {
		return "", err
	}

	return foundUsername, nil
}
