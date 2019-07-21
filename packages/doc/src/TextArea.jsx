import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import { css, cx } from 'emotion';
import { TextArea, Slider } from '@blueprintjs/core';
import autosize from 'autosize';

const styles = {
  textArea: css`
    label: textArea;
    resize: none;
    width: 100%;
    min-height: 72px;
    max-height: 40vh;
    font-weight: var(--fontWeight);
    margin-top: 8px;
  `,
};

const T = () => {
  const [val, setVal] = useState('試試台北黑體\nTry Taipei Sans TC');
  const [size, setSize] = useState(48);
  const style = useMemo(
    () =>
      css`
        font-size: ${size}px;
      `,
    [size]
  );
  const ref = useRef();
  useEffect(() => {
    const r = ref.current;
    autosize(r);
    return () => autosize.destroy(r);
  }, []);
  useEffect(() => {
    autosize.update(ref.current);
  }, [size]);
  return (
    <div>
      <Slider
        value={size}
        onChange={v => setSize(v)}
        min={8}
        max={128}
        labelStepSize={12}
        labelRenderer={v => `${v}px`}
      />
      <TextArea
        className={cx(styles.textArea, style)}
        value={val}
        onChange={e => setVal(e.target.value)}
        inputRef={ref}
      />
    </div>
  );
};

export default memo(T);
