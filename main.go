package main

import (
    "encoding/json"
    "fmt"
    "log"
    "net/http"
)

type Post struct {
    UserID int    `json:"userId"`
    ID     int    `json:"id"`
    Title  string `json:"title"`
    Body   string `json:"body"`
}

func main() {
    // URL of the API endpoint
    apiUrl := "https://jsonplaceholder.typicode.com/posts/1"

    // Make HTTP GET request
    resp, err := http.Get(apiUrl)
    if err != nil {
        log.Fatal("Error fetching data:", err)
    }
    defer resp.Body.Close()

    // Decode JSON response
    var post Post
    if err := json.NewDecoder(resp.Body).Decode(&post); err != nil {
        log.Fatal("Error decoding JSON:", err)
    }

    // Print the post data
    fmt.Println("Post ID:", post.ID)
    fmt.Println("User ID:", post.UserID)
    fmt.Println("Title:", post.Title)
    fmt.Println("Body:", post.Body)
    fmt.Println("Hello World")
}
