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

  const [logado, setLogado] = useState(false);
  const [usuarioLogado, setUsuarioLogado] = useState<any>(null);

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
/>

  );

}