import { PositionContextProvider, TPositionTreeSetter } from '@/app/contexts/PositionContext';
import { TPanelStyles } from './Panel';
import { TBoardHeaderConfig, TBoardHeaderStyles } from './BoardHeader';
import { TBoardConfig } from './Board';

import AnalysisBoard, { TAnalysisBoardStyles } from './AnalysisBoard';
import { TMovesStyles } from './Moves';

export interface TProps {
    pgnString?: string
    config?: {
        boardHeaderConfig?: TBoardHeaderConfig,
        boardConfig?: TBoardConfig
    },
    getAnalysisPosition?: Function,
    analysisPosition?: TPositionTreeSetter,
    styles?: {
        analysisBoardStyles?: TAnalysisBoardStyles,
        panelStyles?: TPanelStyles,
        movesStyles?: TMovesStyles,
        boardHeaderStyles?: TBoardHeaderStyles
    }
}

const ChessAnalysisBoard = (props: TProps) => {
    return (
        <PositionContextProvider>
            <AnalysisBoard {...props} />
        </PositionContextProvider>
    )
}

export default ChessAnalysisBoard