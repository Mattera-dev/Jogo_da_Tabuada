const numero1 = document.querySelector("#n1");
const numero2 = document.querySelector("#n2");
const confirmar = document.querySelector("#verifique");
const resp = document.querySelector("#resp");
const nick = document.querySelector("#nickuser");
const placar = document.querySelector(".placar");
var pontos = 0;
var correta = 0;
var segundos = 0;
var recorde = 0;
var crono;
var errou;
var qtdjogos = 0
var acabou = 0;
var placartotal = JSON.parse(localStorage.getItem('placarArray')) || [];
var selec = '';




function sortear(){
    valor1 = Math.ceil((Math.random() *10));
    numero1.value = valor1;
    valor2 = Math.ceil((Math.random() *10));
    numero2.value = valor2;
    correta = valor1 * valor2;
};

function verificar(){
   
    if(resp.value == correta){
        pontos++;
        document.querySelector(".pontos").innerHTML = ("Pontuação: " + pontos);
        resp.value = "";
        resp.focus();
        sortear();
    }else{
        if(resp.value == ""){
            alert("Utilize apenas numeros inteiros.")
        }else{
            errou = 1;
            document.querySelector(".pontos").innerHTML = ("Pontuação: " + pontos);
            resp.value = "";
            resp.focus();
            sortear();
        }
        }
    };

    if (pontos < 0) {
        pontos == 0
    };

    


function iniciar(e){
    if(e.key == "Enter"){
        verificar();
    }
};

function cronometro(e) {
    acabou = 0;
    placarshow();
    if (nick.value == "") {
        alert("Digite um nome antes de iniciar o jogo")
    } else {
        errou = 0;
        if (e.getAttribute("value") == "1") {
            var segundos = 15;
            selec = '15';
        }
        if (e.getAttribute("value") == "2") {
            var segundos = 30;
            selec = '30';
        }
        if (e.getAttribute("value") == "3") {
            var segundos = 60;
            selec = '60';
        }
        sortear();
        document.querySelector(".iniciar").classList.add("hide");
        setTimeout(() => {
            document.querySelector("#form").classList.remove("hide");   
        }, 100);
        document.querySelector("#tempo").innerHTML = ("Tempo restante: " + segundos);
        
        crono = setInterval(() => {
            if (errou == 1) {
                segundos = 1;
            }
    
            segundos--;
            document.querySelector("#tempo").innerHTML = ("Tempo restante: " + segundos);
            if (segundos <= 0) {
                qtdjogos++;
                clearInterval(crono);
                acabou = 1;
                placarshow();
                if(pontos > recorde){
                    recorde = pontos;
                }
                numero1.value = "";
                numero2.value = "";
            resp.value = "";
            pontos = 0;
            document.querySelector(".pontos").innerHTML = "JOGO DE TABUADA";
            document.querySelector(".record").innerHTML = ("Recorde atual: " + recorde);
            document.querySelector(".record").classList.add("show");
            document.querySelector(".iniciar").classList.remove("hide");
            document.querySelector(".inic-welcome").innerHTML = "O tempo acabou!, Deseja tentar novamente?"
            document.querySelector("#form").classList.add("hide");   
            
            }
        }, 1000);
        setTimeout(() => {
            resp.focus();
            
        }, 100);
        
        }
    }



function placarshow(e) {
    if (!placar.classList.contains("show") && acabou == 1) {
        document.querySelector(".placar").classList.add("show");
    } else {
        placar.classList.remove("show");
    }
    if (acabou == 1) {
        if (errou == 1) {
            document.querySelector(".placar-inside").innerHTML += ("<li class='errou'>" + qtdjogos + " - " + nick.value + " | " + pontos + " pontos | " + selec + "S</li>") 
        } else{
        document.querySelector(".placar-inside").innerHTML += ("<li class='acertou'>" + qtdjogos + " - " + nick.value + " | " + pontos + " pontos | " + selec + "S</li>") 
        }
       
        adicionarAoPlacar();
    }
}

function adicionarAoPlacar() {
  
    let info = {
      "nome": nick.value,
      "qtd": qtdjogos,
      "pnts": pontos,
      "errou": errou,
      "tempo": selec
    };
  
    placartotal.push(info);
  
    localStorage.setItem('placarArray', JSON.stringify(placartotal));
  }
  

confirmar.addEventListener("click", verificar)

function placa2(){
    document.querySelector(".placar").classList.toggle("show");
}

resp.addEventListener("keyup", iniciar)
function mostraplacar(e,i) {
    qtdjogos = i+1;
    if (placartotal[i].errou == 1) {
        document.querySelector(".placar-inside").innerHTML += ("<li class='errou'>" + placartotal[i].qtd + " - " + placartotal[i].nome + " | " + placartotal[i].pnts + " pontos | " + placartotal[i].tempo + "S</li>") 
    } else{
    document.querySelector(".placar-inside").innerHTML += ("<li class='acertou'>" + placartotal[i].qtd + " - " + placartotal[i].nome + " | " + placartotal[i].pnts + " pontos | " + placartotal[i].tempo + "S</li>")    
    }
}

placartotal.forEach(mostraplacar);

function limpar(e) {
    var resultado = confirm("Deseja excluir o historico de patidas? (Isso ira recarregar a pagina)");
    if (resultado == true) {
        localStorage.clear();
        location.reload();
    }
    
}


// <!-- CRIADO POR VINICIUS MATTERA -->

// <!-- Contato:
//      Email: vinimatteraz@gmail.com
//     Whatsapp: 5511917898932
//     Instagram: @Mattera_boyy -->