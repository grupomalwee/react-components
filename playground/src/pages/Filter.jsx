// import { useState } from "react";
// import FilterDialog from "@lib";

// /**
//  * Página de filtros que exibe um diálogo para aplicar filtros baseados em condições específicas como "Nome", "Marca", "Cidade", "Showroom" e "Preço".
//  * O componente `FilterDialog` é usado para apresentar os filtros e suas respectivas condições ao usuário.
//  *
//  * @component
//  * @example
//  * ```jsx
//  * <FilterPage />
//  * ```
//  */
// export default function FilterPage() {
//   const [availableFilters] = useState([
//     {
//       filterId: "nome",
//       filterName: "Nome",
//       conditions: [
//         {
//           conditionId: "$eq",
//           conditionName: "Igual a",
//           valueType: "string",
//           selectValues: [],
//         },
//         {
//           conditionId: "$ne",
//           conditionName: "Diferente de",
//           valueType: "string",
//           selectValues: [],
//         },
//       ],
//     },
//     {
//       filterId: "marca",
//       filterName: "Marca",
//       conditions: [
//         {
//           conditionId: "$eq",
//           conditionName: "Igual a",
//           valueType: "select",
//           selectValues: [
//             { label: "Apple", value: "Apple" },
//             { label: "Samsung", value: "Samsung" },
//             { label: "LG", value: "LG" },
//             { label: "Sony", value: "Sony" },
//             { label: "Motorola", value: "Motorola" },
//           ],
//         },
//         {
//           conditionId: "$ne",
//           conditionName: "Diferente de",
//           valueType: "select",
//           selectValues: [
//             { label: "Apple", value: "Apple" },
//             { label: "Samsung", value: "Samsung" },
//             { label: "LG", value: "LG" },
//             { label: "Sony", value: "Sony" },
//             { label: "Motorola", value: "Motorola" },
//           ],
//         },
//       ],
//     },
//     {
//       filterId: "cidade",
//       filterName: "Cidade",
//       conditions: [
//         {
//           conditionId: "$eq",
//           conditionName: "Igual a",
//           valueType: "string",
//           selectValues: [],
//         },
//         {
//           conditionId: "$ne",
//           conditionName: "Diferente de",
//           valueType: "string",
//           selectValues: [],
//         },
//       ],
//     },
//     {
//       filterId: "showroom",
//       filterName: "Showroom",
//       conditions: [
//         {
//           conditionId: "$eq",
//           conditionName: "Igual a",
//           valueType: "string",
//           selectValues: [],
//         },
//         {
//           conditionId: "$ne",
//           conditionName: "Diferente de",
//           valueType: "string",
//           selectValues: [],
//         },
//       ],
//     },
//     {
//       filterId: "preco",
//       filterName: "Preço",
//       conditions: [
//         {
//           conditionId: "$gt",
//           conditionName: "Maior que",
//           valueType: "number",
//           selectValues: [],
//         },
//         {
//           conditionId: "$lt",
//           conditionName: "Menor que",
//           valueType: "number",
//           selectValues: [],
//         },
//         {
//           conditionId: "$gte",
//           conditionName: "Maior ou igual a",
//           valueType: "number",
//           selectValues: [],
//         },
//         {
//           conditionId: "$lte",
//           conditionName: "Menor ou igual a",
//           valueType: "number",
//           selectValues: [],
//         },
//       ],
//     },
//   ]);

//   return (
//     <div className="flex flex-col gap-4">
//       <FilterDialog availableFilters={availableFilters} />

//       <div className="my-8 mx-5">
//         <h3 className="text-xl font-semibold mb-3">Documentação</h3>
//         <div className="border-t-2 border-gray-300 mb-4"></div>

//         <div className="bg-gray-800 text-white p-4 rounded-md mb-4">
//           <h5 className="font-medium mb-2">Como importar:</h5>
//           <pre className="bg-gray-900 p-3 rounded-sm">
//             <code>
//               {`import { useState } from "react";
// import FilterDialog from "@/components/ui/FilterBase";
// import {
//   AvailableFilter,
//   FilterConditions,
//   SelectItem,
// } from "@/filter/services/types";`}
//             </code>
//           </pre>
//         </div>

//         <div className="bg-gray-800 text-white p-4 rounded-md">
//           <h5 className="font-medium mb-2">Como usar:</h5>
//           <pre className="bg-gray-900 p-3 rounded-sm">
//             <code>{`<FilterPage />`}</code>
//           </pre>
//         </div>
//       </div>
//     </div>
//   );
// }
