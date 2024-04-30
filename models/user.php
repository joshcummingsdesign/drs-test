public function searchUsers($searchTerm) {
    $users = User::whereRaw("username LIKE '%{$searchTerm}%'")->get();
    return $users;
}
