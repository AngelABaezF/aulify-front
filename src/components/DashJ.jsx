import arcaneCodexImg from '../assets/arcaneCodex.png';
import aulifyLogo from '../assets/Aulify.png';
import { LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';
import styles from './DashJ.module.css';

export default function DashJ() {
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
  // https://xjpytw10oe.execute-api.us-east-1.amazonaws.com/
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
    <div className={styles['app-container']}>
      <div className={styles['sidebar']}>
        <div className={styles['top-icons']}>
          <a href="" className={styles['icon']}>Home</a>
        </div>
        <div className={styles['icon']}>
          <a href="/" className={styles['logout-text']}><LogOut size={24} color="white" /></a>
        </div>
      </div>

      <div className={styles['main']}>
        <div className={styles['top-bar']}>
          <h1></h1>
        </div>

        <div className={styles['content']}>
          <div className={styles['stats']}>
            <div className={`${styles['card']} ${styles['dashboard-card']}`}>
              <h3>Marcador global modo historia</h3>
              <ol className={styles['leaderboard']}>
                {renderHistoryScores(historyScores)}
              </ol>
            </div>
            <div className={`${styles['card']} ${styles['dashboard-card']}`}>
              <h3>Marcador global modo supervivencia</h3>
              <ol className={styles['leaderboard']}>
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