import "./App.css";
import Document from "./components/document";
import Form from "./components/form";
import Logo from "./components/logo";

function App() {
  return (
    <div className="App">
      <Logo />
      <Form />
      <Document />
      <Logo />
    </div>
  );
}

export default App;
