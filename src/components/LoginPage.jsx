import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import arcaneCodexImg from '../assets/arcaneCodex.jpg';
import aulifyLogo from '../assets/Aulify.jpg';
import styles from './LoginPage.module.css';

export default function LoginPage() {
  const formulario = useRef(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    const formData = new FormData(formulario.current);

    try {
      const response = await fetch('https://xjpytw10oe.execute-api.us-east-1.amazonaws.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': 'tec_api_KdZRQLUyMEJJHDqztZilqg'
        },
        body: JSON.stringify({
          email: formData.get('email'),
          password: formData.get('password'),
        })
      });

      const contentType = response.headers.get('content-type');
      const hasBody = response.headers.get('content-length') !== '0';

      let data = {};
      if (contentType?.includes('application/json') && hasBody) {
        data = await response.json();
      }

      if (response.ok && data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('email', data.email);
        localStorage.setItem('name', data.name);
        localStorage.setItem('level', data.level);
        navigate('/dashboard/Perfil');
      } else {
        setErrorMsg(data.error || 'Correo o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setErrorMsg('Ocurrió un error al conectar con el servidor');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestLogin = () => {
    navigate('/dashboard/DashJ');
  };

  return (
    <div className={styles['login-wrapper']}>
      <Card className={`${styles['login-card']} shadow-lg p-4`}>
        <Card.Body>
          <div className={`${styles['logo-container']} mb-3`}>
            <img src={aulifyLogo} alt="Logo Aulify" className={`${styles['logo-img']} mb-2`} />
            <img src={arcaneCodexImg} alt="Logo Arcane Codex" className={`${styles['logo-juego']} mb-3`} />
          </div>
          <Form ref={formulario} onSubmit={handleLogin}>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control type="email" name="email" placeholder="Correo" required />
            </Form.Group>
            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" name="password" placeholder="Contraseña" required />
            </Form.Group>
  
            {errorMsg && <Alert variant="danger" className="text-center">{errorMsg}</Alert>}
  
            <Button variant="primary" type="submit" className="w-100" disabled={isLoading}>
              {isLoading ? <Spinner animation="border" size="sm" /> : 'Iniciar sesión'}
            </Button>
            <Button variant="secondary" onClick={handleGuestLogin} className="w-100 mt-3">
              Entrar como invitado
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}