func findUserByUsername(conn *pgx.Conn, username string) (string, error) {
  query := "SELECT * FROM users WHERE username = $1"

	var foundUsername string
	err := conn.QueryRow(context.Background(), query, username).Scan(&foundUsername)
	if err != nil {
		return "", err
	}

	return foundUsername, nil
}
