package db

import (
	"context"
	"log"
	"os"

	"cloud.google.com/go/firestore"
	firebase "firebase.google.com/go/v4"
	"firebase.google.com/go/v4/auth"
	"google.golang.org/api/option"
)

var (
	FirestoreClient *firestore.Client
	AuthClient      *auth.Client
)

func InitFirebase() {
	ctx := context.Background()

	// Read key from environment variable
	keyJSON := os.Getenv("FIREBASE_SERVICE_ACCOUNT_KEY")
	if keyJSON == "" {
		log.Fatalf("FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set")
	}

	sa := option.WithCredentialsJSON([]byte(keyJSON))

	app, err := firebase.NewApp(ctx, nil, sa)
	if err != nil {
		log.Fatalf("error initializing firebase app: %v\n", err)
	}

	FirestoreClient, err = app.Firestore(ctx)
	if err != nil {
		log.Fatalf("error initializing firestore client: %v\n", err)
	}

	AuthClient, err = app.Auth(ctx)
	if err != nil {
		log.Fatalf("error initializing auth client: %v\n", err)
	}

	log.Println("Firebase initialized successfully")
}
