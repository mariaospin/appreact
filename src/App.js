import React, { useState, useEffect } from 'react';
import './App.css';
import SearchComponent from './components/SearchComponent';
import Keycloak from 'keycloak-js';

const keycloakOptions = {
  url: 'https://209.38.140.142:8443/',
  realm: 'APS',
  clientId: 'React_native_api-rest',
};

function App() {
  const [keycloak, setKeycloak] = useState(null);
  

  useEffect(() => {
    const initKeycloak = async () => {
      const keycloakInstance = new Keycloak(keycloakOptions)
      try {
        await keycloakInstance.init({ onLoad: 'login-required', checkLoginIframe: false });
        setKeycloak(keycloakInstance);
        if (keycloakInstance.authenticated) {
          console.log(keycloakInstance)
          //setAuthenticated(true);
        }
      } catch (error) {
        console.error(`Error initializing Keycloak: ${JSON.stringify(error, null, 2)}`);
      }
    };

    initKeycloak();
  }, []);

  const handleLogout = () => {
    if (keycloak) {
      keycloak.logout();
      //setAuthenticated(false);
    }
  };

  //const handleLogin = () => {
    //if (keycloak) {
     // keycloak.login();
    //}
  //};

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="*">React App</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNa" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {keycloak && keycloak.authenticated ? (
                <li className="nav-item">
                  <button className="btn btn-danger" onClick={handleLogout}>Cerrar sesión</button>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </nav>

      <div className="container-fluid">
        {keycloak && keycloak.authenticated ? (
          <div>
            <h2 className="text-center">Busqueda de pacientes</h2>
            <SearchComponent />
          </div>
        ) : (
          <div>
            <h2 className="text-center">usuario no autenticado</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;