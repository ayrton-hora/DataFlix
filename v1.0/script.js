function validaUsuario() {
  
  let usuario = document.getElementById("floatingInput").value
  let senha = document.getElementById("floatingPassword").value

  // Parte da autenticação
  // Verifica no B.D
  /* Se der erro na hora da autenticação

  alert("Senha ou email incorretos, tente novamente") */

  window.location.replace("home.html")
}
