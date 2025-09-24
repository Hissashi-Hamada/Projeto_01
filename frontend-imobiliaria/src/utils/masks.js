// Funções de máscara com proteção contra valores não-string

export const maskCPF = (value) => {
  let val = String(value ?? '');            // <-- garante string
  val = val.replace(/\D/g, '').slice(0, 11);
  val = val.replace(/(\d{3})(\d)/, '$1.$2');
  val = val.replace(/(\d{3})(\d)/, '$1.$2');
  val = val.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  return val;
};

export const maskPhone = (value) => {
  let val = String(value ?? '');
  val = val.replace(/\D/g, '').slice(0, 11);
  if (val.length > 10) {
    val = val.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  } else {
    val = val.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
  }
  return val;
};

export const maskDate = (value) => {
  let val = String(value ?? '');

  // Se vier de <input type="date">, o formato é YYYY-MM-DD. Converte para DD/MM/AAAA.
  if (/^\d{4}-\d{2}-\d{2}$/.test(val)) {
    const [yyyy, mm, dd] = val.split('-');
    return `${dd}/${mm}/${yyyy}`;
  }

  // Máscara DD/MM/AAAA para texto livre
  val = val.replace(/\D/g, '');
  if (val.length > 2) val = val.slice(0, 2) + '/' + val.slice(2);
  if (val.length > 5) val = val.slice(0, 5) + '/' + val.slice(5, 9);
  return val;
};
