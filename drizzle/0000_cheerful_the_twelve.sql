CREATE TABLE IF NOT EXISTS "playlists" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text,
	"cover" text,
	"color" text,
	"artists" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "songs" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text,
	"image" text,
	"artists" text,
	"album" text,
	"duration" text
);
