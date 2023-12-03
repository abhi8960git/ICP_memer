import { memera } from "../../declarations/memera/";
import { Principal } from "@dfinity/principal";

//getYourId
document
	.querySelector("#getYourIdForm")
	.addEventListener("submit", async (e) => {
		e.preventDefault();
		const button = e.target.querySelector("button");

		button.setAttribute("disabled", true);

		// Interact with foo actor, calling the greet method
		const Id = await memera.getYourId();

		button.removeAttribute("disabled");

		console.log(Id);

		return false;
	});

//isListed
document
	.querySelector("#isListedForm")
	.addEventListener("submit", async (e) => {
		e.preventDefault();
		const button = e.target.querySelector("button");

		const listedPrincipal = document
			.getElementById("listedPrincipalId")
			.value.toString();

		button.setAttribute("disabled", true);

		// Interact with foo actor, calling the greet method
		const greeting = await memera.isListed(Principal.fromText(listedPrincipal));

		button.removeAttribute("disabled");

		console.log(greeting);

		return false;
	});

//Mint
const mintForm = document.getElementById("mintForm");
mintForm.addEventListener("submit", async (event) => {
	event.preventDefault();

	const button = event.target.querySelector("button");
	const mintText1 = document.getElementById("mintText1").value;
	const mintText2 = document.getElementById("mintText2").value;
	const uint8Array = stringToUint8Array(mintText1);

	function stringToUint8Array(str) {
		const values = str.split(";");
		const uint8Array = new Uint8Array(values.length);

		for (let i = 0; i < values.length; i++) {
			uint8Array[i] = parseInt(values[i]);
		}

		return uint8Array;
	}

	const nftArray = convertUint8ArrayToVecNat16(uint8Array);

	function convertUint8ArrayToVecNat16(uint8Array) {
		const nat16Array = new Uint16Array(uint8Array.length / 2);

		for (let i = 0; i < uint8Array.length; i += 2) {
			const nat16Value = (uint8Array[i] << 8) | uint8Array[i + 1];
			nat16Array[i / 2] = nat16Value;
		}

		return nat16Array;
	}

	button.setAttribute("disabled", true);

	// Call the memara.Mint() function with mintText1 and mintText2 as arguments
	var principal = await memera.Mint(nftArray, mintText2);
	button.removeAttribute("disabled");
	principal = principal.toText();
	console.log(principal);

	// document.getElementById('mintResult').innerText = `Principal: ${principal}`;
});

//getOriginalOwner
if (document.querySelector("#getOwnerForm")) {
	document
		.querySelector("#getOwnerForm")
		.addEventListener("submit", async (e) => {
			e.preventDefault();
			const button = e.target.querySelector("button");

			const memeId = document.getElementById("MemeIdForOwner").value.toString();

			button.setAttribute("disabled", true);

			// Interact with foo actor, calling the greet method
			const owner = await memera.getOriginalOwner(Principal.fromText(memeId));

			button.removeAttribute("disabled");

			console.log(owner);

			return false;
		});
}

//getAllListingForm
if (document.querySelector("#getAllListingForm")) {
	document
		.querySelector("#getAllListingForm")
		.addEventListener("submit", async (e) => {
			e.preventDefault();
			const button = e.target.querySelector("button");

			button.setAttribute("disabled", true);

			// Interact with foo actor, calling the greet method
			const listedMemes = await memera.getListedMemes();

			button.removeAttribute("disabled");

			console.log(listedMemes);

			return false;
		});
}

//getCanistertID
if (document.querySelector("#getCanisterIdForm")) {
	document
		.querySelector("#getCanisterIdForm")
		.addEventListener("submit", async (e) => {
			e.preventDefault();
			const button = e.target.querySelector("button");

			button.setAttribute("disabled", true);

			// Interact with foo actor, calling the greet method
			const Id = await memera.getMemeraCanisterId();

			button.removeAttribute("disabled");

			console.log(Id);

			return false;
		});
}

//getAllMemes
if (document.querySelector("#getAllMemesForm")) {
	document
		.querySelector("#getAllMemesForm")
		.addEventListener("submit", async (e) => {
			e.preventDefault();
			const button = e.target.querySelector("button");

			button.setAttribute("disabled", true);

			// Interact with foo actor, calling the greet method
			const Id = await memera.getExistingMemes();

			button.removeAttribute("disabled");

			console.log(Id);

			return false;
		});
}

//getOwnedMemes
if (document.querySelector("#getOwnedMemesForm")) {
	document
		.querySelector("#getOwnedMemesForm")
		.addEventListener("submit", async (e) => {
			e.preventDefault();
			const button = e.target.querySelector("button");

			const Id = document.getElementById("OwnerId").value.toString();

			button.setAttribute("disabled", true);

			// Interact with foo actor, calling the greet method
			const memes = await memera.getOwnedMemes(Principal.fromText(Id));

			button.removeAttribute("disabled");

			console.log(memes);

			return false;
		});
}
