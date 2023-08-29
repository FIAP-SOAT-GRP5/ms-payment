export const verifyCpf = (cpf: string) => {
	cpf = cpf.replace(/\D+/g, '');
	if (cpf.length !== 11) return false;
	if (/^(\d)\1+$/.test(cpf)) return false;

	let sum = 0;
	for (let i = 0; i < 9; i++) sum += parseInt(cpf.charAt(i)) * (10 - i);

	let rest = 11 - (sum % 11);
	let verifyDigit1 = rest < 10 ? rest : 0;

	sum = 0;
	for (let i = 0; i < 10; i++) sum += parseInt(cpf.charAt(i)) * (11 - i);

	rest = 11 - (sum % 11);
	let verifyDigit2 = rest < 10 ? rest : 0;
	if (
		verifyDigit1 !== parseInt(cpf.charAt(9)) ||
		verifyDigit2 !== parseInt(cpf.charAt(10))
	)
		return false;

	return true;
};
