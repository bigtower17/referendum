import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import './App.css';

// Lista delle regioni italiane
const REGIONI = [
  'Abruzzo', 'Basilicata', 'Calabria', 'Campania', 'Emilia-Romagna',
  'Friuli-Venezia Giulia', 'Lazio', 'Liguria', 'Lombardia', 'Marche',
  'Molise', 'Piemonte', 'Puglia', 'Sardegna', 'Sicilia', 'Toscana',
  'Trentino-Alto Adige', 'Umbria', 'Valle d\'Aosta', 'Veneto'
];

// Schema di validazione con Zod
const formSchema = z.object({
  nome: z.string().min(2, 'Il nome deve contenere almeno 2 caratteri'),
  cognome: z.string().min(2, 'Il cognome deve contenere almeno 2 caratteri'),
  codiceFiscale: z.string()
    .length(16, 'Il codice fiscale deve essere di 16 caratteri')
    .regex(/^[A-Z]{6}[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{3}[A-Z]$/i, 'Codice fiscale non valido'),
  telefono: z.string()
    .min(10, 'Il numero di telefono deve contenere almeno 10 cifre')
    .regex(/^[\d\s\+\-()]+$/, 'Numero di telefono non valido'),
  email: z.string()
    .email('Email non valida'),
  comuneVoto: z.string()
    .min(2, 'Il comune deve contenere almeno 2 caratteri'),
  provincia: z.string()
    .min(2, 'La provincia deve contenere almeno 2 caratteri'),
  regione: z.string()
    .min(1, 'Seleziona una regione'),
  privacyAccepted: z.boolean()
    .refine(val => val === true, 'Devi accettare l\'informativa sulla privacy')
});

type FormData = z.infer<typeof formSchema>;

function FormPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Errore durante l\'invio del modulo');
      }

      setSubmitSuccess(true);
      reset();
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Errore sconosciuto');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="page-wrapper">
        <div className="container">
          <div className="success-message">
            <h2>✅ Registrazione completata!</h2>
            <p>I tuoi dati sono stati registrati correttamente.</p>
            <p>Sarai contattato dal circolo di tua pertinenza con le informazioni per votare al referendum del 22-23 marzo 2026.</p>
            <Link to="/" className="submit-button" style={{ textDecoration: 'none', display: 'inline-block', marginTop: '20px' }}>
              Torna alla home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="hero"></div>

        <div className="logos">
          <div className="logo-item">
            <img src="/img/4bdcda3c-656c-428a-93ab-5bff2b960112.jpg" alt="Partito Democratico" />
          </div>
          <div className="logo-item">
            <div className="logo-placeholder">
              Logo Giovani Democratici
            </div>
          </div>
        </div>

        <div className="main-content">
          <div className="form-wrapper">
            <h2 className="form-title">Compila il modulo</h2>

            <div className="alert-warning">
                <strong>⚠️ IMPORTANTE:</strong> Per esercitare il diritto di voto è necessario essere in possesso della propria <strong>TESSERA ELETTORALE</strong>
                Se non ce l'hai, devi assolutamente fartela spedire prima del referendum.
              </div>

            <form onSubmit={handleSubmit(onSubmit)} className="form">
              <div className="form-section">
                <h3>Dati Anagrafici</h3>

                <div className="form-group">
                  <label htmlFor="nome">Nome *</label>
                  <input
                    type="text"
                    id="nome"
                    {...register('nome')}
                    className={errors.nome ? 'error' : ''}
                  />
                  {errors.nome && <span className="error-message">{errors.nome.message}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="cognome">Cognome *</label>
                  <input
                    type="text"
                    id="cognome"
                    {...register('cognome')}
                    className={errors.cognome ? 'error' : ''}
                  />
                  {errors.cognome && <span className="error-message">{errors.cognome.message}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="codiceFiscale">Codice Fiscale *</label>
                  <input
                    type="text"
                    id="codiceFiscale"
                    {...register('codiceFiscale')}
                    className={errors.codiceFiscale ? 'error' : ''}
                    maxLength={16}
                    style={{ textTransform: 'uppercase' }}
                  />
                  {errors.codiceFiscale && <span className="error-message">{errors.codiceFiscale.message}</span>}
                </div>
              </div>

              <div className="form-section">
                <h3>Contatti</h3>

                <div className="form-group">
                  <label htmlFor="telefono">Numero di Telefono *</label>
                  <input
                    type="tel"
                    id="telefono"
                    {...register('telefono')}
                    className={errors.telefono ? 'error' : ''}
                    placeholder="+39 123 456 7890"
                  />
                  {errors.telefono && <span className="error-message">{errors.telefono.message}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    {...register('email')}
                    className={errors.email ? 'error' : ''}
                    placeholder="nome@esempio.it"
                  />
                  {errors.email && <span className="error-message">{errors.email.message}</span>}
                </div>
              </div>

              <div className="form-section">
                <h3>Dove vuoi votare</h3>

                <div className="form-group">
                  <label htmlFor="comuneVoto">Comune in cui vuoi votare *</label>
                  <input
                    type="text"
                    id="comuneVoto"
                    {...register('comuneVoto')}
                    className={errors.comuneVoto ? 'error' : ''}
                    placeholder="Es. Roma, Milano, Napoli..."
                  />
                  {errors.comuneVoto && <span className="error-message">{errors.comuneVoto.message}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="provincia">Provincia/Città Metropolitana *</label>
                  <input
                    type="text"
                    id="provincia"
                    {...register('provincia')}
                    className={errors.provincia ? 'error' : ''}
                    placeholder="Es. RM, MI, NA..."
                  />
                  {errors.provincia && <span className="error-message">{errors.provincia.message}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="regione">Regione *</label>
                  <select
                    id="regione"
                    {...register('regione')}
                    className={errors.regione ? 'error' : ''}
                  >
                    <option value="">Seleziona una regione...</option>
                    {REGIONI.map(regione => (
                      <option key={regione} value={regione}>{regione}</option>
                    ))}
                  </select>
                  {errors.regione && <span className="error-message">{errors.regione.message}</span>}
                </div>
              </div>

              <div className="form-section">
                <h3>Privacy</h3>

                <div className="privacy-box">
                  <h4>Informativa sulla Privacy</h4>
                  <p>
                    I dati personali raccolti attraverso questo modulo verranno utilizzati esclusivamente per:
                  </p>
                  <ul>
                    <li>Metterti in contatto con il circolo elettorale di tua pertinenza</li>
                    <li>Fornirti informazioni sul referendum del 22-23 marzo 2026</li>
                    <li>Organizzare le modalità di voto per i fuorisede</li>
                  </ul>
                  <p>
                    I tuoi dati verranno trattati in conformità al Regolamento UE 2016/679 (GDPR) e saranno
                    condivisi esclusivamente con le federazioni provinciali e i circoli metropolitani competenti.
                  </p>
                  <p>
                    Hai il diritto di accedere, rettificare, cancellare i tuoi dati personali in qualsiasi momento.
                  </p>
                </div>

                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      {...register('privacyAccepted')}
                    />
                    <span>
                      Ho letto e accetto l'informativa sulla privacy e autorizzo il trattamento dei miei dati personali *
                    </span>
                  </label>
                  {errors.privacyAccepted && (
                    <span className="error-message">{errors.privacyAccepted.message}</span>
                  )}
                </div>
              </div>

              {submitError && (
                <div className="error-box">
                  <strong>Errore:</strong> {submitError}
                </div>
              )}

              <button
                type="submit"
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Invio in corso...' : 'Invia Registrazione'}
              </button>
            </form>
          </div>
        </div>

        <div className="footer-image">
          <img src="/img/Copertina-Sito-Ok.png" alt="Referendum" />
        </div>

        <div className="footer">
          <div className="footer-left">
            <p>Partito Democratico Federazione di Caltanissetta</p>
            <p>Giovani Democratici Federazione di Caltanissetta</p>
          </div>
          <div className="footer-right">
            <p>made with <span className="heart">❤️</span> by <a href="https://torregrossa.dev" target="_blank" rel="noopener noreferrer">torregrossa.dev</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormPage;
