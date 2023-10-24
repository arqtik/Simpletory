package main

import (
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

type item struct {
	ID       string  `json:"id" binding:"required"`
	Name     string  `json:"name" binding:"required"`
	Count    int     `json:"count" binding:"required"`
	Price    float64 `json:"price"`
	Location string  `json:"location"`
	Mass     int     `json:"mass"`
	Unit     string  `json:"unit"`
}

var items = []item{
	{ID: "0845678901001", Name: "Perfume", Count: 1, Price: 699.99, Location: "Shelf 1", Mass: 50, Unit: "ml"},
	{ID: "0345672901036", Name: "Cologne", Count: 3, Price: 459.99, Location: "Shelf 2", Mass: 24, Unit: "ml"},
	{ID: "0145632902029", Name: "Hairspray", Count: 10, Price: 25, Location: "Shelf 3", Mass: 100, Unit: "ml"},
}

func main() {
	router := gin.Default()

	router.Use(cors.Default())

	api := router.Group("/api")
	{
		api.GET("/items", getItems)
		api.GET("/items/:id", getItemByID)
		api.POST("/items", postItem)
		api.DELETE("/items/:id", deleteItem)
		api.PUT("items/:id", updateItem)
	}

	router.Use(static.Serve("/", static.LocalFile("../client/build", true)))

	// Start and run the server
	router.Run(":8080")
}

// getItems responds with the list of all items as JSON.
func getItems(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, items)
}

// getItemByID locates the item whose ID value matches the id
// parameter sent by the client, then returns that item as a response
func getItemByID(c *gin.Context) {
	id := c.Param("id")

	// Loop over the list of items, looking for
	// an item whose ID value matches the parameter.
	for _, i := range items {
		if i.ID == id {
			c.IndentedJSON(http.StatusOK, i)
			return
		}
	}

	c.IndentedJSON(http.StatusNotFound, gin.H{"message": "Item not found"})
}

// postItems adds an item from JSON received in the request body
func postItem(c *gin.Context) {
	var newItem item

	if err := c.BindJSON(&newItem); err != nil {
		return
	}

	// Add the new item to the slice.
	items = append(items, newItem)
	c.IndentedJSON(http.StatusCreated, newItem)
}

// deleteItem deleted an item from JSON received in the request body
func deleteItem(c *gin.Context) {
	id := c.Param("id")

	index := getItemIndex(id)
	// once found, remove it from the slice and return
	if index >= 0 {
		items[index] = items[len(items)-1]
		items = items[:len(items)-1]
		c.IndentedJSON(http.StatusOK, gin.H{"message": "Item sucessfully deleted"})
		return
	}

	c.IndentedJSON(http.StatusNotFound, gin.H{"message": "Item not found"})
}

// update item based on id received from request body
func updateItem(c *gin.Context) {
	id := c.Param("id")
	var updatedItem item

	if err := c.BindJSON(&updatedItem); err != nil {
		return
	}

	index := getItemIndex(id)
	items[index] = updatedItem
	c.IndentedJSON(http.StatusOK, updatedItem)
}

// gets the index of first item that matches id param
// returns -1 if none match
func getItemIndex(id string) int {
	for i := 0; i < len(items); i++ {
		if items[i].ID == id {
			return i
		}
	}

	return -1
}
