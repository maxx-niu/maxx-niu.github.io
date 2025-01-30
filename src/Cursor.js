import React from 'react';
import "./Cursor.css";
import { useRef, useEffect } from 'react';

const Cursor = () => {

    const innerCursor = useRef(null);
    const outerCursor = useRef(null);

    useEffect(() => {
        let x = 0;
        let y = 0;

        const mouseMove = (e) => {
            x = e.clientX;
            y = e.clientY;
            innerCursor.current.style.left = `${x}px`;
            innerCursor.current.style.top = `${y}px`;
            outerCursor.current.style.left = `${x}px`;
            outerCursor.current.style.top = `${y}px`;
            
        };

        window.addEventListener("mousemove", mouseMove);

        return () => {
            window.removeEventListener("mousemove", mouseMove);
        }
    }, []);
    

  return (
    <>
        <div className="inner-cursor" ref={innerCursor}></div>
        <div className="outer-cursor" ref={outerCursor}></div>
    </>
  )
}

export default Cursor