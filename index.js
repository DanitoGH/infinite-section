import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export const useInfiniteSections = (nodesAvailable, loadMoreCallback) => {
    const [currentView, setCurrentView] = useState(0);
    const [windowSize, setWindowSize] = useState({});

    useEffect(() => {
        if (currentView + 1 >= nodesAvailable - 2) {
            if (loadMoreCallback) {
                loadMoreCallback();
            }
        }
    }, [currentView, windowSize]);

    useLayoutEffect(() => {
        function updateSize() {
            setWindowSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    return { currentView, setCurrentView, windowSize };
};

export const InfiniteSection = ({ children, currentView, setCurrentView, viewIndex, windowSize }) => {
    const itemsWrap = useRef();
    const [elHeight, setElHeight] = useState('auto');
    const [ref, inView] = useInView();
    const [show, setShow] = useState(true);

    useEffect(() => {
        if (inView) {
            setCurrentView(viewIndex);
        }
    }, [inView, windowSize]);

    useEffect(() => {
        if (viewIndex >= currentView - 2 && viewIndex <= currentView + 2) {
            setShow(true);
            setElHeight(itemsWrap.current.clientHeight);
        } else {
            setShow(false);
        }
    }, [currentView, windowSize]);

    useEffect(() => {
        setElHeight('auto');
        setShow(true);
    }, [windowSize]);

    return (
        <Chakra.Box style={{ height: elHeight }} ref={ref}>
            <div ref={itemsWrap}>{show && children}</div>
        </Chakra.Box>
    );
};
