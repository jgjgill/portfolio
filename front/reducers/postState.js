const postState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: '1',
        nickname: 'jgjgjg',
        avatarNumber: 30,
      },
      content: '첫 번째 게시글! #start',
      rateNumber: 4,
      Images: [
        {
          src: 'https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp',
        },
        {
          src: 'https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp',
        },
        {
          src: 'https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp',
        },
      ],
      Comments: [
        {
          User: {
            id: 2,
            nickname: 'kokokokoko',
            avatarNumber: 40,
          },
          commentId: 2,
          content: 'wowwowow',
        },
        {
          User: {
            id: 1,
            nickname: 'momomomo',
            avatarNumber: 45,
          },
          commentId: 1,
          content: 'kikikiki',
        },
      ],
    },
  ],
  imagePaths: [],

  hasMorePosts: true,

  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,

  addPostLoading: false,
  addPostDone: false,
  addPostError: null,

  removePostLoading: false,
  removePostDone: false,
  removePostError: null,

  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,

  removeCommentLoading: false,
  removeCommentDone: false,
  removeCommentError: null,
};

export default postState;
