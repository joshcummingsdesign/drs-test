func findUserByUsername(conn *pgx.Conn, username string) (string, error) {
  query := fmt.Sprintf("SELECT * FROM users WHERE username = %s", username)

	var foundUsername string
	err := conn.QueryRow(context.Background(), query).Scan(&foundUsername)
	if err != nil {
		return "", err
	}

	return foundUsername, nil
}
