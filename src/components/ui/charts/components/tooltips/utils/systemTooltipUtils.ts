// Tipos para dados do Neo4j
export interface Neo4jNode {
  identity: number;
  labels: string[];
  properties: {
    nome: string;
  };
  elementId: string;
}

export interface IntegrationProperties {
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
}

export interface Neo4jRelationship {
  identity: number;
  start: number;
  end: number;
  type: string;
  properties: IntegrationProperties;
  elementId: string;
  startNodeElementId: string;
  endNodeElementId: string;
}

export interface Neo4jIntegration {
  origem: Neo4jNode;
  r: Neo4jRelationship;
  destino: Neo4jNode;
}

export interface Connection {
  id: string;
  name: string;
  type: "entrada" | "saida";
  status?: "active" | "inactive" | "warning";
  integration?: IntegrationProperties;
}

export interface SystemData {
  name: string;
  description?: string;
  connections: Connection[];
}

export function processNeo4jData(
  integrations: Neo4jIntegration[],
  targetSystemName: string,
): SystemData {
  const connections: Connection[] = [];

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
