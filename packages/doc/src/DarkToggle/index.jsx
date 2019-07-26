import React, { memo, useContext } from 'react';
import { css } from 'emotion';
import { Switch } from '@blueprintjs/core';
import Context from './Context';

const styles = {
  switch: css`
    label: switch;
    font-family: var(--defaultFontFamily);
    margin-bottom: 0;
    margin-left: 16px;
  `,
};

const DarkToggle = () => {
  const { dark, setDark } = useContext(Context);
  return (
    <Switch
      className={styles.switch}
      checked={dark}
      onChange={e => setDark(Boolean(e.target.checked))}
      innerLabelChecked="🌙"
      innerLabel="☀️"
      large
    />
  );
};

export default memo(DarkToggle);
