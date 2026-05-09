package auth

import (
	"context"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/sargisis/CitySignal/citysignal-backend/internal/db"
)

// RequireAuth middleware checks if the request has a valid Firebase JWT token
func RequireAuth() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header required"})
			c.Abort()
			return
		}

		parts := strings.Split(authHeader, " ")
		if len(parts) != 2 || parts[0] != "Bearer" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header format must be Bearer {token}"})
			c.Abort()
			return
		}

		idToken := parts[1]

		ctx := context.Background()
		token, err := db.AuthClient.VerifyIDToken(ctx, idToken)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid or expired token"})
			c.Abort()
			return
		}

		// Token is valid, set user ID in context
		c.Set("userID", token.UID)
		c.Next()
	}
}

// OptionalAuth middleware checks for a token, sets userID if valid, but allows request if no token
func OptionalAuth() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.Next()
			return
		}

		parts := strings.Split(authHeader, " ")
		if len(parts) == 2 && parts[0] == "Bearer" {
			idToken := parts[1]
			ctx := context.Background()
			token, err := db.AuthClient.VerifyIDToken(ctx, idToken)
			if err == nil {
				c.Set("userID", token.UID)
			}
		}
		c.Next()
	}
}
