function Prose() {
  return (
    <div className="prose">
      <header lang="en">Custom Vite Templete</header>
      <main>
        <section>
          <h2>React 프로젝트 시작을 위한 사용자 정의 템플릿</h2>
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
