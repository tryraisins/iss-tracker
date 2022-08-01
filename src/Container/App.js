import Content from "./Content";

const App = () => {
  return (
    <div className='container'>
      <div
        className='row align-items-center justify-content-center text-center text-dark '
        style={{ minHeight: "100vh" }}
      >
        <Content />
      </div>
    </div>
  );
};

export default App;
