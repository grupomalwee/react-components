"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TableBase, TableHeaderBase, TableBodyBase, TableFooterBase, TableHeadBase, TableRowBase, TableCellBase, TableCaptionBase, } from "@/components/ui/TableBase";
export const TablePage = () => {
    return (_jsxs("div", { children: [_jsx("div", { className: "mt-5 ml-5 flex gap-5 p-3 rounded-sm", children: _jsxs(TableBase, { children: [_jsx(TableCaptionBase, { children: "A simple table" }), _jsx(TableHeaderBase, { children: _jsxs(TableRowBase, { children: [_jsx(TableHeadBase, { children: "Header 1" }), _jsx(TableHeadBase, { children: "Header 2" }), _jsx(TableHeadBase, { children: "Header 3" })] }) }), _jsxs(TableBodyBase, { children: [_jsxs(TableRowBase, { children: [_jsx(TableCellBase, { children: "Row 1, Col 1" }), _jsx(TableCellBase, { children: "Row 1, Col 2" }), _jsx(TableCellBase, { children: "Row 1, Col 3" })] }), _jsxs(TableRowBase, { children: [_jsx(TableCellBase, { children: "Row 2, Col 1" }), _jsx(TableCellBase, { children: "Row 2, Col 2" }), _jsx(TableCellBase, { children: "Row 2, Col 3" })] })] }), _jsx(TableFooterBase, { children: _jsx(TableRowBase, { children: _jsx(TableCellBase, { colSpan: 3, children: "Footer content" }) }) })] }) }), _jsxs("div", { className: "my-8 mx-5", children: [_jsx("h3", { className: "text-xl font-semibold mb-3", children: "Documenta\u00E7\u00E3o" }), _jsx("div", { className: "border-t-2 border-gray-300 mb-4" }), _jsxs("div", { className: "bg-gray-800 text-white p-4 rounded-md mb-4", children: [_jsx("h5", { className: "font-medium mb-2", children: "Como importar:" }), _jsx("pre", { className: "bg-gray-900 p-3 rounded-sm", children: _jsx("code", { children: `import {
  TableBase,
  TableHeaderBase,
  TableBodyBase,
  TableFooterBase,
  TableHeadBase,
  TableRowBase,
  TableCellBase,
  TableCaptionBase,
} from "@/components/ui/TableBase";` }) })] }), _jsxs("div", { className: "bg-gray-800 text-white p-4 rounded-md", children: [_jsx("h5", { className: "font-medium mb-2", children: "Como usar:" }), _jsx("pre", { className: "bg-gray-900 p-3 rounded-sm", children: _jsx("code", { children: `<TableBase>
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
</TableBase>` }) })] })] })] }));
};
