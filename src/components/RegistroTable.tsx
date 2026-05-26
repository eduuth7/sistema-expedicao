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
        'Observação'
      ],

      ...registros.map((registro) => [

        registro.operador,
        registro.placa,
        registro.oc,
        registro.status,
        registro.observacao

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

    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-xl font-bold text-slate-800">

          Registos Recentes

        </h2>

        <button
          onClick={exportarCSV}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
        >

          Exportar CSV

        </button>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b border-slate-200 text-left">

              <th className="py-3">Foto</th>
              <th className="py-3">Operador</th>
              <th className="py-3">Placa</th>
              <th className="py-3">OC</th>
              <th className="py-3">Status</th>
              <th className="py-3">Observação</th>
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
                className="border-b border-slate-100"
              >

                <td className="py-4">

                  {registro.imagem && (

                    <img
                      src={registro.imagem}
                      onClick={() => setImagemModal(registro.imagem)}
                      className="w-16 h-16 object-cover rounded-xl border border-slate-200 cursor-pointer hover:scale-105 transition-transform"
                    />

                  )}

                </td>

                <td className="py-4 font-semibold text-slate-700">

                  {registro.operador}

                </td>

                <td className="py-4 font-semibold">

                  {registro.placa}

                </td>

                <td>

                  {registro.oc}

                </td>

                <td>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      registro.status === 'Concluído'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >

                    {registro.status}

                  </span>

                </td>

                <td className="text-slate-600">

                  {registro.observacao}

                </td>

                <td>

                  {(

                    registro.operador === usuarioLogado.nome ||

                    usuarioLogado.role === 'admin'

                  ) && (

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

                      className="bg-red-100 hover:bg-red-200 text-red-600 px-3 py-2 rounded-lg font-bold transition-colors"
                    >

                      X

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
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6"
          onClick={() => setImagemModal('')}
        >

          <img
            src={imagemModal}
            className="max-w-5xl max-h-[90vh] rounded-2xl shadow-2xl"
          />

        </div>

      )}

    </div>

  );

}