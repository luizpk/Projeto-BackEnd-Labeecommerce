console.log("Jogo Par ou Impar");

const parOuImpar = process.argv[2];
const numeroescolhido = process.argv[3];

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }
  
  const escolhaComputador = getRndInteger(0, 10);
  console.log(escolhaComputador);

  const soma = (Number(numeroescolhido)+Number(escolhaComputador))

 if(parOuImpar==="par"&&soma%2===0){
     console.log(`O computador escolheu ${escolhaComputador}. Você ganhou!`)
 }if (parOuImpar==="par"&&soma%2!=0){
     console.log(`O computador escolheu ${escolhaComputador}. Você perdeu!`)
 } if (parOuImpar==="impar"&&soma%2!=0){
     console.log(`O computador escolheu ${escolhaComputador}. Você ganhou!`)
 }if (parOuImpar==="impar"&&soma%2===0){
     console.log(`O computador escolheu ${escolhaComputador}. Você perdeu!`)
 }


