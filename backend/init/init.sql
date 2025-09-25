-- Reviews Table
CREATE TABLE Reviews (
    Id BIGINT PRIMARY KEY,
    listingId BIGINT NOT NULL,
    listingName VARCHAR(255) NOT NULL,
    guest VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    rating NUMERIC(3,1) CHECK (rating >= 0 AND rating <= 10),
    publicReview TEXT,
    submittedAt TIMESTAMPTZ DEFAULT now(),
    channel VARCHAR(100),
    isPublic BOOLEAN DEFAULT FALSE
);

-- Users of the dashboard
CREATE TABLE Users (
    Id BIGSERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'flexAdmin', -- simple text instead of ENUM
    createdAt TIMESTAMPTZ DEFAULT now(),
    updatedAt TIMESTAMPTZ DEFAULT now()
);

-- Trigger function to auto-update updatedAt
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updatedAt = now();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Attach trigger to Users table
CREATE TRIGGER set_users_updated_at
BEFORE UPDATE ON Users
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();
