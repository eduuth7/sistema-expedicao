import { useState } from 'react';

type Props = {
  onLogin: (usuario: any) => void;
};
export default function Login({
  onLogin
}: Props) {
const usuarios = [

  {
    nome: 'Carlos',
    login: 'expedicao1',
    senha: 'expedicao10',
    role: 'operador'
  },

  {
    nome: 'Pedro',
    login: 'expedicao2',
    senha: 'expedicao10',
    role: 'operador'
  },

  {
    nome: 'Romulo Ajalla',
    login: 'expedicao3',
    senha: 'expedicao10',
    role: 'operador'
  },

  {
    nome: 'Romulo Pereira',
    login: 'expedicao4',
    senha: 'expedicao10',
    role: 'operador'
  },

  {
    nome: 'William',
    login: 'expedicao5',
    senha: 'expedicao10',
    role: 'operador'
  },

  {
    nome: 'Giovani',
    login: 'chefe',
    senha: 'expedicao10',
    role: 'admin'
  }

];
  const [usuario, setUsuario] = useState('expedicao1');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = (e: any) => {

    e.preventDefault();

    const usuarioEncontrado = usuarios.find(

  (user) =>

    user.login === usuario &&
    user.senha === senha

);

if (usuarioEncontrado) {

onLogin(usuarioEncontrado);
    } else {

      setErro('Credenciais inválidas');

    }

  };

  return (

    <div className="bg-slate-100 min-h-screen text-slate-800">

      <div className="min-h-screen flex items-center justify-center p-4">

        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-slate-200">

          <div className="text-center mb-8">

            <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md text-2xl">

              🚚

            </div>

            <h1 className="text-2xl font-bold text-slate-800">

              Acesso à Expedição

            </h1>

            <p className="text-slate-500 mt-2 text-sm">

              Introduza as suas credenciais

            </p>

          </div>

          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >

            {erro && (

              <div className="bg-red-100 text-red-600 p-3 rounded-lg text-sm">

                {erro}

              </div>

            )}

            <div>

              <label className="block text-sm font-medium text-slate-700 mb-1">

                Utilizador

              </label>

              <select
  value={usuario}
  onChange={(e) => setUsuario(e.target.value)}
  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
>

  <option value="expedicao1">

    Carlos

  </option>

  <option value="expedicao2">

    Pedro

  </option>

  <option value="expedicao3">

    Romulo Ajalla

  </option>

  <option value="expedicao4">

    Romulo Pereira

  </option>

  <option value="expedicao5">

    William

  </option>

  <option value="chefe">

    Giovani (Supervisor)

  </option>

</select>
            </div>

            <div>

              <label className="block text-sm font-medium text-slate-700 mb-1">

                Palavra-passe

              </label>

              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="••••"
              />

            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >

              Entrar no Sistema

            </button>

          </form>

        </div>

      </div>

    </div>

  );

}