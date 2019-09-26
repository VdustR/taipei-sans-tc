import { memo } from 'react';
import { css } from '@emotion/core';
import Article from './Article.mdx';

const styles = {
  usage: css`
    text-align: left;
    width: 100%;
    overflow: auto;
  `,
};

const Content = props => (
  <div css={styles.usage}>
    <Article />
  </div>
);

export default memo(Content);
