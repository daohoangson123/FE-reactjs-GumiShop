import './MobileMenuToggle.css';
//
import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    disableBodyScroll,
    enableBodyScroll,
    clearAllBodyScrollLocks,
} from 'body-scroll-lock';

const MobileMenu = ({ isMobileView, navlinkData }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const openMenu =
        typeof document !== 'undefined' &&
        document.querySelector('#MobileMenu');

    const mq = window.matchMedia('(min-width: 1025px)');

    // toggle khi matchMedia '(min-width: 1025px)'
    const toggle = () => {
        if (mq.matches) {
            setMenuOpen(false);
            clearAllBodyScrollLocks();
        }
    };

    useEffect(() => {
        toggle();

        mq.addEventListener('change', toggle);

        return () => {
            mq.removeEventListener('change', toggle);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <MobileMenuToggle
                menuOpen={menuOpen}
                setMenuOpen={setMenuOpen}
                openMenu={openMenu}
            />
            {isMobileView && (
                <MobileMenuRouting
                    isMobileView={isMobileView}
                    menuOpen={menuOpen}
                    setMenuOpen={setMenuOpen}
                    navlinkData={navlinkData}
                />
            )}
        </>
    );
};

const MobileMenuRouting = ({
    isMobileView,
    menuOpen,
    setMenuOpen,
    navlinkData,
}) => {
    const menuRef = useRef();

    useEffect(() => {
        const toggleBodyLock = (event) => {
            if (menuRef.current.contains(event.target)) {
                clearAllBodyScrollLocks();
                setMenuOpen(false);
            }
        };

        menuRef.current.addEventListener('mousedown', toggleBodyLock);
    });

    // useEffect(() => {
    // const mobileMenu = document.getElementById('MobileMenu');
    // const checkMenuDimension = (event) => {
    //     const mbDimensons = mobileMenu.getBoundingClientRect();
    //     if (
    //         (event.clientX < mbDimensons.left ||
    //             event.clientX > mbDimensons.right ||
    //             event.clientY < mbDimensons.top ||
    //             event.clientY > mbDimensons.bottom) &&
    //         menuOpen
    //     ) {
    //         setMenuOpen(false);
    //         enableBodyScroll(openMenu);
    //         window.removeEventListener('click', checkMenuDimension);
    //     }
    // };
    // window.addEventListener('click', checkMenuDimension);
    // });

    return (
        <div
            ref={menuRef}
            title='Close Menu'
            className='MobileMenu__NavContainer'
            style={
                menuOpen
                    ? {
                          transform: 'none',
                          zIndex: 1000,
                          backgroundColor: 'var(--color-alt-rgba-3)',
                      }
                    : null
            }>
            <div className='MobileMenu__Nav'>
                {navlinkData.map((item) => (
                    <NavLink
                        to={item.path}
                        key={item.name}
                        className='MobileMenu__Item'
                        title={item.name}
                        tabIndex={!isMobileView || !menuOpen ? -1 : 0}
                        onClick={() => {
                            setMenuOpen(false);
                            clearAllBodyScrollLocks();
                        }}>
                        {item.name}
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

const MobileMenuToggle = ({ menuOpen, setMenuOpen, openMenu }) => {
    return (
        <button
            title={menuOpen ? 'Close Menu' : 'Open Menu'}
            type='button'
            className='MobileMenu'
            id='MobileMenu'
            onClick={() => {
                setMenuOpen(!menuOpen);
                !menuOpen
                    ? disableBodyScroll(openMenu)
                    : enableBodyScroll(openMenu);
            }}
            aria-label='MobileMenuToggle'
            style={{
                backgroundColor: menuOpen && 'rgba(0, 0, 0, 0.3)',
            }}>
            <div
                className='MenuIcon1 MenuIcon '
                style={
                    menuOpen
                        ? {
                              backgroundColor: 'var(--color-default)',
                              transform:
                                  'rotate(45deg) translateX(1px) translateY(-5px)',
                          }
                        : null
                }></div>
            <div
                className='MenuIcon2 MenuIcon'
                style={{
                    display: menuOpen && 'none',
                }}></div>
            <div
                className='MenuIcon3 MenuIcon '
                style={
                    menuOpen
                        ? {
                              backgroundColor: 'var(--color-default)',
                              width: '30px',
                              transform:
                                  'rotate(-45deg) translateX(1px) translateY(5px)',
                          }
                        : null
                }></div>
        </button>
    );
};

export default MobileMenu;
