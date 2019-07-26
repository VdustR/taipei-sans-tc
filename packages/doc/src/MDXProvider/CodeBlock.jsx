import React, { memo, useCallback, useMemo, useState, useEffect } from 'react';
import Prism from 'prismjs';
import components from 'prismjs/components';
import { css, cx } from 'emotion';

const styles = {
  code: css`
    && {
      label: code;
      font-family: 'Victor Mono', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono',
        monospace;
      font-weight: normal;
    }
  `,
};

const nativeLanguages = components.languages;
const nativePairs = Object.assign(
  ...Object.entries(nativeLanguages).map(([key, value]) => ({
    [key]: { key, lang: value },
  }))
);

const pairs = Object.assign(
  ...Object.entries(nativePairs)
    .filter(([key, value]) => value.lang.alias)
    .map(([key, value]) => {
      const alias = Array.isArray(value.lang.alias)
        ? value.lang.alias
        : [value.lang.alias];
      return Object.assign(...alias.map(a => ({ [a]: value })));
    }),
  nativePairs
);

const importLang = async language => {
  const { key, lang } = pairs[language];
  if (!key) {
    return;
  }
  if (lang.require) {
    const req = Array.isArray(lang.require) ? lang.require : [lang.require];
    await Promise.all(req.map(language => importLang(language)));
  }
  await import(`prismjs/components/prism-${key}`);
};

const CodeBlock = ({ children, className }) => {
  const language = useMemo(
    () => (className ? className.replace(/language-/, '') : ''),
    [className]
  );
  const { key } = useMemo(() => pairs[language] || {}, [language]);
  const canBeHighlighted = useMemo(() => Boolean(key), [key]);
  const [isReady, setIsReady] = useState(!canBeHighlighted);
  useEffect(() => {
    let isCanceled = false;
    setIsReady(!canBeHighlighted);
    if (canBeHighlighted) {
      (async () => {
        await importLang(language);
        if (isCanceled) return;
        setIsReady(true);
      })();
    }
    return () => {
      isCanceled = true;
    };
  }, [canBeHighlighted, language]);
  const html = useMemo(() => {
    if (!isReady || !canBeHighlighted) {
      return Prism.util.encode(children);
    }
    return Prism.highlight(children, Prism.languages[language], language);
  }, [canBeHighlighted, children, isReady, language]);
  const createMarkup = useCallback(() => ({ __html: html }), [html]);
  return (
    <code
      className={cx(styles.code, `language-${language}`)}
      dangerouslySetInnerHTML={createMarkup()}
    />
  );
};

export default memo(CodeBlock);
