import { memera } from "../../declarations/memera/";


const Button = document.getElementsByClassName('myButton');
console.log(Button);

Button[0].addEventListener('click', function() {
  console.log("hello");
});





const mintForm = document.getElementById('mintForm');
mintForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const button = event.target.querySelector("button");
  const mintText1 = document.getElementById('mintText1').value;
  const mintText2 = document.getElementById('mintText2').value;
  const uint8Array = stringToUint8Array(mintText1);

  function stringToUint8Array(str) {
    const values = str.split(';');
    const uint8Array = new Uint8Array(values.length);
  
    for (let i = 0; i < values.length; i++) {
      uint8Array[i] = parseInt(values[i]);
    }
  
  return uint8Array;
  }

 const nftArray= convertUint8ArrayToVecNat16(uint8Array);

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
  const principal = await memera.Mint(nftArray, mintText2);

  button.removeAttribute("disabled");
  console.log(principal);

  // document.getElementById('mintResult').innerText = `Principal: ${principal}`;
});