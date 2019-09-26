import { memo } from 'react';
import { MDXProvider } from '@mdx-js/react';
import CodeBlock from './CodeBlock';
import { Link } from 'react-scroll';

const components = {
  a: (() => {
    const A = ({ href, children, ...props }) => {
      // ref: https://github.com/vuejs/vuepress/blob/master/packages/%40vuepress/theme-default/util/index.js
      if (href && href.match(/^(https?:|mailto:|tel:|[a-zA-Z]{4,}:)/))
        return (
          <a {...props} href={href} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        );

      // internal
    };
    return memo(A);
  })(),
  code: CodeBlock,
  h1: (() => {
    const H1 = ({ children, ...props }) => (
      <Link to={encodeURIComponent(children)} hashSpy smooth duration={500}>
        <h1 id={encodeURIComponent(children)} {...props}>
          {children}
        </h1>
      </Link>
    );
    return memo(H1);
  })(),
  h2: (() => {
    const H2 = ({ children, ...props }) => (
      <Link to={encodeURIComponent(children)} hashSpy smooth duration={500}>
        <h2 id={encodeURIComponent(children)} {...props}>
          {children}
        </h2>
      </Link>
    );
    return memo(H2);
  })(),
  h3: (() => {
    const H3 = ({ children, ...props }) => (
      <Link to={encodeURIComponent(children)} hashSpy smooth duration={500}>
        <h3 id={encodeURIComponent(children)} {...props}>
          {children}
        </h3>
      </Link>
    );
    return memo(H3);
  })(),
  h4: (() => {
    const H4 = ({ children, ...props }) => (
      <Link to={encodeURIComponent(children)} hashSpy smooth duration={500}>
        <h4 id={encodeURIComponent(children)} {...props}>
          {children}
        </h4>
      </Link>
    );
    return memo(H4);
  })(),
  h5: (() => {
    const H5 = ({ children, ...props }) => (
      <Link to={encodeURIComponent(children)} hashSpy smooth duration={500}>
        <h5 id={encodeURIComponent(children)} {...props}>
          {children}
        </h5>
      </Link>
    );
    return memo(H5);
  })(),
  h6: (() => {
    const H6 = ({ children, ...props }) => (
      <Link to={encodeURIComponent(children)} hashSpy smooth duration={500}>
        <h6 id={encodeURIComponent(children)} {...props}>
          {children}
        </h6>
      </Link>
    );
    return memo(H6);
  })(),
};

const P = props => <MDXProvider components={components} {...props} />;

export default memo(P);
