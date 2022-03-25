import mpcnc from "../../imgs/mpcnc1.jpg"
import adlathe from "../../imgs/addlathe1.jpg"
import raytracer from "../../imgs/raytracer1.jpg"
import wordle from "../../imgs/wordle1.png"

export default [
    {
        key:5, 
        title: "Metal Shop",
        description: "Simply the best way to cover everything in iron oxide",
        longdescription: [{key: 1, text:`I'm pretty new to metal fabrication and welding. I have had only a vague interest in steel 
        until the lumber prices during the pandemic made it more enticing to use an angle grinder.`},
        {key:3, text:`I've found that metal in general is more forgiving than wood; the cutting tools go at a lower rpm and a butt joint can simply be welded together`},
        {key: 2, subtitle:`Plasma Cutter`},
        {key:4, text:`Plasma cutting uses a stream of plasma between the torch head and the metal to deliver enough energy to melt 
        the metal and blow it away. This is kind of unbelievable the first time you hold a plasma cutter and the sheet metal 
        under the nozzle disappears with just electricity and compressed air.`},
        {key:6, text:`I probably could have gotten away with getting a throatless shear. I reasoned it enough by thinking: I’ve 
        got a CNC table already, why not strap a plasma cutter to it?`},
        {key:7, text:`Admittedly it took a rather long time to get to this point. A combination of poor connectors and very strong 
        electromagnetic interference (EMI) meant a lengthy process of troubleshooting to finally get it working.`},
        {key:8, text:`I had to rewire the entire CNC machine, add shielding to all the exterior cables, add an enclosure for the controllers, 
        and also replace the tiny 3d printer drivers with more noise resistant stepper drivers.`},
        {key:9, text:`Comparing this amount of work to a less noisy plasma cutter, of course it would have been a better idea to simply 
        buy a blowback plasma from the start.`},
        {key: 10, subtitle:`Welding`, style: {gridColumn:"span 3"} },
        {key: 14, imageName:'./welding1.jpg', style: {gridColumn:"1 /span 2", gridRow:"span 5"}, className:"entry--img-inline"},
        {key: 11, text:`Welding is easy to learn and hard to master. I quite liked Steve Bleile’s welding videos.`, style: {gridColumn:"span 3"}},
        {key:12, text:`Recently I also got myself a fun 110cuft bottle to TIG weld with.`, style: {gridColumn:"span 3"}},
        {key:13, text:`TIG is certainly less forgiving and more sensitive to a litany of new variables. 
        However, it is very satisfying to see a clean weld come out without chipping or brushing at all.`, style: {gridColumn:"span 3"}},
        {key: 15, imageName:'./welding2.jpg', style: {gridColumn:"3 /span 2", gridRow:"span 1", height:"15vw", overflow:"hidden", objectFit:"cover"}, className:"entry--img-inline"},
    ],
        imageName:'./plasma2.jpg',
    },
    {
        key: 1,
        title: "Mostly Printed CNC",
        tags: "CNC, 3D Printer",
        description: "For what it’s worth, the MPCNC is an excellent open source CNC router for anyone interested in making parts that can’t be made on a 3D printer.",
        longdescription: [
        {key: 1, text:`For what it’s worth, the MPCNC is an excellent open source CNC router for anyone 
        interested in making parts that can’t be made on a 3D printer.`},
        {key: 2, text:`Admittedly, using this small garage router is more finnicky than using a rigid commercial machine
         with a spindle measured in horsepower. One upside is that if you crash it, the tiny steppers can't possibly generate enough force to damage anything other than your self esteem.`}, 
        {key: 4, text:`The most common issue was with electrical connectors, which were simple but painstaking to fix. Occasionally the tool could catch a wall it
        was not meant to engage and dove into the material.`},
        {key:5, img:'test img', style:{ }, className:"entry--img-inline", imageName:'./mpcnc2.jpg'},
        {key: 3, text:`At the end of this project I found myself not using the router particularly often because routing
         wood was messy and took a long time. However it has turned into my CNC plasma cutter which seems like a better fit for this machine.`}
        ],

        imageName:'./mpcnc1.jpg',
            
    }, 
    {
        key: 2,
        title: "Additive Lathe",
        tags: "Canada",
        description: "Our capstone engineering project. This multidisciplinary project heavily modifies Cura to generate gcode. It prints onto a custom machined drum rather than a flat bed.",
        longdescription: [
            {key: 1, text:`Our capstone engineering project. This multidisciplinary project heavily modifies Cura to generate gcode. It prints onto a custom machined drum rather than a flat bed.`},
            {key: 2, text:`The project won first place in the 2019 Capstone Fair as well as 2019 CSME National Design Competition Best Overall Design.`},
            {key: 3, text:`I designed the mathematical basis for the cylindrical slicer and also integrated it into a popular open source slicer, Cura. 
            I also rewrote part of the display shader to display print previews with cylindrical layers.`}
            ],
            imageName:'./addlathe1.jpg',
    },
    {
        key: 4,
        title: "Wordle with React",
        tags: "Canada",
        description: "React is a nice library that can make your webpages /react/ to user inputs. User inputs such as playing wordle! You can even play it -right here (not yet)-",
        longdescription: [
            {key: 1, text:`React is a nice library that can make your webpages /react/ to user inputs. User inputs such as playing wordle! You can even play it -right here (not yet)-`},
        ],
        imageName:'./wordle1.png',
        },

    {
        key: 3,
        title: "Raytracer in Rust",
        tags: "Canada",
        description: "A computer graphics classic, now memory safe!",
        longdescription: [
            {key: 1, text:`I've always had an interest in 3D graphics and shaders, so I decided to give a raytracer a shot and also learn a new programming language, Rust.`},
            {key: 2, text:`Rust doesn't give any particular advantages in this case, given that there's no finnicky memory management.`},
            {key: 3, text:`It was quite nice to use the built in package manager though!`},
            // {key: 4, threejs: true}
            ],
            imageName:'./raytracer1.jpg',
    },
    {
        key:6, 
        title: "Wood Shop",
        description: "Why spend money to get furniture when you can spend time and money instead?",
        longdescription: [{key: 1, text:`I’ve been using wood tools ever since I graduated from the box cutter and hot glue gun. 
        That being said I spent a very long time being bad at woodworking. Nowadays I can make some things passably. 
        I find it’s pretty nice to be surrounded by your own furniture.`},
        {key: 2, subtitle:`Chessboard`},
        {key:5, img:'test img', style:{ }, className:"entry--img-inline", imageName: './wood2.jpg'},
        {key:4, text:`I decided to do this chessboard out of red oak and black walnut and I was quite pleased with it. I honestly haven’t done many projects 
        out of hardwood since I haven’t had a planer until recently. Still missing a few wood shop tools. However, simply getting the edges square on the 
        table saw is passable enough for me.`},

        ],
        imageName:'./wood1.jpg',
    }
    
]