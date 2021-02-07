import { useRef } from 'react';
import { SwitchTransition, CSSTransition } from "react-transition-group";
import './switchTransitionContainer.css';

function SwitchTransitionContainer(props) {
    const {
        className,
        // direction,
        keyIndex,
        children
    } = props;
    const nodeRef = useRef(null);

    return (
        <SwitchTransition mode="out-in">
            <CSSTransition
                nodeRef={nodeRef}
                key={keyIndex}
                classNames={className}
                timeout={200}
            >
                <div
                    className={className}
                    ref={nodeRef}
                >
                    {children}
                </div>
            </CSSTransition>
        </SwitchTransition>
    );
}

SwitchTransitionContainer.defaultProps = {
    className: 'switch-transition-container',
    // direction: 'left',
    keyIndex: 0
};

export default SwitchTransitionContainer;
