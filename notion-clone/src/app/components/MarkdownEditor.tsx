import React, { useState, useRef, useEffect } from 'react';
import { MarkdownEditorProps } from '../types/MarkdownEditor';
import LanguageIcon from '@mui/icons-material/Language';

interface LinkPreviewProps {
  link: string;
  text: string;
}

const LinkPreview: React.FC<LinkPreviewProps> = ({ link, text }) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  return <div className='link-preview'>
    <a href={link} target='_blank'>
      <LanguageIcon sx={{ cursor: "pointer", fontSize: 12 }} />
      {text}
    </a>
    <iframe src={link} ref={iframeRef} title="iframe"></iframe>
  </div>
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ insertTextAreaValue, isHome = null, saveContentTextArea, newTextArea, removeEmpty, id }) => {
  const [markdownText, setMarkdownText] = useState('');
  const [showTextArea, setShowTextArea] = useState(true);
  const [textSpaceElementHeight, setTextSpaceElementHeight] = useState<number | null>(null);
  const [htmlContent, setHtmlContent] = useState('');
  const [showLinkPreview, setShowLinkPreview] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const [link, setLink] = useState('');
  const [linkText, setLinkText] = useState('');

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const textSpaceRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const markdownValue = event?.target?.value ?? '';
    setMarkdownText(markdownValue);

    const textAreaElement = textAreaRef?.current;
    if (textAreaElement) textAreaElement.style.height = `${textAreaElement.scrollHeight}px`
  };

  const convertMarkdownToHTML = async (markdown: string) => {
    try {
      let isTextTag = true;
      if (!markdown) {
        setHtmlContent(markdown)
        return;
      }

      markdown = markdown.replace(/\[([^\]]+)\]\(([^\s)]+)\)/g, (_, linkText, url) => {

        isTextTag = false;
        setIsLink(true);
        setLink(url);
        setLinkText(linkText);
        return `<a>${linkText}</a>`;
      });

      markdown = markdown.replace(/^(#{1,6})\s(.*?)$/gm, (_, headerLevel, headerText) => {
        const level = headerLevel.length;
        return `<h${level}>${headerText}</h${level}>`;
      });

      if (isTextTag) {
        markdown = markdown.split('\n\n').map(paragraph => `<p>${paragraph}</p>`).join('');

        setIsLink(false);
        setLink('');
        setLinkText('');
      }

      markdown = markdown.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
      markdown = markdown.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      markdown = markdown.replace(/\*(.*?)\*/g, '<em>$1</em>');

      markdown = markdown.replace(/^\s*-\s(.*?)$/gm, '<li>$1</li>');
      markdown = markdown.replace(/^\s*\*\s(.*?)$/gm, '<li>$1</li>');

      markdown = markdown.replace(/(?:<li>.*<\/li>\n?)+/g, listItems => {
        return `<ul>${listItems}</ul>`;
      });

      setHtmlContent(markdown)
    } catch {
      setHtmlContent('')
    }
  }

  const handleDivClick = async () => {
    setShowTextArea(true);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      if (!isHome) newTextArea();
      event.preventDefault();
      setShowTextArea(true);
      setShowLinkPreview(false);
    }
  };

  const handleBlur = async () => {
    if (!markdownText && !insertTextAreaValue) {
      if (!isHome) removeEmpty(id);
      return;
    }

    await convertMarkdownToHTML(markdownText);

    setShowTextArea(false);
    setShowLinkPreview(false);
  };

  const handleHoverLink = async () => {
    if (isLink) setShowLinkPreview(true);
  }

  const handleMouseLeave = async () => {
    setShowLinkPreview(false);
  }

  const calcTextSpaceElement = async () => {
    const textSpaceEl = textSpaceRef?.current;
    const textAreaElement = textAreaRef.current;

    if (!showTextArea && textSpaceEl) setTextSpaceElementHeight(textSpaceEl.clientHeight);
    if (showTextArea && textSpaceElementHeight && textAreaElement?.style) textAreaElement.style.height = `${textSpaceElementHeight}px`
  };

  const initPageData = async () => {
    if (insertTextAreaValue) {
      setMarkdownText(insertTextAreaValue)
      convertMarkdownToHTML(insertTextAreaValue);
    }
  };

  useEffect(() => {
    const textAreaElement = textAreaRef?.current;
    if (textAreaElement) {
      textAreaElement.focus();
      textAreaElement.selectionStart = textAreaElement.value.length;
      textAreaElement.selectionEnd = textAreaElement.value.length;
    }

    calcTextSpaceElement();
  }, [showTextArea]);

  useEffect(() => {
    initPageData()
  }, [insertTextAreaValue])

  useEffect(() => {
    if (markdownText && !isHome) saveContentTextArea(id, markdownText)

    const textAreaElement = textAreaRef?.current;
    if (textAreaElement && htmlContent) {
      textAreaElement.blur();
    }
  }, [htmlContent])

  return (
    showTextArea && !isHome ? (
      <textarea
        id="text-area"
        ref={textAreaRef}
        value={markdownText}
        onKeyDown={handleKeyDown}
        onChange={handleInputChange}
        onBlur={handleBlur}
        cols={50}
        style={{ width: '100%' }}
      />
    ) : (
      <div className='text-space-wrapper' onMouseLeave={handleMouseLeave} >
        <div
          onClick={handleDivClick}
          onMouseEnter={handleHoverLink}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
          ref={textSpaceRef}
          id="text-space"
          className={`text-space ${showLinkPreview ? 'is-link' : null}`}
        />
        {showLinkPreview && <LinkPreview link={link} text={linkText} />}
      </div>
    )
  );
};

export default MarkdownEditor

