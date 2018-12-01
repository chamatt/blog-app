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
  const secaoblog = document.querySelector("section.blog-container"); // Seleciona o elemento do DOM

  axios.get("http://localhost:3000/posts").then(resposta => {
    const ListaDePosts = resposta.data.map(post =>
      PostTemplate(post.title, post.body, post.image, post.id)
    ); // Faz uma Array com os posts no formato do template
    let PostsJuntos = ListaDePosts.reverse().join(); // Junta todos os posts em uma string só
    if (ListaDePosts.length == 0)
      PostsJuntos = `<div class="alert alert-info" role="alert">
      Nenhum post! Crie um novo!
    </div>`;
    secaoblog.innerHTML = PostsJuntos; // Insere a string dentro da seção dos posts
  });
}

const formulario = document.querySelector("form");

formulario.addEventListener("submit", event => {
  event.preventDefault(); //Previne a atualização da pagina após enviar o formulário
  const dadosDoFormulario = {
    title: formulario.children.title.value,
    body: formulario.children.body.value,
    image: formulario.children.image.value
  }; // Pega os dados do formulário
  EnviarPost(dadosDoFormulario); // Chama a função que vai realizar a requisição
});

function EnviarPost(dadosDoFormulario) {
  axios
    .post("http://localhost:3000/posts", dadosDoFormulario)
    .then(() => ObterPosts())
    .catch(e => console.log(e));
}

function DeletarPost(elemento) {
  const post = elemento.parentNode.parentNode.parentNode;
  const id = post.dataset.postId;
  axios.delete(`http://localhost:3000/posts/${id}`).then(() => ObterPosts());
}
