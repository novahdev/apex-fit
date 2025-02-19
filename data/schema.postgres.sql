drop schema public cascade;
create schema public;
create extension if not exists "unaccent";
create extension if not exists "pgcrypto";

create domain cellphone as varchar check (value ~* '^\+\d+ \d{3} \d{3} \d{4}$');
create domain email as varchar(100) check (value ~* '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$');
create domain username as varchar(10) check (value ~* '^[a-zA-Z0-9._%+-]{3,10}$');
create type sex as enum('M', 'F');
create type user_status as enum('ACTIVE', 'INACTIVE', 'BLOCKED', 'BANNED');
create type user_role as enum('ADMIN', 'USER');

create type athlete_category as enum('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'RX', 'ELITE');
create type gym_category as enum('BOX', 'GYM');

create table data_countries
(
    "code" char(2) primary key,
    "name" varchar(100) not null,
    "phone_code" varchar(8) not null
);

create table data_countries_states
(
    "code" char(2) primary key,
    "country" char(2) not null,
    "name" varchar(50) not null
);

create table data_countries_cities
(
    "code" char(5) primary key,
    "name" varchar(50) not null,
    "state_code" char(2) not null
);

create table users
(
    "id" uuid primary key default gen_random_uuid(),
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now(),
    "status" user_status not null,
    "role" user_role not null,
    "is_coach" boolean not null default false,
    "verified" boolean not null default false,
    "category" athlete_category not null default 'BEGINNER',
    "email" email not null,
    "username" varchar(40) not null unique,
    "alias" varchar(40) not null,
    "name" varchar(20) not null,
    "last_name" varchar(20) not null,
    "sex" sex not null,
    "birthdate" date not null,
    "tall" integer not null,
    "weight" integer not null,
    "cellphone" cellphone,
    "nationality" char(2) not null,
    "address" varchar(50) null,
    "city" char(5),
    "state" char(2),
    "country" char(2),
    "zip_code" varchar(10),
    "jwt_secret_key" uuid not null default gen_random_uuid(),
    "password" text not null,
    "permissions" text[] not null default array[]::text[]
);

create table users_weights
(
    "id" uuid primary key default gen_random_uuid(),
    "created_at" timestamp with time zone default now(),
    "user_id" uuid not null,
    "weight" integer not null
);

create table gyms
(
    "id" uuid primary key default gen_random_uuid(),
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now(),
    "status" text not null,
    "type" gym_category not null,
    "name" text not null unique,
    "address" text not null,
    "city" text not null,
    "state" text not null,
    "country" text not null,
    "zip_code" text not null,
    "phone" text not null,
    "email" text not null,
    "cellphone" text not null,
    "slug" text not null
);

create table gyms_customers
(
    "id" uuid primary key default gen_random_uuid(),
    "created_at" timestamp with time zone default now(),
    "gym_id" uuid not null,
    "user_id" uuid not null,
    "status" text not null
);

create table exercises
(
    "id" uuid primary key default gen_random_uuid(),
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now(),
    "status" text not null,
    "name" text not null,
    "description" text not null,
    "url_youtube" text not null
);

create table workouts
(
    "id" uuid primary key default gen_random_uuid(),
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now(),
    "status" text not null,
    "name" text not null unique,
    "description" text not null,
    "type" text not null, --> AMRAP, EMOM, RFT, TABATA
    "duration" integer not null,
    "rounds" integer not null,
    "rest" integer not null,
    "exercises" jsonb not null
);