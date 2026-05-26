import { useState } from 'react';
import { useEffect } from 'react';

import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore';

import { db } from './firebase';



import Login from './components/Login';
import Dashboard from './components/Dashboard';

export type Registro = {
  placa: string;
  oc: string;
  status: string;
  observacao: string;
  imagem?: string;
};

export default function App() {

  const usuarioSalvo = localStorage.getItem('usuario');

const [usuarioLogado, setUsuarioLogado] = useState<any>(

  usuarioSalvo ? JSON.parse(usuarioSalvo) : null

);

const [logado, setLogado] = useState(!!usuarioSalvo);
  

  const [registros, setRegistros] = useState<Registro[]>([]);
  useEffect(() => {

  const unsubscribe = onSnapshot(

    collection(db, 'registros'),

    (snapshot) => {

      const lista: any = [];

      snapshot.forEach((doc) => {

        lista.push({
          id: doc.id,
          ...doc.data()
        });

      });

      setRegistros(lista);

    }

  );

  return () => unsubscribe();

}, []);

 const adicionarRegistro = async (
  registro: Registro
) => {

 await addDoc(

  collection(db, 'registros'),

  {

    ...registro,

    createdAt: serverTimestamp()

  }

);

};

  if (!logado) {

    return (
      <Login

  onLogin={(usuario) => {

   setUsuarioLogado(usuario);

localStorage.setItem(
  'usuario',
  JSON.stringify(usuario)
);

setLogado(true);

  }}

/>
    );

  }

  return (

    <Dashboard
  registros={registros}
  adicionarRegistro={adicionarRegistro}
  usuarioLogado={usuarioLogado}

  onLogout={() => {

  localStorage.removeItem('usuario');

  setUsuarioLogado(null);

  setLogado(false);

}}
/>

  );

}