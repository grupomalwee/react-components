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
};
export default meta;


type Story = StoryObj<typeof TableBase>;

export const TabelaSimples: Story = {
    
  
  render: () => (
    <div className="mt-5 ml-5 flex gap-5 p-3 rounded-sm">
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
  ),
};
