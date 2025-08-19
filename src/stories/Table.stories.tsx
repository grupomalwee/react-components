import "../style/global.css";
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  TableBase,
  TableHeaderBase,
  TableBodyBase,
  TableFooterBase,
  TableHeadBase,
  TableRowBase,
  TableCellBase,
  TableCaptionBase,
} from '../components/ui/TableBase';

const meta: Meta<typeof TableBase> = {
  title: 'data/Table',
  component: TableBase,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Table para exibição de dados tabulares, listas e relatórios.'
      }
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f6f6f6' },
        { name: 'dark', value: '#222' }
      ]
    },
    layout: 'centered',
  },
};
export default meta;


type Story = StoryObj<typeof TableBase>;

export const TabelaSimples: Story = {
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '32px 0' }}>
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
