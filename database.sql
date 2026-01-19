-- 1. Table des Utilisateurs
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Table des Challenges (Gestion des règles Prop Firm)
CREATE TABLE challenges (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    initial_balance DECIMAL(10, 2) DEFAULT 5000.00,
    current_balance DECIMAL(10, 2) DEFAULT 5000.00,
    daily_loss_limit DECIMAL(10, 2) DEFAULT 250.00, -- 5% de 5000
    max_loss_limit DECIMAL(10, 2) DEFAULT 500.00,   -- 10% de 5000
    profit_target DECIMAL(10, 2) DEFAULT 500.00,    -- Objectif 10%
    status VARCHAR(20) DEFAULT 'active',            -- 'active', 'failed', 'passed'
    start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Table des Trades (Historique des transactions)
CREATE TABLE trades (
    id SERIAL PRIMARY KEY,
    challenge_id INTEGER REFERENCES challenges(id) ON DELETE CASCADE,
    symbol VARCHAR(20) NOT NULL,    -- 'IAM' (Maroc Telecom), 'BTC', etc.
    type VARCHAR(10) NOT NULL,      -- 'BUY' or 'SELL'
    entry_price DECIMAL(15, 2) NOT NULL,
    exit_price DECIMAL(15, 2),
    amount DECIMAL(15, 2) NOT NULL,
    profit_loss DECIMAL(15, 2) DEFAULT 0.00,
    executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Vue pour le Leaderboard (Module D)
-- Calcule le pourcentage de profit pour classer les traders
CREATE VIEW leaderboard AS
SELECT 
    u.username,
    c.current_balance,
    ((c.current_balance - c.initial_balance) / c.initial_balance * 100) AS profit_percentage
FROM users u
JOIN challenges c ON u.id = c.user_id
WHERE c.status != 'failed'
ORDER BY profit_percentage DESC
LIMIT 10;

