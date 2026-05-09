package handlers

import (
	"context"
	"crypto/rand"
	"encoding/hex"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/sargisis/CitySignal/citysignal-backend/internal/db"
	"github.com/sargisis/CitySignal/citysignal-backend/internal/models"
	"cloud.google.com/go/firestore"
	"google.golang.org/api/iterator"
)

// generateTrackingID creates a random tracking ID (e.g. CS-a1b2c3d4)
func generateTrackingID() string {
	bytes := make([]byte, 4)
	if _, err := rand.Read(bytes); err != nil {
		return "CS-ERROR"
	}
	return "CS-" + hex.EncodeToString(bytes)
}

// CreateIssue handles POST /api/issues
func CreateIssue(c *gin.Context) {
	var report models.Report
	if err := c.ShouldBindJSON(&report); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
		return
	}

	// Maybe extract userId from middleware context if we have Auth enabled later
	userID, exists := c.Get("userID")
	if exists {
		report.UserID = userID.(string)
	}

	report.TrackingID = generateTrackingID()
	report.Status = "pending"
	report.CreatedAt = time.Now()
	report.UpdatedAt = time.Now()

	ctx := context.Background()
	ref, _, err := db.FirestoreClient.Collection("issues").Add(ctx, report)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save issue"})
		return
	}

	report.ID = ref.ID

	c.JSON(http.StatusCreated, report)
}

// GetIssues handles GET /api/issues
func GetIssues(c *gin.Context) {
	ctx := context.Background()
	iter := db.FirestoreClient.Collection("issues").OrderBy("createdAt", firestore.Desc).Documents(ctx)
	defer iter.Stop()

	var issues []models.Report
	for {
		doc, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch issues"})
			return
		}

		var report models.Report
		if err := doc.DataTo(&report); err != nil {
			continue
		}
		report.ID = doc.Ref.ID
		issues = append(issues, report)
	}

	// Return empty array instead of null if no issues exist
	if issues == nil {
		issues = []models.Report{}
	}

	c.JSON(http.StatusOK, issues)
}

// GetIssueByTrackingID handles GET /api/issues/:trackingId
func GetIssueByTrackingID(c *gin.Context) {
	trackingID := c.Param("trackingId")
	ctx := context.Background()

	iter := db.FirestoreClient.Collection("issues").Where("trackingId", "==", trackingID).Limit(1).Documents(ctx)
	defer iter.Stop()

	doc, err := iter.Next()
	if err == iterator.Done {
		c.JSON(http.StatusNotFound, gin.H{"error": "Issue not found"})
		return
	}
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error"})
		return
	}

	var report models.Report
	if err := doc.DataTo(&report); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse data"})
		return
	}
	report.ID = doc.Ref.ID

	c.JSON(http.StatusOK, report)
}
