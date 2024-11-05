const player1 = {
    name: "Mario",
    speed: 4,
    maneuverability: 3,
    power: 3,
    points: 0
}

const player2 = {
    name: "Peach",
    speed: 3,
    maneuverability: 4,
    power: 2,
    points: 0
}

const player3 = {
    name: "Yoshi",
    speed: 2,
    maneuverability: 4,
    power: 3,
    points: 0
}

const player4 = {
    name: "Bowser",
    speed: 5,
    maneuverability: 2,
    power: 5,
    points: 0
}

const player5 = {
    name: "Luigi",
    speed: 3,
    maneuverability: 4,
    power: 4,
    points: 0

}

const player6 = {
    name: "Donkey Kong",
    speed: 2,
    maneuverability: 2,
    power: 5,
    points: 0
}

async function rollDice() {
   return Math.floor(Math.random() * 6) + 1
}

async function getRandomBlock() {
    let random =  Math.floor(Math.random() * 3) + 1
    let result

    switch (random) {
        case 1: 
            result = 'RETA';
            break;
        case 2: 
            result = 'CURVA';
            break;
        case 3: 
            result = 'CONFRONTO';
            break 
    }

    return result
}

async function logRollResult (characterName, block, diceResult, attribute) {
    console.log(`${characterName}🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`)
}

async function declareWinner (character1, character2) {
    console.log(`Resultado final:
    ${character1.name}: ${character1.points} pontos.
    ${character2.name}: ${character2.points} pontos.`)
    
    if(character1.points > character2.points) {
        console.log(`🏆🏁 ${character1.name} venceu a corrida! `)
    } else if (character2.points > character1.points) {
        console.log(`🏆🏁 ${character2.name} venceu a corrida! `)
    } else {
        console.log(`🏆🏁 ${character1.name} e ${character2.name} terminam a corrida empatados! `)
    }
}

async function playRaceEngine(character1, character2) {
    for(let round = 1; round <= 5; round++) {
        console.log(`🏁 Rodada ${round}`);

        // sortear bloco
        let block = await getRandomBlock()
        console.log(`BLOCO: ${block}`)

        // rolar os dados
        let diceResult1 = await rollDice()
        let diceResult2 = await rollDice()

        // teste de habilidade
        let testSkill1 = 0
        let testSkill2 = 0

        if(block === 'RETA') {
            testSkill1 = diceResult1 + character1.speed;
            testSkill2 = diceResult2 + character2.speed

            await logRollResult(character1.name, "velocidade", diceResult1, character1.speed)
            await logRollResult(character2.name, "velocidade", diceResult2, character2.speed)
        } else if(block === 'CURVA') {
            testSkill1 = diceResult1 + character1.maneuverability;
            testSkill2 = diceResult2 + character2.maneuverability

            await logRollResult(character1.name, "manobrabilidade", diceResult1, character1.maneuverability)
            await logRollResult(character2.name, "manobrabilidade", diceResult2, character2.maneuverability)
        } else if(block === 'CONFRONTO') {
            let powerResult1 = diceResult1 + character1.power;
            let powerResult2 = diceResult2 + character2.power

            console.log(`${character1.name} confrontou ${character2.name} 🥊`);

            await logRollResult(character1.name, "poder", diceResult1, character1.power)
            await logRollResult(character2.name, "poder", diceResult2, character2.power)

            if(powerResult1 > powerResult2) {
                console.log(`🐢 ${character2.name} perdeu um ponto`)
                if (character2.points > 0) {
                    character2.points--
                }
            } else if(powerResult2 > powerResult1) {
                console.log(`🐢 ${character1.name} perdeu um ponto`)
                if (character1.points > 0) {
                    character1.points--
                }
            } else {
                console.log(`🏎️ EMPATE! Nenhum ponto foi perdido.`)
            }
        }

        // verificando o vencedor
        if (block == "RETA" || block == "CURVA") {
            if(testSkill1 > testSkill2) {
                console.log(`🏎️ ${character1.name} ganhou 1 ponto.`)
                character1.points++
            } else if(testSkill1 < testSkill2) {
                console.log(`🏎️ ${character2.name} ganhou 1 ponto.`)
                character2.points++
            } else {
                console.log(`🏎️ EMPATE`)
            }
        }
        
        
        console.log('========================================================')
    }

    

    
}

async function resetValues(character1, character2) {
    character1.points = 0
    character2.points = 0
}

(async function main() { // função de entrada, chama as outras funções
    console.log(`
        🚨🏁 Corrida entre ${player1.name} e ${player5.name} começando...
        `);
    
    await playRaceEngine(player1, player5);
    await declareWinner(player1, player5);
    
    resetValues(player1, player2)
    

})() // o () ao redor da função a torna auto invocável.

