const form = document.querySelector('form');
const resultado = document.querySelector('#resultado');

document.addEventListener('submit', (e) => {
	e.preventDefault();
});

const isValidBRCep = (cep) => {
	return /^[0-9]{8}$/.test(cep);
};

function consultarCep() {
	const cep = form.cep.value;
	if (isValidBRCep(cep)) {
		const url = `https://viacep.com.br/ws/${cep}/json/`;
		fetch(url)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				if (!data.erro) {
					resultado.innerHTML = `
						<p>Logradouro: ${data.logradouro}</p>
						<p>Bairro: ${data.bairro}</p>
						<p>Cidade: ${data.localidade}</p>
						<p>Estado: ${data.uf}</p>
					`;
				} else {
					resultado.innerHTML = `<p>CEP não encontrado</p>`;
				}
			});
	}
	resultado.innerHTML = `<p>CEP inválido</p>`;

	form.reset();
}
