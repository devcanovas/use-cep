import { useState } from 'react';
import './App.css';

function App() {
  const [address, setAddress] = useState('');

  const requestAddress = (e) => {
    const postalcode = e.target.value
    setAddress({
      postalcode: postalcode
    })
    if (postalcode && postalcode.length === 8) {
      fetch(`https://viacep.com.br/ws/${postalcode}/json/`,)
        .then(response => response.json())
        .then(data => {
          setAddress({
            postalcode: postalcode,
            street: data.logradouro,
            neighborhood: data.bairro,
            province: data.localidade,
            ibge: data.ibge
          })
        })
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <input
          placeholder='Digite seu CEP'
          type='text'
          onChange={requestAddress}
        />
        <ul>
          <li>CEP: {address.postalcode}</li>
          <li>Logradouro: {address.street}</li>
          <li>Bairro: {address.neighborhood}</li>
          <li>Código IBGE: {address.ibge}</li>
        </ul>
      </header>
    </div>
  );
}

export default App;
