"use client";

import Timeline from "@/components/timeline/Timeline";

const sampleItems = [
  {
    id: 1,
    date: "2025-01-20",
    title: "Pedido Criado",
    subtitle: "O cliente iniciou um novo pedido de compra online.",
    dateColor: "#3b82f6",
    details: [
      { label: "Canal", value: "E-commerce" },
      { label: "ID do Pedido", value: "PED-1025A" },
    ],
  },
  {
    id: 2,
    date: "2025-02-15",
    title: "Pagamento Aprovado",
    subtitle: "Pagamento via cartão de crédito foi confirmado com sucesso.",
    dateColor: "#22c55e",
    details: [{ label: "Valor", value: "R$ 259,90" }],
  },
  {
    id: 3,
    date: "2025-03-05",
    title: "Produto em Separação",
    subtitle: "O item está sendo separado no nosso centro de distribuição em Jaraguá do Sul.",
    dateColor: "#f97316", 
  },
  {
    id: 4,
    date: "2025-03-10",
    title: "Enviado para Transportadora",
    subtitle: "O pacote foi coletado pela transportadora e está a caminho do seu endereço. Este é um subtítulo bem mais longo para testar como o componente lida com quebras de linha e excesso de texto.",
    dateColor: "#a855f7", 
    details: [
      { label: "Transportadora", value: "LogiExpress" },
      { label: "Cód. Rastreio", value: "LE123456789BR" },
    ],
  },
  {
    id: 5,
    date: "2025-03-18",
    title: "Entrega Realizada",
    subtitle: "Seu pedido foi entregue com sucesso!",
    dateColor: "#14b8a6", 
  },
  {
    id: 6,
    date: "2025-04-02",
    title: "Feedback do Cliente",
    subtitle: "O cliente avaliou a compra.",
    dateColor: "#facc15",
    details: [{ label: "Avaliação", value: "★★★★★" }],
  },
];

export default function TimelinePage() {
  return (
    <main className="p-8">
      <Timeline items={sampleItems} />
    </main>
  );
}