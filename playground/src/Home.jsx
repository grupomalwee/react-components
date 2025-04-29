import "./index.css";

export default function Home() {
  return (
    <div className="home-container">
      <div className="content-container">
        <h1 className="title">
          <strong>Bem-vindo à Biblioteca de Componentes React Malwee </strong>
        </h1>

        <p className="description">
          A <strong>Malwee React Components</strong> oferece uma coleção de
          componentes reutilizáveis e estilosos para acelerar o desenvolvimento
          da sua interface. Aproveite nossa biblioteca para criar interfaces
          rápidas, eficientes e com design moderno!
        </p>
      </div>

      <footer className="footer">
        <p className="footer-text">© 2025 Malwee. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
