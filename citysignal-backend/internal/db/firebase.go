package db

import (
	"context"
	"log"
	"path/filepath"

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

	// Use serviceAccountKey.json file
	sa := option.WithCredentialsFile("serviceAccountKey.json")

	app, err := firebase.NewApp(ctx, nil, sa)
	if err != nil {
		// Sometimes people run from different directories, let's try a fallback
		saFallback := option.WithCredentialsFile(filepath.Join("..", "serviceAccountKey.json"))
		app, err = firebase.NewApp(ctx, nil, saFallback)
		if err != nil {
			log.Fatalf("error initializing firebase app: %v\n", err)
		}
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
