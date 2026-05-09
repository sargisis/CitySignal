package models

import "time"

type Report struct {
	ID          string    `json:"id" firestore:"-"` // ID from Firestore doc
	TrackingID  string    `json:"trackingId" firestore:"trackingId"`
	CategoryID  string    `json:"categoryId" firestore:"categoryId"`
	Status      string    `json:"status" firestore:"status"`
	Latitude    float64   `json:"latitude" firestore:"latitude"`
	Longitude   float64   `json:"longitude" firestore:"longitude"`
	Address     string    `json:"address" firestore:"address"`
	Description string    `json:"description" firestore:"description"`
	Phone       string    `json:"phone,omitempty" firestore:"phone,omitempty"`
	Email       string    `json:"email,omitempty" firestore:"email,omitempty"`
	UserID      string    `json:"userId,omitempty" firestore:"userId,omitempty"`
	CreatedAt   time.Time `json:"createdAt" firestore:"createdAt"`
	UpdatedAt   time.Time `json:"updatedAt" firestore:"updatedAt"`
}
