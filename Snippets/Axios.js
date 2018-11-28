axios
  .get("https://jsonplaceholder.typicode.com/posts")
  .then(resposta => FuncaoQueSeraExecutada(resposta));

axios
  .post("https://jsonplaceholder.typicode.com/posts", {
    title: "titulo",
    body: "corpo do texto",
    userId: 1
  })
  .then(resposta => FuncaoQueSeraExecutada(resposta));
