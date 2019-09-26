import { memo, useEffect, useMemo, useState } from 'react';
import { hot } from 'react-hot-loader/root';
import { ClassNames, css } from '@emotion/core';
import { Colors } from '@blueprintjs/core';
import MDXProvider from './MDXProvider';
import DarkContext from './DarkToggle/Context';
import TopBar from './TopBar';
import Typed from './Typed';
import TextArea from './TextArea';
import Content from './Content';

const styles = {
  app: css`
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
    background: var(--background);
    transition: var(--transition);
    & :focus,
    & :focus ~ .bp3-control-indicator {
      outline: none !important;
    }
    &:after {
      content: '';
      display: block;
      width: 100%;
      height: calc(100vh - 36px - 1em);
    }
  `,
  body: css`
    padding-top: var(--topBarHeight);
  `,
  header: css`
    font-size: 20vw;
    text-align: center;
    padding-top: 10vh;
    padding-bottom: 30px;
  `,
  content: css`
    max-width: var(--maxBodyWidth);
    display: grid;
    grid-gap: 64px;
    text-align: center;
    margin: 0 auto;
    padding: 16px;
  `,
  subHeader: css`
    font-size: 64px;
  `,
};

const darkLocalStorageKey = 'dark';

const App = (() => {
  const App = () => {
    const [dark, setDark] = useState(
      localStorage.getItem(darkLocalStorageKey) === 'true'
    );
    const darkValue = useMemo(() => ({ dark, setDark }), [dark]);
    useEffect(() => {
      if (dark) {
        localStorage.setItem(darkLocalStorageKey, 'true');
      } else {
        localStorage.removeItem(darkLocalStorageKey);
      }
    }, [dark]);
    const appStyle = useMemo(
      () =>
        css`
          --background: ${dark ? Colors.DARK_GRAY3 : Colors.WHITE};
        `,
      [dark]
    );
    return (
      <ClassNames>
        {({ cx }) => (
          <MDXProvider>
            <DarkContext.Provider value={darkValue}>
              <div
                css={[styles.app, appStyle]}
                className={cx(dark && 'bp3-dark')}
              >
                <div css={styles.body}>
                  <header css={styles.header}>
                    {'台北黑體'}
                    <div css={styles.subHeader}>{'Taipei Sans TC'}</div>
                  </header>
                  <div css={styles.content}>
                    <Typed />
                    <TextArea />
                    <Content />
                  </div>
                </div>
                <TopBar />
              </div>
            </DarkContext.Provider>
          </MDXProvider>
        )}
      </ClassNames>
    );
  };
  return memo(App);
})();

export default hot(App);
