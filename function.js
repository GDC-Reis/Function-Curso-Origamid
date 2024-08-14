// Function
// Toda função é criada com o construtor 'Function' e por isso herda as suas propriedades e métodos

function areaQuadrado(lado){
    return lado * lado;
}

const perimertroQuadrado = new Function('lado', 'return lado * 4');



// Propriedades 
// 'Function.length' retorna o total de argumentos da função.
// 'Function.name' retorna uma string com o nome da função.

function somar(n1, n2){
    return n1 + n2;
}

somar.length; // 2
somar.name; // 'somar'



// function.call()
// 'function.call(this, arg1, arg2, ...)' executa a função, sendo possível passarmos uma nova referência ao 'this' da mesma.

const carro = {
    marca: 'Ford',
    ano: 2018
}

function descricaoCarro() {
    console.log(this.marca + ' ' + this.ano);
}

descricaoCarro(); // undefined undefined
descricaoCarro.call(); // undefined undefined
descricaoCarro.call(carro); // Ford 2018

// mostrando call de outra forma
function descricaoCarro1(velocidade){
    console.log(this.marca + ' ' + this.ano);
}

descricaoCarro.call({marca: 'Honda', ano: 2015}, 100);



// This
// O valor de 'this' faz referência ao objeto criado durante a construção do objeto (Constructor Function).
// Podemos trocar a referência do método ao this, utilizando o 'call()'.

const carros1 = ['Ford', 'Fiat', 'VW'];

carros1.forEach((item) => {
    console.log(item);
}); //Log de cada carro

carros1.forEach.call(carros, (item) => {
    console.log(item);
}) //Log de cada carro

const frutas = ['Banana', 'Pêra', 'Uva'];

carros.forEach.call(frutas, (item) => {
    console.log(item);
}) //Log de cada fruta



// Exemplo Real
// O objeto atribuido a 'lista' será o substituído pelo primeiro argumento do 'call()'.

function Dom(seletor) {
    this.element = document.querySelector(seletor);
};

Dom.prototype.ativo = function(classe) {
    this.element.classList.add(classe);
};

const lista = new Dom('ul');

lista.ativo('ativar');

console.log(lista);



// O objeto deve ser parecido 
// O novo valor de 'this' deve ser semelhante a estrutura do valor do 'this' original do método.
// Caso contrário o método não conseguirá interagir de forma correta com o novo this.

Dom.prototype.ativo = function(classe) {
    this.element.classList.add(classe);
};

const novoSeletor = {
    element: document.querySelector('li'),
}

Dom.prototype.ativo.call(novoSeletor, 'ativar');



// Array's e Call 
// É comum utilizarmos o 'call()' nas funções de protótipo do construtor Array.
// Assim podemos estender todos os métodos de Array à objetos que se parecem com uma Array (array-like).

Array.prototype.mostreThis = function() {
    console.log(this);
}

const frutas1 = ['Uva', 'Maçã', 'Banana'];
frutas.mostreThis(); // ['Uva', 'Maçã', 'Banana']

Array.prototype.pop.call(frutas1); // Remove Banana
frutas.pop(); // Mesma coisa que a função acima



// Array-like
// 'HTMLCollection', NodeList e demais objetos do DOM, são parecidos com uma array.
// Por isso conseguimos utilizar os mesmos na substituição do this em call.

const li = document.querySelectorAll('li');

const filtro = Array.prototype.filter.call(li, function(item) {
    return item.classList.contains('ativo');
});

filtro; // Retorna os itens que possuem ativo.



// function.apply()
// O 'apply(this, [arg1, arg2, ...])' funciona como o 'call', 
// a unica diferença é que os argumentos da função são passados através de uma array.

const numeros = [3,4,6,1,34,44,32];
Math.max.apply(null, numeros);
Math.max.call(null, 3,4,5,6,7,20);

// Podemos passar null para o valor de this, caso a função não utilize o objeto principal para funcionar.

/*
    OBS: passando 'null' como valor, o valor dele sempre vai ser o objeto Windown 
*/



// Apply vs Call
// A única diferença é a array como segundo argumento.

const li1 = document.querySelectorAll('li');

function itemPossuiAtivo(item) {
    return item.classList.constains('ativo');
}

const filtro1 = Array.prototype.filter.call(li1, itemPossuiAtivo);
const filtro2 = Array.prototype.filter.apply(li1, [itemPossuiAtivo]);



// function.bind()
// Diferente de call e apply, 'bind(this, arg1, arg2, ...)' não irá executar a função mais sim retornar a mesma com o novo contexto de 'this'.

const li2 = document.querySelectorAll('li');

const filtrarLi = Array.prototype.filter.bind(li2, function(item) {
    return item.classList.constains('ativo');
});

filtrarLi();



// Argumentos e Bind
// Não precisamos passar todos os argumentos no momento do bind,
// podemos passar os mesmos na nova função no momento da execução da mesma.

const carro2 = {
    marca: 'Ford',
    ano: 2018,
    acelerar: function(aceleracao, tempo) {
        return `${this.marca} acelerou ${aceleracao} em ${tempo}`;
    },
}

carro.acelerar(100, 20);
// Ford acelerou 100 em 20

const honda = {
    marca: 'Honda',
};

const acelerarHonda = carro.acelerar.bind(honda);
acelerarHonda(200,10);



// Argumentos Comuns 
// Podemos passar argumentos padrões para uma função e retornar uma nova função.

function imc(altura, peso) {
    return peso / (altura * altura);
};

const imc180 = imc.bind(null, 1.80);

imc(1.80, 70); // 21.6
imc180(70); // 21.6