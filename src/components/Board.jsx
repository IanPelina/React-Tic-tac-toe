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

    const boardRows = [];
    // Genérer dynamiquement les rangées et les colonnes du jeu 
    // Boucle pour les rangées
    for (let row = 0; row < 3; row++) {
        const squaresInRow = [];
        // Boucle pour les colonnes
        for (let col = 0; col < 3; col++) {
            const squareIndex = row * 3 + col;
            // Ajout des carrés par rangée
            squaresInRow.push(
                <Square
                    key={squareIndex}
                    value={squares[squareIndex]}
                    onSquareClick={() => handleClick(squareIndex)}
                />
            );
        }
        // Ajout de div par nombre de rangées
        boardRows.push(
            <div key={row} className="board-row">
                {squaresInRow}
            </div>
        );
    }
    
    return (
        <>
            <div className="status">{status}</div>
            {boardRows}
        </>
    );
}