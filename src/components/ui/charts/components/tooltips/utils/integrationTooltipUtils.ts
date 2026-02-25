export interface Node {
  identity: number;
  labels: string[];
  properties: {
    nome: string;
    [key: string]: string;
  };
  elementId: string;
}


export interface IntegrationProps {
  tipo?: string;
  Tipo?: string;
  Setor?: string;
  Destino?: string;
  Contato?: string;
  Ambiente?: string;
  Nome?: string;
  Protocolos?: string;
  Sustentacao?: string;
  Origem?: string;
  [key: string]: string | undefined;
}


export interface Relationship {
  identity: number;
  start: number;
  end: number;
  type: string;
  properties: IntegrationProps;
  elementId: string;
  startNodeElementId: string;
  endNodeElementId: string;
}


export interface Integration {
  origem: Node;
  r: Relationship;
  destino: Node;
}


export interface IntegrationConnection {
  id: string;
  name: string;
  type: "entrada" | "saida";
  status?: "active" | "inactive" | "warning";
  integration?: IntegrationProps;
}


export interface IntegrationData {
  name: string;
  description?: string;
  connections: IntegrationConnection[];
}


export function processIntegrationData(
  integrations: Integration[],
  targetSystemName: string,
): IntegrationData {
  const connections: IntegrationConnection[] = [];


  integrations.forEach((integration) => {
    const origemNome = integration.origem.properties.nome;
    const destinoNome = integration.destino.properties.nome;


    if (origemNome === targetSystemName) {
      connections.push({
        id: integration.r.elementId,
        name: destinoNome,
        type: "saida",
        integration: integration.r.properties,
      });
    }


    if (destinoNome === targetSystemName) {
      connections.push({
        id: integration.r.elementId,
        name: origemNome,
        type: "entrada",
        integration: integration.r.properties,
      });
    }
  });


  return {
    name: targetSystemName,
    connections,
  };
}

