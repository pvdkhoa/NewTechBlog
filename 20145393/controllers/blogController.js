const express = require('express');
const router = express.Router();
const blogModel = require('../models/blogModel');
const comment = require('../models/comment');


// Trang chủ - Danh sách bài post
router.get('/', (req, res) => {
  const posts = blogModel.getAllPosts();
  res.render('index', { posts,isPost: false ,isEdit: false});
});

router.post('/post/:id', (req, res) => {
  const postId = req.params.id;
  const post = blogModel.getPostById(postId);
  res.render('post', { post });
});
//Add comment
router.post('/post/:id/comment', (req, res) => {
  const postId = (req.params.id);
  const comment = req.body.comment;
  console.log(postId)
  console.log(comment)

  const comments = blogModel.addCmt(postId,comment)
  console.log(comments)
  if (!comments) {
    // Xử lý trường hợp bài viết không tồn tại
    res.status(404).send("Bài viết không tồn tại.");
    return;
}

  // post.comments.push(comment);
  res.redirect(`/post/${postId}`);

});
// Chi tiết bài post
router.get('/post/:id', (req, res) => {
  const postId = req.params.id;

  const post = blogModel.getPostById(postId);
  res.render('post', { post,isPost: true});
});


// Xóa bài post
router.get('/delete/:id', (req, res) => {
  const postId = req.params.id; 
  blogModel.deletePost(postId);
  res.redirect('/');
});

// Sửa bài post (hiển thị form chỉnh sửa)
router.get('/edit/:id', (req, res) => {
  const postId = req.params.id;
  const post = blogModel.getPostById(postId);
  res.render('edit', { post, isEdit:true});
});

// Sửa bài post (xử lý form chỉnh sửa)
router.post('/edit/:id', (req, res) => {
  const postId = req.params.id;
  const updatedPost = {
    id: postId,
    title: req.body.title,
    content: req.body.content,
  };
  blogModel.updatePost(updatedPost);
  res.redirect('/');
});

// Thêm bài post (hiển thị form thêm mới)
router.get('/add', (req, res) => {
  res.render('add');
});

// Thêm bài post (xử lý form thêm mới)
router.post('/add', (req, res) => {
  const newPost = {
    title: req.body.title,
    content: req.body.content,
  };
  blogModel.addPost(newPost);
  res.redirect('/');
});

module.exports = router;