// Example starter JavaScript for disabling form submissions if there are invalid fields
(function validaRegistro () {
  'use strict'
  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function(event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
          
        }
        form.classList.add('was-validated')
      }, false)
    })
} )()

function validarSenha(){
  var senha = document.getElementById("senha")
  var senha_confir = document.getElementById("senha_confir")
  if (senha.value != senha_confir.value) {
    alert("Senhas diferentes")
    return false
  }
  senha_confir.onchange = validarSenha
  return true
}
