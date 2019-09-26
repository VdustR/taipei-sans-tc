import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { css } from '@emotion/core';
import { TextArea, Slider } from '@blueprintjs/core';
import autosize from 'autosize';

const styles = {
  textArea: css`
    resize: none;
    width: 100%;
    min-height: 72px;
    max-height: 40vh;
    font-weight: var(--fontWeight);
    margin-top: 8px;
  `,
  sliders: css`
    padding: 0 32px;
    display: grid;
    grid-template-areas:
      'weight'
      'size';
    grid-column-gap: 32px;
    grid-row-gap: 8px;
    @media (min-width: 1024px) {
      grid-template-areas: 'weight size';
    }
  `,
  weight: css`
    grid-area: weight;
  `,
  size: css`
    grid-area: size;
  `,
};

const labelRenderer = v => (
  <span
    css={css`
      font-weight: ${v};
    `}
  >
    {v}
  </span>
);

const T = () => {
  const [val, setVal] = useState('試試台北黑體\nTry Taipei Sans TC');
  const [size, setSize] = useState(48);
  const [weight, setWeight] = useState(400);
  const style = useMemo(
    () =>
      css`
        font-size: ${size}px;
        font-weight: ${weight};
      `,
    [size, weight]
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
      <div css={styles.sliders}>
        <Slider
          value={weight}
          onChange={v => setWeight(v < 1 ? 1 : v)}
          min={100}
          max={900}
          stepSize={100}
          labelStepSize={200}
          labelRenderer={labelRenderer}
        />
        <Slider
          value={size}
          onChange={setSize}
          min={8}
          max={128}
          labelStepSize={30}
          labelRenderer={v => `${v}px`}
        />
      </div>
      <TextArea
        css={[styles.textArea, style]}
        value={val}
        onChange={e => setVal(e.target.value)}
        inputRef={r => {
          ref.current = r;
        }}
      />
    </div>
  );
};

export default memo(T);
