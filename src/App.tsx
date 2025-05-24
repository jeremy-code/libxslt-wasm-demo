const App = () => {
  return (
    <>
      <header className="border-b">
        <div className="container flex items-center justify-center py-4">
          libxslt-wasm-demo
        </div>
      </header>
      <main className="container my-4">
        <p>{`libxslt-wasm-demo v. ${__LIBXSLT_WASM_VERSION__}`}</p>
      </main>
      <footer className="grid place-content-center border-t">
        <div className="container py-4">
          <p>{"Made with ❤️ by Jeremy"}</p>
        </div>
      </footer>
    </>
  );
};

export default App;
