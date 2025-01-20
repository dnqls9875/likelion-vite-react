function Prose() {
  return (
    <div className="prose">
      <header lang="en">Custom Vite Templete</header>
      <main>
        <section>
          <h2 className="a11y-hidden">chip 컴포넌트</h2>
        </section>
      </main>
      <footer>
        <small lang="en">
          &copy; {new Date().getFullYear()} EUID. All rights reserved
        </small>
      </footer>
    </div>
  );
}

export default Prose;
