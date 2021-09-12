//Blocos que irão no ato da votação.
let seuVotoPara = document.querySelector('.division-one-text-initial span');
let cargo =  document.querySelector('.divison-one-subtitle span');
let descricao = document.querySelector('.division-one-candidate-characteristics');
let aviso = document.querySelector('.division-two');
let lateral = document.querySelector('.division-one-right');
let numerosVotacao = document.querySelector('.division-one-numbers');

//Variáveis de  controle de ambiete. 
let etapaAtual = 0; 
let numero = '';
let votoBranco = false;
let votos =[];


function comecarEtapa(){
    let etapa = etapas[etapaAtual];
    
    let numeroHtml = '';
    numero = '';
    votoBranco = false;

   for(let i=0; i<etapa.numeros;i++){
       if(i === 0){
        numeroHtml += '<div class="number blink"></div>';
       }else{
        numeroHtml += '<div class="number"></div>';
       }
   }
    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numerosVotacao.innerHTML = numeroHtml;
}

//Função verificar o número digitado, se há algum cara com o número que foi digitado, irá pegar as informações do candidato e colocar na tela
function atualizaInterface(){
    //Procurando o candidato
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((itemCandidato)=>{
        if(itemCandidato.numero === numero){
            return true;
        }else{
            return false;
        }
    });
    //Verificando se achou o candidato, achado eu preencho as infromações na tela
    if(candidato.length > 0){
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}<br/> Partido: ${candidato.partido}`;
        
        let fotosHtml = '';
        for(let i in candidato.fotos){
            if(candidato.fotos[i].small){
                fotosHtml += `<div class="photo small"><img src="images/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`;
            }else{
                fotosHtml += `<div class="photo"><img src="images/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`;
            }    
        }
        lateral.innerHTML = fotosHtml;
    }else{
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso-grande blink">VOTO NULO</div>';
    }
    
}

function clicou(numberClicado){
   let elNumero =  document.querySelector('.number.blink');
   if(elNumero !== null){
        elNumero.innerHTML = numberClicado;
        numero = `${numero}${numberClicado}`;

        elNumero.classList.remove('blink');
        if(elNumero.nextElementSibling !== null ){
            elNumero.nextElementSibling.classList.add('blink');
        }else{
            atualizaInterface();
        }

   }
   
}
function white(){
    if(numero === ''){
        votoBranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numerosVotacao.innerHTML = '';
        descricao.innerHTML = '<div class="aviso-grande blink">VOTO EM BRANCO</div>';
        lateral.innerHTML = '';
    }
}
function correct(){ 
    comecarEtapa();
}
function confirm(){
  let etapa = etapas[etapaAtual];

  let votoConfirmado = false;
  if(votoBranco === true){
    votoConfirmado = true;
    votos.push({
        etapa: etapas[etapaAtual].titulo,
        voto: 'Branco'
    });
  }else if(numero.length === etapa.numeros){
    votoConfirmado = true;
    votos.push({
        etapa: etapas[etapaAtual].titulo,
        voto: numero
    });
  }

  if(votoConfirmado){
    etapaAtual ++;
    if(etapas[etapaAtual] != undefined){
        comecarEtapa();
    }else{
        document.querySelector('.left-screen').innerHTML = '<div class="aviso-gigante blink">FIM</div><div class="aviso-votou">VOTOU</div>';
        console.log(votos);  
    }
  }
}
comecarEtapa();