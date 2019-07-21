import React, { memo } from 'react';
import { css } from 'emotion';
import Article from './Article.mdx';

const styles = {
  usage: css`
    label: usage;
    text-align: left;
    width: 100%;
    overflow: auto;
  `,
};

const Content = props => (
  <div className={styles.usage}>
    <Article />
  </div>
);

export default memo(Content);
