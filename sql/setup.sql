-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

--drop table if exists statements
drop table if exists more_books;
drop table if exists magic_cards;
drop table if exists chess_pieces;
drop table if exists food;
drop table if exists dogs;

--create tables 5
create table more_books (
  id bigint generated always as identity,
  title varchar not null,
  author varchar not null
);

create table magic_cards (
  id bigint generated always as identity,
  name varchar not null,
  cmc varchar not null
);

create table chess_pieces (
  id bigint generated always as identity,
  piece varchar not null,
  points varchar not null
);

create table food (
  id bigint generated always as identity,
  name varchar not null,
  cuisine varchar not null
);

create table dogs (
  id bigint generated always as identity,
  name varchar not null,
  breed varchar not null
);

--insert into tables 5
insert into more_books (
  title, author
)
values
('Nightwatch', 'Terry Pratchett'),
('The Signature of all Things', 'Elizabeth Gilbert'),
('Being and Nothingness', 'Jean Paul Sartre');

insert into magic_cards (
  name, cmc
)
values
('Lighting bolt', '1'),
('Serra Angel', '5'),
('Shivan Dragon', '6');

insert into chess_pieces (
  piece, points
)
values
('Pawn', '1'),
('Knight', '3'),
('Queen', '9');

insert into food (
  name, cuisine
)
values
('Pizza', 'Italian'),
('Daal', 'Indian'),
('Sushi', 'Japanese');

insert into dogs (
  name, breed
)
values
('Shadow', 'Golden Retriever'),
('Cheddar', 'Corgi'),
('Cassie', 'unknown');