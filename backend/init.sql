CREATE DATABASE farmers_market;

CREATE TABLE player (
  id SERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  password_hash VARCHAR(100) NOT NULL,
  current_balance INT DEFAULT 1000,
  highest_score INT DEFAULT 1000
);

CREATE TABLE session (
  id SERIAL NOT NULL PRIMARY KEY,
  current_balance INT,
  top_amount INT,
  biggest_loss INT,
  biggest_win INT,
  highest_bet INT,
  player_id SERIAL,
  CONSTRAINT fk_player FOREIGN KEY (id)
  REFERENCES player(id)
  ON DELETE CASCADE
);

CREATE TABLE player_session (
  id SERIAL NOT NULL PRIMARY KEY,
  player_id SERIAL,
  session_id SERIAL,
  CONSTRAINT fk_player FOREIGN KEY (id)
  REFERENCES player(id)
  ON DELETE CASCADE,
  CONSTRAINT fk_session FOREIGN KEY (id)
  REFERENCES session(id)
  ON DELETE CASCADE
);

-- delete player by id
DELETE FROM player
WHERE id = $1 
RETURNING id, name;

-- delete session by id
DELETE FROM session
WHERE id = $1;

-- add players 
INSERT INTO 
  player(name, password_hash, current_balance, highest_score)
VALUES
  ('Caspar', '50001234567890', 1000, 1000),
  ( 'Ingo', 'jaksdjui237', 2000, 9000),
  ( 'Hampus', 'oijkasf218', 3000, 4000),
  ( 'Jonatan', 'kasjhf2152', 4000, 6000),
  ( 'Sebastian', '21jkr4jskk', 5000, 2000),
  ( 'Felix', '12gkslawrjfdgjl', 7000, 10360);


-- update player 
UPDATE player
SET 
  name = 'Jonas',
  password_hash = '12345',
  current_balance = 9009,
  highest_score = 20345
WHERE id = 1;

--get player by id
SELECT name, current_balance, highest_score FROM player WHERE id = 1;

-- add sessions 
INSERT INTO 
session(
  current_balance,
  top_amount,
  biggest_loss,
  biggest_win,
  highest_bet
)
VALUES
  (4222, 7000, 500, 2000, 6000),
  (6422, 1230, 4021, 1200, 1700),
  (1239, 5422, 100, 499, 1090),
  (554, 4992, 2340, 900, 1000);

-- add sessions to player
INSERT INTO 
  player_session(
  player_id, session_id
)
VALUES
  (1,1),
  (1,2),
  (1,3),
  (1,4);

-- add sessions to player
INSERT INTO 
  player_session(
  player_id, session_id
)
VALUES
  (1,1),
  (1,2),
  (1,3),
  (1,4);

-- add player
INSERT INTO 
  player(name, password_hash, current_balance, highest_score)
VALUES (
  $1,
  $2,
  $3,
  $4
);

-- add session
INSERT INTO session(
  current_balance,
  top_amount,
  biggest_loss,
  biggest_win,
  highest_bet,
  player_id
)
VALUES
  ($1, $2, $3, $4, $5);

-- add session to player
INSERT INTO player_session(
  player_id, session_id
)
VALUES
  ($1,$2);

-- Get sessions by player id
SELECT name from player; 

-- Get sessions by player id
SELECT p.name as player,
  COUNT(s.id) as session_amount,
  COALESCE(
    JSON_AGG(
      JSON_BUILD_OBJECT(
      -- 'id', s.id,
      'current_balance', s.current_balance,
      'top_amount', s.top_amount,
      'biggest_loss', s.biggest_loss,
      'biggest_win', s.biggest_win,
      'highest_bet', s.highest_bet
      )
      ORDER BY s.id
    ) FILTER (WHERE s.id IS NOT NULL),
  '[]'::json
  ) AS sessions
  FROM player p
  LEFT JOIN player_session ps ON ps.player_id = p.id
  LEFT JOIN session s on s.id = ps.session_id
  WHERE p.id = 1
  GROUP by p.name;

-- update session data by sessionId
UPDATE session
SET current_balance = $1,
    top_amount = $2,
    biggest_loss = $3,
    biggest_win = $4,
    highest_bet = $5
WHERE id = $6;

-- Get players with each highscore
SELECT p.name as player,
COALESCE(MAX(s.top_amount),0) as highscore
FROM player p 
LEFT JOIN player_session ps ON ps.player_id = p.id
LEFT JOIN session s ON s.player_id = ps.id
GROUP BY p.name
ORDER BY highscore DESC;

-- DROP TABLE player;
-- DROP TABLE session;
