---
title: "LLM大模型（一）"
date: 2025-01-16 13:55:12
updated: 2025-02-24 18:20:48
categories:
  - "生物信息学"
tags:
  - "AI"
  - "机器学习"
cover: "/picture/image-20250116135716298.png"
description: "LLM大模型的概念参考视频：https:&#x2F;&#x2F;www.bilibili.com&#x2F;video&#x2F;BV1XS411w7qr?spm_id_from&#x3D;333.788.videopod.episodes&amp;vd_source&#x3D;b938c9620af06f4224f5fd4db315cbd4&amp;p&#"
---

# LLM大模型的概念

参考视频：[https://www.bilibili.com/video/BV1XS411w7qr?spm\_id\_from=333.788.videopod.episodes&vd\_source=b938c9620af06f4224f5fd4db315cbd4&p=2](https://www.bilibili.com/video/BV1XS411w7qr?spm_id_from=333.788.videopod.episodes&vd_source=b938c9620af06f4224f5fd4db315cbd4&p=2)

![image-20250116135716298](/picture/image-20250116135716298.png)

-   LLM（Large Language Models）大模型指的是使用大量参数和数据的语言模型，它们能够理解和生成自然语言文本。这些模型通常基于深度学习技术，尤其是变换器（Transformer）架构。
-   LLM是AI在自然语言处理（NLP）领域的一种应用，它们能够理解和生成自然语言，应用于机器翻译、文本摘要、问答系统等众多场景。

## 生成式AI的概念

![image-20250116143753854](/picture/image-20250116143753854.png)

ChatGPT也是AI的一个实例，它利用了LLM的强大能力，通过对话的形式与用户交互。

可以理解为生成式AI是机器学习、深度学习的高阶体现。

# 生成式AI的使用

## 生成ChatGPT的API

收费，但刚创建账号时有一定额度，会到期！

[https://platform.openai.com/settings/organization/api-keys](https://platform.openai.com/settings/organization/api-keys)

直接在openai的网站生成即可（需要连接外网）

注意生成时复制，因为只会展示一次。

![image-20250117173643868](/picture/image-20250117173643868.png)

## 生成Gemine的API

由Google开发，免费

[https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)

注意API不要透露给他人

![image-20250117174603168](/picture/image-20250117174603168.png)

# 在平台上使用ChatGPT-api

代码参:[https://github.com/Hoper-J/AI-Guide-and-Demos-zh\_CN/tree/master](https://github.com/Hoper-J/AI-Guide-and-Demos-zh_CN/tree/master)

由于生成式AI的开发是较为复杂的，并且暂未完全开源，学习的初级阶段先掌握ChatGPT的使用

在colab上使用[https://colab.research.google.com/drive/](https://colab.research.google.com/drive/)

需要翻墙，由于国内无法直连ChatGPT，很多报错只是由于网络问题

## 基本结构

<table><tbody><tr><td class="code"><pre><span class="line">!pip install openai</span><br><span class="line">!pip install gradio</span><br><span class="line"></span><br><span class="line"></span><br><span class="line"><span class="comment">##基本结构</span></span><br><span class="line"><span class="keyword">from</span> openai <span class="keyword">import</span> OpenAI</span><br><span class="line"><span class="keyword">import</span> openai</span><br><span class="line"><span class="keyword">import</span> gradio <span class="keyword">as</span> gr</span><br><span class="line"><span class="keyword">import</span> json</span><br><span class="line"><span class="keyword">from</span> typing <span class="keyword">import</span> <span class="type">List</span>, <span class="type">Dict</span>, <span class="type">Tuple</span></span><br><span class="line"></span><br><span class="line">client = OpenAI(</span><br><span class="line">    <span class="comment"># defaults to os.environ.get("OPENAI_API_KEY")</span></span><br><span class="line">    api_key=<span class="string">"自己的API"</span>,</span><br><span class="line">    base_url=<span class="string">"https://models.inference.ai.azure.com"</span></span><br><span class="line">    <span class="comment"># base_url="https://api.chatanywhere.org/v1"</span></span><br><span class="line">)</span><br><span class="line">response = client.chat.completions.create(</span><br><span class="line">        model=<span class="string">"gpt-4o"</span>,</span><br><span class="line">        messages=[{<span class="string">'role'</span>: <span class="string">'user'</span>, <span class="string">'content'</span>: <span class="string">'请告诉我关于机器学习的基本概念'</span>}],</span><br><span class="line">        max_tokens=<span class="number">100</span>,</span><br><span class="line">)</span><br><span class="line">message_content = response.choices[<span class="number">0</span>].message.content</span><br><span class="line"><span class="built_in">print</span>(message_content)</span><br></pre></td></tr></tbody></table>

# 使用 API 快速搭建你的第一个 AI 应用

## 测试API

<table><tbody><tr><td class="code"><pre><span class="line">!pip install openai</span><br><span class="line">!pip install gradio</span><br><span class="line"></span><br><span class="line">import os</span><br><span class="line">import json</span><br><span class="line">from typing import List, Dict, Tuple</span><br><span class="line"></span><br><span class="line">import openai</span><br><span class="line">import gradio as gr</span><br><span class="line"></span><br><span class="line"># TODO: 设置你的 OPENAI API 密钥，这里以阿里云 DashScope API 为例进行演示</span><br><span class="line">OPENAI_API_KEY = "自己的API"</span><br><span class="line"></span><br><span class="line"></span><br><span class="line">client = openai.OpenAI(</span><br><span class="line">    api_key=OPENAI_API_KEY,</span><br><span class="line">    base_url="https://models.inference.ai.azure.com",  # 使用GitHub的CatGPT的API</span><br><span class="line">)</span><br><span class="line"></span><br><span class="line"># 检查是否正确设置了 API</span><br><span class="line"># 如果一切正常，你将看到 "API 设置成功！！"</span><br><span class="line">try:</span><br><span class="line">    response = client.chat.completions.create(</span><br><span class="line">            model="gpt-4o",  # 可以使用gpt-4o或者gpt-4o-mini，资源有限</span><br><span class="line">            messages=[{'role': 'user', 'content': "测试"}],  # 设置一个简单的测试消息</span><br><span class="line">            max_tokens=1,</span><br><span class="line">    )</span><br><span class="line">    print("API 设置成功！！")  # 输出成功信息</span><br><span class="line">except Exception as e:</span><br><span class="line">    print(f"API 可能有问题，请检查：{e}")  # 输出详细的错误信息</span><br></pre></td></tr></tbody></table>

如果调用成功则会显示

![image-20250118155515388](/picture/image-20250118155515388.png)

API 设置成功！！

## 文章摘要（单轮对话应用）

在此任务中，你需要将你的聊天机器人变为一个**摘要器**。它的工作是当用户输入一篇文章时，能够为用户总结该文章的内容。

你需要完成以下步骤：

1.  设计一个用于生成摘要的提示词，并填写在 **prompt\_for\_summarization** 中。
2.  **点击运行按钮**， 这将弹出一个可交互的界面。
3.  你可以找到一篇文章或使用当前的示例文章：《从百草园到三味书屋》，并将其填写在标记为“文章”的输入框中。
4.  点击“发送”按钮生成文章的摘要。（你可以使用“温度”滑块来控制输出的创造性，温度越高，输出越具创造性）。
5.  如果你**想更改提示词**，可以停止单元格，返回到TODO部分进行更改，然后再次运行。
6.  在你获得满意的结果后，点击“导出”按钮保存结果。文件列表中将出现一个名为 **part1.json** 的文件。

注意：

-   **如果你再次点击“导出”按钮，之前的结果将被覆盖。**
-   **即使使用相同的提示词，输出的结果可能仍然不同。**

* * *

在运行此单元格之前，请确保已运行 **安装包** 和 **导入与设置**。

**记得在进行下一步前停止此单元格。**

<table><tbody><tr><td class="code"><pre><span class="line"><span class="comment"># <span class="doctag">TODO:</span> 在此处输入用于摘要的提示词</span></span><br><span class="line">prompt_for_summarization = <span class="string">"请将以下文章概括成几句话。"</span></span><br><span class="line"></span><br><span class="line"><span class="comment"># 重置对话的函数</span></span><br><span class="line"><span class="keyword">def</span> <span class="title function_">reset</span>() -&gt; <span class="type">List</span>:</span><br><span class="line">    <span class="keyword">return</span> []</span><br><span class="line"></span><br><span class="line"><span class="comment"># 调用模型生成摘要的函数</span></span><br><span class="line"><span class="keyword">def</span> <span class="title function_">interact_summarization</span>(<span class="params">prompt: <span class="built_in">str</span>, article: <span class="built_in">str</span>, temp=<span class="number">1.0</span></span>) -&gt; <span class="type">List</span>[<span class="type">Tuple</span>[<span class="built_in">str</span>, <span class="built_in">str</span>]]:</span><br><span class="line">    <span class="string">'''</span></span><br><span class="line"><span class="string">    * 参数:</span></span><br><span class="line"><span class="string">      - prompt: 我们在此部分中使用的提示词</span></span><br><span class="line"><span class="string">      - article: 需要摘要的文章</span></span><br><span class="line"><span class="string">      - temp: 模型的温度参数。温度用于控制聊天机器人的输出。温度越高，响应越具创造性。</span></span><br><span class="line"><span class="string">    '''</span></span><br><span class="line">    <span class="built_in">input</span> = <span class="string">f"<span class="subst">{prompt}</span>\n<span class="subst">{article}</span>"</span></span><br><span class="line">    response = client.chat.completions.create(</span><br><span class="line">        model=<span class="string">"gpt-4o"</span>,  <span class="comment"># 使用阿里云 DashScope 的模型</span></span><br><span class="line">        messages=[{<span class="string">'role'</span>: <span class="string">'user'</span>, <span class="string">'content'</span>: <span class="built_in">input</span>}],</span><br><span class="line">        temperature=temp,</span><br><span class="line">        max_tokens=<span class="number">200</span>,  <span class="comment"># 你需要注意到这里设置了文本的长度上限。</span></span><br><span class="line">    )</span><br><span class="line"></span><br><span class="line">    <span class="keyword">return</span> [(<span class="built_in">input</span>, response.choices[<span class="number">0</span>].message.content)]</span><br><span class="line"></span><br><span class="line"><span class="comment">##对话导出为本文件夹下为的part1.json文件</span></span><br><span class="line"><span class="keyword">def</span> <span class="title function_">export_summarization</span>(<span class="params">chatbot: <span class="type">List</span>[<span class="type">Tuple</span>[<span class="built_in">str</span>, <span class="built_in">str</span>]], article: <span class="built_in">str</span></span>) -&gt; <span class="literal">None</span>:</span><br><span class="line">    <span class="string">'''</span></span><br><span class="line"><span class="string">    * 参数:</span></span><br><span class="line"><span class="string">      - chatbot: 模型的对话记录，存储在元组列表中</span></span><br><span class="line"><span class="string">      - article: 需要摘要的文章</span></span><br><span class="line"><span class="string">    '''</span></span><br><span class="line">    target = {<span class="string">"chatbot"</span>: chatbot, <span class="string">"article"</span>: article}</span><br><span class="line">    <span class="keyword">with</span> <span class="built_in">open</span>(<span class="string">"part1.json"</span>, <span class="string">"w"</span>) <span class="keyword">as</span> file:</span><br><span class="line">        json.dump(target, file)</span><br><span class="line"></span><br><span class="line"><span class="comment"># 生成 Gradio 的UI界面</span></span><br><span class="line"><span class="keyword">with</span> gr.Blocks() <span class="keyword">as</span> demo:</span><br><span class="line">    gr.Markdown(<span class="string">"# 第1部分：摘要\n填写任何你喜欢的文章，让聊天机器人为你总结！"</span>)</span><br><span class="line">    chatbot = gr.Chatbot()</span><br><span class="line">    prompt_textbox = gr.Textbox(label=<span class="string">"提示词"</span>, value=prompt_for_summarization, visible=<span class="literal">False</span>)</span><br><span class="line">    article_textbox = gr.Textbox(label=<span class="string">"文章"</span>, interactive=<span class="literal">True</span>, value=<span class="string">"我家的后面有一个很大的园，相传叫作百草园。现在是早已并屋子一起卖给朱 文公的子孙了，连那最末次的相见也已经隔了七八年，其中似乎确凿只有一些野草 ；但那时却是我的乐园。 　　不必说碧绿的菜畦，光滑的石井栏，高大的皂荚树，紫红的桑椹；也不必说鸣 蝉在树叶里长吟，肥胖的黄蜂伏在菜花上，轻捷的叫天子（云雀）忽然从草间直窜 向云霄里去了。单是周围的短短的泥墙根一带，就有无限趣味。油蛉在这里低唱， 蟋蟀们在这里弹琴。翻开断砖来，有时会遇见蜈蚣；还有斑蝥，倘若用手指按住它 的脊梁，便会拍的一声，从后窍喷出一阵烟雾。何首乌藤和木莲藤缠络着，木莲有 莲房一般的果实，何首乌有拥肿的根。有人说，何首乌根是有象人形的，吃了便可 以成仙，我于是常常拔它起来，牵连不断地拔起来，也曾因此弄坏了泥墙，却从来 没有见过有一块根象人样。如果不怕刺，还可以摘到覆盆子，象小珊瑚珠攒成的小 球，又酸又甜，色味都比桑椹要好得远。 　 　　长的草里是不去的，因为相传这园里有一条很大的赤练蛇。 　　长妈妈曾经讲给我一个故事听：先前，有一个读书人住在古庙里用功，晚间， 在院子里纳凉的时候，突然听到有人在叫他。答应着，四面看时，却见一个美女的 脸露在墙头上，向他一笑，隐去了。他很高兴；但竟给那走来夜谈的老和尚识破了 机关。说他脸上有些妖气，一定遇见“美女蛇”了；这是人首蛇身的怪物，能唤人 名，倘一答应，夜间便要来吃这人的肉的。他自然吓得要死，而那老和尚却道无妨 ，给他一个小盒子，说只要放在枕边，便可高枕而卧。他虽然照样办，却总是睡不 着，——当然睡不着的。到半夜，果然来了，沙沙沙！门外象是风雨声。他正抖作 一团时，却听得豁的一声，一道金光从枕边飞出，外面便什么声音也没有了，那金 光也就飞回来，敛在盒子里。后来呢？后来，老和尚说，这是飞蜈蚣，它能吸蛇的 脑髓，美女蛇就被它治死了。 　　结末的教训是：所以倘有陌生的声音叫你的名字，你万不可答应他。　　 　　这故事很使我觉得做人之险，夏夜乘凉，往往有些担心，不敢去看墙上，而且 极想得到一盒老和尚那样的飞蜈蚣。走到百草园的草丛旁边时，也常常这样想。但 直到现在，总还没有得到，但也没有遇见过赤练蛇和美女蛇。叫我名字的陌生声音 自然是常有的，然而都不是美女蛇。 　　冬天的百草园比较的无味；雪一下，可就两样了。拍雪人（将自己的全形印在 雪上）和塑雪罗汉需要人们鉴赏，这是荒园，人迹罕至，所以不相宜，只好来捕鸟 。薄薄的雪，是不行的；总须积雪盖了地面一两天，鸟雀们久已无处觅食的时候才 好。扫开一块雪，露出地面，用一支短棒支起一面大的竹筛来，下面撒些秕谷，棒 上系一条长绳，人远远地牵着，看鸟雀下来啄食，走到竹筛底下的时候，将绳子一 拉，便罩住了。但所得的是麻雀居多，也有白颊的“张飞鸟”，性子很躁，养不过 夜的。 　　这是闰土的父亲所传授的方法，我却不大能用。明明见它们进去了，拉了绳， 跑去一看，却什么都没有，费了半天力，捉住的不过三四只。闰土的父亲是小半天 便能捕获几十只，装在叉袋里叫着撞着的。我曾经问他得失的缘由，他只静静地笑 道：你太性急，来不及等它走到中间去。 　　我不知道为什么家里的人要将我送进书塾里去了，而且还是全城中称为最严厉 的书塾。也许是因为拔何首乌毁了泥墙罢，也许是因为将砖头抛到间壁的梁家去了 罢，也许是因为站在石井栏上跳下来罢，……都无从知道。总而言之：我将不能常 到百草园了。Ａｄｅ，我的蟋蟀们！Ａｄｅ，我的覆盆子们和木莲们！ 　　出门向东，不上半里，走过一道石桥，便是我的先生的家了。从一扇黑油的竹 门进去，第三间是书房。中间挂着一块扁道：三味书屋；扁下面是一幅画，画着一 只很肥大的梅花鹿伏在古树下。没有孔子牌位，我们便对着那扁和鹿行礼。第一次 算是拜孔子，第二次算是拜先生。 　　第二次行礼时，先生便和蔼地在一旁答礼。他是一个高而瘦的老人，须发都花 白了，还戴着大眼镜。我对他很恭敬，因为我早听到，他是本城中极方正，质朴， 博学的人。 　　不知从那里听来的，东方朔也很渊博，他认识一种虫，名曰“怪哉”，冤气所 化，用酒一浇，就消释了。我很想详细地知道这故事，但阿长是不知道的，因为她 毕竟不渊博。现在得到机会了，可以问先生。 　　“先生，‘怪哉’这虫，是怎么一回事？……”我上了生书，将要退下来的时 候，赶忙问。 　　“不知道！”他似乎很不高兴，脸上还有怒色了。 　　我才知道做学生是不应该问这些事的，只要读书，因为他是渊博的宿儒，决不 至于不知道，所谓不知道者，乃是不愿意说。年纪比我大的人，往往如此，我遇见 过好几回了。 　　我就只读书，正午习字，晚上对课。先生最初这几天对我很严厉，后来却好起 来了，不过给我读的书渐渐加多，对课也渐渐地加上字去，从三言到五言，终于到 七言。 　　三味书屋后面也有一个园，虽然小，但在那里也可以爬上花坛去折腊梅花，在 地上或桂花树上寻蝉蜕。最好的工作是捉了苍蝇喂蚂蚁，静悄悄地没有声音。然而 同窗们到园里的太多，太久，可就不行了，先生在书房里便大叫起来：—— 　　“人都到那里去了？” 　　人们便一个一个陆续走回去；一同回去，也不行的。他有一条戒尺，但是不常 用，也有罚跪的规矩，但也不常用，普通总不过瞪几眼，大声道：—— 　　“读书！” 　　于是大家放开喉咙读一阵书，真是人声鼎沸。有念“仁远乎哉我欲仁斯仁至矣 ”的，有念“笑人齿缺曰狗窦大开”的，有念“上九潜龙勿用”的，有念“厥土下 上上错厥贡苞茅橘柚”的……先生自己也念书。后来，我们的声音便低下去，静下 去了，只有他还大声朗读着：—— 　　“铁如意，指挥倜傥，一座皆惊呢～～；金叵罗，颠倒淋漓噫，千杯未醉嗬～ ～……” 　　我疑心这是极好的文章，因为读到这里，他总是微笑起来，而且将头仰起，摇 着，向后面拗过去，拗过去。 　　先生读书入神的时候，于我们是很相宜的。有几个便用纸糊的盔甲套在指甲上 做戏。我是画画儿，用一种叫作“荆川纸”的，蒙在小说的绣像上一个个描下来， 象习字时候的影写一样。读的书多起来，画的画也多起来；书没有读成，画的成绩 却不少了，最成片断的是《荡寇志》和《西游记》的绣像，都有一大本。后来，因 为要钱用，卖给一个有钱的同窗了。他的父亲是开锡箔店的；听说现在自己已经做 了店主，而且快要升到绅士的地位了。这东西早已没有了罢。 　　　　　　　　　　　　　　　　　　 　　九月十八日。"</span>)</span><br><span class="line">    </span><br><span class="line">    <span class="keyword">with</span> gr.Column():</span><br><span class="line">        gr.Markdown(<span class="string">"# 温度调节\n温度用于控制聊天机器人的输出。温度越高，响应越具创造性。"</span>)</span><br><span class="line">        temperature_slider = gr.Slider(<span class="number">0.0</span>, <span class="number">2.0</span>, <span class="number">1.0</span>, step=<span class="number">0.1</span>, label=<span class="string">"温度"</span>)</span><br><span class="line">    </span><br><span class="line">    <span class="keyword">with</span> gr.Row():</span><br><span class="line">        sent_button = gr.Button(value=<span class="string">"发送"</span>)</span><br><span class="line">        reset_button = gr.Button(value=<span class="string">"重置"</span>)</span><br><span class="line"></span><br><span class="line">    <span class="keyword">with</span> gr.Column():</span><br><span class="line">        gr.Markdown(<span class="string">"# 保存结果\n当你对结果满意后，点击导出按钮保存结果。"</span>)</span><br><span class="line">        export_button = gr.Button(value=<span class="string">"导出"</span>)</span><br><span class="line">    </span><br><span class="line">    <span class="comment"># 连接按钮与函数</span></span><br><span class="line">    sent_button.click(interact_summarization, inputs=[prompt_textbox, article_textbox, temperature_slider], outputs=[chatbot])</span><br><span class="line">    reset_button.click(reset, outputs=[chatbot])</span><br><span class="line">    export_button.click(export_summarization, inputs=[chatbot, article_textbox])</span><br><span class="line"></span><br><span class="line"><span class="comment"># 启动 Gradio 界面</span></span><br><span class="line">demo.launch(debug=<span class="literal">True</span>)</span><br></pre></td></tr></tbody></table>

### 检查并打印你的结果

<table><tbody><tr><td class="code"><pre><span class="line"># 加载对话记录的 JSON 文件</span><br><span class="line">with open("part1.json", "r") as f:</span><br><span class="line">    context = json.load(f)</span><br><span class="line"></span><br><span class="line">chatbot = context['chatbot']  # 获取对话记录</span><br><span class="line">article = context['article']  # 获取原始文章</span><br><span class="line">summarization = chatbot[0][-1]  # 获取摘要结果</span><br><span class="line"></span><br><span class="line"># 生成 Gradio 的UI界面</span><br><span class="line">with gr.Blocks() as demo:</span><br><span class="line">    gr.Markdown("# 第1部分：摘要\n你可以查看文章和摘要！")</span><br><span class="line">    chatbot = gr.Chatbot(value=context['chatbot'])  # 加载对话历史</span><br><span class="line">    article_textbox = gr.Textbox(label="文章", interactive=False, value=context['article'])  # 显示原始文章</span><br><span class="line"></span><br><span class="line">    # 构建展示摘要和原文的部分</span><br><span class="line">    with gr.Column():</span><br><span class="line">        gr.Markdown("# 只是一个检查")</span><br><span class="line">        gr.Textbox(label="文章", value=article, show_copy_button=True)  # 显示并允许复制原文</span><br><span class="line">        gr.Textbox(label="摘要", value=summarization, show_copy_button=True)  # 显示并允许复制摘要</span><br><span class="line"></span><br><span class="line"># 启动 Gradio 界面</span><br><span class="line">demo.launch(debug=True)</span><br></pre></td></tr></tbody></table>

## 第2部分：角色扮演（多轮对话应用）

在此任务中，你需要将聊天机器人设定为**角色扮演模式**。你应该为它指定一个角色，然后通过提示让它进入该角色的状态。

你需要完成以下步骤：

1.  想出一个你希望聊天机器人扮演的**角色**，以及一个使聊天机器人进入该角色的提示词。在 **character\_for\_chatbot** 中填写角色，在 **prompt\_for\_roleplay** 中填写提示词。
2.  **点击运行按钮，界面将弹出一个可交互的界面。**
3.  **与聊天机器人进行** 2 轮 **互动**。在标为“输入”的框中输入你想说的话，然后点击“发送”按钮。（你可以使用“温度”滑块来控制输出的创造性。）
4.  如果你**想更改提示词或角色**，可以停止单元格，返回TODO重新设置，然后重新运行单元格。
5.  在你获得满意的结果后，点击“导出”按钮保存结果。文件列表中将出现一个名为 **part2.json** 的文件。

注意：

-   **如果你再次点击“导出”按钮，之前的结果将被覆盖。**
-   **即使使用相同的提示词，输出的结果可能仍然不同。**

* * *

在运行此单元格之前，请确保已运行 **安装包** 和 **导入与设置**。

**记得在进行下一步前停止此单元格。**

<table><tbody><tr><td class="code"><pre><span class="line"># TODO: 填写以下两行：character_for_chatbot 和 prompt_for_roleplay</span><br><span class="line"># 第一个是你希望聊天机器人扮演的角色（注意，真正起作用的实际是prompt）</span><br><span class="line"># 第二个是使聊天机器人扮演某个角色的提示词</span><br><span class="line">character_for_chatbot = "面试官"</span><br><span class="line">prompt_for_roleplay = "我需要你面试我有关AI的知识，仅提出问题"</span><br><span class="line"></span><br><span class="line"># 清除对话的函数</span><br><span class="line">def reset() -&gt; List:</span><br><span class="line">    return []</span><br><span class="line"></span><br><span class="line"># 调用模型生成对话的函数</span><br><span class="line">def interact_roleplay(chatbot: List[Tuple[str, str]], user_input: str, temp=1.0) -&gt; List[Tuple[str, str]]:</span><br><span class="line">    '''</span><br><span class="line">    * 参数:</span><br><span class="line"></span><br><span class="line">      - user_input: 每轮对话中的用户输入</span><br><span class="line"></span><br><span class="line">      - temp: 模型的温度参数。温度用于控制聊天机器人的输出。温度越高，响应越具创造性。</span><br><span class="line"></span><br><span class="line">    '''</span><br><span class="line">    try:</span><br><span class="line">        messages = []</span><br><span class="line">        for input_text, response_text in chatbot:</span><br><span class="line">            messages.append({'role': 'user', 'content': input_text})</span><br><span class="line">            messages.append({'role': 'assistant', 'content': response_text})</span><br><span class="line"></span><br><span class="line">        messages.append({'role': 'user', 'content': user_input})</span><br><span class="line"></span><br><span class="line">        response = client.chat.completions.create(</span><br><span class="line">            model="gpt-4o",  # github模型</span><br><span class="line">            messages=messages,  # 包含用户的输入和对话历史</span><br><span class="line">            temperature=temp,  # 使用温度参数控制创造性</span><br><span class="line">            max_tokens=200,  # 控制输出的最大 token 数量</span><br><span class="line">        )</span><br><span class="line">        chatbot.append((user_input, response.choices[0].message.content))</span><br><span class="line"></span><br><span class="line">    except Exception as e:</span><br><span class="line">        print(f"发生错误：{e}")</span><br><span class="line">        chatbot.append((user_input, f"抱歉，发生了错误：{e}"))</span><br><span class="line">    return chatbot</span><br><span class="line"></span><br><span class="line"># 导出整个对话记录的函数</span><br><span class="line">def export_roleplay(chatbot: List[Tuple[str, str]], description: str) -&gt; None:</span><br><span class="line">    '''</span><br><span class="line">    * 参数:</span><br><span class="line"></span><br><span class="line">      - chatbot: 模型的对话记录，存储在元组列表中</span><br><span class="line"></span><br><span class="line">      - description: 此任务的描述</span><br><span class="line"></span><br><span class="line">    '''</span><br><span class="line">    target = {"chatbot": chatbot, "description": description}</span><br><span class="line">    with open("part2.json", "w") as file:</span><br><span class="line">        json.dump(target, file)</span><br><span class="line"></span><br><span class="line"># 进行第一次对话</span><br><span class="line">first_dialogue = interact_roleplay([], prompt_for_roleplay)</span><br><span class="line"></span><br><span class="line"># 生成 Gradio 的UI界面</span><br><span class="line">with gr.Blocks() as demo:</span><br><span class="line">    gr.Markdown(f"# 第2部分：角色扮演\n聊天机器人想和你玩一个角色扮演游戏，试着与它互动吧！")</span><br><span class="line">    chatbot = gr.Chatbot(value=first_dialogue)</span><br><span class="line">    description_textbox = gr.Textbox(label="机器人扮演的角色", interactive=False, value=f"{character_for_chatbot}")</span><br><span class="line">    input_textbox = gr.Textbox(label="输入", value="")</span><br><span class="line">    </span><br><span class="line">    with gr.Column():</span><br><span class="line">        gr.Markdown("# 温度调节\n温度用于控制聊天机器人的输出。温度越高，响应越具创造性。")</span><br><span class="line">        temperature_slider = gr.Slider(0.0, 2.0, 1.0, step=0.1, label="温度")</span><br><span class="line">    </span><br><span class="line">    with gr.Row():</span><br><span class="line">        sent_button = gr.Button(value="发送")</span><br><span class="line">        reset_button = gr.Button(value="重置")</span><br><span class="line">    </span><br><span class="line">    with gr.Column():</span><br><span class="line">        gr.Markdown("# 保存结果\n当你对结果满意后，点击导出按钮保存结果。")</span><br><span class="line">        export_button = gr.Button(value="导出")</span><br><span class="line"></span><br><span class="line">    # 连接按钮与函数</span><br><span class="line">    sent_button.click(interact_roleplay, inputs=[chatbot, input_textbox, temperature_slider], outputs=[chatbot])</span><br><span class="line">    reset_button.click(reset, outputs=[chatbot])</span><br><span class="line">    export_button.click(export_roleplay, inputs=[chatbot, description_textbox])</span><br><span class="line"></span><br><span class="line"># 启动 Gradio 界面</span><br><span class="line">demo.launch(debug=True)</span><br></pre></td></tr></tbody></table>

# API测试

以chatGPT为例

<table><tbody><tr><td class="code"><pre><span class="line"><span class="comment">#!pip install openai</span></span><br><span class="line"><span class="comment">#!pip install gradio</span></span><br><span class="line"></span><br><span class="line"><span class="keyword">import</span> os</span><br><span class="line"><span class="keyword">import</span> json</span><br><span class="line"><span class="keyword">from</span> typing <span class="keyword">import</span> <span class="type">List</span>, <span class="type">Dict</span>, <span class="type">Tuple</span></span><br><span class="line"></span><br><span class="line"><span class="keyword">import</span> openai</span><br><span class="line"><span class="keyword">import</span> gradio <span class="keyword">as</span> gr</span><br><span class="line"></span><br><span class="line"><span class="comment">###################################</span></span><br><span class="line"><span class="comment">#这里输入API和对应的网站</span></span><br><span class="line"></span><br><span class="line"></span><br><span class="line">OPENAI_API_KEY = <span class="string">"自己的API"</span></span><br><span class="line">OPENAI_API_WEB = <span class="string">"https://api.chatanywhere.tech"</span></span><br><span class="line"></span><br><span class="line"><span class="comment"># 不设置则默认使用环境变量</span></span><br><span class="line"><span class="keyword">if</span> <span class="keyword">not</span> OPENAI_API_KEY:</span><br><span class="line">    OPENAI_API_KEY = os.getenv(<span class="string">'OPENAI_API_KEY'</span>)</span><br><span class="line"></span><br><span class="line">client = openai.OpenAI(</span><br><span class="line">    api_key=OPENAI_API_KEY,</span><br><span class="line">    base_url=OPENAI_API_WEB,</span><br><span class="line">)</span><br><span class="line"></span><br><span class="line"><span class="comment"># 检查是否正确设置了 API</span></span><br><span class="line"><span class="comment"># 如果一切正常，你将看到 "API 设置成功！！"</span></span><br><span class="line"><span class="keyword">try</span>:</span><br><span class="line">    response = client.chat.completions.create(</span><br><span class="line">        model=<span class="string">"gpt-4o-mini"</span>,</span><br><span class="line">        messages=[{<span class="string">"role"</span>: <span class="string">"user"</span>, <span class="string">"content"</span>: <span class="string">"测试"</span>}],  <span class="comment"># 设置一个简单的测试消息</span></span><br><span class="line">        max_tokens=<span class="number">1</span>,</span><br><span class="line">    )</span><br><span class="line">    <span class="built_in">print</span>(<span class="string">"API 设置成功！！"</span>)  <span class="comment"># 输出成功信息</span></span><br><span class="line"><span class="keyword">except</span> Exception <span class="keyword">as</span> e:</span><br><span class="line">    <span class="built_in">print</span>(<span class="string">f"API 可能有问题，请检查：<span class="subst">{e}</span>"</span>)  <span class="comment"># 输出详细的错误信息</span></span><br></pre></td></tr></tbody></table>

如果API配置无误则会返回

![image-20250118190732067](/picture/image-20250118190732067.png)

# API

### github的api

免费，但有次数限制

[https://github.com/marketplace/models/azure-openai/gpt-4o](https://github.com/marketplace/models/azure-openai/gpt-4o)

base\_url=”[https://models.inference.ai.azure.com](https://models.inference.ai.azure.com/)“

## 免费api

免费版支持gpt-3.5-turbo, embedding, gpt-4o-mini, gpt-4。其中gpt-4由于价格过高，每天限制3次调用（0点刷新）。需要更稳定快速的gpt-4请使用付费版

[https://github.com/chatanywhere/GPT\_API\_free?tab=readme-ov-file](https://github.com/chatanywhere/GPT_API_free?tab=readme-ov-file)

-   **转发Host1: `https://api.chatanywhere.tech` (国内中转，延时更低)**
-   **转发Host2: `https://api.chatanywhere.org` (国外使用)**
