import Square from './Square';

export default function Board({ xIsNext, squares, onPlay }) {

    // Calcule la valeur de winner grâce à la fonction calculateWinner
    const winner = calculateWinner(squares);
    // Déclaration de la variable status
    let status;

    // Calcule si l'on a déjà cliqué sur un carré, ou s'il y a déjà un gagnant à chaque clique
    function handleClick(i) {
        if (squares[i] || calculateWinner(squares)) {
            // Return pour interrompre la fonction si l'une des deux conditions est remplie
            return;
        }
        // Créer une copie du tableau squares afin de ne pas modifier l'original
        const nextSquares = squares.slice();
        // Si xIsNext === true alors la prochaine valeur de squares[i] sera X
        if (xIsNext) {
            nextSquares[i] = "X";
        // Sinon elle sera O
        } else {
            nextSquares[i] = "O";
        }
        // Appelle la fonction handlePlay du composant Game
        onPlay(nextSquares);
    }

    // Fonciton qui calcule s'il y a un gagnant en vérifiant que 3 mêmes valeurs sont alignées (rangée/colonne/diagonale)
    function calculateWinner() {
        // Initialisation du tableau lines
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        // Boucle for pour itérer sur le tableau lines
        for (let i = 0; i < lines.length; i++) {
            // Fais correspondre les valeurs a, b et c à chaque valeurs des sous-tableau de lines 
            // ex: lines[0] = [a=0, b=1, c=2]; lines[4] = [a=1, b=4, c=7]
            const [a, b, c] = lines[i];
            // Vérifie que les valeurs X où O sont les mêmes pour chaque cases indiquées
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                // Retourne la valeur du gagnant: X où O
                return squares[a];
            }
        }
        // Sinon elle retourne null
        return null;
    }
    
    // S'il y a un gagnant, alors on affiche un message avec la valeur correspondante
    if (winner) {
      status = "Winner: " + winner;
      // Sinon on affiche quel joueur doit jouer 
    } else {
      status = "Next player: " + (xIsNext ? "X" : "O");
    }
    
    return (
        <>
            <div className="status">{status}</div>
            <div className="board-row">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
                <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
                <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
            </div>
            <div className="board-row">
                <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
                <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
                <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
            </div>
            <div className="board-row">
                <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
                <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
                <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
            </div>
        </>
    );
}