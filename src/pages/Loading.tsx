import { LoadingBase, LoadingVariant } from "../components/ui/LoadingBase";

const variants: LoadingVariant[] = [
  "spinner",
  "pulse",
  "dots",
  "grid",
  "dual-ring",
  "orbit",
  "skeleton",
];

function VariantDemo() {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {variants.map((variant) => (
          <div
            key={variant}
            className="flex flex-col items-center gap-4 p-4 rounded-lg bg-card shadow"
          >
            <span className="text-lg font-semibold mb-2 capitalize">
              {variant}
            </span>
            <LoadingBase size={48} variant={variant} />
            <span className="text-xs text-muted-foreground">
              Exemplo padrão
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function SizeDemo() {
  return (
    <section>
      <h2 className="text-xl font-bold mb-4 mt-8">Tamanhos</h2>
      <div className="flex gap-8 flex-wrap">
        {[24, 48, 72, 96].map((size) => (
          <div key={size} className="flex flex-col items-center gap-2">
            <LoadingBase size={size} />
            <span className="text-xs text-muted-foreground">{size}px</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function ButtonDemo() {
  return (
    <section className="mt-8">
      <h2 className="text-xl font-bold mb-4">Em Botões</h2>
      <div className="flex gap-4 flex-wrap">
        <button className="px-4 py-2 rounded bg-primary text-white flex items-center gap-2">
          <LoadingBase size={20} />
          Carregando
        </button>
        <button
          className="px-4 py-2 rounded bg-muted text-muted-foreground flex items-center gap-2"
          disabled
        >
          <LoadingBase size={20} variant="dots" />
          Processando
        </button>
      </div>
    </section>
  );
}

function CardDemo() {
  return (
    <section className="mt-8">
      <h2 className="text-xl font-bold mb-4">Em Cards</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-card rounded-lg shadow p-6 flex flex-col gap-4 items-center">
          <span className="font-semibold">Carregando dados do usuário</span>
          <LoadingBase size={32} variant="pulse" />
        </div>
        <div className="bg-card rounded-lg shadow p-6 flex flex-col gap-4 items-center">
          <span className="font-semibold">Carregando gráfico</span>
          <LoadingBase size={32} variant="grid" />
        </div>
      </div>
    </section>
  );
}

function ListDemo() {
  return (
    <section className="mt-8">
      <h2 className="text-xl font-bold mb-4">Em Listas</h2>
      <ul className="space-y-4">
        {[1, 2, 3].map((i) => (
          <li key={i} className="flex items-center gap-4">
            <LoadingBase size={20} variant="skeleton" />
            <span className="text-muted-foreground">
              Carregando item {i}...
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function OverlayDemo() {
  return (
    <section className="mt-8">
      <h2 className="text-xl font-bold mb-4">Overlay/Fullscreen</h2>
      <div className="relative h-40 bg-muted rounded-lg flex items-center justify-center">
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-10">
          <LoadingBase size={64} variant="dual-ring" />
        </div>
        <span className="relative z-20 text-white font-semibold">
          Carregando conteúdo...
        </span>
      </div>
    </section>
  );
}

export default function LoadingPage() {
  return (
    <div className="flex flex-col p-8 gap-8">
      <h1 className="text-3xl font-bold mb-4">Loading</h1>

      <VariantDemo />
      <SizeDemo />
      <ButtonDemo />
      <CardDemo />
      <ListDemo />
      <OverlayDemo />
    </div>
  );
}
