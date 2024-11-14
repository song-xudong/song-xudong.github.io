var posts=["2024/11/14/hello-world/","2024/11/14/博客/","2024/11/14/test1/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };