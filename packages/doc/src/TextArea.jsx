import React, { memo, useEffect, useRef, useState } from 'react';
import { css } from 'emotion';
import { TextArea } from '@blueprintjs/core';
import autosize from 'autosize';

const styles = {
  textArea: css`
    label: textArea;
    resize: none;
    width: 100%;
    min-height: 5em;
    max-height: 20em;
  `,
};

const T = () => {
  const [val, setVal] = useState('試試台北黑體\nTry Taipei Sans TC');
  const ref = useRef();
  useEffect(() => {
    const r = ref.current;
    autosize(r);
    return () => autosize.destroy(r);
  }, []);
  return (
    <TextArea
      className={styles.textArea}
      value={val}
      onChange={e => setVal(e.target.value)}
      inputRef={ref}
    />
  );
};

export default memo(T);
