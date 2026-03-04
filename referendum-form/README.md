# Form Raccolta Dati Fuorisede - Referendum 22-23 Marzo 2026

Form per la raccolta dei dati dei fuorisede che vogliono votare al referendum del 22-23 marzo 2026.

## Caratteristiche

-  Form completo con validazione dei dati
-  Campi obbligatori: Nome, Cognome, Codice Fiscale, Telefono, Email, Comune, Provincia, Regione
-  Informativa sulla privacy con checkbox di accettazione
-  Avviso in evidenza sulla necessit� della tessera elettorale
-  Database PostgreSQL su Neon
-  API serverless su Vercel
-  Design responsive e user-friendly

## Database Neon

**Project ID:** `shy-tooth-89753041`

**Connection String:**
```
postgresql://neondb_owner:npg_HZt5kxp7uzwM@ep-damp-surf-akq2a8s5-pooler.c-3.us-west-2.aws.neon.tech/neondb
```

### Schema Database

```sql
CREATE TABLE fuorisede_registrations (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  cognome VARCHAR(100) NOT NULL,
  codice_fiscale VARCHAR(16) NOT NULL UNIQUE,
  telefono VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL,
  comune_voto VARCHAR(100) NOT NULL,
  provincia VARCHAR(100) NOT NULL,
  regione VARCHAR(100) NOT NULL,
  privacy_accepted BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## Deploy su Vercel

### 1. Installazione Vercel CLI (se non l'hai gi�)

```bash
npm install -g vercel
```

### 2. Login su Vercel

```bash
vercel login
```

### 3. Deploy

Dalla directory `referendum-form`, esegui:

```bash
vercel
```

Segui le istruzioni interattive.

### 4. Configurare la variabile d'ambiente

Dopo il deploy, aggiungi la variabile d'ambiente `DATABASE_URL` nel dashboard di Vercel:

1. Vai su [vercel.com](https://vercel.com) e apri il tuo progetto
2. Vai su **Settings** > **Environment Variables**
3. Aggiungi:
   - **Name:** `DATABASE_URL`
   - **Value:** `postgresql://neondb_owner:`
   - **Environments:** Production, Preview, Development

4. Redeploy il progetto:

```bash
vercel --prod
```

## Sviluppo Locale

### Installare le dipendenze

```bash
npm install
```

### Avviare il server di sviluppo

```bash
npm run dev
```

Il sito sar� disponibile su `http://localhost:5173`

## Esportare i dati

Per esportare i dati dal database Neon e suddividerli per regione, provincia e circolo, puoi usare questa query:

```sql
SELECT
  regione,
  provincia,
  comune_voto,
  nome,
  cognome,
  codice_fiscale,
  telefono,
  email,
  created_at
FROM fuorisede_registrations
ORDER BY regione, provincia, comune_voto, cognome, nome;
```

Oppure per esportare in CSV:

```sql
COPY (
  SELECT
    regione,
    provincia,
    comune_voto,
    nome,
    cognome,
    codice_fiscale,
    telefono,
    email,
    created_at
  FROM fuorisede_registrations
  ORDER BY regione, provincia, comune_voto, cognome, nome
) TO '/path/to/export.csv' WITH CSV HEADER;
```

## Stack Tecnologico

- **Frontend:** React + TypeScript + Vite
- **Validazione:** Zod + React Hook Form
- **Database:** PostgreSQL (Neon)
- **API:** Vercel Serverless Functions
- **Hosting:** Vercel

## Note Importanti

- Il codice fiscale � un campo univoco: non � possibile registrare lo stesso codice fiscale pi� volte
- Tutti i campi sono obbligatori
- I dati vengono salvati in conformit� al GDPR
- L'accettazione della privacy � obbligatoria
