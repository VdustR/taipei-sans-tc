import React, { memo, useContext, useMemo } from 'react';
import { css, cx } from 'emotion';
import { Button, ButtonGroup, Colors } from '@blueprintjs/core';
import useDark from '@/DarkToggle/useDark';
import Context from './Context';

const styles = {
  light: css`
    label: light;
    font-weight: 300;
  `,
  regular: css`
    label: regular;
    font-weight: 400;
  `,
  bold: css`
    label: bold;
    font-weight: bold;
  `,
};

const WeightSwitcher = () => {
  const { weight, setWeight } = useContext(Context);
  const dark = useDark();
  const activeStyle = useMemo(
    () =>
      css`
        &&& {
          label: active;
          color: ${dark ? Colors.LIGHT_GRAY1 : Colors.LIGHT_GRAY5};
          background-color: ${dark ? Colors.DARK_GRAY1 : Colors.DARK_GRAY5};
        }
      `,
    [dark]
  );
  return (
    <ButtonGroup>
      <Button
        className={cx(styles.light, weight === 'light' && activeStyle)}
        onClick={() => setWeight('light')}
      >
        Light
      </Button>
      <Button
        className={cx(styles.regular, weight === 'regular' && activeStyle)}
        onClick={() => setWeight('regular')}
      >
        Regular
      </Button>
      <Button
        className={cx(styles.bold, weight === 'bold' && activeStyle)}
        onClick={() => setWeight('bold')}
      >
        Bold
      </Button>
    </ButtonGroup>
  );
};

export default memo(WeightSwitcher);
