import { boolean, integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const playlists = pgTable("playlists", {
    id: serial('id').primaryKey(),
    title: text('title'),
    cover: text('cover'),
    // color: text('color'),
    artists: text('artists'),
});

export const songs = pgTable("songs", {
    id: serial('id').primaryKey(),
    title: text('title'),
    image: text('image'),
    artists: text('artists'),
    album: text('album'),
    duration: text('duration'),
})