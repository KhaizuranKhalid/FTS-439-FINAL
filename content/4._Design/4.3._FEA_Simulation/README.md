---
title: 4.3. FEA Simulation
description: Simulating stress
date: 2025-11-12
author: Khaizuran Khalid
order: 3
tags: [FEA, ACP]
access: [0]
---

## **CAD Preparation**
Before the design can be exported to Ansys for the Finite Element Analysis (FEA), a few
tweaks will need to be made. The rim will need to be shelled which gives Ansys Composite PrePost (ACP)
a surface to extrude from. Split lines are also added according to the planned plies.
Additionally, the jig needs to be simplified since the main focus is the rim.
The jig can be simplified and de-featured
to cut down on simulation time. 

<div className="flex gap-6 justify-center items-center">
<div>
![=x400](/Shelled_rim.png)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 19: Shelled Rim.</p>
</div>
</div>

<div>
![=x400](/Shelled_Section.png)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 20: Shelled Closeup.</p>
</div>
</div>
</div>

<div className="flex gap-6 justify-center items-center">
<div>
![=x400](/Defeatured_jig.png)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 21: Defeatured Jig.</p>
</div>
</div>

<div>
![=x400](/Defeatured_bolt.png)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 22: Defeatured Bolt.</p>
</div>
</div>
</div>

## **Ansys Simulation**

With the prepations done, the simulation environment can be set up. This workflow was tweaked to work 
around Ansys's bugs with frequent changes
in the model to minimise disruptions and improve efficiency when testing different layups and materials.

![= centre](/Ansys_Workflow.png)
<div className="w-full flex items-center justify-center">
<p className="italic">Figure 23: Ansys Workflow.</p>
</div>

1. The base geometry file with all the components is uploaded into a Geometry block within Ansys. This block allows the subsequent 
Mechanical Model blocks to share the same base geometry. This allows for the Mechanical Models to be automatically
updated with changes rather than updating individual blocks.

<div className="flex gap-6 justify-center items-center">
<div>
![](/Jig_Model.png)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 24: Jig Model Group.</p>
</div>
</div>
</div>

2. The Mechanical Model blocks are used to separate the composite components. There will be one mechanical
model with everything but the rim. The other blocks are for each section of the rim for ACP.
Within these blocks, the material and contacts between components are specified. The mesh size is also defined
here. For the rim, the faces are grouped to indicate the ply locations that are planned. 

<div className="flex gap-6 justify-center items-center">
<div>
![](/Outer_Layup_2.png)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 25: Outer Layup.</p>
</div>
</div>
</div>

3. ACP is where the rim will be built up. Here the properties of the fabric, such as thickness and fabric type, is defined. Oriented Selection
Sets are used to indicate ply locations and fiber directions. Modelling groups is
where the layers are built up. This specifies the order in which the plies are laid. The solid model is then
formed which also indicates the thickness of the rim as specified by the fabric and layers. This version uses a
generic wet carbon fiber material as the materials did not arrive in time to manufacture and test prior to the interim.
The material however is similar to the fabric that we will be using and will provide a close approximation for the 
purposes of this interim.

<div className="flex gap-6 justify-center items-center">
<div>
![=x400](/fabric_properties.png)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 26: Fabric Properties.</p>
</div>
</div>

<div>
![=x400](/OSS.png)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 27: OSS.</p>
</div>
</div>
</div>


<div className="flex gap-6 justify-center items-center">
<div>
![=x400](/Modelling_Groups.png)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 28: Modelling Groups.</p>
</div>
</div>

<div>
![=x400](/thickness_plot.png)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 29: Thickness Plot.</p>
</div>
</div>
</div>

4. Finally is the Static Structural blocks. Here the load conditions can be defined. The force is applied on the applicator as replicated on the Instron 
testing machine. A remote displacement is also applied to restrict the movement of the applicator to the Y-axis
and prevent it from rotating. Finally, a fixed support is applied to the base of the jig
to replicate the ground that it is placed on. 

<div className="flex gap-6 justify-center items-center">
<div>
![=x400](/force_applicator.png)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 30: Force on Applicator Shaft.</p>
</div>
</div>

<div>
![=x400](/remote_displacement.png)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 31: Remote Displacement.</p>
</div>
</div>
</div>


<div className="flex gap-6 justify-center items-center">
<div>
![=x400](/remote_displacement_settings.png)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 32: Remote Displacement Settings.</p>
</div>
</div>

<div>
![=x400](/fixed_support.png)

<div className="w-full flex items-center justify-center">
<p className="italic">Figure 33: Fixed Support.</p>
</div>
</div>
</div>