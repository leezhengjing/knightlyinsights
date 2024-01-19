import { Chessboard } from "react-chessboard";
import { ChessboardProps as TChessBoardProps, BoardPosition as TCurrentPosition, Piece, Square } from "react-chessboard/dist/chessboard/types";
import { Chess } from 'chess.js'
import { usePositionContext } from "@/app/contexts/PositionContext";
import { useEffect, useRef, useState } from "react";

// Create a interface TBoardConfig to be used in the Board Component
export interface TBoardConfig {
    fen?: string
    ChessBoardProps?: TChessBoardProps
}

// Create a interface TProps to be used in the Board Component as props
interface TProps {
    boardConfig?: TBoardConfig
}

// To resolve the new issue of react-chessboard requiring to include ClearPremoves in the ChessboardProps
interface ClearPremoves {
    clearPremoves: (clearLastPieceColour?: boolean) => void;
}

/**
 * Board Component
 * @param props 
 * @returns 
 */
const Board = (props: TProps) => {

    const { boardPosition, setBoardPosition,
        chessRootNode, chessNodes, setChessNodes,
        handleRightClick,
        fen, setFen
    } = usePositionContext();

    const clearPremovesRef = useRef<ClearPremoves>(null);
    if (!chessRootNode || !chessNodes || !boardPosition) {
        return <></>
    }

    const {
        boardConfig = {}
    } = props
    if (!boardConfig.ChessBoardProps) {
        boardConfig.ChessBoardProps = {}
    }

    const [chessBoardProps, setChessBoardProps] = useState<TChessBoardProps>(boardConfig.ChessBoardProps)

    const handleGetcurrentPosition = (currentPosition: TCurrentPosition) => {
        if (callerGetPositionObject) {
            callerGetPositionObject(currentPosition)
        }
    }
    const handleOnPieceDrop = (sourceSquare: Square, targetSquare: Square, piece: Piece) => {
        return onDrop(sourceSquare, targetSquare, piece)
    }

    const callerGetPositionObject = chessBoardProps.getPositionObject

    useEffect(() => {
        const currentNodeId = boardPosition?.nodeId
        const currentNode = chessNodes.filter(el => el.nodeId === currentNodeId)[0]
        const currentNodeHistory = currentNode.node.history()
        const tempChessRender = new Chess()
        currentNodeHistory.map((el, i) => {
            if (i < boardPosition?.moveIndex) {
                tempChessRender.move(el)
            }
        })
        const newFen = tempChessRender.fen()
        setFen(newFen)
    }, [chessNodes])

    useEffect(() => {
        setChessBoardProps({
            ...chessBoardProps,
            getPositionObject: (currentPosition) => handleGetcurrentPosition(currentPosition),
            onPieceDrop: (sourceSquare, targetSquare, piece) => handleOnPieceDrop(sourceSquare, targetSquare, piece),
            arePiecesDraggable: false,
            position: fen,
        })
    }, [fen])

    function makeAMove(move: { from: Square, to: Square, promotion?: string }, startingFen?: string) {
        const boardCopy = new Chess(startingFen);
        const newMove = boardCopy.move(move);
        if (!newMove) {
            return null
        }
        const newFen = boardCopy.fen()
        const result = {
            newFen,
            newMove
        }
        return result
    }


    function onDrop(sourceSquare: Square, targetSquare: Square, piece: Piece) {
        let droppedMove
        if (targetSquare[1] === '8' && piece[1] === 'P') {
            droppedMove = {
                from: sourceSquare,
                to: targetSquare,
                promotion: 'q' // TODO: react-chessboard has promotion selection on their roadmap
            }
        } else {
            droppedMove = {
                from: sourceSquare,
                to: targetSquare
            }
        }

        const nextPosition = makeAMove(droppedMove, fen);
        const newFen = nextPosition?.newFen
        const newMove = nextPosition?.newMove

        // illegal move
        if (!newFen) {
            return false
        }
        if (chessNodes) {
            const currentNode = chessNodes.filter(el => el.nodeId === boardPosition.nodeId)[0]
            const currentNodeCopy = currentNode.node
            const currentNodeHistory = currentNode.node.history()
            const nextMove = currentNodeHistory[boardPosition?.moveIndex]
            if (nextMove === newMove?.san) {
                handleRightClick()
            } else {
                const newNodeHistory = currentNodeHistory.slice(0, boardPosition?.moveIndex)
                if (newMove?.san) {
                    if (newNodeHistory.length === currentNodeHistory.length && boardPosition?.nodeId !== 0) {
                        currentNodeHistory.push(newMove?.san)
                        currentNodeCopy.move(newMove?.san)
                        const newChessNodes = chessNodes
                        const replacementNode = {
                            edgeNodeIndex: currentNode.edgeNodeIndex,
                            node: currentNodeCopy,
                            nodeId: currentNode.nodeId,
                            parentNodeId: currentNode.parentNodeId
                        }
                        newChessNodes[boardPosition.nodeId] = replacementNode
                        const newMoveIndex = boardPosition.moveIndex + 1
                        setBoardPosition({
                            ...boardPosition,
                            moveIndex: newMoveIndex
                        })
                    }
                    else {
                        newNodeHistory.push(newMove?.san)
                        const newNode = new Chess()
                        newNodeHistory.map(el => newNode.move(el))
                        const newNodeId = Math.max(...chessNodes.map(el => el.nodeId)) + 1
                        const newChessNode = {
                            edgeNodeIndex: boardPosition?.moveIndex,
                            node: newNode,
                            nodeId: newNodeId,
                            parentNodeId: currentNode.nodeId
                        }
                        const newChessNodesCopy = chessNodes
                        newChessNodesCopy.push(newChessNode)
                        setChessNodes(newChessNodesCopy)
                        const newMoveIndex = boardPosition.moveIndex + 1
                        setBoardPosition({
                            ...boardPosition,
                            moveIndex: newMoveIndex,
                            nodeId: newNodeId
                        })
                    }
                }
            }
        }
        setFen(newFen)
        return true;
    }

    return (
        <div>
            <Chessboard {...chessBoardProps} ref={clearPremovesRef} />
        </div>
    )

}

export default Board