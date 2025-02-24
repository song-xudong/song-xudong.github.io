var posts=["2024/11/16/AutoDock分子对接/","2025/01/16/LLM大模型（一）/","2024/11/18/Ribo-seq翻译组学/","2025/02/24/MATLAB影像数据处理(一)/","2025/01/14/国家奖学金/","2024/11/22/宏基因组/","2024/11/16/论文2/","2024/11/16/论文1/","2024/11/16/转录组上游分析/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };