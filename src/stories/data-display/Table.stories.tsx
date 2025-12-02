import "../../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  TableBase,
  TableHeaderBase,
  TableBodyBase,
  TableFooterBase,
  TableHeadBase,
  TableRowBase,
  TableCellBase,
  TableCaptionBase,
} from "../components/ui/layout/TableBase";

const meta: Meta<typeof TableBase> = {
  title: "data/Table",
  component: TableBase,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Table para exibição de dados tabulares, listas e relatórios.",
      },
      source: {
        code: `import {
  TableBase,
  TableHeaderBase,
  TableBodyBase,
  TableFooterBase,
  TableHeadBase,
  TableRowBase,
  TableCellBase,
  TableCaptionBase,
} from '@mlw-packages/react-components';

export default function Example() {
  return (
    <TableBase>
      <TableCaptionBase>Exemplo de tabela</TableCaptionBase>
      <TableHeaderBase>
        <TableRowBase>
          <TableHeadBase>Header 1</TableHeadBase>
          <TableHeadBase>Header 2</TableHeadBase>
          <TableHeadBase>Header 3</TableHeadBase>
        </TableRowBase>
      </TableHeaderBase>
      <TableBodyBase>
        <TableRowBase>
          <TableCellBase>Row 1, Col 1</TableCellBase>
          <TableCellBase>Row 1, Col 2</TableCellBase>
          <TableCellBase>Row 1, Col 3</TableCellBase>
        </TableRowBase>
      </TableBodyBase>
    </TableBase>
  );
}`,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#f6f6f6" },
        { name: "dark", value: "#222" },
      ],
    },
    layout: "centered",
  },
};
export default meta;

type Story = StoryObj<typeof TableBase>;

export const TabelaSimples: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { TableBase, TableHeaderBase, TableBodyBase, TableRowBase, TableHeadBase, TableCellBase, TableCaptionBase } from '@mlw-packages/react-components';

<TableBase>
  <TableCaptionBase>Exemplo de tabela simples</TableCaptionBase>
  <TableHeaderBase>
    <TableRowBase>
      <TableHeadBase>Header 1</TableHeadBase>
      <TableHeadBase>Header 2</TableHeadBase>
      <TableHeadBase>Header 3</TableHeadBase>
    </TableRowBase>
  </TableHeaderBase>
  <TableBodyBase>
    <TableRowBase>
      <TableCellBase>Row 1, Col 1</TableCellBase>
      <TableCellBase>Row 1, Col 2</TableCellBase>
      <TableCellBase>Row 1, Col 3</TableCellBase>
    </TableRowBase>
  </TableBodyBase>
</TableBase>`,
      },
    },
  },
  render: () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "32px 0",
      }}
    >
      <div style={{ width: 600 }}>
        <TableBase>
          <TableCaptionBase>Exemplo de tabela simples</TableCaptionBase>
          <TableHeaderBase>
            <TableRowBase>
              <TableHeadBase>Header 1</TableHeadBase>
              <TableHeadBase>Header 2</TableHeadBase>
              <TableHeadBase>Header 3</TableHeadBase>
            </TableRowBase>
          </TableHeaderBase>
          <TableBodyBase>
            <TableRowBase>
              <TableCellBase>Row 1, Col 1</TableCellBase>
              <TableCellBase>Row 1, Col 2</TableCellBase>
              <TableCellBase>Row 1, Col 3</TableCellBase>
            </TableRowBase>
            <TableRowBase>
              <TableCellBase>Row 2, Col 1</TableCellBase>
              <TableCellBase>Row 2, Col 2</TableCellBase>
              <TableCellBase>Row 2, Col 3</TableCellBase>
            </TableRowBase>
          </TableBodyBase>
          <TableFooterBase>
            <TableRowBase>
              <TableCellBase colSpan={3}>Rodapé da tabela</TableCellBase>
            </TableRowBase>
          </TableFooterBase>
        </TableBase>
      </div>
    </div>
  ),
};

export const ComAcoes: Story = {
  name: "Com Ações",
  parameters: {
    docs: {
      description: { story: "Tabela com coluna de ações (editar/remover)." },
      source: {
        code: `import { TableBase, TableBodyBase, TableRowBase, TableCellBase } from '@mlw-packages/react-components';

function Example() {
  return (
    <TableBase>
      <TableBodyBase>
        <TableRowBase>
          <TableCellBase>Item 1</TableCellBase>
          <TableCellBase><button>Edit</button></TableCellBase>
        </TableRowBase>
      </TableBodyBase>
    </TableBase>
  );
}`,
      },
    },
  },
  render: TabelaSimples.render,
};

export const Ordenavel: Story = {
  name: "Ordenável",
  parameters: {
    docs: {
      description: {
        story: "Tabela com cabeçalho clicável para ordenar colunas.",
      },
      source: {
        code: `import { TableBase, TableHeaderBase, TableRowBase, TableHeadBase } from '@mlw-packages/react-components';

// Cabeçalhos com handlers de ordenação devem usar onClick e estado externo.`,
      },
    },
  },
  render: TabelaSimples.render,
};
