-- Tabella per le registrazioni al referendum fuorisede
CREATE TABLE IF NOT EXISTS fuorisede_registrations (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  cognome VARCHAR(255) NOT NULL,
  codice_fiscale VARCHAR(16) NOT NULL UNIQUE,
  telefono VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  comune_voto VARCHAR(255) NOT NULL,
  provincia VARCHAR(100) NOT NULL,
  regione VARCHAR(100) NOT NULL,
  privacy_accepted BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indice per velocizzare le ricerche per regione
CREATE INDEX IF NOT EXISTS idx_fuorisede_regione ON fuorisede_registrations(regione);

-- Indice per velocizzare le ricerche per comune
CREATE INDEX IF NOT EXISTS idx_fuorisede_comune ON fuorisede_registrations(comune_voto);

-- Indice per velocizzare le ricerche per data di creazione
CREATE INDEX IF NOT EXISTS idx_fuorisede_created_at ON fuorisede_registrations(created_at DESC);
