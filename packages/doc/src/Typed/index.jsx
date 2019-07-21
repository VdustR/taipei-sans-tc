import React, { memo, useRef, useEffect } from 'react';
import { css } from 'emotion';
import Typed from 'typed.js';

const strings = ['文字編排', '平面設計', '影音字幕'];

const styles = {
  typed: css`
    label: typed;
    font-size: 2em;
    display: flex;
    justify-content: center;
    margin: 0 auto;
  `,
};

const T = () => {
  const ref = useRef();
  useEffect(() => {
    const typed = new Typed(ref.current, {
      strings,
      typeSpeed: 200,
      loop: true,
    });
    return typed.destroy;
  }, []);
  return (
    <div className={styles.typed}>
      <div ref={ref}></div>
    </div>
  );
};

export default memo(T);
