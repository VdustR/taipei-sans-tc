import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { css, cx } from 'emotion';
import DarkToggle from '@/DarkToggle';
import useDark from '@/DarkToggle/useDark';
import WeightSwitcher from '@/WeightSwitcher';
import usePrevious from '@/hooks/usePrevious';

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
  `,
  nav: css`
    label: nav;
    flex: 1;
  `,
};

const TopBar = () => {
  const dark = useDark();
  const [isShown, setIsShown] = useState(true);
  const [scroll, setScroll] = useState(window.scrollY);
  const prevScroll = usePrevious(scroll);
  const show = useCallback(() => {
    if (isShown) return;
    setIsShown(true);
  }, [isShown]);
  const hide = useCallback(() => {
    if (!isShown) return;
    setIsShown(false);
  }, [isShown]);
  const style = useMemo(
    () => css`
      transform: ${isShown ? 'none' : 'translateY(-100%)'};
      background: ${dark
        ? 'linear-gradient(0deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)'
        : 'linear-gradient(0deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%)'};
    `,
    [dark, isShown]
  );
  useEffect(() => {
    const scroll = e => {
      setScroll(window.scrollY);
    };
    window.addEventListener('scroll', scroll);
    return () => window.removeEventListener('scroll', scroll);
  }, []);
  useEffect(() => {
    if (scroll <= 64 || scroll < prevScroll) {
      show();
    } else if (scroll > prevScroll) {
      hide();
    }
  }, [hide, prevScroll, scroll, show]);
  return (
    <div className={cx(styles.topBar, style)}>
      <div className={styles.nav} />
      <WeightSwitcher />
      <DarkToggle />
    </div>
  );
};

export default memo(TopBar);
