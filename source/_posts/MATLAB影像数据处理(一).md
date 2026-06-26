---
title: "MATLAB影像数据处理(一)"
date: 2025-02-24 16:19:02
updated: 2025-02-24 17:27:54
categories:
  - "生物信息学"
tags:
  - "MATLAB"
  - "影像数据处理"
cover: "/picture/fengmian/MATLAB34224.png"
description: "安装参考B站资源和破解方法 https:&#x2F;&#x2F;www.bilibili.com&#x2F;video&#x2F;BV1DoAweWENJ&#x2F;?spm_id_from&#x3D;333.788.top_right_bar_window_default_collection.content.click 成功安装，可以使用 基本函数参考教"
---

# 安装

参考B站资源和破解方法

[https://www.bilibili.com/video/BV1DoAweWENJ/?spm\_id\_from=333.788.top\_right\_bar\_window\_default\_collection.content.click](https://www.bilibili.com/video/BV1DoAweWENJ/?spm_id_from=333.788.top_right_bar_window_default_collection.content.click)

成功安装，可以使用

## 基本函数

参考教程：[https://www.bilibili.com/video/BV1bv411B7wX?spm\_id\_from=333.788.videopod.episodes&vd\_source=b938c9620af06f4224f5fd4db315cbd4](https://www.bilibili.com/video/BV1bv411B7wX?spm_id_from=333.788.videopod.episodes&vd_source=b938c9620af06f4224f5fd4db315cbd4)

![image-20250222163942309](/picture/image-20250222163942309.png)

### 查看帮助

help或者doc加上想要查看帮助的函数

<table><tbody><tr><td class="code"><pre><span class="line">help mkdir</span><br><span class="line">doc mkdir</span><br></pre></td></tr></tbody></table>

路径

cd ..

cd …

语法和linux基本操作一致，较为简单

### 简单尝试

<table><tbody><tr><td class="code"><pre><span class="line"><span class="comment">%这是一个测试文件</span></span><br><span class="line"><span class="comment">%清空变量和界面</span></span><br><span class="line">clc,clear</span><br><span class="line"><span class="comment">%print work directory </span></span><br><span class="line">pwd</span><br><span class="line"><span class="comment">%make directory </span></span><br><span class="line">mkdir <span class="number">123</span></span><br><span class="line"><span class="comment">%remove  directory </span></span><br><span class="line">rmdir <span class="number">123</span></span><br><span class="line"><span class="comment">%list </span></span><br><span class="line">ls</span><br><span class="line"><span class="comment">%尝试声明变量</span></span><br><span class="line">a=<span class="number">1</span>;</span><br><span class="line">b=<span class="number">2</span>;</span><br><span class="line"><span class="comment">%copy file and rename</span></span><br><span class="line">copyfile(<span class="string">"test.m"</span>,<span class="string">"test2.m"</span>)</span><br><span class="line"><span class="comment">%find function load</span></span><br><span class="line">which ls</span><br></pre></td></tr></tbody></table>

![image-20250224142052391](/picture/image-20250224142052391.png)

## 矩阵操作

![image-20250224150915166](/picture/image-20250224150915166.png)

<table><tbody><tr><td class="code"><pre><span class="line"><span class="comment">%产生等差数列,从1开始（默认也为1），每次增加2，最大不超过20</span></span><br><span class="line"><span class="number">1</span>:<span class="number">2</span>:<span class="number">20</span></span><br><span class="line"></span><br><span class="line"><span class="comment">%随机生成0-1之间的数值,5行，3列</span></span><br><span class="line">a=<span class="built_in">rand</span>(<span class="number">5</span>,<span class="number">3</span>)</span><br><span class="line"></span><br><span class="line"><span class="comment">%得到第1行，第2列的数值。</span></span><br><span class="line">a(<span class="number">1</span>,<span class="number">2</span>)</span><br><span class="line"></span><br><span class="line"><span class="comment">%第一列的数值</span></span><br><span class="line">a(:,<span class="number">1</span>)</span><br><span class="line">a(<span class="number">1</span>:<span class="keyword">end</span>,<span class="number">1</span>)</span><br><span class="line"></span><br><span class="line"><span class="comment">%第一行的数值</span></span><br><span class="line">a(<span class="number">1</span>,:)</span><br><span class="line">a(<span class="number">1</span>,<span class="number">1</span>:<span class="keyword">end</span>)</span><br><span class="line"></span><br><span class="line"><span class="comment">%MATLAB的运算以列优先，如果想得到一个矩阵的某个值也可只用一个数值得到</span></span><br><span class="line"><span class="comment">%从列开始数，第7个值</span></span><br><span class="line">a(<span class="number">7</span>)</span><br><span class="line"></span><br><span class="line"><span class="comment">%只取第1，3列</span></span><br><span class="line">a(:,[<span class="number">1</span>,<span class="number">3</span>])</span><br><span class="line"></span><br><span class="line"><span class="comment">%只取，第2,4行，第1，3列的交叉元素</span></span><br><span class="line">a([<span class="number">2</span>,<span class="number">4</span>],[<span class="number">1</span>,<span class="number">3</span>])</span><br><span class="line"></span><br><span class="line"><span class="comment">%矩阵的拼接</span></span><br><span class="line">a = <span class="built_in">rand</span>(<span class="number">1</span>,<span class="number">10</span>); </span><br><span class="line">b = <span class="built_in">rand</span>(<span class="number">1</span>,<span class="number">10</span>); </span><br><span class="line">c = [a b] </span><br><span class="line"><span class="comment">%整行拼接</span></span><br><span class="line">c = [a, b]</span><br><span class="line"><span class="comment">%按列拼接</span></span><br><span class="line">c = [a; b]</span><br></pre></td></tr></tbody></table>

## 简单的循环作业

![image-20250224154809419](/picture/image-20250224154809419.png)

<table><tbody><tr><td class="code"><pre><span class="line"><span class="comment">% 获取当前目录</span></span><br><span class="line">currentDir = pwd;</span><br><span class="line"></span><br><span class="line"><span class="comment">% 定义ori文件夹路径</span></span><br><span class="line">oriDir = fullfile(currentDir, <span class="string">'ori'</span>);</span><br><span class="line"></span><br><span class="line"><span class="comment">% 定义sub文件夹路径</span></span><br><span class="line">subDir = fullfile(currentDir, <span class="string">'sub'</span>);</span><br><span class="line"></span><br><span class="line"><span class="comment">% % 创建sub文件夹</span></span><br><span class="line"><span class="comment">% %if ~exist(subDir, 'dir')</span></span><br><span class="line"><span class="comment">%     mkdir(subDir);</span></span><br><span class="line"><span class="comment">% end</span></span><br><span class="line"></span><br><span class="line"><span class="comment">% 获取ori文件夹中的所有PDF文件</span></span><br><span class="line">pdfFiles = dir(fullfile(oriDir, <span class="string">'*.pdf'</span>))</span><br><span class="line"></span><br><span class="line"><span class="comment">% 遍历每个PDF文件</span></span><br><span class="line"><span class="keyword">for</span> <span class="built_in">i</span> = <span class="number">1</span>:<span class="built_in">length</span>(pdfFiles)</span><br><span class="line">    <span class="comment">% 获取PDF文件名</span></span><br><span class="line">    pdfName = pdfFiles(<span class="built_in">i</span>).name;</span><br><span class="line">    </span><br><span class="line">    <span class="comment">% 提取编号（假设文件名格式为 '编号.pdf'）</span></span><br><span class="line">    [~, name, ~] = fileparts(pdfName);</span><br><span class="line">    folderName = name; <span class="comment">% 假设文件名就是编号</span></span><br><span class="line">    </span><br><span class="line">    <span class="comment">% 创建以编号命名的子文件夹</span></span><br><span class="line">    newFolder = fullfile(subDir, folderName);</span><br><span class="line">    <span class="keyword">if</span> ~exist(newFolder, <span class="string">'dir'</span>)</span><br><span class="line">        mkdir(newFolder);</span><br><span class="line">    <span class="keyword">end</span></span><br><span class="line">    </span><br><span class="line">    <span class="comment">% 移动并重命名PDF文件</span></span><br><span class="line">    sourceFile = fullfile(oriDir, pdfName);</span><br><span class="line">    destinationFile = fullfile(newFolder, <span class="string">'report.pdf'</span>);</span><br><span class="line">    movefile(sourceFile, destinationFile);</span><br><span class="line"><span class="keyword">end</span></span><br><span class="line"></span><br><span class="line"><span class="comment">% 删除sub文件夹及其内容</span></span><br><span class="line">rmdir(subDir, <span class="string">'s'</span>);</span><br><span class="line"></span><br><span class="line"><span class="built_in">disp</span>(<span class="string">'操作完成'</span>);</span><br></pre></td></tr></tbody></table>

可以运行！
