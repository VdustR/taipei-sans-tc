import React, { memo, useEffect, useMemo, useState } from 'react';
import { hot } from 'react-hot-loader/root';
import { css, cx } from 'emotion';
import { Colors } from '@blueprintjs/core';
import { MDXProvider } from '@mdx-js/react';
import CodeBlock from './CodeBlock';
import DarkContext from './DarkToggle/Context';
import WeightContext from './WeightSwitcher/Context';
import TopBar from './TopBar';
import Typed from './Typed';
import TextArea from './TextArea';
import Content from './Content';

const styles = {
  app: css`
    label: app;
    --transition: all 0.3s;
    --topBarHeight: 64px;
    --maxBodyWidth: 800px;
    --defaultFontFamily: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
      'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
      'Helvetica Neue', sans-serif;
    font-family: Taipei Sans TC, -apple-system, BlinkMacSystemFont, 'Segoe UI',
      'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
      'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height: 100vh;
    transition: var(--transition);
    & :focus,
    & :focus ~ .bp3-control-indicator {
      outline: none !important;
    }
  `,
  body: css`
    label: body;
    padding-top: var(--topBarHeight);
  `,
  header: css`
    label: header;
    font-size: 20vw;
    text-align: center;
    padding-top: 10vh;
    padding-bottom: 30px;
  `,
  content: css`
    label: content;
    max-width: var(--maxBodyWidth);
    display: grid;
    grid-gap: 64px;
    text-align: center;
    margin: 0 auto;
    padding: 16px;
  `,
  subHeader: css`
    label: subHeader;
    font-size: 64px;
  `,
};

const weightMap = {
  light: 300,
  regular: 400,
  bold: 700,
};

const darkLocalStorageKey = 'dark';

const App = (() => {
  const App = () => {
    const [dark, setDark] = useState(localStorage.getItem(darkLocalStorageKey));
    const darkValue = useMemo(() => ({ dark, setDark }), [dark]);
    useEffect(() => {
      if (dark) {
        localStorage.setItem(darkLocalStorageKey, 'true');
      } else {
        localStorage.removeItem(darkLocalStorageKey);
      }
    }, [dark]);
    const [weight, setWeight] = useState('regular');
    const weightValue = useMemo(() => ({ weight, setWeight }), [weight]);
    const fontWeightStyle = useMemo(
      () => css`
        label: fontWeight;
        --fontWeight: ${weightMap[weight]};
        font-weight: var(--fontWeight);
      `,
      [weight]
    );
    return (
      <MDXProvider
        components={{
          code: CodeBlock,
        }}
      >
        <DarkContext.Provider value={darkValue}>
          <WeightContext.Provider value={weightValue}>
            <div
              className={cx(
                styles.app,
                fontWeightStyle,
                dark && 'bp3-dark',
                dark &&
                  css`
                    background: ${Colors.DARK_GRAY3};
                  `
              )}
            >
              <TopBar />
              <div className={styles.body}>
                <header className={styles.header}>
                  {'台北黑體'}
                  <div className={styles.subHeader}>{'Taipei Sans TC'}</div>
                </header>
                <div className={styles.content}>
                  <Typed />
                  <TextArea />
                  <Content />
                </div>
              </div>
            </div>
          </WeightContext.Provider>
        </DarkContext.Provider>
      </MDXProvider>
    );
  };
  return memo(App);
})();

export default hot(App);
