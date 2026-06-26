---
title: "翻译组分析流程"
date: 2024-11-18 12:07:58
updated: 2024-11-18 12:15:50
categories:
  - "生物信息学"
tags:
  - "生物信息学"
  - "Ribo-seq"
cover: "/picture/fengmian/ribo-seq.png"
description: "Ribo-seq的介绍https:&#x2F;&#x2F;www.cell.com&#x2F;cell-metabolism&#x2F;fulltext&#x2F;S1550-4131(22)00541-1?uuid&#x3D;uuid%3A1357b65f-e2ff-45e2-a40c-7a90f3170be5#mmc2 核糖体分析 (Ribo-seq)"
---

# Ribo-seq的介绍

[https://www.cell.com/cell-metabolism/fulltext/S1550-4131(22)00541-1?uuid=uuid%3A1357b65f-e2ff-45e2-a40c-7a90f3170be5#mmc2](https://www.cell.com/cell-metabolism/fulltext/S1550-4131\(22\)00541-1?uuid=uuid:1357b65f-e2ff-45e2-a40c-7a90f3170be5#mmc2)

核糖体分析 (Ribo-seq) 和蛋白质基因组学的最新进展已经鉴定出数千种未注释的肽和小蛋白质、微生物蛋白质 (MP)，由哺乳动物基因组中的小开放阅读框 (smORF) 编码。

核糖体分析，也称为 Ribo-seq，可生成核糖体保护 RNA 片段 (RPF) 的全基因组分配和定量 ，从而提供整个转录组的翻译（翻译组）的实时快照。

RFs（Ribosome footprints）：核糖体足迹

使用rna-seq的环境

<table><tbody><tr><td class="code"><pre><span class="line">conda activate rna_p3</span><br></pre></td></tr></tbody></table>

# 测试

参考文章

[https://www.sciencedirect.com/science/article/pii/S1525001621001337?via%3Dihub#mmc1](https://www.sciencedirect.com/science/article/pii/S1525001621001337?via=ihub#mmc1)

参考数据

[https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE155899](https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE155899)

## 后台批量下载

<table><tbody><tr><td class="code"><pre><span class="line">nohup prefetch -f no --option-file SRA.txt &amp;</span><br></pre></td></tr></tbody></table>

# SRA文件转为FASTQ格式

## 单个转格式

慢的转换，太慢了，不建议使用

<table><tbody><tr><td class="code"><pre><span class="line">#将当前</span><br><span class="line">fastq-dump --split-3 --gzip ./SRR12207279</span><br></pre></td></tr></tbody></table>

使用这个转换，多线程转换格式，输出的为fq的文件

<table><tbody><tr><td class="code"><pre><span class="line">fasterq-dump --split-3 ./SRR12207283</span><br></pre></td></tr></tbody></table>

## 批量转格式

小命令：删除当前目录SRR文件夹里的所有分文件夹，只保留其文件

<table><tbody><tr><td class="code"><pre><span class="line">find ./SRR -mindepth 1 -type d -exec sh -c 'mv {}/* ./SRR; rmdir {}' \;</span><br></pre></td></tr></tbody></table>

fasterq-dump进行批量转换，将所有 .sra 文件都放在SRR文件夹里

<table><tbody><tr><td class="code"><pre><span class="line"><span class="comment"># 设置输入目录</span></span><br><span class="line">sra_dir<span class="operator">=</span><span class="string">"./SRR"</span></span><br><span class="line"></span><br><span class="line"><span class="comment"># 设置输出目录</span></span><br><span class="line">output_dir<span class="operator">=</span><span class="string">"./fastq-result"</span></span><br><span class="line"></span><br><span class="line"><span class="comment"># 遍历目录中的所有.sra文件</span></span><br><span class="line"><span class="keyword">for</span> sra_file <span class="keyword">in</span> <span class="operator">$</span>sra_dir<span class="operator">/</span><span class="operator">*</span>.sra</span><br><span class="line">do</span><br><span class="line">    <span class="comment"># 获取不带路径的文件名</span></span><br><span class="line">    filename<span class="operator">=</span><span class="operator">$</span><span class="punctuation">(</span>basename <span class="string">"$sra_file"</span> .sra<span class="punctuation">)</span></span><br><span class="line">    </span><br><span class="line">    <span class="comment"># 使用fasterq-dump处理每个文件</span></span><br><span class="line">    fasterq<span class="operator">-</span>dump <span class="operator">-</span><span class="operator">-</span>outdir <span class="string">"$output_dir"</span> <span class="operator">-</span><span class="operator">-</span>split<span class="operator">-</span><span class="number">3</span> <span class="string">"$sra_file"</span></span><br><span class="line">done</span><br></pre></td></tr></tbody></table>

生成在当前路径 ./fastq-result 下的 fastq 文件

# 下载rRNA序列

参考 [https://www.jianshu.com/p/10477f96f12e](https://www.jianshu.com/p/10477f96f12e)

![image-20240905223242161](/picture/image-20240905223242161.png)

![image-20240905223210970](/picture/image-20240905223210970.png)

# cutadapt过滤序列

\-u 4 \\ 可能并不需要

<table><tbody><tr><td class="code"><pre><span class="line">mkdir cutadapt-result</span><br><span class="line"># 将工作目录设置为fastq文件所在的目录</span><br><span class="line">cd ./fastq-result/</span><br><span class="line"></span><br><span class="line"># 将传入的参数赋值给变量</span><br><span class="line">file1_pattern=".fastq"</span><br><span class="line"></span><br><span class="line"># 遍历所有以第一个参数模式结尾的文件</span><br><span class="line">for file1 in *${file1_pattern}; do</span><br><span class="line">    # 从文件名中提取去掉模式后的部分</span><br><span class="line">    base=$(basename "$file1" ${file1_pattern})</span><br><span class="line">    </span><br><span class="line">    # 直接执行trim_galore命令，不需要检查对应的file2是否存在</span><br><span class="line">    (</span><br><span class="line">        echo "找到名为 $base 的文件 $file1"</span><br><span class="line">        #循环执行代码区</span><br><span class="line">        #trim_galore -q 25 --phred33 --length 35 --stringency 3 --paired -o ../clean_data/ "$file1" "$file2"</span><br><span class="line">	cutadapt -j 20 \</span><br><span class="line">  -a "TGGAATTCTCGGGTGCCAAGG" \</span><br><span class="line">  -u 4 \</span><br><span class="line">  -m 24 \</span><br><span class="line">  -M 35 \</span><br><span class="line">  -q 20 \</span><br><span class="line">  --match-read-wildcards \</span><br><span class="line">  --max-n 0.25 \</span><br><span class="line">  -o ../cutadapt-result/${base}_clear.fastq \</span><br><span class="line">  ./${file1}</span><br><span class="line">    ) &amp;</span><br><span class="line">done</span><br><span class="line"></span><br><span class="line"># 等待所有后台进程完成</span><br><span class="line">wait</span><br></pre></td></tr></tbody></table>

# 建立rRNA索引

<table><tbody><tr><td class="code"><pre><span class="line">bowtie2-build rRNA.fasta rattrna</span><br></pre></td></tr></tbody></table>

## bowtie2比对，删除rRNA序列

<table><tbody><tr><td class="code"><pre><span class="line">mkdir bowtie-resule</span><br><span class="line"># 将工作目录设置为fastq文件所在的目录</span><br><span class="line">cd ./cutadapt-result/</span><br><span class="line"></span><br><span class="line"># 将传入的参数赋值给变量</span><br><span class="line">file1_pattern="_clear.fastq"</span><br><span class="line"></span><br><span class="line"># 遍历所有以第一个参数模式结尾的文件</span><br><span class="line">for file1 in *${file1_pattern}; do</span><br><span class="line">    # 从文件名中提取去掉模式后的部分</span><br><span class="line">    base=$(basename "$file1" ${file1_pattern})</span><br><span class="line">    </span><br><span class="line">    # 直接执行trim_galore命令，不需要检查对应的file2是否存在</span><br><span class="line">    (</span><br><span class="line">        echo "找到名为 $base 的文件 $file1"</span><br><span class="line">        #循环执行代码区</span><br><span class="line">        #trim_galore -q 25 --phred33 --length 35 --stringency 3 --paired -o ../clean_data/ "$file1" "$file2"</span><br><span class="line">	bowtie2 -x /public/home/dk_szy/songxudong/riboseq/rRNA/rattrna --un-gz ../bowtie-resule/${base}.fastq.gz -U ./${file1} -p 20 -S ../bowtie-resule/${base}.sam</span><br><span class="line"></span><br><span class="line">    ) &amp;</span><br><span class="line">done</span><br><span class="line"></span><br><span class="line"># 等待所有后台进程完成</span><br><span class="line">wait</span><br></pre></td></tr></tbody></table>

# STAR比对到测序物种基因组

按照网上教程所说，STAR的运行速度是最快的，只是对性能和内存的要求比较高

参考： [https://www.jianshu.com/p/5b6dfc954315](https://www.jianshu.com/p/5b6dfc954315)

## 安装

<table><tbody><tr><td class="code"><pre><span class="line">conda install bioconda::star</span><br></pre></td></tr></tbody></table>

## 下载参考基因组

参考物种为大鼠： [Rattus norvegicus](https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?mode=Info&id=10116)

在ensebml中下载： [https://asia.ensembl.org/Rattus\_norvegicus/Info/Index](https://asia.ensembl.org/Rattus_norvegicus/Info/Index)

![image-20240909084551111](/picture/image-20240909084551111.png)

下载 Rattus\_norvegicus.mRatBN7.2.dna.toplevel.fa.gz

Rattus\_norvegicus.mRatBN7.2.112.gtf.gz

<table><tbody><tr><td class="code"><pre><span class="line">#后台下载</span><br><span class="line">nohup wget -c https://ftp.ensembl.org/pub/release-112/fasta/rattus_norvegicus/dna/Rattus_norvegicus.mRatBN7.2.dna.toplevel.fa.gz &amp;</span><br><span class="line">nohup wget -c https://ftp.ensembl.org/pub/release-112/gtf/rattus_norvegicus/Rattus_norvegicus.mRatBN7.2.112.gtf.gz &amp;</span><br></pre></td></tr></tbody></table>

## 构建索引

将参考基因组和注释解压缩

先统计读取序列的最大长度，决定STAR 的 –sjdbOverhang 参数

[https://blog.csdn.net/qazplm12\_3/article/details/119687084](https://blog.csdn.net/qazplm12_3/article/details/119687084)

<table><tbody><tr><td class="code"><pre><span class="line">conda install -c bioconda seqkit</span><br></pre></td></tr></tbody></table>

<table><tbody><tr><td class="code"><pre><span class="line">seqkit stat *.fastq</span><br></pre></td></tr></tbody></table>

![image-20240909100054216](/picture/image-20240909100054216.png)

可见我们的翻译组最大读长为 31，我们设置 –sjdbOverhang 30

[https://www.jianshu.com/p/9bdad4a4f98f](https://www.jianshu.com/p/9bdad4a4f98f)

<table><tbody><tr><td class="code"><pre><span class="line">gzip -c -d Rattus_norvegicus.mRatBN7.2.112.gtf.gz</span><br><span class="line">gzip -c -d Rattus_norvegicus.mRatBN7.2.dna.toplevel.fa.gz</span><br></pre></td></tr></tbody></table>

<table><tbody><tr><td class="code"><pre><span class="line">cd reference</span><br><span class="line"></span><br><span class="line">STAR \</span><br><span class="line">    --runMode genomeGenerate \</span><br><span class="line">    --runThreadN 20 \</span><br><span class="line">    --genomeDir ./ \</span><br><span class="line">    --genomeFastaFiles ./Rattus_norvegicus.mRatBN7.2.dna.toplevel.fa \</span><br><span class="line">    --sjdbGTFfile ./Rattus_norvegicus.mRatBN7.2.112.gtf \</span><br><span class="line">    --sjdbOverhang 30</span><br></pre></td></tr></tbody></table>

花费20分钟，较其他的软件确实快点

结果，包括序列和注释18个文件

![image-20240910152808887](/picture/image-20240910152808887.png)

## 序列比对

参数参考文章

单个

<table><tbody><tr><td class="code"><pre><span class="line">STAR --outSAMtype BAM SortedByCoordinate \</span><br><span class="line">--runThreadN 20 \</span><br><span class="line">--genomeDir ./reference \</span><br><span class="line">--outFilterMismatchNmax 2 \</span><br><span class="line">--outFilterMultimapNmax 5 \</span><br><span class="line">--outFilterMatchNmin 16 \</span><br><span class="line">--alignEndsType EndToEnd \</span><br><span class="line">--readFilesIn  ./bowtie-resule/SRR12414240.fastq \</span><br><span class="line">--outFileNamePrefix ./star-result/star_output_</span><br></pre></td></tr></tbody></table>

批量

<table><tbody><tr><td class="code"><pre><span class="line"># 将工作目录设置为fastq文件所在的目录</span><br><span class="line">cd ./bowtie-resule/</span><br><span class="line"></span><br><span class="line"># 将传入的参数赋值给变量</span><br><span class="line">file1_pattern=".fastq"</span><br><span class="line"></span><br><span class="line"># 遍历所有以第一个参数模式结尾的文件</span><br><span class="line">for file1 in *${file1_pattern}; do</span><br><span class="line">    # 从文件名中提取去掉模式后的部分</span><br><span class="line">    base=$(basename "$file1" ${file1_pattern})</span><br><span class="line">    </span><br><span class="line">    # 直接执行trim_galore命令，不需要检查对应的file2是否存在</span><br><span class="line">    (</span><br><span class="line">        echo "找到名为 $base 的文件 $file1"</span><br><span class="line">        #循环执行代码区</span><br><span class="line">        #trim_galore -q 25 --phred33 --length 35 --stringency 3 --paired -o ../clean_data/ "$file1" "$file2"</span><br><span class="line">        STAR --outSAMtype BAM SortedByCoordinate \</span><br><span class="line">--runThreadN 20 \</span><br><span class="line">--genomeDir ../reference \</span><br><span class="line">--outFilterMismatchNmax 2 \</span><br><span class="line">--outFilterMultimapNmax 5 \</span><br><span class="line">--outFilterMatchNmin 16 \</span><br><span class="line">--alignEndsType EndToEnd \</span><br><span class="line">--quantMode TranscriptomeSAM \</span><br><span class="line">--readFilesIn  ./${file1} \</span><br><span class="line">--outFileNamePrefix ../star-result/${base}</span><br><span class="line">    ) &amp;</span><br><span class="line">done</span><br><span class="line"></span><br><span class="line"># 等待所有后台进程完成</span><br><span class="line">wait</span><br></pre></td></tr></tbody></table>

得到的 SRR12414240Aligned.toTranscriptome.out.bam

是我们需要的转录本 ribocode 的输入文件

# 生成表达矩阵

<table><tbody><tr><td class="code"><pre><span class="line">gtf='/public/home/dk_szy/songxudong/rna-test/reference/gft/mm10.refGene.gtf.gz'</span><br><span class="line"></span><br><span class="line">mkdir  -p  ./counts</span><br><span class="line"></span><br><span class="line">cd ./counts</span><br><span class="line"></span><br><span class="line">pwd</span><br><span class="line"></span><br><span class="line">featureCounts -T  20  -p  -a  $gtf  -o  counts.txt  ../align/*.bam</span><br><span class="line"></span><br><span class="line">multiqc ./</span><br><span class="line"></span><br><span class="line">echo -e " \n \n \n ALL WORK DONE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  \n "</span><br></pre></td></tr></tbody></table>

# Ribocode分析

参考官方流程: [https://github.com/zhengtaoxiao/RiboCode](https://github.com/zhengtaoxiao/RiboCode)

清华大学教程：[https://book.ncrnalab.org/teaching/part-iii.-ngs-data-analyses/7.rna-regulation-ii/ribo\_seq](https://book.ncrnalab.org/teaching/part-iii.-ngs-data-analyses/7.rna-regulation-ii/ribo_seq)

## conda安装

#不使用，conda安装使用软件时依旧有报错，参考下面通过源码安装

软件对python的版本有要求，单独创建环境

<table><tbody><tr><td class="code"><pre><span class="line">conda create -n ribocode python=2.7</span><br></pre></td></tr></tbody></table>

打开环境

<table><tbody><tr><td class="code"><pre><span class="line">conda activate ribocode</span><br></pre></td></tr></tbody></table>

安装Ribocode

<table><tbody><tr><td class="code"><pre><span class="line">conda install -c bioconda ribocode</span><br></pre></td></tr></tbody></table>

### 补充修改

注意：该软件使用不成功主要为兼容性问题，我采取了conda指定 python=2.7，并且安装 numpy=1.16.5 的方式

<table><tbody><tr><td class="code"><pre><span class="line">conda update h5py</span><br><span class="line">conda install numpy=1.16.5</span><br></pre></td></tr></tbody></table>

## #源码安装（可选）

目前还是报错，参考其他教程说可能是脚本的python版本太早，具体问题不清楚

![image-20240909140051290](/picture/image-20240909140051290.png)

下载 RiboCode-1.2.13.tar.gz

<table><tbody><tr><td class="code"><pre><span class="line">pip install --user  RiboCode-*.tar.gz</span><br></pre></td></tr></tbody></table>

添加环境变量

<table><tbody><tr><td class="code"><pre><span class="line">export PATH=$PATH:$HOME/.local/bin/</span><br><span class="line">export PYTHONPATH=$HOME/.local/lib/python2.7</span><br><span class="line"></span><br><span class="line">source ~/.bashrc</span><br></pre></td></tr></tbody></table>

## 准备注释文件

进入环境

<table><tbody><tr><td class="code"><pre><span class="line">conda activate ribocode</span><br></pre></td></tr></tbody></table>

<table><tbody><tr><td class="code"><pre><span class="line">prepare_transcripts -g ./reference/Rattus_norvegicus.mRatBN7.2.112.gtf -f ./reference/Rattus_norvegicus.mRatBN7.2.dna.toplevel.fa -o ./ribocode-seference</span><br></pre></td></tr></tbody></table>

## 选择RPF读数的长度范围并识别P位点位置

（与P点结合的位置位于整个RFs第13-15个碱基的位置——基迪奥生物）

在这一步花费了过多时间，

主要原因是 python的版本和上一步中STAR的输出文件，需要为转录组的文件–quantMode TranscriptomeSAM \\ 为重要参数

<table><tbody><tr><td class="code"><pre><span class="line">(ribocode) [dk_szy@login1 riboseq]$ python --version</span><br><span class="line">Python 2.7.18 :: Anaconda, Inc.</span><br></pre></td></tr></tbody></table>

单个

<table><tbody><tr><td class="code"><pre><span class="line">metaplots -a ./ribocode-seference/ -r ./star-result/SRR12414240Aligned.toTranscriptome.out.bam \</span><br><span class="line">-o ./test/ \</span><br><span class="line">-m 26 -M 50 -s yes -pv1 1 -pv2 1</span><br></pre></td></tr></tbody></table>

![image-20240910101424560](/picture/image-20240910101424560.png)

批量

需要提供 “-i”参数指定一个包含这些bam文件名称的文本文件（每行一个文件）

<table><tbody><tr><td class="code"><pre><span class="line">cd ./star-result/</span><br><span class="line">metaplots -a ./ribocode-seference/ -i ./test.txt \</span><br><span class="line">-o ./test/ \</span><br><span class="line">-m 26 -M 50 -s yes -pv1 1 -pv2 1</span><br></pre></td></tr></tbody></table>

![image-20240911094820898](/picture/image-20240911094820898.png)

\_pre\_config.txt可用来做

![image-20240923102222043](/picture/image-20240923102222043.png)

## 使用核糖体分析数据检测翻译的ORF：

需要准备config.txt文件，内容从上一部的\_pre\_config.txt中得到，尽量不要修改，直接复制每个的结果即可，不然可能因为缩进等未知原因报错

放在序列文件中

例如：

<table><tbody><tr><td class="code"><pre><span class="line"># List the ribosome profiling bam/sam files below and specify the lengths and P-site locations of alignment reads which</span><br><span class="line"># are most likely originated from the translating ribosomes. If multiple files are defined, their P-site densities along</span><br><span class="line"># each nucleotide would be added together.</span><br><span class="line"></span><br><span class="line"></span><br><span class="line"># Explanation of each column:</span><br><span class="line"># 1. SampleName: specify a name for each sample</span><br><span class="line"># 2. AlignmentFile: ribosome profiling alignment file (bam or sam format) at the transcript-level</span><br><span class="line"># 3. Stranded: Strandedness. Specify 'yes' for stranded interpretation, 'reverse' for reversed strand interpretation, or</span><br><span class="line">#              "no" for non strand-specific libraries.</span><br><span class="line"># 4,5. P-siteReadLength, and P-siteOffsets: the read lengths and P-sites locations.</span><br><span class="line">#      Both of them can be estimated by perform the metagene analysis using our package.</span><br><span class="line">#      List all lengths or P-site locations which separated by ",".</span><br><span class="line"></span><br><span class="line"># SampleName	AlignmentFile	Stranded(yes/reverse)	P-siteReadLength	P-siteLocations</span><br><span class="line">SRR12414240Aligned.toTranscriptome.out	SRR12414240Aligned.toTranscriptome.out.bam	yes	28,29,30,31,32,33,34,35	12,12,12,12,12,12,12,12</span><br><span class="line">SRR12414241Aligned.toTranscriptome.out	SRR12414241Aligned.toTranscriptome.out.bam	yes	28,29,30,31,32,35	12,12,12,12,12,15</span><br><span class="line">SRR12414242Aligned.toTranscriptome.out	SRR12414242Aligned.toTranscriptome.out.bam	yes	28,29,30,31	12,12,12,12</span><br><span class="line">SRR12414243Aligned.toTranscriptome.out	SRR12414243Aligned.toTranscriptome.out.bam	yes	28,29,30,31,33,34	12,12,12,12,12,12</span><br></pre></td></tr></tbody></table>

命令

<table><tbody><tr><td class="code"><pre><span class="line">RiboCode -a ../ribocode-seference/  -c ./config.txt -l no -g -o ../test/</span><br></pre></td></tr></tbody></table>

![image-20240911094748548](/picture/image-20240911094748548.png)

# 测序长度计数

使用 seqkit 对我们使用 bowtie2 筛选后的结果进行统计

<table><tbody><tr><td class="code"><pre><span class="line">seqkit fx2tab -j 20 -l -n -i -H ./bowtie-resule/*.fastq | cut -f 2 | sort | uniq -c &gt; sum.txt</span><br></pre></td></tr></tbody></table>

得到 sum.txt 文件，包含序列长度统计信息

# 计算翻译效率

未尝试

参考： [https://book.ncrnalab.org/teaching/part-iii.-ngs-data-analyses/7.rna-regulation-ii/ribo\_seq](https://book.ncrnalab.org/teaching/part-iii.-ngs-data-analyses/7.rna-regulation-ii/ribo_seq)

<table><tbody><tr><td class="code"><pre><span class="line">library<span class="punctuation">(</span>xtail<span class="punctuation">)</span></span><br><span class="line">ribo <span class="operator">&lt;-</span> read.table<span class="punctuation">(</span><span class="string">'Ribo_count.txt'</span><span class="punctuation">,</span>header<span class="operator">=</span><span class="built_in">T</span><span class="punctuation">,</span> <span class="built_in">quote</span><span class="operator">=</span><span class="string">''</span><span class="punctuation">,</span>check.names<span class="operator">=</span><span class="built_in">F</span><span class="punctuation">,</span> sep<span class="operator">=</span><span class="string">'\t'</span><span class="punctuation">,</span>row.names<span class="operator">=</span><span class="number">1</span><span class="punctuation">)</span></span><br><span class="line">mrna <span class="operator">&lt;-</span> read.table<span class="punctuation">(</span><span class="string">'RNA_count.txt'</span><span class="punctuation">,</span>header<span class="operator">=</span><span class="built_in">T</span><span class="punctuation">,</span> <span class="built_in">quote</span><span class="operator">=</span><span class="string">''</span><span class="punctuation">,</span>check.names<span class="operator">=</span><span class="built_in">F</span><span class="punctuation">,</span> sep<span class="operator">=</span><span class="string">'\t'</span><span class="punctuation">,</span>row.names<span class="operator">=</span><span class="number">1</span><span class="punctuation">)</span></span><br><span class="line"></span><br><span class="line">ribo <span class="operator">&lt;-</span> ribo<span class="punctuation">[</span><span class="punctuation">,</span><span class="built_in">c</span><span class="punctuation">(</span><span class="string">"wtnouvb1"</span><span class="punctuation">,</span><span class="string">"wtnouvb2"</span><span class="punctuation">,</span><span class="string">"wtnouvb3"</span><span class="punctuation">,</span><span class="string">"wtuvb1"</span><span class="punctuation">,</span><span class="string">"wtuvb2"</span><span class="punctuation">,</span><span class="string">"wtuvb3"</span><span class="punctuation">)</span><span class="punctuation">]</span></span><br><span class="line">mrna <span class="operator">&lt;-</span> mrna<span class="punctuation">[</span><span class="built_in">c</span><span class="punctuation">(</span><span class="string">"CD1_1"</span><span class="punctuation">,</span><span class="string">"CD1_2"</span><span class="punctuation">,</span><span class="string">"CD1_3"</span><span class="punctuation">,</span><span class="string">"CD0_1"</span><span class="punctuation">,</span><span class="string">"CD0_2"</span><span class="punctuation">,</span><span class="string">"CD0_3"</span><span class="punctuation">)</span><span class="punctuation">]</span></span><br><span class="line"></span><br><span class="line">condition <span class="operator">&lt;-</span> <span class="built_in">c</span><span class="punctuation">(</span><span class="string">"control"</span><span class="punctuation">,</span><span class="string">"control"</span><span class="punctuation">,</span><span class="string">"control"</span><span class="punctuation">,</span><span class="string">"treat"</span><span class="punctuation">,</span><span class="string">"treat"</span><span class="punctuation">,</span><span class="string">"treat"</span><span class="punctuation">)</span></span><br><span class="line">results <span class="operator">&lt;-</span> xtail<span class="punctuation">(</span>mrna<span class="punctuation">,</span>ribo<span class="punctuation">,</span>condition<span class="punctuation">,</span>minMeanCount<span class="operator">=</span><span class="number">1</span><span class="punctuation">,</span>bins<span class="operator">=</span><span class="number">10000</span><span class="punctuation">)</span></span><br><span class="line">results_tab <span class="operator">&lt;-</span> resultsTable<span class="punctuation">(</span>results<span class="punctuation">,</span>sort.by<span class="operator">=</span><span class="string">"pvalue.adjust"</span><span class="punctuation">,</span>log2FCs<span class="operator">=</span><span class="literal">TRUE</span><span class="punctuation">,</span> log2Rs<span class="operator">=</span><span class="literal">TRUE</span><span class="punctuation">)</span></span><br><span class="line">write.table<span class="punctuation">(</span>results_tab<span class="punctuation">,</span><span class="string">"TE.xls"</span><span class="punctuation">,</span><span class="built_in">quote</span><span class="operator">=</span><span class="built_in">F</span><span class="punctuation">,</span>sep<span class="operator">=</span><span class="string">"\t"</span><span class="punctuation">)</span></span><br></pre></td></tr></tbody></table>

# ChatGPT根据参考文章提供的内容

<table><tbody><tr><td class="code"><pre><span class="line"># 使用Cutadapt进行质量控制</span><br><span class="line">cutadapt -j 4 \</span><br><span class="line">  -a "TGGAATTCTCGGGTGCCAAGG" \</span><br><span class="line">  -u 4 \</span><br><span class="line">  -m 24 \</span><br><span class="line">  -M 35 \</span><br><span class="line">  -q 20 \</span><br><span class="line">  --match-read-wildcards \</span><br><span class="line">  --max-n 0.25 \</span><br><span class="line">  -o trimmed_reads.fastq \</span><br><span class="line">  input_reads.fastq</span><br><span class="line"></span><br><span class="line"># 使用bowtie去除rRNA序列</span><br><span class="line">bowtie -p 4 \</span><br><span class="line">  -v 2 \</span><br><span class="line">  -m 1 \</span><br><span class="line">  --un non_rRNA_reads.fastq \</span><br><span class="line">  path_to_index/rRNA_index \</span><br><span class="line">  trimmed_reads.fastq</span><br><span class="line"></span><br><span class="line"># 使用STAR将剩余的reads映射到大鼠基因组</span><br><span class="line">STAR --runThreadN 4 \</span><br><span class="line">  --genomeDir path_to_STAR_index \</span><br><span class="line">  --readFilesIn non_rRNA_reads.fastq \</span><br><span class="line">  --outFileNamePrefix star_output_ \</span><br><span class="line">  --outFilterMismatchNmax 2 \</span><br><span class="line">  --outFilterMultimapNmax 5 \</span><br><span class="line">  --outFilterMatchNmin 16 \</span><br><span class="line">  --alignEndsType EndToEnd</span><br><span class="line"></span><br><span class="line"># 使用RiboCode进行ORF的识别和定量</span><br><span class="line">RiboCode.py -c config_file.txt \</span><br><span class="line">  -l no \</span><br><span class="line">  -m 10 \</span><br><span class="line">  -g \</span><br><span class="line">  -b \</span><br><span class="line">  -A "CTG,GTG,TTG" \</span><br><span class="line">  path_to_STAR_output/Aligned.out.sam</span><br><span class="line"></span><br><span class="line"># 使用Ribodiff分析ORFs的TE</span><br><span class="line">Ribodiff.py -i RiboCode_output_ORFs.txt \</span><br><span class="line">  -o Ribodiff_output.txt</span><br><span class="line"></span><br><span class="line"># 分析RNAs-seq和Ribo-seq重复样本之间的相关性</span><br><span class="line"># 这一步通常需要自定义脚本或使用统计软件，这里只是一个示例命令</span><br><span class="line">Rscript analyze_correlation.R Ribo-seq_data.txt RNA-seq_data.txt</span><br><span class="line"></span><br></pre></td></tr></tbody></table>

# 绘图

序列长度统计

<table><tbody><tr><td class="code"><pre><span class="line">seqkit fx2tab -j 30 -l  -n -i -H file.fastq.gz  &gt; Length.txt</span><br></pre></td></tr></tbody></table>

# 编码的保守性

[https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9889109/](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9889109/)

![image-20240925142042648](/picture/image-20240925142042648.png)

使用[tblastn](https://blast.ncbi.nlm.nih.gov/Blast.cgi?PAGE=Translations&PROGRAM=tblastn&PAGE_TYPE=BlastSearch&BLAST_SPEC=) 进行分析

复制编码smORF的蛋白序列

之前 \_collapsed.txt 的文件

![image-20240925142143277](/picture/image-20240925142143277.png)

进入网站

[https://blast.ncbi.nlm.nih.gov/Blast.cgi](https://blast.ncbi.nlm.nih.gov/Blast.cgi)

![image-20240925142257291](/picture/image-20240925142257291.png)

![image-20240925142332303](/picture/image-20240925142332303.png)
