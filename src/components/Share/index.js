import React from 'react';
import { ShareButtons, generateShareIcon } from 'react-share';
import styled, { css } from 'styled-components';
import * as customPropTypes from 'customPropTypes';
import PropTypes from 'prop-types';

const { FacebookShareButton, TwitterShareButton } = ShareButtons;
const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');

const inlineStyle = css`
  display: inline-flex;
`;

const Container = styled.div`
  position: relative;
  top: 7px;
  display: inline-block;

  ${prop => prop.inline && inlineStyle} .social-icon {
    &:hover {
      cursor: pointer;
      opacity: 0.8;
    }
  }
`;

const FacebookButton = styled(FacebookShareButton)`
  background-repeat: no-repeat;
  background-size: 12px;
  padding-top: 1px;
`;

const TwitterButton = styled(TwitterShareButton)`
  background-repeat: no-repeat;
  background-size: 21px;
`;

const Share = ({ chapter, verse, inline }) => {
  // Fallback to Surah Id
  let path;
  let text;

  if (verse) {
    const translations = (verse.translations || [])
      .map(translation => translation.resourceId)
      .join(',');
    path = `${verse.chapterId}/${verse.verseNumber}?translations=${translations}`;
    text = verse.translations && verse.translations.length > 0
                    ? verse.translations[0].text : verse.textMadani;
  } else {
    path = chapter.chapterNumber;
  }

  const shareUrl = `https://quran.com/${path}`;
  const title = verse
    ? `Surah ${chapter.nameSimple} [${verse.verseKey}]`
    : `Surah ${chapter.nameSimple}`;
  const iconProps = verse ? { iconBgStyle: { fill: '#d1d0d0' } } : {};

  return (
    <Container inline={inline}>
      <FacebookButton
        url={shareUrl}
        title={title}
        quote={text}
        windowWidth={670}
        windowHeight={540}
      >
        <FacebookIcon size={24} round {...iconProps} />
      </FacebookButton>
      <TwitterButton url={shareUrl} title={title} via={text}>
        <TwitterIcon size={24} round {...iconProps} />
      </TwitterButton>
    </Container>
  );
};

Share.propTypes = {
  chapter: customPropTypes.surahType.isRequired,
  verse: customPropTypes.verseType,
  inline: PropTypes.bool
};

export default Share;
