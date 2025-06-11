# @malwee/react-components

Uma biblioteca de componentes React reutilizáveis para acelerar o desenvolvimento de aplicações web com design consistente, acessível e moderno.

## Instalação

```bash
npm install @malwee/react-components
# ou
yarn add @malwee/react-components
```

## Uso Básico

```tsx
import { ButtonBase, CardBase } from '@malwee/react-components';

function App() {
  return (
    <CardBase>
      <ButtonBase>Meu botão</ButtonBase>
    </CardBase>
  );
}
```

## Componentes Disponíveis

- Botões (`ButtonBase`)
- Cartões (`CardBase`)
- Inputs, Selects, Combobox, Checkbox, Switch, Tabs, Table, Tooltip, Dialog, Drawer, Sidebar, Avatar, Calendar, Carousel, Progress, Skeleton, Sonner, e outros.

Veja a lista completa na pasta `src/components/ui` ou exemplos em `src/pages`.

## Estilos

Os componentes utilizam Tailwind CSS. Certifique-se de que seu projeto está configurado para usar Tailwind. Importe o CSS global:

```tsx
import '@malwee/react-components/style/global.css';
```

## Documentação

Consulte exemplos de uso e documentação dos componentes na pasta `src/pages`.

## Contribuição

Contribuições são bem-vindas! Abra uma issue ou envie um pull request.

## Licença

MIT
