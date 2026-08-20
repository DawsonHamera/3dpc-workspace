import { hashPassword } from "../../services/password";

const password = process.argv[2];

if (!password) {
	console.error("Usage: tsx hash.ts <password>");
	process.exit(1);
}

console.log(await hashPassword(password));