type play = {
    row: number;
    column: number;
    value: string;
    icon: string;
};

type gameSettings ={
    player1: string;
    player2: string;
    against: string;
}

type tile ={
    value: string;
    icon: string
}

type move ={
    row:number;
    column: number;
}

type score ={
    playerWins: number;
    ties: number;
    cpuWins: number;
}

export type {play,gameSettings,score,tile,move}