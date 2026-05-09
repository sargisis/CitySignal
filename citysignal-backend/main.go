package main

import (
	"log"
	"net/http"
	"os"
	"github.com/sargisis/CitySignal/citysignal-backend/internal/auth"
	"github.com/sargisis/CitySignal/citysignal-backend/internal/db"
	"github.com/sargisis/CitySignal/citysignal-backend/internal/handlers"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// Load .env file if exists
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found or error loading it. Using environment variables.")
	}

	// Initialize Firebase connection
	db.InitFirebase()

	// Initialize Gin router
	r := gin.Default()

	// Configure CORS
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000", "http://localhost:3001", "https://citysignalapp.firebaseapp.com"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	// Health check endpoint
	r.GET("/api/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status": "ok",
			"message": "CitySignal Backend is running",
		})
	})

	// Setup API routes
	api := r.Group("/api")
	{
		// Public routes (or optional auth)
		api.GET("/issues", handlers.GetIssues)
		api.GET("/issues/:trackingId", handlers.GetIssueByTrackingID)

		// Protected routes
		protected := api.Group("/")
		protected.Use(auth.RequireAuth())
		{
			protected.POST("/issues", handlers.CreateIssue)
		}
	}

	// Start server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server starting on port %s...", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
