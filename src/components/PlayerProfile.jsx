import styles from './PlayerProfile.module.css';
import arcaneCodexImg from '../assets/arcaneCodex.png';
import aulifyLogo from '../assets/Aulify.png';
import { LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DashJ() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/dashboard'); // Redirige al usuario si no hay token
    }
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const currentPath = window.location.pathname;
      if (currentPath !== '/dashboard/Perfil' && currentPath !== '/dashboard/stats') {
        localStorage.removeItem('token'); // Elimina el token si no está en Home o Stats
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const [historyScores, setHistoryScores] = useState([]);
  const [survivalScores, setSurvivalScores] = useState([]);

  useEffect(() => {
    fetch('https://xjpytw10oe.execute-api.us-east-1.amazonaws.com/leaderboard/history')
      .then(res => res.json())
      .then(data => setHistoryScores(data.data || []));

    fetch('https://xjpytw10oe.execute-api.us-east-1.amazonaws.com/leaderboard/survival')
      .then(res => res.json())
      .then(data => setSurvivalScores(data.data || []));
  }, []);

  const renderHistoryScores = (scores) => (
    scores.slice(0, 5).map((player, index) => (
      <li key={player.jugador_id}>
        {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}`} {player.gamertag} - {player.puntaje_total} pts
      </li>
    ))
  );

  const renderSurvivalScores = (scores) => (
    scores.slice(0, 5).map((player, index) => (
      <li key={player.jugador_id}>
        {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}`} {player.gamertag} - {player.mejor_puntaje} pts
      </li>
    ))
  );

  return (
    <div className={styles.appContainer}>
      <div className={styles.sidebar}>
        <div className={styles.topIcons}>
          <a href="/dashboard/Perfil" className={styles.icon}>Home</a>
          <a href="/dashboard/stats" className={styles.icon}>Stats</a>
        </div>
        <div className={styles.icon}>
          <a
            href="/"
            className={styles.logoutText}
            onClick={(e) => {
              e.preventDefault(); // Evita la navegación predeterminada
              localStorage.removeItem('token'); // Elimina el token
              navigate('/dashboard'); // Redirige al usuario a la página de inicio
            }}
          >
            <LogOut size={24} color="white" />
          </a>
        </div>
      </div>

      <div className={styles.main}>
        <div className={styles.topBar}>
          <h1></h1>
        </div>

        <div className={styles.content}>
          <div className={styles.stats}>
            <div className={styles.card}>
              <h3>Marcador global modo historia</h3>
              <ol className={styles.leaderboard}>
                {renderHistoryScores(historyScores)}
              </ol>
            </div>
            <div className={styles.card}>
              <h3>Marcador global modo supervivencia</h3>
              <ol className={styles.leaderboard}>
                {renderSurvivalScores(survivalScores)}
              </ol>
            </div>
          </div>

          <div className={styles.character}>
            <div className={styles.bigLogos}>
              <img src={arcaneCodexImg} alt="Logo Arcane Codex" className={styles.bigLogo} />
              <img src={aulifyLogo} alt="Logo Aulify" className={styles.bigLogo} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
