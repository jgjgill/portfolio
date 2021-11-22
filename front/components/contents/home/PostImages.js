import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { PlusOutlined } from '@ant-design/icons';
import ImagesZoom from './ImagesZoom';

const PostImages = ({ images }) => {
  const ImgStyle = useMemo(
    () => ({ width: '50%', display: 'inline-block' }),
    [],
  );
  const moreStyle = useMemo(() => ({
    width: '50%',
    display: 'inline-block',
    textAlign: 'center',
    verticalAlign: 'middle',
    cursor: 'pointer',
  }));

  const [showImagesZoom, setShowImagesZoom] = useState(false);

  const onToggleImage = useCallback(() => {
    setShowImagesZoom((prev) => !prev);
  }, [showImagesZoom]);

  if (images.length === 1) {
    return (
      <>
        <img
          role="presentation"
          src={images[0].src}
          alt={images[0].src}
          onClick={onToggleImage}
        />
        {showImagesZoom && (
          <ImagesZoom
            images={images}
            setShowImagesZoom={setShowImagesZoom}
            onClose={onToggleImage}
          />
        )}
      </>
    );
  }

  if (images.length === 2) {
    return (
      <>
        <img
          role="presentation"
          style={ImgStyle}
          src={images[0].src}
          alt={images[0].src}
          onClick={onToggleImage}
        />
        <img
          role="presentation"
          style={ImgStyle}
          src={images[1].src}
          alt={images[1].src}
          onClick={onToggleImage}
        />
        {showImagesZoom && (
          <ImagesZoom
            images={images}
            setShowImagesZoom={setShowImagesZoom}
            onClose={onToggleImage}
          />
        )}
      </>
    );
  }

  return (
    <>
      <img
        role="presentation"
        style={ImgStyle}
        src={images[0].src}
        alt={images[0].src}
        onClick={onToggleImage}
      />
      <div role="presentation" style={moreStyle} onClick={onToggleImage}>
        <PlusOutlined />
        <br />
        {images.length - 1}개의 사진 더보기
      </div>
      {showImagesZoom && (
        <ImagesZoom
          images={images}
          setShowImagesZoom={setShowImagesZoom}
          onClose={onToggleImage}
        />
      )}
    </>
  );
};

PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PostImages;
