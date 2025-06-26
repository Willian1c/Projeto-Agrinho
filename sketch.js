function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}
let gridSize = 5; // Tamanho do grid da quinta (reduzido para um exemplo simples)

let cellSize = 75; // Tamanho de cada célula (aumentado para melhor visualização)

let farm = []; // Array 2D para representar a quinta

let seedType = 'Trigo'; // Tipo de semente inicial

let playerMoney = 20; // Dinheiro inicial do jogador (ajustado para o exemplo)

let gameStarted = false; //Variável para controlar o início do jogo

function setup() {

 createCanvas(gridSize * cellSize, gridSize * cellSize + 50); // Altura extra para a UI

 // Inicializar o grid da quinta

 for (let i = 0; i < gridSize; i++) {

   farm[i] = [];

   for (let j = 0; j < gridSize; j++) {

     farm[i][j] = { type: 'empty', growth: 0, watered: false, plantTime: 0 }; // Adicionado plantTime

   }

 }

 // Definir os tipos de sementes - Simplificado para um exemplo mínimo

 seeds = {

   Trigo: { name: 'Trigo', cost: 10, sellPrice: 20, growthTime: 5000 }, // Tempo de crescimento em ms

   Cenoura: {name: 'Cenoura', cost: 15, sellPrice: 30, growthTime: 8000}

 };

 textFont('Arial'); // Define a fonte para o texto

}

function draw() {

 background(240); // Cor de fundo cinzenta clara

 // Desenhar o grid da quinta

 for (let i = 0; i < gridSize; i++) {

   for (let j = 0; j < gridSize; j++) {

     let cell = farm[i][j];

     stroke(100); // Cor da borda do grid

     if (cell.type === 'empty') {

       fill(240, 200, 140); // Cor de terra

     } else if (cell.type === 'Trigo') {

       let growthPercentage = cell.growth / seeds.Trigo.growthTime * 100;

       fill(0, 100 + growthPercentage, 0); // Verde, escurece com o crescimento

     } else if (cell.type === 'Cenoura'){

       let growthPercentage = cell.growth / seeds.Cenoura.growthTime * 100;

       fill(255, 165 - growthPercentage, 0);

     }

     rect(i * cellSize, j * cellSize, cellSize, cellSize);

     if (cell.watered) {

       fill(0, 0, 255, 50); // Azul transparente para indicar rega

       ellipse(i * cellSize + cellSize / 2, j * cellSize + cellSize / 2, 10, 10);

     }

     if(cell.type !== 'empty'){

       let timePassed = millis() - cell.plantTime;

        if (timePassed > 0)

       {

          cell.growth = timePassed;

       }

       if(cell.growth >= seeds[cell.type].growthTime){

          text("Pronto", i * cellSize + cellSize/4, j * cellSize + cellSize/2);

       }

       else{

         text(cell.type, i * cellSize + cellSize/4, j * cellSize + cellSize/2);

       }

     }

   }

 }

 // Desenhar a UI simplificada na parte inferior

 fill(255);

 rect(0, gridSize * cellSize, width, 50);

 fill(0);

 textSize(16);

 text(`Dinheiro: $${playerMoney} | Semente: ${seedType}`, 10, gridSize * cellSize + 30);

 // Botões de seleção de semente (simplificado)

 if (dist(mouseX, mouseY, 150, gridSize * cellSize + 25) < 20) {

   fill(200); // Tom mais claro quando hover

   if (mouseIsPressed) {

     seedType = 'Trigo';

   }

 } else {

   fill(255);

 }

 ellipse(150, gridSize * cellSize + 25, 40, 40);

 fill(0);

 text('Trigo', 130, gridSize * cellSize + 30);

  if (dist(mouseX, mouseY, 250, gridSize * cellSize + 25) < 20) {

   fill(200); // Tom mais claro quando hover

    if (mouseIsPressed) {

     seedType = 'Cenoura';

   }

 } else {

   fill(255);

 }

 ellipse(250, gridSize * cellSize + 25, 40, 40);

 fill(0);

 text('Cenoura', 230, gridSize * cellSize + 30);

}

function mousePressed() {

 let gridX = floor(mouseX / cellSize);

 let gridY = floor(mouseY / cellSize);

 // Verificar se o clique está dentro do grid

 if (gridX >= 0 && gridX < gridSize && gridY >= 0 && gridY < gridSize) {

   let cell = farm[gridX][gridY];

   if (cell.type === 'empty') {

     // Plantar a semente selecionada

     let selectedSeed = seeds[seedType];

     if (playerMoney >= selectedSeed.cost) {

       farm[gridX][gridY] = { type: seedType, growth: 0, watered: false, plantTime: millis()};

       playerMoney -= selectedSeed.cost;

     }

   } else if (cell.growth >= seeds[cell.type].growthTime) {

     // Colher a planta

     playerMoney += seeds[cell.type].sellPrice;

     farm[gridX][gridY] = { type: 'empty', growth: 0, watered: false, plantTime: 0 };

   }

 }

}