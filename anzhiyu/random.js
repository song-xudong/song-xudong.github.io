var posts=["2024/11/16/论文2/","2024/11/16/AutoDock分子对接/","2024/11/16/转录组上游分析/","2024/11/16/论文1/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };