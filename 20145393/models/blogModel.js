const posts = [];
class Post {
  constructor(id, title, content) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.comments = [];
  }

    //ADD cmt
    static addCmt(id, comment) {
      const post = posts.find((post) => post.id === id);
      if (post) {
        if (!post.comments) {
          post.comments = []; // Đảm bảo rằng 'comments' là một mảng
        }
        post.comments.push(comment);
        return post;
      } else {
        return null;
      }
    }
    
  static getAllPosts() {
    return posts;
  }
  
  static getPostById(id) {
    return posts.find(post => post.id === id);
  }
  
  static addPost(post) {
    post.id = Math.floor((Math.random() * 1000)).toString(); // Tạo ID ngẫu nhiên (cần cải tiến)
    posts.push(post);
  }
  
  static updatePost(updatedPost) {
    const index = posts.findIndex(post => post.id === updatedPost.id);
    if (index !== -1) {
      posts[index] = updatedPost;
    }
  }
  
  static deletePost(id) {
    const index = posts.findIndex(post => post.id === id);
    if (index !== -1) {
      posts.splice(index, 1);
    }
  }


}



module.exports = Post;