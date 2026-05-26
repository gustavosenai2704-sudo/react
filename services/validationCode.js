export const CADASTRO_VALIDATION_CODE = "123456";

export function validarCodigoCadastro(codigo) {
  return codigo.trim() === CADASTRO_VALIDATION_CODE;
}
