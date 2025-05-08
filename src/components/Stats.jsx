import styles from './Stats.module.css';
import { LogOut } from 'lucide-react';
import { useState } from 'react';
import skinchico from '../assets/skinchico.png';
import skinchica from '../assets/skinchica.png';

export default function Stats() {
  const [email, setEmail] = useState('');
  const [playerDataHist, setPlayerDataHist] = useState(null);
  const [playerDataInfo, setPlayerDataInfo] = useState(null);
  const [playerDataStats, setPlayerDataStats] = useState(null);

  const handleSearch = async () => {
    try {
      const trimmedEmail = email.trim().toLowerCase();
      const histUrl = `https://xjpytw10oe.execute-api.us-east-1.amazonaws.com/dashboard/playerStatsHist?email=${encodeURIComponent(trimmedEmail)}`;
      const infoUrl = `https://xjpytw10oe.execute-api.us-east-1.amazonaws.com/dashboard/playerStatsSur?email=${encodeURIComponent(trimmedEmail)}`;
      const infoStats = `https://xjpytw10oe.execute-api.us-east-1.amazonaws.com/dashboard/playerStats?email=${encodeURIComponent(trimmedEmail)}`;
  
      const [histResponse, infoResponse, statsResponse] = await Promise.all([
        fetch(histUrl),
        fetch(infoUrl),
        fetch(infoStats),
      ]);
      
      if (!histResponse.ok || !infoResponse.ok || !statsResponse.ok) {
        console.error("Alguna respuesta no fue exitosa:", histResponse.status, infoResponse.status, statsResponse.status);
        alert("No se encontraron estadísticas para este correo.");
        return;
      }
      
      const histData = await histResponse.json();
      const infoData = await infoResponse.json();
      const infoStatsData = await statsResponse.json();  
  
      console.log("Datos históricos:", histData);
      console.log("Datos info:", infoData);
      console.log("Datos infoStats:", infoStatsData);
  
      setPlayerDataHist(histData);
      setPlayerDataInfo(infoData);
      setPlayerDataStats(infoStatsData);
    } catch (error) {
      console.error('Error fetching player stats:', error);
    }
  };

  // Función para renderizar las tarjetas de nivel dinámicamente
  const renderLevelCards = () => {
    if (!playerDataHist || !playerDataHist.data || playerDataHist.data.length === 0) {
      return (
        <>
          <div className={styles.statCard}>
            <h3>Nivel</h3>
            <p>Cargando...</p>
          </div>
          <div className={styles.statCard}>
            <h3>Respuestas Incorrectas</h3>
            <p>Cargando...</p>
          </div>
          <div className={styles.statCard}>
            <h3>Respuestas correctas</h3>
            <p>Cargando...</p>
          </div>
          <div className={styles.statCard}>
            <h3>Puntaje nivel</h3>
            <p>Cargando...</p>
          </div>
        </>
      );
    }

    // Crear grupos de tarjetas para cada nivel
    return playerDataHist.data.map((levelData, index) => (
      <div key={`level-${levelData.nivel_id}`} className={styles.levelCardGroup}>
        <div className={styles.levelHeader}>
          <h2>Nivel {levelData.nivel_id}</h2>
        </div>
        <div className={styles.levelCards}>
          <div className={styles.statCard}>
            <h3>Respuestas Incorrectas</h3>
            <p>{levelData.errores}</p>
          </div>
          <div className={styles.statCard}>
            <h3>Respuestas correctas</h3>
            <p>{levelData.resp_cor}</p>
          </div>
          <div className={styles.statCard}>
            <h3>Puntaje nivel</h3>
            <p>{levelData.max_puntaje}</p>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className={styles.statsContainer}>
      <div className={styles.sidebar}>
        <div className={styles.topIcons}>
          <a href="/dashboard/Perfil" className={styles.icon}>Home</a>
          <a href="/dashboard/stats" className={`${styles.icon} ${styles.active}`}>Stats</a>
        </div>
        <div className={styles.icon}>
          <a href="/" className={styles.logoutText}><LogOut size={24} color="white" /></a>
        </div>
      </div>

      <div className={styles.main}>
        <div className={styles.topBar}>
          <h1>Estadísticas del Jugador</h1>
        </div>

        <div className={styles.content}>
          <div className={styles.contentLayout}>
            <div className={styles.searchSection}>
              <div className={styles.searchRow}>
                <label className={styles.searchLabel}>Buscar estadísticas por cuenta</label>
                <input
                  type="text"
                  className={styles.searchInput}
                  placeholder="Correo del usuario"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button onClick={handleSearch} className={styles.searchButton}>Buscar</button>
              </div>
            </div>

            <div className={styles.cardsSection}>
              {/* Tarjetas de información general */}
              <div className={styles.generalStats}>
                <div className={styles.statCard}>
                  <h3>GamerTag</h3>
                  <p>{playerDataInfo?.data?.gamertag ?? 'Cargando...'}</p>
                </div>
                <div className={styles.statCard}>
                  <h3>Tiempo de juego</h3>
                  <p>{playerDataStats?.data?.tiempo_jugado ?? 'Cargando...'} min</p>
                </div>
                <div className={`${styles.skinPreviewCard} ${styles.card}`}>
                  <h3>Skin</h3>
                  {playerDataStats?.data?.skin === 0 && (
                    <img src={skinchico} alt="Skin Chico" style={{ width: '50%', borderRadius: '10px' }} />
                  )}
                  {playerDataStats?.data?.skin === 1 && (
                    <img src={skinchica} alt="Skin Chica" style={{ width: '50%', borderRadius: '10px' }} />
                  )}
                  {playerDataStats?.data?.skin !== 0 && playerDataStats?.data?.skin !== 1 && (
                    <p>Cargando...</p>
                  )}
                </div>
                <div className={styles.statCard}>
                  <h3>Puntaje supervivencia</h3>
                  <p>{playerDataInfo?.data?.puntaje ?? 'Cargando...'}</p>
                  <div className={styles.statCard}>
                    <h3>Enemigos eliminados</h3>
                    <p>{playerDataInfo?.data?.enemigos_elim ?? 'Cargando...'}</p>
                  </div>
                </div>
              </div>

              {/* Sección de tarjetas de nivel dinámicas */}
              <div className={styles.levelStatsSection}>
                <h2 className={styles.levelSectionTitle}>Estadísticas por Nivel</h2>
                <div className={styles.levelStatsContainer}>
                  {renderLevelCards()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}