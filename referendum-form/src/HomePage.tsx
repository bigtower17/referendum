import './App.css';

function HomePage() {
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

        <section className="hero-section">
          <div className="hero-content">
            
            <h1>Referendum costituzionale</h1>
            <h1>22-23 Marzo 2026</h1>
            <h2>Sei fuori sede? Puoi votare anche tu!</h2>
            <p className="subtitle">
              Non lasciare che la distanza ti impedisca di esercitare il tuo diritto di voto.
              Registrati ora e ti aiuteremo a votare nella tua città universitaria o di lavoro.
            </p>

          </div>
        </section>

        <div className="main-content">
          <section className="info-section">
            <h2>Come funziona?</h2>
            <p className="intro">
              In 3 semplici passaggi puoi assicurarti di poter votare al referendum
            </p>
            <div className="info-steps">
              <div className="info-card">
                <h2>📝</h2>
                <h3>Compila il modulo</h3>
                <p>
                  Inserisci i tuoi dati anagrafici e indica dove vuoi votare.
                  Ci vogliono solo 2 minuti!
                </p>
              </div>
              <div className="info-card">
                <h2>📞</h2>
                <h3>Vieni contattato</h3>
                <p>
                  Il circolo di tua pertinenza ti contatterà con tutte le informazioni
                  necessarie per votare.
                </p>
              </div>
              <div className="info-card">
                <h2>🗳️</h2>
                <h3>Vai a votare</h3>
                <p>
                  Il 22-23 marzo 2026, vai al seggio indicato con la tua tessera elettorale
                  e esprimi il tuo voto!
                </p>
              </div>
            </div>

            <div className="cta-container">
              <div className="alert-warning">
                <strong>⚠️ IMPORTANTE:</strong> Per esercitare il diritto di voto è necessario essere in possesso della propria <strong>TESSERA ELETTORALE</strong>
                Se non ce l'hai, devi assolutamente fartela spedire prima del referendum.
              </div>

              <a href="/form" className="cta-button">
                <span className="cta-icon">📝</span>
                <span className="cta-text">COMPILA IL MODULO</span>
                <span className="cta-arrow">→</span>
              </a>
            </div>
          </section>
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

export default HomePage;
