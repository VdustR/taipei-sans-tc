import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { css, cx, keyframes } from 'emotion';
import { animateScroll, Events, Link } from 'react-scroll';
import { Icon } from '@blueprintjs/core';
import DarkToggle from '@/DarkToggle';
import useDark from '@/DarkToggle/useDark';
import usePrevious from '@/hooks/usePrevious';

const hideToTop = keyframes`
  from {
    transform: none;
    opacity: 1;
    width: 36px;
  }
  50% {
    transform: translateY(calc(0px - var(--topBarHeight)));
    opacity: 0;
    width: 36px;
  }
  to {
    transform: translateY(calc(0px - var(--topBarHeight)));
    opacity: 0;
    width: 0;
  }
`;

const showToTop = keyframes`
  from {
    transform: translateY(calc(0px - var(--topBarHeight)));
    opacity: 0;
    width: 36;
  }
  to {
    transform: none;
    opacity: 1;
    width: 36px;
  }
`;

const styles = {
  topBar: css`
    label: topBar;
    position: fixed;
    height: var(--topBarHeight);
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 16px;
    transition: var(--transition);
    background: var(--background);
  `,
  nav: css`
    label: nav;
    flex: 1;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    font-size: 1em;

    @media (min-width: 600px) {
      font-size: 2em;
    }
  `,
  toTop: css`
    label: toTop;
    margin-left: 16px;
    transition: var(--transition);
  `,
};

const L = (() => {
  const L = ({ children, ...props }) => {
    return (
      <Link
        to={encodeURIComponent(children)}
        hashSpy
        smooth
        duration={500}
        {...props}
      >
        {children}
      </Link>
    );
  };
  return memo(L);
})();

const TopBar = () => {
  const dark = useDark();
  const [isShown, setIsShown] = useState(true);
  const [scroll, setScroll] = useState(window.scrollY);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  useEffect(() => {
    Events.scrollEvent.register('begin', () => setIsAutoScrolling(true));
    Events.scrollEvent.register('end', () =>
      setTimeout(() => setIsAutoScrolling(false), 20)
    );
    return () => {
      Events.scrollEvent.remove('begin');
      Events.scrollEvent.remove('end');
    };
  }, []);
  const isToTopHidden = useMemo(() => scroll < 360, [scroll]);
  const prevScroll = usePrevious(scroll);
  const show = useCallback(() => {
    if (isShown) return;
    setIsShown(true);
  }, [isShown]);
  const hide = useCallback(() => {
    if (!isShown) return;
    setIsShown(false);
  }, [isShown]);
  const colorDec = useMemo(() => (dark ? '255, 255, 255' : '0, 0, 0'), [dark]);
  const topBarStyle = useMemo(
    () => css`
      transform: ${isShown ? 'none' : 'translateY(-100%)'};
      box-shadow: 0 8px 10px -5px rgba(${colorDec}, ${isShown ? 0.2 : 0}),
        0 16px 24px 2px rgba(${colorDec}, ${isShown ? 0.14 : 0}),
        0 6px 30px 5px rgba(${colorDec}, ${isShown ? 0.12 : 0});
    `,
    [colorDec, isShown]
  );
  useEffect(() => {
    const scroll = e => {
      setScroll(window.scrollY);
    };
    window.addEventListener('scroll', scroll);
    return () => window.removeEventListener('scroll', scroll);
  }, []);
  useEffect(() => {
    if (isAutoScrolling) hide();
    if (isAutoScrolling || prevScroll === undefined) return;
    if (scroll <= 64 || scroll < prevScroll) {
      show();
    } else if (scroll > prevScroll) {
      hide();
    }
  }, [hide, isAutoScrolling, prevScroll, scroll, show]);
  const toTopStyle = useMemo(
    () => css`
      animation: ${isToTopHidden ? hideToTop : showToTop}
        ${isToTopHidden ? '1s' : '0.5s'} ease;
      transform: ${isToTopHidden
        ? 'translateY(calc(0px - var(--topBarHeight)))'
        : 'none'};
      opacity: ${isToTopHidden ? 0 : 1};
      width: ${isToTopHidden ? '0' : '36px'};
    `,
    [isToTopHidden]
  );
  return (
    <div className={cx(styles.topBar, topBarStyle)}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a
        onClick={animateScroll.scrollToTop}
        className={cx(styles.toTop, toTopStyle)}
      >
        <Icon icon="double-chevron-up" iconSize={36} />
      </a>
      <div className={styles.nav}>
        <L>安裝</L>
        <L>使用</L>
        <L>相關連結</L>
      </div>
      <DarkToggle />
    </div>
  );
};

export default memo(TopBar);
