import { nanoid } from 'nanoid'
import React from 'react'
import ThreeScene from '../threejsdemo/ThreeScene';
import MovingPlaneCanvas from '../threefiber/MovingPlaneCanvas';
import ImageTransitionCanvas from '../threefiber/ImageTransition';
import BlendingModes from '../blendingmodes/BlendingModes';

const images = {}

function importAll(r) {
    r.keys().forEach((key) => images[key] = r(key));
}
  
importAll(require.context('../../imgs/', false, /\.(png|jpe?g|svg)$/));

export function getEntries() {
    return entries
}

export function getImage(path) {
    return images[path].default;
}

export function getEntry(link) {
    return entries.find(elem => elem.link == link)
}

let entries = [
    {
        num:5,
        title: "Metal Shop",
        link: "metalshop",
        description: "Simply the best way to cover everything in iron oxide",
        reactDescription:{html:<div>I'm pretty new to metal fabrication and welding.
        To start with, a lot of things can be made with <b>sheet metal</b> and plain<b> steel tubing</b> without a lot of tooling. </div>},
        longdescription: [
            {key: 'metal-shop', title:`Metal Shop`},
            {key: 1, text:`I'm pretty new to metal fabrication and welding. I have had a vague interest in steel but during 
            the pandemic high lumber prices made it more enticing to pick up an angle grinder.`},
            {key:3, text:`I've found that metal can be more forgiving than wood. The cutting tools go at a lower rpm and if you make a mistake, it can be welded back together`},
            {key: 'plasma-cutter', title:`Plasma Cutter`},
            {key: 15, vimeo:'https://vimeo.com/675640978', },
            {key:4, text:`Plasma cutting uses a stream of plasma between the torch head and the metal to deliver enough energy to melt 
            the metal and blow it away. It's also fast!`},
            {key:nanoid(), text:`Another option for cutting sheel metal is a throatless shear or nibbler.` , style: {gridColumn:"1 / span 2", paddingRight:"20px"}},
            {key:nanoid(), vimeo:'https://vimeo.com/692360282', style: {gridColumn:"span 3", gridRow:"span 2"}},
            {key:nanoid(), html:<div>My setup is an <b>MPCNC Primo </b>designed by <a href="v1engineering.com">V1Engineering</a>. It's an excellent design given the constraints. 
            I have found the MPCNC axes are not particularly rigid, but makes for an excellent plasma or laser cutter.</div> , style: {gridColumn:"1 / span 2", paddingRight:"20px"}},
            {key: 'electronics-setup', subtitle:`Electronics Setup`},
            {key:nanoid(), text:`For electronics, an Arduino Uno running GRBL with four TB6600 stepper modules turns the g-code into stepper motor power. A raspberry pi 3 running cnc.js
            provides a great way to preview and control GRBL and load g-code over wifi.`},
            {key:nanoid(), imageName:'./plasma4.jpg', style: {gridColumn:"1 /span 5", gridRow:"span 1", overflow:"hidden", objectFit:"cover", paddingBottom:"20px", height:"300px"}, className:"entry--img-inline"},
            {key:7, text:`Unfortunately this setup was plagued by electronics issues for a while. A combination of poor connectors and very strong 
            electromagnetic interference (EMI) took a lot of troubleshooting. After crimping an endless number of 2.54mm 'dupont' connectors, I replaced them all with locking JST-SM ones.`},
            {key:8, text:`Reducing EMI meant rewiring the entire CNC machine, shielding to all the exterior cables, adding an enclosure for the controllers, 
            and also replacing the tiny 3d printer drivers with more noise resistant stepper drivers.`},
            {key:9, text:`Comparing this amount of work to a less noisy plasma cutter, of course it would have been a better idea to simply 
            buy a blowback plasma from the start.`,},
            {key: 'upgrading-the-controller', subtitle:`Upgrading the Controller`},
            {key:nanoid(), text:`The raspberry pi and arduino are more suitable as prototyping tools and not particularly noise-resistant. I had relatively few faults with my raspberry pi 3 running 
            cnc.js, however the arduino often reset itself when a plasma arc started.`,},
            {key:nanoid(), text:`Options exist for "industrial" arduinos. It's also possible to get a very cheap Mach3 controller with ethernet connection. 
            The ethernet connection offers a huge bonus with error detection and correction, so I opted for the inexpensive NVEM2 controller.`,},
            {key:nanoid(), text:`Another option I have not looked into is skipping the Arduino altogether and using LinuxCNC, with a raspberry pi and FPGA to generate step pulses.`,},
            {key: 'mach3', subtitle:`Mach3`},
            {key:nanoid(), text:`Perhaps you've lived a post Web2.0 life, in a garden of minimalist, rounded cornered responsive webpages. Mach3 revives the geocities era
             into its eye-squintingly cluttered user interface. It's a small price to pay for the reliability of an ethernet connection however.`,},
            {key:nanoid(), text:`Aside from the inscrutable density of buttons, if you only interact with the load g-code and run g-code buttons of Mach3 it does a reliable job of getting 
            through the g-code. Making sense of the machine settings is more puzzling, but it can be done slowly.`,},
            {key: 'initial-setup', subtitle:`Initial Setup`},
            {key:nanoid(), text:`The initial setup of the electronics was pretty unremarkable. The outputs on the NVEM card are neatly labelled. Getting the settings to work in Mach3 was 
            more of a head-scratcher. `},
            {key:nanoid(), text:`
            The documentation did offer some useful screenshots to copy from but did not make any particular effort to explain any settings. Setting up anything
            that wasn't exactly photographed in the manual was trial and error. For instance, the plasma trigger pulse.`},
            {key: 'pierce-timing', subtitle:`Pierce Timing`},
            {key: nanoid(), vimeo:'https://vimeo.com/748961985', }, 
            {key:nanoid(), text:`I had problems with getting a pierce delay of under 1 second, which resulted in a splattery pierce hole that's larger than the rest of the cut. `},
            {key:nanoid(), text:`It is ok to pierce outside the part and then bring the tool to the cut line so I didn't spend too long on it. In the latest video you can see
            the plasma head is moving much slower and the pierce sits for a full second.`},
            {key: 'dross', subtitle:`Dross`},
            {key:nanoid(), text:`A note on dross, which is the liquefied metal directly under the plasma head. Ideally it's blown away and leaves a perfectly clean 
            cut, but more often than not you'll have to chip it away for mild steel. `},
            {key:nanoid(), text:`On stainless I've found it is much more sticky and has to be ground off. It's possible
            to get drossless cuts with this setup but not consistently.`},
            {key:nanoid(), imageName:'./plasma3.jpg', style: {gridColumn:"1 /span 5", gridRow:"span 1", overflow:"hidden", objectFit:"cover", paddingBottom:"20px", height:"300px"}, className:"entry--img-inline"},
            {key: 'welding', title:`Welding` },
            {key:nanoid(), text:`Welding is easy to learn and hard to master. I quite liked Steve Bleile’s welding videos. They are densely packed with information and without the 
            embellishments of a youtube tutorial.`},
            {key:nanoid(), imageName:'./welding2.jpg', style: {gridColumn:"1 /span 2", gridRow:"span 5", overflow:"hidden", objectFit:"cover", paddingBottom:"20px"}, className:"entry--img-inline"},
            {key: 'getting-started', subtitle:`Getting Started`, style: {gridColumn:"span 3"}},
            {key:nanoid(), text:`I started off with a Forney 140MP, a fine little starter machine which does enough for me. When I first got the machine I thought it would be a stick or gasless MIG box.`, style: {gridColumn:"span 3"}},
            {key:nanoid(), html: <div>In fact, running <b>pure CO<sub>2</sub> MIG</b> offers another relatively easy point of entry. The money saved from the standard MIG wire compared to gasless can easily afford a 
            bottle of CO2 for sparkling water or paintball, and the weld quality is certainly better than gasless. </div>, style: {gridColumn:"span 3"}},
            {key:nanoid(), text:`Either way, the principles of controlling your weld puddle apply no matter what style you choose to begin with.`, style: {gridColumn:"span 3"}},
            {key: 'tig-welding', subtitle:`TIG Welding` },
            {key:nanoid(), text:`Recently I also got myself a 110cuft bottle to TIG weld with. TIG is certainly less forgiving and more sensitive to a litany of new variables. 
            However, it is very satisfying to see a clean weld come out without chipping or brushing at all.`},
            {key:nanoid(), imageName:'./welding1.jpg', style: {gridColumn:"1 /span 5", gridRow:"span 1", marginBottom:"20px", height:"300px"}, className:"entry--img-inline"},
    ],
        imageName:'./plasma2.jpg',
    },
    {
        num: 3,
        title: "Graphics and ThreeJS",
        link: "graphics",
        description: `Raytracing, a computer graphics classic and a few three.js demos`,
        reactDescription: {html:<div>A computer graphics classic: <b>raytracing</b>,  and a few <b>three.js</b> demos </div>},
        longdescription: [
            {key: 'graphics', title:`Graphics`},
            {key:nanoid(), text:`I've always had an interest in graphics and shaders. I quite like visual thinking and
            the beauty of graphics is apparent even without in-depth knowledge.`},
            {key: 'raytracer', title:`Raytracer`},
            {key: 1, text:` One of the classic computer graphics demonstrations is a raytracer. I also wanted to learn a new programming language, Rust.`},
            {key: 2, html:<div>Rust doesn't give any particular advantages in this case, given that there's no finnicky memory management. 
                It was quite nice to use the built in package manager though! <a href="https://github.com/laetic/rustTracer"> The rustTracer repo is available on Github.</a> </div>},
            {key: 8, html:<div>The raytracer was based off of Raytracing in One Weekend by Peter Shirley, <a href="https://raytracing.github.io/">freely available at this link.</a>  Simply put, trace a line (ray) from a camera to every point on a screen. If the ray hits something, change the color. 
            If the ray hits something that absorbs, reflects, or refracts the light... now you're raytracing.</div>},
            {key:'diffuse-materials', subtitle:'Diffuse Materials'},
            {key:nanoid(), text:`After establishing a camera, geometry and basic vector math, the diffuse material makes the raytracer feel 
            much more substantial. The material reflects light in a random direction, which causes
            the shadows to diffuse freely as you get away from cramped shadowed areas.`},
            {key:9, img:'rt2', style: {gridColumn:"span 5",gridRow:"span 5"}, className:"entry--img-inline", imageName:'./raytracer2.jpg'},
            {key:'metals-and-dielectrics', subtitle: 'Metals and Dielectrics'},
            {key: nanoid(), text:`By the final chapter you've added metals, which reflect incoming light at the same angle, and dielectrics, which refract the light 
            according to Snell's Law. As mentioned in the book, it can get pretty difficult to tell when there are bugs since you 
            don't really encounter many glass orbs in day-to-day life. `},
            {key: nanoid(), text:`The shader is for educational purposes after all and it takes
            an excruciating amount of time to render a high-resolution image pixel by pixel, literally outputting a list of pixel colors. Pretty satisfying end result!`},
            {key:10, img:'rt1', style: {gridColumn:"span 5",gridRow:"span 5", paddingBottom:'20px'}, className:"entry--img-inline", imageName:'./raytracer1.jpg', },
            {key: 'threejs', title:`Three JS`},
            {key: 3, text:`There are a lot of neat WebGL/OpenGL demos online and I wanted to give it a shot. I got started with three.js and react-three-fiber.
            I grew up in the era of flash websites so it's pretty satisfying seeing the mathematically perfect graphics that you can do with three.js.`},
            {key:'assembly-viewer', subtitle:`Assembly Viewer`},
            {key: 7, text:`A few models I've drawn up in Fusion360. Slider for exploded-view. Click and drag to pan! `},
            {key:nanoid(), component: <ThreeScene style={{width:"40vw"}} zoom={4.0} key={nanoid()}/>},
            {key:'waves', subtitle:`Waves`},
            {key:nanoid(), text: `A little waves demo. The vertex shader moves the points of the plane into a 
            wavey shape, while a stepped color function gives different blues in the fragment shader.`},
            {key:nanoid(), component: <MovingPlaneCanvas key={nanoid()}/> },
            {key:'fluid-transition', subtitle:`Fluid Transition`},
            {key:nanoid(), text: `A fun math trick creates the smooth transition animation with a single lerp. Add in a 
            little displacement and the effect is very fluid.`},
            {key:nanoid(), component: <ImageTransitionCanvas key={nanoid()}/>},
            {key: nanoid(), threejs: true,},
        ],
        imageName:'./raytracer1.jpg',
    },
    {
        num: 2,
        title: "Additive Lathe",
        link: "additivelathe",
        description: "Our capstone engineering project. This multidisciplinary project based on Cura to generates cylindrical g-code. It prints onto a custom machined drum rather than a flat bed.",
        reactDescription: {html:<div>Our capstone engineering project. This multidisciplinary project modifies the <b>open source slicer Cura </b>to generate gcode.
        It prints onto a custom machined drum rather than a flat bed. </div>},
        longdescription: [
            {key:'additivelathe', title:'Additive Lathe'},
            {key: 1, text:`Our capstone engineering project. This multidisciplinary project modifies Cura to generate gcode. It prints onto a custom machined drum rather than a flat bed.`},
            {key: 16, vimeo:'https://vimeo.com/692393001', style: {}},
            {key: 3, text:`I designed the cylindrical slicer and also integrated it into a popular open source slicer, Cura. 
            I also rewrote part of the display shader to display print previews with cylindrical layers.`, style: {gridRow:"span 5"}},
            {key: 'slicer-modifications', subtitle:'Slicer Modifications'},
            {key: nanoid(), text:`The goal of the slicer is to create toolpaths that recreate the 3D model in cylindrical coordinates.
            There are many new challenges to slicing cylindrically, particularly due to the layer geometry changing from flat 
            planes to round tubes.` , style: {gridColumn:"1 / span 2", gridRow:"span 3"}},
            {key: nanoid(), vimeo:'https://vimeo.com/748967884', vimeo_auto:'true', 
                style: {gridColumn:"3 / span 3", gridRow:"span 1", }},
            {key: 'cartesian-to-cylindrical', subtitle:'Cartesian to Cylindrical', style: {gridRow:"span 5"}},
            {key:nanoid(), text:`Here a cylinder with a window is sliced cylindrically. Note that the window remains perpendicular 
            to the drum, so it's an overhanging feature due to the smaller angular size as the layers increase in radius.
            `, style: {gridColumn:"4 / span 2", gridRow:"span 3"}},
            {key: nanoid(), vimeo:'https://vimeo.com/748967901', vimeo_auto:'true', style: {gridColumn:"1 / span 3", gridRow:"span 1", }},
            {key:nanoid(), text:`Once the model is in an STL file the cartesian coordinates are 'baked in'. That is, decoding 
            the STL file gives you a list of XYZ coordinates and not angle, radius and height dimensions. It was eventually decided
            that writing the cartesian to cylindrical converter inside the slicer would be the best course of action. `},
            {key:'closed-shell', subtitle:'Closed Shells'},
            {key:nanoid(), text:`For simplicity, a seam was added from 0 to pi so each "shell" was closed. The shell is the outmost outline
            on each print layer. You can see the artifact in this is an animation of one of the infill layers.`,},
            {key: nanoid(), vimeo:'https://vimeo.com/748967875', vimeo_auto:'true' , style: {gridColumn:"3 / span 3", gridRow:" 24 / span 3"}},
            {key:nanoid(), text:`The slicer is unsatified when an open outline is created when slicing because this is usually an input geometry fault. 
            However, two separate rings can make an enclosed shell in cylindrical coordinates, that would simply be a cylinder. 
            This feature was avoided for the time being.` , style: {gridColumn:"1 / span 2", gridRow:"24 / span 3"}},
            {key:nanoid(), text:``,},
            {key:nanoid(), text:``,},
            {key: 'hardware', title:'Hardware'},
            {key:nanoid(), text:`The project is based on the excellent Zaribo upgrade for Prusa MK2 printers. This upgrade replaces
            the sheet panel frame with aluminum extrusion, as well as directly coupled Z lead screws and other organizational
            improvements. `,},
            {key:nanoid(), text:`The bed is replaced with a plate aluminum that supports the rotating drum.`,},
            {key:nanoid(), img:'test img', style: {gridColumn:"span 5", marginBottom: "30px", height:"300px"}, className:"entry--img-inline", imageName:'./addlathe5.png'},
            {key:nanoid(), text:`The frame is paired with a Duet 2 control board, which has an excellent user interface, ethernet 
            connection, and dual extruder outputs.`,},
            {key:5, img:'test img', style: {gridColumn:"span 5", marginBottom: "30px", height:"300px"}, className:"entry--img-inline", imageName:'./addlathe2.jpg'},
            {key: 2, text:`The project won first place in the 2019 Schulich School of Engineering Capstone Fair as well as 2019 CSME National Design Competition Best Overall Design.`, style: {gridRow:"span 5"}},
            {key: 'poster', title:'Poster'},
            {key:5, img:'test img', style: {gridColumn:"span 5", marginBottom: "30px", height:"440px"}, className:"entry--img-inline", imageName:'./addlathe4.jpg'},
            
        ],
        imageName:'./addlathe1.jpg',
        imageStyle:{style: {objectPosition:'right 0 bottom 200px'}}
    },
    {
        num: 4,
        title: "Web Development",
        link: "web",
        description: `Interfaces are easy to make and look great with web tools! Interfaces such as this website (it's responsive!)- 
        Inside this section are some more web demonstrations: Wordle! A little card!`,
        reactDescription: {html:<div>Interfaces are easy to make and look great with web tools! Interfaces such as <b>this website</b> (it's responsive!)
        and a <b>wordle</b> demo</div>},
        longdescription: [
            {key:'wordle', title:`Wordle`},
            {key: 1, html:<div>React is great at making easy to work with components 
                and adds a virtual DOM that can make your webpages <i><b>react</b></i> to user inputs. </div>},
            {key: 3, wordle: true},
            {key: 2, text:`This website is written in Javascript and CSS with some great packages. Some of the more popular ones 
            are react, react-router, and react-three-fiber. 
            On the backend it's built with babel and webpack. Deployment is an nginx server running on an arch VPS.`},
        ],
        imageName:'./wordle2.png',
    },
    {
        num: 1,
        title: "Mostly Printed CNC",
        link: "mpcnc",
        description: "For what it’s worth, the MPCNC is an excellent open source CNC router for anyone interested in making parts that can’t be made on a 3D printer.",
        reactDescription:{html:<div>For what it’s worth, the MPCNC is an excellent open source CNC router that can be used for <b>routing </b> 
         2D parts in soft material, <b>plasma</b>, or <b>laser cutting.</b></div>},
        longdescription: [
            {key:'mpcnc', title:'MPCNC'},
            {key: 1, text:`For what it’s worth, the MPCNC is an excellent open source CNC router for anyone 
            interested in making parts that can’t be made on a 3D printer. If I were to make another CNC router, I would make a PrintNC. `},
            {key: 16, vimeo:'https://vimeo.com/612194957', style: {}},
            {key: 2, text:`Admittedly, using this small garage router is more finnicky than using a rigid commercial machine
            with a spindle measured in horsepower. One upside is that if you crash it, the tiny steppers can't possibly generate enough force to damage anything other than your self esteem.`}, 
            {key:'common-troubleshooting', subtitle:'Common Troubleshooting'},
            {key:5, img:'test img', style: {gridColumn:"span 3", gridRow:"span 3", marginBottom:"30px"}, className:"entry--img-inline",  imageName:'./mpcnc2.jpg'},
            {key: 4, text:`The most common issue was with electrical connectors, which were simple but painstaking to fix. Generic 'dupont' or 0.1mm connectors
            will do the job for breadboarding, but for constant motion dedicated wire to wire or wire to panel connectors are better. `, style: {gridColumn:"span 2"}},
            {key: 6, text:`Occasionally a tool would catch a wall it was not meant to. Cutting with the full cutter could overpower the steppers and making the tool dive. This could be fixed in CAM, by keeping away from the wall until a light finishing pass.`, style: {gridColumn:"span 2"}},
            {key:'laser', title:'Laser', style:{marginTop:'30px'}},
            {key: nanoid(), text:`At the end of this project I found myself not using the router particularly often because routing
            wood was messy and takes a long time. `},
            {key: nanoid(), text:`The laser is simpler to setup than plasma, requiring only power and optional air assist. Unfortunately, paper or plastic are most suitable for the laser cutter which smell terrible when vaporized. Even running it in an open garage it is quite stinky. `},
            {key: nanoid(), vimeo:'https://vimeo.com/748947623', style: {}},
        ],
        
        imageName:'./mpcnc1.jpg',
        
    }, 
    {
        num:6, 
        title: "Wood Shop",
        link: "woodshop",
        description: "Wood is great for making furniture and other objects that need a less industrial feel.",
        longdescription: [
            {key:'woodshop', title:`Woodshop`},
            {key: 1, text:`I’ve been using wood tools for a very long time. 
            I started off rather bad at making stuff out of wood. Nowadays I do alright. 
            I find making your own things gives you new and better appreciation for your surroundings.`},
            {key: 'safety', subtitle:`Safety`},
            {key:nanoid(), text:`Starting with woods requires a healthy fear of wood tooling. Wood tools move faster and store more energy than (equivalently sized) metal ones due to the higher RPM needed to sever wood fibers.`},
            {key:nanoid(), html:<div>Kickback occurs when the cutter enters the material in an uncontrolled manner, usually throwing or destroying the workpiece. In a 2011 report by the CPSC, <a href="https://cpsc.gov/s3fs-public/statsaws.pdf">available at this link</a>, nearly 80000 injuries occuried in the US between 2007 and 2009. </div>},
            {key:nanoid(), text:`Don't do anything sketchy on the table saw. When you do end up doing something sketchy, stop moving and turn off the saw until is fully stops.`},
            {key: 'wood-grain', subtitle:`Wood Grain`},
            {key:nanoid(), text:`The next fundametal of wood is working with the grain. Most people start off with a mitre or table saw which are fairly grain agnostic.`},
            {key:nanoid(), text:`The jointer and planer prefer going with the grain however. Going against the grain with a hand planer immediately feels much worse and sometimes you'll be punished when a group of fibers tears out. `},
            {key:nanoid(), text:`Take some time to examine the grain of your wood, it'll save you time and effort later on.`},
            {key: 'flat-and-square', subtitle:`Flat and Square`},
            {key:6, text:`Once you equip your shop with a jointer, planer, table and mitre saw you can make square and flat wood safely and with ease. Flat and square wood is required to get consistent results`},
            {key:nanoid(), text: `It does take quite a few steps. Usually, crosscut to an easy-to-handle size, oversize rip, jointer, planer, rip and crosscut again to the final size. `},
            {key:nanoid(), html: <div>
                The initial crosscut has a few benefits. 
                <ul><li>
                If you try to stick an 8 foot piece of wood into your 12.5" planer you
                 will probably knock something important over.</li>
                <li>For bowed pieces, it will also reduce the amount of relative bowing from end to end. A heavily bowed 8' piece of wood might be so bowed that there really is no 'flat wood' inside of there. Reduce it to 2 feet and you'll have to do only a quarter of the flattening.</li>
                    </ul>
            </div>},
            {key:7, text:`Final size is often subjective. Wood furniture is usually static or only needs simple holes for metal fasteners. Most of the time I cut wood to the width of another piece of wood, without any especial care to the exact size. Wood also bends and warps over time anyways. `},
            {key: 'chessboard', title:`Chessboard`},
            {key:5, img:'test img', style: {gridColumn:"span 2", gridRow:"span 4", marginBottom:"20px",}, className:"entry--img-inline", imageName: './wood2.jpg'},
            {key:4, text:`I decided to do this chessboard out of red oak and black walnut and I was quite pleased with it. At the 
            time of writing I haven’t done many projects out of hardwood and have only recently gotten a jointer and planer.`, style: {gridColumn:"span 3"}},
            {key:7, img:'test img', style: {gridColumn:"1 / span 2",  marginBlock:"20px", height:'40vh'}, className:"entry--img-inline", imageName:'./wood3.jpg' },
            {key:8, img:'test img', style: {gridColumn:"span 3",  marginBlock:"20px", height:'40vh'}, className:"entry--img-inline", imageName:'./wood1.jpg' },
            {key:9, img:'test img', style: {gridColumn:"1 /span 2",  marginBottom:"20px", height:'40vh'}, className:"entry--img-inline", imageName:'./wood5.jpg' },
            {key:10, img:'test img', style: {gridColumn:"span 3",  marginBottom:"20px", height:'40vh'}, className:"entry--img-inline", imageName:'./wood9.jpg' },
        ],
        imageName:'./wood10.jpg',
        imageStyle:{style: {objectPosition:'right 0 bottom 200px'}}
    },
    {
        num:7,
        title: "Digital Art",
        link: "digitalart",
        description:`"I have learned that what I have not drawn I have never really seen, and that when I start drawing an ordinary thing, I realize how extraordinary it is, sheer miracle."`,
        longdescription: [
            {key:'digitalart', title:`Digital Art`},
            {key: 'blendingmodes', title:`Blending Modes`},
            {key: 'blendingdemo', component: <BlendingModes key={nanoid()} mode="multiply" style={{gridColumn:"1 / span 3", minWidth:"0"}}/>},
            {key: 'blendingscreen', component: <BlendingModes key={nanoid()} mode="screen" style={{gridColumn:"1 / span 3", minWidth:"0"}}/>},
            {key: nanoid(), text:`Coming from the photography era, lighting modes are effects that change a base layer according to an effect layer by performing some
            mathematical expression on the base and effect.`},
            {key: nanoid(), text:`This allows for a risk free approach to light and shadow, where you can try out different brightnesses and colours without the commitment of traditional paint. Here are my favorite blending modes and how to use them.`},
            {key: 'whylearn', title:`Why learn the blending modes?`},
            {key: nanoid(), html: <div>
            <b>Color constancy.</b> Your brain will just make up colors depending on the surrounding color context, 
            so it can be very difficult to pick the right color every time. Blending modes give you a way to approach the color 
            you want without having to get it exactly right the first try. <br></br><br></br>
            <b>Big lighting decisions.</b> It's easiest to establish your lighting at the beginning and then render as needed. 
            Just like it's easiest to make a rough sketch, then refine it as you go along. If you need to add a big area of light or shadow, 
            you can add it all at once with a screen or multiply.<br></br><br></br>
            <b>Separate color from value.</b> Instead of having to work in one layer, a separate blending layer gives you some room 
            to play around with the forms before you commit to a lighting scheme. If you use multiply and screen separately, 
            you can also separate light from shadow. In some cases discussed later, you might use an overlay to do light and shadow in one layer. <br></br><br></br>
            <b>Small variations.</b> Sometimes, the difference between two shadows or two lit areas is tiny. It's actually impractical 
            to pick different color on the color wheel. In procreate color picking is confused with a disc: the triangle allows for a clear direction in each axis. Instead, adding a very light blending layer is easier.
            Once you learn blending modes you'll wonder how you lived without them and you can turn your rendering time from 1 hour to well over 10.</div>},

            {key: 'multiply', subtitle:`Multiply`},
            {key:nanoid(), imageName:'./art4.jpg', style: {gridColumn:"1 /span 3", gridRow:"span 1", overflow:"hidden", objectFit:"cover", paddingBottom:"20px", borderRadius:"10px"}, picStyle:{scale:"1.4", objectPosition:"50% 40px", textAlign:"center"}, className:"entry--img-inline"},
            {key: nanoid(), text:`Multiply is the go to blending mode for shadows. If you only use one blending mode use multiply.
            Multiply creates a less saturated color compared to overlay or burn. This is usually helpful since it naturally 
            desaturates your shadows while drawing attention to the brighter, more saturated areas. 
            Here multiply is used over the entire face and torso, before taking out the chest and 
            nose area to create a highlight.`, style: {gridColumn:"span 2"}},
            {key: nanoid(), text:`You can also multiply with a color to make the ever beloved hue shift. 
            Varying the hue with respect to brightness is called a hue shift. 
            Hatsune's hair is more yellow where it's lit on top, and more blue in the shadow. 
            This is achieved with multiplying a blue in the shadow and screening a yellow for light.`, style: {paddingTop:"10px"}},
            {key: nanoid(), text:`The formula for multiply is in the name: multiply the colours together. To gt more sensible behaviour 
            the effects layer is normalized from 0 to 1, notated with the caret. Colours have been abbreviated to a single channel.`, style:{paddingTop:'20px', gridColumn:"span 2"}},
            {key: 'multiplyslider', component: <BlendingModes key={nanoid()} mode="multiply" style={{gridColumn:"3 / span 3", minWidth:"0"}}/>},

            {key: 'overlay', subtitle:`Overlay`},
            {key: nanoid(), text:`Overlay allows you to brighten and darken in a single layer. 
            In procreate, the overlay tends to be slightly more saturated than a comparable screen or multiply when blending 
            with a grey. Especially on skin if you want a more grey shadow multiply is easiest, 
            but a warmer shadow is easier to control with an overlay.`, style: {gridColumn:"1 / span 2"}},
            {key:nanoid(), imageName:'./art11.jpg', style: {gridColumn:"3 /span 3", gridRow:"span 1", height:"400px", overflow:"hidden", objectFit:"cover", paddingBottom:"20px", borderRadius:"10px"}, picStyle:{scale:"2.0", objectPosition:"50% 50px", textAlign:"center"}, className:"entry--img-inline"},
            {key: 'overlayrecolor', subtitle:`Overlay Recolor`},
            {key: nanoid(), text:`Another use for overlay is adding color to a highlight or shadow. This is very common to see at the edge of a shadow, where the edge will have a rich red tint before turning into the shadow on skin. The physical reason for this is called subsurface scattering, but it's often just used everywhere in anime art for stylistic reasons. It's fun and easy: Add a neutral red-ish overlay to the edges of your lit areas and erase/smudge the color into the right spot. `, style: {gridColumn:"1 / span 3"}},
            {key:nanoid(), imageName:'./art7.jpg', style: {gridColumn:"4 /span 2", gridRow:"span 1", height:"400px", overflow:"hidden", objectFit:"cover", paddingBottom:"20px", borderRadius:"10px"}, picStyle:{scale:"1.0", objectPosition:"50% 0px", textAlign:"center"}, className:"entry--img-inline"},
            {key: nanoid(), text:`I say neutral red because overlay has grey as a "neutral color", meaning overlaying with 50% grey 
            produces the exact same base color. Looks like nothing happened. A red that's roughly the same brightness as 50% grey 
            will add color but not brightness. You could use a color blending mode for this.. but color is so extremely strict that 
            it tends to be lifeless.`},

            {key: 'opacity', subtitle:'Opacity'},
            {key:nanoid(), imageName:'./art5.jpg', style: {gridColumn:"1 /span 3", gridRow:"span 2", height:"400px", overflow:"hidden", objectFit:"cover", paddingBottom:"20px", borderRadius:"10px"}, picStyle:{scale:"1.2", objectPosition:"50% -20px", textAlign:"center"}, className:"entry--img-inline"},
            {key: nanoid(), text:`You might think if opaque clothing is 100% opacity, just turn the opacity down and you'll have see through clothing. 
            This is actually shooting yourself in the foot for a few reasons. `, style: {gridColumn:"4 / span 2"}},
            {key: nanoid(), text:`Blending modes lose their shading power and color picking picks up the layer underneath with a low opacity layer. It is better to overlay, multiply and screen like you normally would, but your "shadow" is the darkest part of the clothing and the "light" is the most see through part of the clothing.`, style: {gridColumn:"4 / span 2"}},
            {key: nanoid(), text:`Where the sleeve hangs off of the arm but is still sheer, you'll need a different "light" which is not skin tone but the background color. Takes a bit of time but I prefer that to dealing with opacity.`},

            {key: 'colordodge', subtitle:'Color Dodge'},
            {key:nanoid(), imageName:'./art9.jpg', style: {gridColumn:"1 /span 3", gridRow:"span 1", height:"400px", overflow:"hidden", objectFit:"cover", paddingBottom:"20px", borderRadius:"10px"}, picStyle:{scale:"1.5", objectPosition:"50% -20px", textAlign:"center"}, className:"entry--img-inline"},
            {key: nanoid(), text:`Color dodge is a powerful tool for creating intense, saturated, variated light. 
            Unlike screen it saturates colors and shifts the color towards the blend color. This can create interesting color 
            variation, like the orange around the edges of the sword glint. However, once you start dodging it can be difficult 
            to stop dodging. Color dodging is a great way to add saturation to your image, but too much saturation makes your picture look unnatural.`, style: {gridColumn:"4 / span 2"}},
            {key: nanoid(), text:`The principle is similar to the smudge tool. If you smudge too much your painting will be a blobby formless mess. If you dodge too much your painting will look like the surface of the sun.`},
            
            {key: 'normal', subtitle:'Normal'},
            {key:nanoid(), imageName:'./art8.jpg', style: {gridColumn:"1 /span 3", gridRow:"span 1", height:"400px", overflow:"hidden", objectFit:"cover", paddingBottom:"20px", borderRadius:"10px"}, picStyle:{scale:"1.7", objectPosition:"left 20px top 50px", textAlign:"center"}, className:"entry--img-inline"},
            {key: nanoid(), text:`Don't underestimate normal. Once you know how to apply multiply, screen and overlay you will use them constantly. But it's possible to have too much variation in light and shadow. To consolidate areas of light and shadow, use - normal - which can flatten an area that has too much going on. Traditional painters love this, they're always trying to group areas of shadow to just create the impression of form without literally having to paint every detail.`, style: {gridColumn:"4 / span 2"}},
            {key: nanoid(), text:`Occlusion shadows: look at the size of the occlusion shadows on the arm and leg. In a brightly lit scene where light is getting in everywhere, the occlusion is tiny. However, it adds a lot of depth to have occlusion shadows, and they are very dark, even at the small size.`},

            {key: 'screen', subtitle:'Screen'},
            {key: nanoid(), text:`Screen can lighten an area although its usage usually has to be combined with overlay and multiply to get a full range of light. You can multiply a whole layer and it will look like it's in shadow, but screen will not make everything look lighter. Generally good when you want to add a less saturated light than overlay, or a rim light that's not as saturated as color dodge.`, style: {gridColumn:"1 / span 2"}},
            {key:nanoid(), imageName:'./art1.jpg', style: {gridColumn:"3 /span 3", gridRow:"span 1", height:"400px", overflow:"hidden", objectFit:"cover", paddingBottom:"20px", borderRadius:"10px"}, picStyle:{scale:"1.2", objectPosition:"50% 0px", textAlign:"center"}, className:"entry--img-inline"},
            {key: nanoid(), text:`Here you can see the neutral white-ish light coming in from the top with a screen, and a red overlay to highlight the shadow on the arms and legs.`, style: {paddingTop:"20px"}},

            {key: 'principles', title:'Principles'},
            {key: 'values', subtitle:'Value'},
            {key: nanoid(), text:`Many artists begin with line art, perhaps because most paper is white and pencils are dark. This is great in learning subjects like anatomy, perspective, and detail but lacks the form principle: The way that light behaves on a 3D object`},
            {key: nanoid(), text:`Starting with areas of light and dark is another useful approach, also known as values. It is especially useful for composition and adding depth. It is useful that blending modes add ways of easily playing with values without having to color pick every light variation. `},

            {key: 'illusion', subtitle:'Illusion'},
            {key: nanoid(), text:`A key idea is that every artistic representation is an illusion and not the subject itself. Any image, even photons from the sun bouncing into the eyes, is trickery that convinces the eyes the subject is in view.`},
            {key: nanoid(), html:<div>Playing with the slider of illusion is the spirit of a <b>painterly</b> style. <b>Impressionists</b> were concerned with extending this idea to the minimum impression they could use. Contrarily, <b>raytracing</b> composes a picture mathematically pixel by pixel. There is no overarching subject or lighting theme, each pixel is individually calculated on its own and through mathematical coincidence creates a compelling illusion. </div>},

            {key: 'backgrounds', subtitle:'Backgrounds'},
            {key:nanoid(), imageName:'./art2.jpg', style: {gridColumn:"1 /span 3", gridRow:"span 2", height:"400px", overflow:"hidden", objectFit:"cover", paddingBottom:"20px", borderRadius:"10px"}, picStyle:{scale:"1.5", objectPosition:"50% -20px", textAlign:"center"}, className:"entry--img-inline"},
            {key: nanoid(), text:`If you're a "character artist" eventually you'll have spent a whole session rendering and realize you have no background to speak of.`, style: {gridColumn:"4 / span 2", gridRow:"span 1"}},
            {key: nanoid(), text:`The background establishes the color and lighting of the image, and can help balance your picture overall. You could just forget about this background business, go full flat anime color and live a happy life. Or, you can use blending modes to achieve depth and the subtle shadow variations that occur on large flat surfaces (like walls).`, style: {gridColumn:"4 / span 2", gridRow:"span 1"}},
            {key: nanoid(), text:`The troubling thing about walls is that they are so big the nature of light changes from one side to the other. It may be tempting to simply fill a wall with a single flat color but without variations in light it gives a shallow and unrealistic appearance. Watch the occlusion shadows in the corners, which are subtle and spread over the whole corner. A crisp line with the right perspective is necessary in the corners to establish the roominess. `},
            {key: nanoid(), text:`Generally for wider shot backgrounds, the foreground is darker than the background. It can be useful to layer up multiply layers as you get closer to the foreground, which is how this background was built up.`},
            {key: nanoid(), text:`All of this is to say I usually just cram the background in as an afterthought at the end.`},

            {key: 'cutnsmooth', subtitle:'Cut & Smooth'},
            {key: nanoid(), text:`Forms can be broken down into hard planes, imagine a "lopoly" appearance. The line between these planes makes a cut. Some planes smoothly transition into the next plane, called a smooth. I learned from Sinix's painting like a sculptor video which helps to get convincing forms in your painting. `, style: {gridColumn:"1 / span 2"}},
            {key:nanoid(), imageName:'./art6.jpg', style: {gridColumn:"3 /span 3", gridRow:"span 1", height:"400px", overflow:"hidden", objectFit:"cover", paddingBottom:"20px", borderRadius:"10px"}, picStyle:{scale:"1.6", objectPosition:"50% 60px", textAlign:"center"}, className:"entry--img-inline"},
            {key: nanoid(), text:`Often, one side of a plane will be cut and the other will be smoothed. Look at the navel or the folds in the clothing. Again, cuts and smooths are tools that can be misused. It's easy to do too much smudging and end up with blobby shadows. Make sure to add cuts to define the form.`, style: {paddingTop:"20px"}},
            {key: 'onai', title:`On AI`},
            {key: nanoid(), text:`In the same period ChatGPT became the fastest-growing user base, 100 million in 2 months, the initial model 
            of Stable Diffusion (SD) was released. Notably, it was able to run it's text-to-image model on most consumer hardware with a moderate graphics card. `},
            {key: nanoid(), text:`It did not take long before generative AI for images became a threat instead of a novelty.
             Lawsuits were started due to training images being scraped from the internet without artist or owner permission.`},
            {key: nanoid(), text:`Why was such backlash not seen for ChatGPT? SD allows for end-user tuning, by embeddings, hypernetworks, or DreamBooth. 
            While the initial training of SD took 150,000 GPU hours, tuning only required a handful of hours on a moderate server.`},
            {key: nanoid(), text:`This allowed for users to train models in the style of particular artists instead of the rather generic output of plain SD. 
            Although these artist trained models weren't the subject of lawsuits, they drew enough attention to get some sort of legal action moving against Stability AI.`},
            {key: nanoid(), text:`Either way, there would be no lawsuit if the technology was not startlingly good. 
            It does seem to be a "sheer miracle" that after so many training hours this model that the output is any good at all. I dabbed a little into 
            DreamBooth and did not get very far after a few hours of training.`},
            {key: nanoid(), text:`Personally, it's fun to see the hornets nest get stirred up. Artists are angry, programmers are self righteous, I
            think the whole thing is fascinating. There is so many interesting observations from the technological and artistic sides. The tools for artists 
            and programmers have never been more powerful.`},
            {key: nanoid(), text:``},
            {key: nanoid(), text:``},
        ],
        imageName:'./art1.jpg',
        imageStyle:{style: {objectPosition:'right 0px top -20px', transform:'scale(1.2)'}}
    },
]