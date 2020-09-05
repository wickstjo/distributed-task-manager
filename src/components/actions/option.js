import React, { useState, useEffect, useRef } from 'react';

export default ({ header, func }) => {

    // LOCAL STATES
    const [width, set_width] = useState(0);
    const [style, set_style] = useState();

    // THE SELECTOR
    const selector = useRef(null)

    // LISTEN FOR WIDTH CHANGES
    useEffect(() => {
        foo()
        window.addEventListener("resize", foo)
        return () => window.removeEventListener("resize", foo);
    }, []);

    // RECALIBRATE WIDTH
    function foo() {
        set_width(selector.current.offsetWidth)
    }

    // WHEN WIDTH CHANGES, CHANGE STYLE
    useEffect(() => {
        if (width < 250) {
            set_style({
                textAlign: 'right'
            })
        } else {
            set_style({
                textAlign: 'center'
            })
        }
    }, [width])
    
    return (
        <li id={ 'action' } onClick={ func } ref={ selector } style={ style }>{ header }</li>
    )
}