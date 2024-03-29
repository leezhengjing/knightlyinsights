import "./styles.css"

import Board from "./Board";
import { TBoardConfig } from './Board';

import BoardHeader, { TBoardHeaderStyles } from "./BoardHeader";
import { TBoardHeaderConfig } from './BoardHeader';

import Panel from './Panel';
import { TPanelStyles } from './Panel';

import { TPositionTreeSetter, usePositionContext } from "@/app/contexts/PositionContext";
import { Key, useEffect } from "react";
import Moves, { TMovesStyles } from "./Moves";

export interface TAnalysisBoardStyles {
    analysisBoardContainerClassName: string
}

interface TProps {
    pgnString?: string,
    analysisPosition?: TPositionTreeSetter,
    getAnalysisPosition?: Function,
    config?: {
        boardHeaderConfig?: TBoardHeaderConfig,
        boardConfig?: TBoardConfig
    },
    styles?: {
        analysisBoardStyles?: TAnalysisBoardStyles,
        panelStyles?: TPanelStyles,
        movesStyles?: TMovesStyles,
        boardHeaderStyles?: TBoardHeaderStyles
    }
}

const AnalysisBoard = (props: TProps) => {
    const {
        pgnString,
        config,
        styles,
        analysisPosition,
        getAnalysisPosition,
    } = props

    const analysisBoardContainerClassName = styles?.analysisBoardStyles?.analysisBoardContainerClassName ?? 'RCAB-analysis-board-container'


    const { boardPosition, chessRootNode, handleLeftClick, handleRightClick, fen, chessNodes, setPosition } = usePositionContext()

    useEffect(() => {
        if (getAnalysisPosition && analysisPosition?.fen !== fen) {
            const tempNodes = chessNodes
            const newTempNodes = tempNodes?.map((el) => {
                const historyArray = el?.node?.history()
                const newEl = {
                    ...el,
                    historyArray
                }
                return newEl
            })
            const position = {
                pgnString,
                boardPosition,
                fen,
                chessNodes: newTempNodes
            }
            getAnalysisPosition(position)
        }
    }, [boardPosition, fen])

    useEffect(() => {
        if (analysisPosition && analysisPosition?.fen !== 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1') {
            setPosition(analysisPosition)
            chessRootNode?.loadPgn(analysisPosition.pgnString)
        }
        else if (pgnString && chessRootNode) {
            chessRootNode.loadPgn(pgnString)
        }
    }, [analysisPosition, pgnString])


    const handleKeyDown = (k: Key) => {
        if (k === 'ArrowRight') {
            handleRightClick()
        }
        if (k === 'ArrowLeft') {
            handleLeftClick()
        }
    }

    return (
        <div className={analysisBoardContainerClassName} onKeyDown={(k) => handleKeyDown(k.key)} tabIndex={0}>
            <div>
                <BoardHeader
                    boardHeaderConfig={config?.boardHeaderConfig}
                    boardHeaderStyles={styles?.boardHeaderStyles}
                />
                <Board
                    boardConfig={config?.boardConfig}
                />
                <Panel
                    panelStyles={styles?.panelStyles}
                />
            </div>
            <div>
                <Moves
                    movesStyles={styles?.movesStyles}
                />
            </div>
        </div>
    )
}



export default AnalysisBoard