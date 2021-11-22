import { Button, Form, Input, Rate } from 'antd';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import useInput from '../../../hooks/useInput';
import { addPostAction } from '../../../reducers/postActionCreator';

const FormWrapper = styled(Form)`
  margin: 10px 0 20px;
`;

const SubmitButton = styled(Button)`
  float: right;
`;

const ImageWrapper = styled.div`
  display: inline-block;
`;

const Image = styled.img`
  width: 200px;
`;

const PostForm = () => {
  const { imagePaths, addPostLoading, addPostDone } = useSelector(
    (state) => state.post,
  );
  const dispatch = useDispatch();
  const [postText, onChangePostText, setPostText] = useInput('');
  const [rateValue, setRateValue] = useState(5);
  const imageInput = useRef();

  useEffect(() => {
    if (addPostDone) {
      setPostText('');
      setRateValue(5);
    }
  }, [addPostDone]);

  const onSubmitForm = useCallback(() => {
    dispatch(addPostAction({ postText, rateValue }));
  }, [postText, rateValue]);

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  return (
    <FormWrapper onFinish={onSubmitForm} encType="multipart/form-data">
      <Input.TextArea
        value={postText}
        onChange={onChangePostText}
        maxLength={140}
        placeholder="게시물을 작성해주세요!"
      />
      <Rate allowHalf value={rateValue} onChange={setRateValue} />
      <div>
        <input type="file" multiple hidden ref={imageInput} />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <SubmitButton htmlType="submit" loading={addPostLoading}>
          Submit
        </SubmitButton>
      </div>
      <div>
        {imagePaths.map((v) => (
          <ImageWrapper key={v}>
            <Image src={v} alt={v} />
            <Button>제거</Button>
          </ImageWrapper>
        ))}
      </div>
    </FormWrapper>
  );
};

export default PostForm;
