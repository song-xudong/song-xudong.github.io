---
title: "MATLAB影像数据处理(三)"
date: 2025-03-16 18:10:48
updated: 2025-03-16 18:13:53
categories:
  - "生物信息学"
tags:
  - "MATLAB"
  - "影像数据处理"
cover: "/picture/fengmian/MATLAB34224.png"
description: "DICOM图像元数据解析DICOM（数字影像和通信）是一种用于医学成像的标准格式，广泛应用于医疗领域。它包含了丰富的元数据，用于描述患者信息、设备信息、图像特征等。以下是对您提供的字段的逐一解释： 1. 文件元信息（File Meta Information） Filename: 文件的名称。 Fi"
---

# DICOM图像元数据解析

DICOM（数字影像和通信）是一种用于医学成像的标准格式，广泛应用于医疗领域。它包含了丰富的元数据，用于描述患者信息、设备信息、图像特征等。以下是对您提供的字段的逐一解释：

### 1\. **文件元信息（File Meta Information）**

-   **Filename**: 文件的名称。
-   **FileModDate**: 文件的修改日期。
-   **FileSize**: 文件的大小（以字节为单位）。
-   **Format**: 文件的格式（如DICOM）。
-   **FormatVersion**: 文件格式的版本。
-   **Width**, **Height**: 图像的宽度和高度（以像素为单位）。
-   **BitDepth**: 图像的位深（如8位、16位）。
-   **ColorType**: 图像的颜色类型（如单色、彩色）。
-   **FileMetaInformationGroupLength**: 文件元信息组的长度。
-   **FileMetaInformationVersion**: 文件元信息的版本。
-   **MediaStorageSOPClassUID**: 媒体存储的SOP类UID。
-   **MediaStorageSOPInstanceUID**: 媒体存储的SOP实例UID。
-   **TransferSyntaxUID**: 传输语法UID。
-   **ImplementationClassUID**: 实现类UID。
-   **ImplementationVersionName**: 实现版本名称。
-   **IdentifyingGroupLength**: 标识组的长度。
-   **SpecificCharacterSet**: 特定的字符集（如UTF-8）。

### 2\. **患者信息（Patient Information）**

-   **PatientName**: 患者的姓名。
-   **PatientID**: 患者的ID。
-   **PatientBirthDate**: 患者的出生日期。
-   **PatientSex**: 患者的性别。
-   **PatientAge**: 患者的年龄。
-   **PatientWeight**: 患者的体重。
-   **AdditionalPatientHistory**: 其他患者历史信息。

### 3\. **研究和系列信息（Study and Series Information）**

-   **StudyDate**: 研究的日期。
-   **SeriesDate**: 系列的日期。
-   **AcquisitionDate**: 采集的日期。
-   **ContentDate**: 内容的日期。
-   **StudyTime**, **SeriesTime**, **AcquisitionTime**, **ContentTime**: 相关时间的时间部分。
-   **AccessionNumber**: 追踪号。
-   **Modality**: 成像方式（如MRI、CT、US）。
-   **Manufacturer**: 设备制造商。
-   **InstitutionName**: 机构名称。
-   **ReferringPhysicianName**: 转诊医生的姓名。
-   **StationName**: 工作站名称。
-   **SeriesDescription**: 系列描述。
-   **ManufacturerModelName**: 设备型号名称。

### 4\. **图像参数（Image Parameters）**

-   **SliceThickness**: 切片厚度。
-   **RepetitionTime**: 重复时间（TR）。
-   **EchoTime**: 回声时间（TE）。
-   **NumberOfAverages**: 平均次数。
-   **ImagingFrequency**: 成像频率。
-   **ImagedNucleus**: 被成像的原子核。
-   **EchoNumbers**: 回声数。
-   **MagneticFieldStrength**: 磁场强度。
-   **SpacingBetweenSlices**: 切片间距。
-   **EchoTrainLength**: 回声列长度。
-   **PercentSampling**: 采样百分比。
-   **PercentPhaseFieldOfView**: 相位场视百分比。
-   **PixelBandwidth**: 像素带宽。
-   **DeviceSerialNumber**: 设备序列号。
-   **SoftwareVersions**: 软件版本。
-   **ProtocolName**: 协议名称。

### 5\. **其他信息（Miscellaneous Information）**

-   **ContrastBolusAgent**: 对比剂。
-   **ContrastBolusRoute**: 对比剂注射途径。
-   **HeartRate**: 心率。
-   **CardiacNumberOfImages**: 心脏成像的图像数量。
-   **TriggerWindow**: 触发窗口。
-   **ReconstructionDiameter**: 重建直径。
-   **ReceiveCoilName**: 接收线圈名称。
-   **AcquisitionMatrix**: 采集矩阵。
-   **InPlanePhaseEncodingDirection**: 平面相位编码方向。
-   **FlipAngle**: 翻转角。
-   **VariableFlipAngleFlag**: 变量翻转角标志。
-   **SAR**: 比能吸收率（SAR）。
-   **PatientPosition**: 患者位置。
-   **Laterality**: 左右侧标志。

### 6\. **图像数据（Image Data）**

-   **Rows**, **Columns**: 图像的行数和列数。
-   **PixelSpacing**: 像素间距。
-   **BitsAllocated**, **BitsStored**, **HighBit**: 位分配、存储和高位。
-   **PixelRepresentation**: 像素表示（如unsigned short）。
-   **SamplesPerPixel**: 每像素样本数。
-   **PhotometricInterpretation**: 光度学解释（如单色2、RGB）。
-   **SmallestImagePixelValue**, **LargestImagePixelValue**: 最小和最大像素值。
-   **WindowCenter**, **WindowWidth**: 窗中心和窗宽。
-   **PixelDataGroupLength**, **PixelData**: 像素数据组长度和实际图像数据。

### 7\. **私有信息（Private Information）**

-   私有字段通常以“Private\_”开头，用于存储特定设备或机构的额外信息。这些字段的含义需参考设备制造商的文档。

### 8\. **唯一标识符（Unique Identifiers）**

-   **StudyInstanceUID**, **SeriesInstanceUID**, **SOPInstanceUID**: 用于唯一标识研究、系列和SOP实例的UID。
-   **InstanceNumber**: 实例编号。

### 9\. **位置和方向（Position and Orientation）**

-   **ImagePositionPatient**: 图像在患者坐标系中的位置。
-   **ImageOrientationPatient**: 图像在患者坐标系中的方向。
-   **FrameOfReferenceUID**: 参考框架UID。

### 10\. **时间和事件（Time and Events）**

-   **AcquisitionTime**: 采集时间。
-   **TriggerTime**: 触发时间。
-   **ContentTime**: 内容时间。

### 11\. **其他标识符（Other Identifiers）**

-   **PatientID**, **AccessionNumber**: 患者ID和追踪号，用于标识患者和研究。

### 12\. **设备信息（Device Information）**

-   **StationName**, **DeviceSerialNumber**: 设备名称和序列号，用于标识采集设备。

## 简单练习

![image-20250316180206236](/picture/image-20250316180206236.png)

# DPABI 安装

**DPABI**（Data Processing & Analysis for Brain Imaging）是一个开源的 MATLAB 工具箱，用于脑影像数据的处理和分析。它提供了丰富的功能，特别是针对结构和功能磁共振成像（fMRI）以及结构性磁共振成像（sMRI）数据的分析。DPABI 旨在简化和加速脑成像数据的处理，具有灵活性和高效性，适合神经科学和脑成像研究人员使用。

参考教程：[https://blog.csdn.net/qq\_43419761/article/details/121131875](https://blog.csdn.net/qq_43419761/article/details/121131875)

下载

官网：[https://rfmri.org/DPABI](https://rfmri.org/DPABI)

![image-20250228200313384](/picture/image-20250228200313384.png)

解压放到matlab的[toolbox](https://so.csdn.net/so/search?q=toolbox&spm=1001.2101.3001.7020)中，即matlab的安装地址/toolbox

![image-20250228200408755](/picture/image-20250228200408755.png)

## SPM安装

[https://www.fil.ion.ucl.ac.uk/spm/software/download/](https://www.fil.ion.ucl.ac.uk/spm/software/download/)

![image-20250228201203832](/picture/image-20250228201203832.png)

现在安装的MATLAB2024没有对应版本的SPM

我先尝试下载最新的SPM进行使用

![image-20250228202105692](/picture/image-20250228202105692.png)

安装成功

# AAL脑区模板解读

AAL.nii

**AAL（Automated Anatomical Labeling）模板** 是一种常用的脑图谱（brain atlas），用于将大脑划分为多个解剖区域（脑区），并为每个区域分配一个唯一的编号。它是神经影像学研究中常用的工具，特别是在功能磁共振成像（fMRI）和结构磁共振成像（sMRI）数据分析中。

在MATLAB中使用y\_ReadAll读取AAL.nii文件

<table><tbody><tr><td class="code"><pre><span class="line">[Data, VoxelSize, FileList, Header] = y_ReadAll(AAL_file);</span><br></pre></td></tr></tbody></table>

<table><tbody><tr><td class="code"><pre><span class="line"><span class="comment">% y_ReadAll - 读取 NIfTI、GIfTI 或 DPABINet Matrix 文件</span></span><br><span class="line"><span class="comment">% ------------------------------------------------------------------------</span></span><br><span class="line"><span class="comment">% 输入:</span></span><br><span class="line"><span class="comment">% InputName - 输入文件或目录的路径，可以是以下形式：</span></span><br><span class="line"><span class="comment">%             1. 单个文件（如 .nii、.nii.gz、.gii 或 .mat 文件）。</span></span><br><span class="line"><span class="comment">%             2. 一个目录，目录下可以是：</span></span><br><span class="line"><span class="comment">%                - 对于 NIfTI：一个 4D 文件或一组 3D 文件。</span></span><br><span class="line"><span class="comment">%                - 对于 GIfTI：一个 2D 文件或一组 1D 文件。</span></span><br><span class="line"><span class="comment">%                - 对于 DPABINet Matrix：一组 .mat 文件。</span></span><br><span class="line"><span class="comment">%             3. 一个文件列表（cell 数组），每个元素是一个文件的路径。</span></span><br><span class="line"><span class="comment">% 输出:</span></span><br><span class="line"><span class="comment">% Data - 图像数据矩阵：</span></span><br><span class="line"><span class="comment">%        - 对于 NIfTI：4D 矩阵。</span></span><br><span class="line"><span class="comment">%        - 对于 GIfTI：2D 矩阵。</span></span><br><span class="line"><span class="comment">%        - 对于 DPABINet Matrix：2D 矩阵。</span></span><br><span class="line"><span class="comment">% VoxelSize - 体素大小（仅对 NIfTI 文件有效）。</span></span><br><span class="line"><span class="comment">% FileList - 读取的文件列表。</span></span><br><span class="line"><span class="comment">% Header - 头信息结构体：</span></span><br><span class="line"><span class="comment">%          - 对于 NIfTI：包含 fname、dim、dt、mat、pinfo 等字段。</span></span><br><span class="line"><span class="comment">%          - 对于 GIfTI：包含 GIfTI 的头信息。</span></span><br><span class="line"><span class="comment">%          - 对于 DPABINet Matrix：包含矩阵名称和大小信息。</span></span><br></pre></td></tr></tbody></table>

# 作业代码

<table><tbody><tr><td class="code"><pre><span class="line">clc,clear;</span><br><span class="line"><span class="comment">% 读取AAL模板</span></span><br><span class="line">AAL_file = <span class="string">'011.nii'</span>;  <span class="comment">% AAL模板文件名</span></span><br><span class="line">[Data, VoxelSize, FileList, Header] = y_ReadAll(AAL_file);</span><br><span class="line"></span><br><span class="line"><span class="comment">% 获取AAL模板中的唯一脑区编号</span></span><br><span class="line">unique_regions = unique(Data);</span><br><span class="line">unique_regions = unique_regions(unique_regions &gt; <span class="number">0</span>);  <span class="comment">% 去除背景0</span></span><br><span class="line"></span><br><span class="line"><span class="comment">% 创建mask文件夹</span></span><br><span class="line">mask_folder = <span class="string">'mask'</span>;</span><br><span class="line"><span class="keyword">if</span> ~exist(mask_folder, <span class="string">'dir'</span>)</span><br><span class="line">    mkdir(mask_folder);</span><br><span class="line"><span class="keyword">end</span></span><br><span class="line"></span><br><span class="line"><span class="comment">% 遍历每个脑区，生成并保存mask</span></span><br><span class="line"><span class="keyword">for</span> <span class="built_in">i</span> = <span class="number">1</span>:<span class="built_in">length</span>(unique_regions)</span><br><span class="line">    region_value = unique_regions(<span class="built_in">i</span>);</span><br><span class="line">    </span><br><span class="line">    <span class="comment">% 生成0-1 mask</span></span><br><span class="line">    mask = double(Data == region_value);</span><br><span class="line">    </span><br><span class="line">    <span class="comment">% 生成文件名（三位数命名）</span></span><br><span class="line">    filename = sprintf(<span class="string">'%03d.nii'</span>, region_value);</span><br><span class="line">    filepath = fullfile(mask_folder, filename);</span><br><span class="line">    </span><br><span class="line">    <span class="comment">% 修改Header以匹配mask</span></span><br><span class="line">    mask_header = Header;  <span class="comment">% 复制原始Header</span></span><br><span class="line">    mask_header.dim = <span class="built_in">size</span>(mask);  <span class="comment">% 更新维度信息</span></span><br><span class="line">    mask_header.dt = [<span class="number">16</span>, <span class="number">0</span>];  <span class="comment">% 设置数据类型为double（根据需要调整）</span></span><br><span class="line">    </span><br><span class="line">    <span class="comment">% 保存mask为NIfTI文件</span></span><br><span class="line">    y_Write(mask, mask_header, filepath);</span><br><span class="line"><span class="keyword">end</span></span><br><span class="line"></span><br><span class="line"><span class="built_in">disp</span>(<span class="string">'所有脑区的mask已生成并保存到mask文件夹中。'</span>);</span><br></pre></td></tr></tbody></table>
