CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
	url text not NULL,
	title text not NULL,
    likes integer DEFAULT 0
);