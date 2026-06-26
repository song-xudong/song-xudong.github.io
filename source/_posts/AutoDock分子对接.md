---
title: "AutoDock分子对接"
date: 2024-11-16 12:17:02
updated: 2024-11-16 12:24:07
categories:
  - "生物信息学"
tags:
  - "生物信息学"
  - "分子对接"
cover: "/picture/fengmian/autodock.png"
description: "文件下载下载PDB文件以eEF2K和橄榄苦苷为例进行对接 eEF2K的文件，eEF2K-TR，无ATP，ADP的结构，包含CaM https:&#x2F;&#x2F;www.rcsb.org&#x2F;structure&#x2F;7SHQ 下载PDB Format 橄榄苦苷的文件Oleuropein https:&#x2F;&#x2F;pubchem.n"
---

# 文件下载

## 下载PDB文件

以eEF2K和橄榄苦苷为例进行对接

* * *

eEF2K的文件，eEF2K-TR，无ATP，ADP的结构，包含CaM

[https://www.rcsb.org/structure/7SHQ](https://www.rcsb.org/structure/7SHQ)

下载[PDB Format](https://files.rcsb.org/download/7SHQ.pdb)

橄榄苦苷的文件Oleuropein

[https://pubchem.ncbi.nlm.nih.gov/compound/5281544](https://pubchem.ncbi.nlm.nih.gov/compound/5281544)

下载[2D Structure](https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/CID/5281544/record/SDF?record_type=2d&response_type=save&response_basename=Structure2D_COMPOUND_CID_5281544)

将文件放在**Autodock工作目录**（不能有中文路径）  
![image-20240520095924170](/picture/image-20240520095924170.png)

## 格式转化

使用**Open Babel**将**Oleuropein**的sdf文件转化为autodock可用的pdb文件

选择input和output的格式和目录，点击CONVERT进行转换

![image-20240520100335713](/picture/image-20240520100335713.png)

# Autodock对接

## 软件启动

![image-20240520101335053](/picture/image-20240520101335053.png)

记得关闭AMD显卡和联想电脑管家

参考：[https://www.zhihu.com/question/393216168](https://www.zhihu.com/question/393216168)

## 对接流程

参考：[https://zhuanlan.zhihu.com/p/662465038](https://zhuanlan.zhihu.com/p/662465038)

打开autodock软件

### ![img](/picture/v2-803b427f5480684166eca85d6a2f8b4d_720w.webp)

首先，设置路径，file->perfernce->set,出现下图界面，选择startup directory，把我们刚刚含有5个文件的文件路径拷贝进来。

![img](/picture/v2-c701e2e475f091be274df740cbfeec84_720w.webp)

然后点击Make Default,将它设置为默认路径。

3.对蛋白质进行前处理。点击file->read molecule，选择蛋白质分子

![img](/picture/v2-6c8b1ab72e7109ade47c139d4874d1a3_720w.webp)

![img](/picture/v2-0a8f980d32862213414cedf591383707_720w.webp)

首先，对蛋白质进行除水加氢键。点击edit->delete water，edit->hydrogens->add->ok

![img](/picture/v2-6376d484378e06555d188433fb02dced_720w.webp)

把它选择为大分子，点击grid->macromolecules->choose,选择大分子，点击select molecule

![img](/picture/v2-8b9dd1da2bc6a10d96e077d1e49cbeaf_720w.webp)

得到蛋白质的pdbqt的一个文件，保存即可（注意不要出现特殊符号，下图中的—就有可能导致运行错误）

![img](/picture/v2-e6d2128b1714165d8be2979303418f0e_720w.webp)

4.对小分子处理，然后把蛋白质删掉，edit->delete,导入小分子，与蛋白质导入相同的步骤，同样的进行加氢处理，ligand->input->choose,选择小分子作为ligand，同时对扭转键进行检测。ligand->torsion tree->detect root

![img](/picture/v2-bfba88d41c1b429ca40b3ebe25b4fbc0_720w.webp)

ligand->torsion tree->choose torsions

![img](/picture/v2-f0dd7ae87740457582c230f56b76919a_720w.webp)

done

![img](/picture/v2-8d621f05dbf66ba84e284160f3ffc41c_720w.webp)

红色的是不可以被扭转的，绿色的是可以扭转的

![img](picture/v2-869105bc1d67749ebace248043d86bfc_720w.webp)

输出小分子，ligand->output->save as PDBQT,得到小分子的pdbqt格式的文件。

![img](/picture/v2-71982514ca7db4d4c0964503879a3f1d_720w.webp)

四，开始对接。

删掉当前的小分子。

先把蛋白质导入进来，点击Grid->macromolecules->open,选择蛋白质大分子。后面出现的选项全部选择yes，确定。

![img](/picture/v2-df73e9cd522e93fc94234b038a12324a_720w.webp)

接着导入小分子，Grid->set map types->open ligand

![img](/picture/v2-ed8226ce84b9a275b89b7128f0e5eb42_720w.webp)

此时开始对接，对参数进行一些设置，点击grid->grid box出现一个立方体

![img](/picture/v2-4e8ee0136bc729ed20bdbf62c51243ba_720w.webp)

由于我们不知道大概的结合位点在哪里，需要调节这个三位参数，把蛋白质和小分子都包含在内，可以通过旋转观察否包含在内。

![img](/picture/v2-144cee9ad61d0754b7d043fa1c2f7df5_720w.webp)

到这个程度就可以了。

点击dejavu gui，即这个图标

![img](/picture/v2-4e789eb0a12e597c6770aee32bb427b1_720w.webp)

点击root,选择小分子，把图中的对钩取消勾选

![img](/picture/v2-3e6a18fdeebf4301bae9bfd0b4807af0_720w.webp)

此时，用右键把小分子拖出到立方体外，此时，再把刚刚取消勾选的√给勾上。再点击刚刚打开窗口的file，close saving current

![img](/picture/v2-919c3bd82b48706e9263ecb7f84f3c06_720w.webp)

点击grid->output->save GPF

![img](/picture/v2-bf9a1779303125ccdda9f59ee36e280b_720w.webp)

保存为1，后缀如果不能正常出现的话，手动输入后缀gpf。

![img](/picture/v2-9d2b285e7a451e483a57a873bb52f0b3_720w.webp)

点击保存（注意，不要出现中文字符或者空格以及特殊符号）

点击run->autogrid

![img](/picture/v2-e403161aca167f5c5bd5794069014dff_720w.webp)

browse 我们的gpf文件

![img](/picture/v2-5aae1d9189cd4d9950d2a71294d7e351_720w.webp)

会生成一个glg文件

![img](/picture/v2-e80da1e2612273d6910c589295008876_720w.webp)

点击launch，生成一个新窗口，等待这个窗口运行完毕。

![img](/picture/v2-d2fcfdf2faf9fa9fe5a865ea0f1f5559_720w.webp)

运行完毕，数据文件夹中会多出很多map结尾的文件，还有一个glg文件。

![img](/picture/v2-765527a3c183541af30b57235e8891cc_720w.webp)

点击Docking->macromolecules->set rigid file name,打开蛋白质大分子。再点击docking-》ligand->choose->选择小分子->set as ligand,然后点击接受。

点击Docking->search parameters->genetic algorithm

![img](/picture/v2-60f697b8f54bd85803af1a392fef78d3_720w.webp)

第一排是对接次数，我这里选择50次（官方建议对接50次），点击accept。

![img](/picture/v2-1f82fc3babe402387ed5b89e2d191548_720w.webp)

接着Docking->docking parameters->accept。

docking->output->lamarckian(4.2),输出文件，后缀同样手动添加dpf，点击保存。

![img](/picture/v2-7ca3d16c0217e7093fa80b0db9636c4d_720w.webp)

![img](/picture/v2-8fdcff10bfecb1824ee1f7ec1506d899_720w.webp)

点击run->run autodock

![img](/picture/v2-d762ba8aaada0d787b5bc0bfccf07ac7_720w.webp)

browse刚刚保存的dpf文件，生成一个dlg文件，点击launch，等待程序运行。（对接时间较长，框体自动关闭为完成）

![img](/picture/v2-8aa645ab404280a08c691966b2083f45_720w.webp)

文件夹中dlg文件生成好之后，可以删掉所有的分子，点击edit->delete->all molecules.

![img](/picture/v2-28a9b4911c8a1b9de9a71e04652b4779_720w.webp)

五、对结果进行分析

analysis->docking->open

![img](/picture/v2-e0c2cca664be92ae55623cf0efbfcac9_720w.webp)

打开dlg文件,点击确定，点击analyze-》macromolecule->open,等待大分子出现，接着点击analyze-》conformations-》play ranked by enanergy,出现一个新窗口如下图

![img](/picture/v2-334f0dc473615150cde59dd961924641_720w.webp)

点击倒数第二个按钮，即

![img](/picture/v2-031ec389b376060954ff39030e011fb4_720w.webp)

出现新的窗口，点击build H-bond，点击show info,

![img](/picture/v2-4c2fe4a47237d4393585175eb37a075a_720w.webp)

出现新的窗口，得到第一次对接结果的结合能数据，形成氢键个数等等。

![img](/picture/v2-fc2dde254d39d4298649749324d97b39_720w.webp)

点击analyze-》conformations-》load…查看其它结合能信息

接着，点击write complex，

![img](/picture/v2-0b7984ce356031cd0060950c47a50ce6_720w.webp)

输出格式为pdbqt的文件，手动输入后缀

![img](/picture/v2-84a4c1b6258cc4d3990adb066def04d7_720w.webp)

保存后，用openbabel将格式转化为pdb格式，接着就可以用pymol（pymol安装看[开源版pymol的下载与安装（写给自己） - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/663296401)）打开查看对接结果以及绘图。

\***用pymol输出图片\***

1.  打开pymol，file-》open，选择pdb格式的文件。

![img](/picture/v2-49af57a90a72a0b80755ca12c33e5294_720w.webp)

2.点击pymol右下角的s，可以显示出氨基酸残基

![img](/picture/v2-43bb5be4a23ce551fb5c82dfea933244_720w.webp)

这里的UNL是小分子，后面的是蛋白质残基。

# 对接完成使用PyMol可视化
