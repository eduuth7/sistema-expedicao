import { useState } from 'react';

import RegistroForm from './RegistroForm';
import RegistroTable from './RegistroTable';

type Props = {
  registros: any[];
  adicionarRegistro: (registro: any) => void;
  usuarioLogado: any;
  onLogout: () => void;
};

export default function Dashboard({
  registros,
  adicionarRegistro,
 usuarioLogado,
onLogout
}: Props) {

  const [dataInicio, setDataInicio] = useState('');
const [dataFim, setDataFim] = useState('');
const [filtroStatus, setFiltroStatus] = useState('');
const [filtroOperador, setFiltroOperador] = useState('');

  const totalConcluidos = registros.filter(
    (registro) => registro.status === 'Concluído'
  ).length;

  const totalPendentes = registros.filter(
    (registro) => registro.status === 'Pendente'
  ).length;
  const totalNaoCarregados = registros.filter(
  (registro) => registro.status === 'Não Carregado'
).length;

 const registrosFiltrados = registros

  .filter((registro) => {

    if (!registro.createdAt) return true;

    const dataRegistro = registro.createdAt.toDate();

    if (dataInicio) {

      const inicio = new Date(dataInicio);

      if (dataRegistro < inicio) {

        return false;

      }

    }

    if (dataFim) {

      const fim = new Date(dataFim);

      fim.setHours(23, 59, 59);

      if (dataRegistro > fim) {

        return false;

      }

    }
if (filtroStatus) {

  if (registro.status !== filtroStatus) {

    return false;

  }

}

if (filtroOperador) {

  if (registro.operador !== filtroOperador) {

    return false;

  }

}
    return true;

  })

  .sort((a, b) => {

    if (!a.createdAt || !b.createdAt) return 0;

    return (

      b.createdAt.toDate().getTime() -

      a.createdAt.toDate().getTime()

    );

  });

  const produtividade: any = {};

  registrosFiltrados.forEach((registro) => {

    if (!produtividade[registro.operador]) {

      produtividade[registro.operador] = 0;

    }

    produtividade[registro.operador]++;

  });

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300">

      {/* HEADER */}

      <header className="bg-slate-900 border-b border-slate-800 shadow-2xl">

        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div
  onClick={() => window.location.reload()}
  className="bg-blue-600 text-white w-10 h-10 rounded-xl flex items-center justify-center text-xl cursor-pointer hover:scale-105 transition-transform"
>

              🚚

            </div>

            <div>

              <h1 className="text-2xl font-bold text-white">

                Logística

              </h1>

              <p className="text-slate-400 text-sm">

                Expedição

              </p>

            </div>

          </div>

          <div className="flex items-center gap-4">

  <div className="flex items-center gap-3">

    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-lg">

      👤

    </div>

    <p className="font-bold text-white">

      {usuarioLogado.nome}

    </p>

  </div>

  <button

    onClick={onLogout}

    className="bg-red-100 hover:bg-red-200 text-red-600 px-4 py-2 rounded-2xl text-sm font-semibold transition-all duration-300 shadow-sm"

  >

    Sair

  </button>

</div>

        </div>

      </header>

      {/* DASHBOARD ADMIN */}

      {usuarioLogado.role === 'admin' && (

        <div className="max-w-7xl mx-auto p-6 pb-0">

          <div className="flex flex-col md:flex-row gap-4 mb-6">

  <div className="flex flex-col">

    <label className="text-sm font-semibold text-slate-600 mb-1">

      De

    </label>

    <input
      type="date"
      value={dataInicio}
      onChange={(e) => setDataInicio(e.target.value)}
      className="bg-white border border-slate-300 rounded-2xl px-4 py-3 shadow-sm md:w-64"
    />

  </div>

  <div className="flex flex-col">

    <label className="text-sm font-semibold text-slate-600 mb-1">

      Até

    </label>

    <input
      type="date"
      value={dataFim}
      onChange={(e) => setDataFim(e.target.value)}
      className="bg-white border border-slate-300 rounded-2xl px-4 py-3 shadow-sm"
    />

  </div>
  <select
  value={filtroStatus}
  onChange={(e) => setFiltroStatus(e.target.value)}
  className="bg-white border border-slate-300 rounded-2xl px-4 py-3 shadow-sm"
>

  <option value="">Todos Status</option>

  <option>Carregado</option>

  <option>Não Carregado</option>

  <option>Pendente</option>

</select>

<select
  value={filtroOperador}
  onChange={(e) => setFiltroOperador(e.target.value)}
  className="bg-white border border-slate-300 rounded-2xl px-4 py-3 shadow-sm"
>

  <option value="">Todos Operadores</option>

  {[...new Set(registros.map((r) => r.operador))].map((operador) => (

    <option key={operador}>

      {operador}

    </option>

  ))}

</select>

</div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">

              <p className="text-slate-500 text-sm">

                Total Concluídos

              </p>

              <h2 className="text-4xl font-bold text-green-600 mt-2">

                {totalConcluidos}

              </h2>

            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">

              <p className="text-slate-500 text-sm">

                Total Pendentes

              </p>

              <h2 className="text-4xl font-bold text-yellow-500 mt-2">

                {totalPendentes}

              </h2>
              

            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">

              <p className="text-slate-500 text-sm">

                Total Registos

              </p>

              <h2 className="text-4xl font-bold text-blue-600 mt-2">

                {registrosFiltrados.length}

              </h2>

            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">

  <p className="text-slate-500 text-sm">

    Não Carregados

  </p>

  <h2 className="text-4xl font-bold text-red-600 mt-2">

    {totalNaoCarregados}

  </h2>

</div>

          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mt-6">

            <h2 className="text-2xl font-bold text-slate-800 mb-6">

              Produtividade Operadores

            </h2>

            <div className="space-y-4">

              {Object.entries(produtividade).map(

                ([nome, total]: any) => (

                  <div
                    key={nome}
                    className="flex items-center justify-between bg-slate-50 rounded-xl p-4"
                  >

                    <span className="font-semibold text-slate-700">

                      {nome}

                    </span>

                    <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-bold">

                      {total} caminhões

                    </span>

                  </div>

                )

              )}

            </div>

          </div>

        </div>

      )}

      {/* CONTENT */}

      <main className="max-w-7xl mx-auto p-6">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* FORM */}

          <div>

            <RegistroForm
              adicionarRegistro={adicionarRegistro}
              usuarioLogado={usuarioLogado}
            />

          </div>

          {/* TABLE */}

          <div className="lg:col-span-2">

            <RegistroTable
             registros={registrosFiltrados}
              usuarioLogado={usuarioLogado}
            />

          </div>

        </div>

      </main>

    </div>

  );

}