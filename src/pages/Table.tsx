"use client";

import {
  TableBase,
  TableHeaderBase,
  TableBodyBase,
  TableFooterBase,
  TableHeadBase,
  TableRowBase,
  TableCellBase,
  TableCaptionBase,
} from "@/components/ui/layout/TableBase";

export const TablePage = () => {
  return (
    <div>
      {/* Table Example */}
      <div className="mt-5 ml-5 flex gap-5 p-3 rounded-sm">
        <TableBase>
          <TableCaptionBase>A simple table</TableCaptionBase>
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
              <TableCellBase colSpan={3}>Footer content</TableCellBase>
            </TableRowBase>
          </TableFooterBase>
        </TableBase>
      </div>

      {/* Documentation Section */}
      <div className="my-8 mx-5">
        <h3 className="text-xl font-semibold mb-3">Documentação</h3>
        <div className="border-t-2 border-gray-300 mb-4"></div>

        {/* Code Block for Importing */}
        <div className="bg-gray-800 text-white p-4 rounded-md mb-4">
          <h5 className="font-medium mb-2">Como importar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm">
            <code>
              {`import {
  TableBase,
  TableHeaderBase,
  TableBodyBase,
  TableFooterBase,
  TableHeadBase,
  TableRowBase,
  TableCellBase,
  TableCaptionBase,
} from "@/components/ui/TableBase";`}
            </code>
          </pre>
        </div>

        {/* Code Block for Usage */}
        <div className="bg-gray-800 text-white p-4 rounded-md">
          <h5 className="font-medium mb-2">Como usar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm">
            <code>
              {`<TableBase>
  <TableCaptionBase>A simple table</TableCaptionBase>
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
      <TableCellBase colSpan={3}>Footer content</TableCellBase>
    </TableRowBase>
  </TableFooterBase>
</TableBase>`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};
