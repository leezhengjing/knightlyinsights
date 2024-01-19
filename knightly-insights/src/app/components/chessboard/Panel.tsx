import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { usePositionContext } from '@/app/contexts/PositionContext'


export interface TPanelStyles {
    panelContainerClassName?: string
    panelClassName?: string
}

interface TProps {
    panelStyles?: TPanelStyles
}
const Panel = (props: TProps) => {
    const {
        panelStyles
    } = props

    const panelContainerClassName = panelStyles?.panelContainerClassName ?? 'RCAB-panel-container'
    // const panelClassName = panelStyles?.panelClassName ?? 'RCAB-panel'

    const { chessRootNode, chessNodes, handleLeftClick, handleRightClick } = usePositionContext()
    if (!chessRootNode || !chessNodes) {
        return <></>
    }

    return (
        <div className={panelContainerClassName}>
            <div className='RCAB-panel-item' onClick={() => handleLeftClick()}>
                <FaArrowLeftLong size='28' />
            </div>
            <div></div>
            <div className='RCAB-panel-item' onClick={() => handleRightClick()}>
                <FaArrowRightLong size='28' />
            </div>
        </div>
    )
}

export default Panel