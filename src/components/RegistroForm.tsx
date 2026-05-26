import { useState } from 'react';

type Props = {
  adicionarRegistro: (registro: any) => void;
  usuarioLogado: any;
};

export default function RegistroForm({
  adicionarRegistro,
  usuarioLogado
}: Props) {

  const [placa, setPlaca] = useState('');
  const [oc, setOc] = useState('');
  const [status, setStatus] = useState('Concluído');
  const [observacao, setObservacao] = useState('');
  const [imagem, setImagem] = useState('');

  const handleSubmit = (e: any) => {

    e.preventDefault();

    adicionarRegistro({

      operador: usuarioLogado.nome,

      placa,
      oc,
      status,
      observacao,
      imagem

    });

    setPlaca('');
    setOc('');
    setStatus('Concluído');
    setObservacao('');
    setImagem('');

  };

  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/40 p-6 hover:shadow-2xl transition-all duration-300"
    >

      <div className="space-y-5">

        {/* PLACA */}

        <div>

          <label className="block text-sm font-semibold text-slate-700 mb-2">

            Matrícula (Placa)

          </label>

  <input
  type="text"
  value={placa}
  onChange={(e) =>

    setPlaca(e.target.value.toUpperCase())

  }
  placeholder="ABC-1234"
            className="w-full p-4 bg-white/70 border border-white/50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all duration-300 focus:shadow-lg uppercase"
          />

        </div>

        {/* OC */}

        <div>

          <label className="block text-sm font-semibold text-slate-700 mb-2">

            Ordem de Carregamento (OC)

          </label>

          <input
            type="text"
            value={oc}
            onChange={(e) => setOc(e.target.value)}
            placeholder="Nº da OC"
            className="w-full p-4 bg-white/70 border border-white/50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all duration-300 focus:shadow-lg"
          />

        </div>

        {/* STATUS */}

        <div>

          <label className="block text-sm font-semibold text-slate-700 mb-2">

            Status

          </label>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-4 bg-white/70 border border-white/50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all duration-300 focus:shadow-lg"
          >

            <option>Concluído</option>
            <option>Pendente</option>

          </select>

        </div>

        {/* OBS */}

        <div>

          <label className="block text-sm font-semibold text-slate-700 mb-2">

            Observação

          </label>

          <textarea
            rows={4}
            value={observacao}
            onChange={(e) => setObservacao(e.target.value)}
            placeholder="Ex: caminhão veio sujo..."
            className="w-full p-4 bg-white/70 border border-white/50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all duration-300 focus:shadow-lg"
          />

        </div>

        {/* FOTO */}

        <div>

          <label className="block text-sm font-semibold text-slate-700 mb-2">

            Foto do Caminhão

          </label>

          <label className="border-2 border-dashed border-slate-300 rounded-3xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-all duration-300">

            <div className="text-5xl mb-4">

              📷

            </div>

            <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-xl font-semibold">

              Carregar fotografia

            </span>

            <span className="text-sm text-slate-500 mt-3">

              PNG, JPG até 10MB

            </span>

            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e: any) => {

                const file = e.target.files[0];

                if (!file) return;

                const reader = new FileReader();

                reader.onloadend = () => {

                  const img = new Image();

                  img.src = reader.result as string;

                  img.onload = () => {

                    const canvas = document.createElement('canvas');

                    const maxWidth = 600;

                    const scaleSize = maxWidth / img.width;

                    canvas.width = maxWidth;

                    canvas.height = img.height * scaleSize;

                    const ctx = canvas.getContext('2d');

                    ctx?.drawImage(
                      img,
                      0,
                      0,
                      canvas.width,
                      canvas.height
                    );

                    const compressedBase64 = canvas.toDataURL(
                      'image/jpeg',
                      0.7
                    );

                    setImagem(compressedBase64);

                  };

                };

                reader.readAsDataURL(file);

              }}
            />

          </label>

          {imagem && (

            <div className="mt-4 flex flex-col items-center animate-pulse">

              <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold text-sm">

                ✅ Fotografia carregada

              </div>

              <img
                src={imagem}
                className="mt-4 w-40 h-40 object-cover rounded-3xl border border-slate-200 shadow-lg"
              />

            </div>

          )}

        </div>

        {/* BOTÃO */}

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 hover:scale-[1.02] text-white font-bold py-4 rounded-2xl transition-all duration-300 shadow-lg"
        >

          Guardar Expedição

        </button>

      </div>

    </form>

  );

}