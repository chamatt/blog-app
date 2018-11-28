const formulario = document.querySelector("form");
const secaoblog = document.querySelector("section.blog-container");

window.onload = () => ObterPosts();

function PostTemplate(titulo, corpo, imagem, id) {
  return `<article class="blog-post-container" data-post-id="${id}">
        <div class="row">
          <div class="blog-post-image col-3">
            <img src="${imagem || "https://bit.ly/2So2zvB"}" alt="Erro"></img>
          </div>
          <div class="col-7">
            <div class="blog-post-title">${titulo}</div>
            <div class="blog-post-body">${corpo}</div>
          </div>
          <div class="col-2 d-flex align-items-center">
            <a style="color:white" class="btn btn-danger m-auto" onclick="DeletarPost(this)">X</a>
          </div>
        </div>
      </article>`;
}

function ObterPosts() {
  const listaDePosts = axios
    .get("http://localhost:3000/posts")
    .then(resposta => {
      console.log(resposta);
      const ListaDePosts = resposta.data.map(post =>
        PostTemplate(post.title, post.body, post.image, post.id)
      );
      const PostsJuntos = ListaDePosts.join();
      secaoblog.innerHTML = PostsJuntos;
    });
}

formulario.addEventListener("submit", event => {
  event.preventDefault(); //Previne a atualização da pagina após enviar o formulário
  const dadosDoFormulario = {
    title: formulario.children.title.value,
    body: formulario.children.body.value,
    image: formulario.children.image.value
  }; // Pega os dados do formulário
  console.log(dadosDoFormulario);
  EnviarPost(dadosDoFormulario); // Chama a função que vai realizar a requisição
});

function EnviarPost(dadosDoFormulario) {
  axios
    .post("http://localhost:3000/posts", dadosDoFormulario)
    .then(() => ObterPosts())
    .catch(e => console.log(e));
}

function DeletarPost(e) {
  const post = e.parentNode.parentNode.parentNode;
  const id = post.dataset.postId;
  axios.delete("http://localhost:3000/posts/" + id).then(() => ObterPosts());
}
