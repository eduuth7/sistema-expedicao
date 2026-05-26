import { useState } from 'react';

import {
  deleteDoc,
  doc
} from 'firebase/firestore';

import { db } from '../firebase';

type Props = {
  registros: any[];
  usuarioLogado: any;
};

export default function RegistroTable({
  registros,
  usuarioLogado
}: Props) {

  const [imagemModal, setImagemModal] = useState('');

  const exportarCSV = () => {

    const linhas = [

      [
        'Operador',
        'Placa',
        'OC',
        'Status',
        'ISCA',
        'LONA',
        'Observação',
        'Data'
      ],

      ...registros.map((registro) => [

        registro.operador,
        registro.placa,
        registro.oc,
        registro.status,
registro.isca,
registro.lona,
registro.observacao,



registro.createdAt
  ? registro.createdAt
      .toDate()
      .toLocaleString('pt-BR')
  : '--'

      ])

    ];

    const csvContent = linhas
      .map((linha) => linha.join(';'))
      .join('\n');

    const blob = new Blob(

      [csvContent],

      {
        type: 'text/csv;charset=utf-8;'
      }

    );

    const link = document.createElement('a');

    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);

    link.setAttribute(
      'download',
      'relatorio-expedicao.csv'
    );

    link.style.visibility = 'hidden';

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

  };

  return (

    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/40 p-6 hover:shadow-2xl transition-all duration-300">

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-xl font-bold text-slate-800">

          Registos Recentes

        </h2>

        <button
          onClick={exportarCSV}
          className="bg-green-600 hover:bg-green-700 hover:scale-105 text-white px-4 py-2 rounded-2xl transition-all duration-300 shadow-lg"
        >

          Exportar CSV

        </button>

      </div>

      <div className="overflow-x-auto w-full">

        <table className="min-w-[1200px]">

          <thead>

            <tr className="border-b border-slate-200 text-left">

             <th className="py-3">Foto</th>
              <th className="py-3">Operador</th>
              <th className="py-3">Placa</th>
              <th className="py-3">OC</th>
              <th className="py-3">Status</th>
              <th className="py-3 px-6 whitespace-nowrap text-center">

  ISCA

</th>

<th className="py-3 px-6 whitespace-nowrap text-center">

  LONA

</th>
              <th className="py-3 hidden md:table-cell">Observação</th>
              <th className="py-3 whitespace-nowrap">Data</th>
              <th className="py-3">Ações</th>

            </tr>

          </thead>

          <tbody>

            {registros.length === 0 && (

              <tr>

                <td
                  colSpan={7}
                  className="py-10 text-center text-slate-400"
                >

                  Nenhum registo ainda

                </td>

              </tr>

            )}

            {registros.map((registro, index) => (

              <tr
                key={index}
                className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors"
              >

                <td className="py-2">

                  {registro.imagem && (

                    <img
                      src={registro.imagem}
                      onClick={() => setImagemModal(registro.imagem)}
                      className="w-14 h-14 md:w-20 md:h-20 object-cover rounded-2xl border border-slate-200 cursor-pointer hover:scale-105 transition-transform shadow-sm"
                    />

                  )}

                </td>

                <td className="py-3 text-sm md:text-lg font-bold text-slate-700 whitespace-nowrap">
                  {registro.operador}

                </td>

                <td className="py-3 text-base md:text-lg font-bold text-slate-800 whitespace-nowrap">

                  {registro.placa}

                </td>

                <td className="font-medium text-slate-700">

                  {registro.oc}

                </td>

                <td>

  <span
    className={`px-3 py-2 rounded-full text-sm font-semibold shadow-sm ${
      registro.status === 'Concluído'
        ? 'bg-green-100 text-green-700'
        : 'bg-yellow-100 text-yellow-700'
    }`}
  >

    {registro.status === 'Concluído'
      ? 'Concluído'
      : 'Pendente'}

  </span>

</td>

<td className="py-3 px-6 font-semibold text-slate-700 whitespace-nowrap text-center align-middle">

  {registro.isca}

</td>

<td className="py-3 px-6 font-semibold text-slate-700 whitespace-nowrap text-center align-middle">

  {registro.lona}

</td>

                <td className="text-slate-600 hidden md:table-cell">

                  {registro.observacao}

                </td>

                <td className="text-sm text-slate-600 whitespace-nowrap">

  {registro.createdAt
    ? registro.createdAt
        .toDate()
        .toLocaleString('pt-BR')
    : '--'}

</td>

<td>

  {(

    registro.operador === usuarioLogado.nome ||

    usuarioLogado.role === 'admin'

  ) &&  (

                    <button

                      onClick={async () => {

                        const confirmar = confirm(
                          'Deseja excluir este registo?'
                        );

                        if (!confirmar) return;

                        await deleteDoc(
                          doc(db, 'registros', registro.id)
                        );

                      }}

                      className="bg-red-100 hover:bg-red-200 hover:scale-105 text-red-600 px-3 py-2 rounded-xl font-bold transition-all duration-300 shadow-sm"
                    >

                      ✕
                    </button>

                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {imagemModal && (

        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6 backdrop-blur-sm"
          onClick={() => setImagemModal('')}
        >

          <img
            src={imagemModal}
            className="max-w-5xl max-h-[90vh] rounded-3xl shadow-2xl border border-white/20"
          />

        </div>

      )}

    </div>

  );

}