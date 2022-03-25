import mpcnc from "../../imgs/mpcnc1.jpg"
import adlathe from "../../imgs/addlathe1.jpg"
import raytracer from "../../imgs/raytracer1.jpg"
import wordle from "../../imgs/wordle1.png"

export default [
    {
        key:5, 
        title: "Metal Shop",
        description: "Simply the best way to cover everything in iron oxide",
        longdescription: [
            {key: 1, text:`I'm pretty new to metal fabrication and welding. I have had a vague interest in steel but during 
            the pandemic lumber prices made it more enticing to pick up an angle grinder.`},
            {key:3, text:`I've found that metal in general is more forgiving than wood; the cutting tools go at a lower rpm and a butt joint can simply be welded together`},
            {key: 2, subtitle:`Plasma Cutter`},
            {key: 15, vimeo:'https://vimeo.com/675640978', },
            {key:4, text:`Plasma cutting uses a stream of plasma between the torch head and the metal to deliver enough energy to melt 
            the metal and blow it away. It's also fast!`},
            {key:6, text:`I probably could have gotten away with getting a throatless shear. I reasoned it enough by thinking: I’ve 
            got a CNC table already, why not strap a plasma cutter to it?` , style: {gridColumn:"1 / span 2", paddingRight:"20px"}},
            {key: 16, vimeo:'https://vimeo.com/692360282', style: {gridColumn:"span 3"}},
            {key:7, text:`Admittedly it took a rather long time to get to this point. A combination of poor connectors and very strong 
            electromagnetic interference (EMI) meant a lengthy process of troubleshooting to finally get it working.`},
            {key:8, text:`I had to rewire the entire CNC machine, add shielding to all the exterior cables, add an enclosure for the controllers, 
            and also replace the tiny 3d printer drivers with more noise resistant stepper drivers.`},
            {key:9, text:`Comparing this amount of work to a less noisy plasma cutter, of course it would have been a better idea to simply 
            buy a blowback plasma from the start.`,},
            {key: 14, imageName:'./welding1.jpg', style: {gridColumn:"1 /span 2", gridRow:"span 4", margin:"20px 20px", marginLeft:"0"}, className:"entry--img-inline"},
            {key: 10, subtitle:`Welding`, style: {gridColumn:"3 / span 3"} },
            {key: 11, text:`Welding is easy to learn and hard to master. I quite liked Steve Bleile’s welding videos. They are densely packed with information and without the 
            embellishments of a youtube tutorial.`, style: {gridColumn:"span 3"}},
            {key:13, text:`Recently I also got myself a fun 110cuft bottle to TIG weld with. TIG is certainly less forgiving and more sensitive to a litany of new variables. 
            However, it is very satisfying to see a clean weld come out without chipping or brushing at all.`, style: {gridColumn:"span 3"}},
            {key: 15, imageName:'./welding2.jpg', style: {gridColumn:"1 /span 4", gridRow:"span 4", width:"40vw", height:"20vw", overflow:"hidden", objectFit:"cover"}, className:"entry--img-inline"},
    ],
        imageName:'./plasma2.jpg',
    },
    {
        key: 1,
        title: "Mostly Printed CNC",
        description: "For what it’s worth, the MPCNC is an excellent open source CNC router for anyone interested in making parts that can’t be made on a 3D printer.",
        longdescription: [
            {key: 1, text:`For what it’s worth, the MPCNC is an excellent open source CNC router for anyone 
            interested in making parts that can’t be made on a 3D printer.`},
            {key: 16, vimeo:'https://vimeo.com/612194957', style: {}},
            {key: 2, text:`Admittedly, using this small garage router is more finnicky than using a rigid commercial machine
            with a spindle measured in horsepower. One upside is that if you crash it, the tiny steppers can't possibly generate enough force to damage anything other than your self esteem.`}, 
            {key:5, img:'test img', style: {gridColumn:"span 2", gridRow:"span 3", margin:"20px 20px", marginLeft:"0"}, className:"entry--img-inline",  imageName:'./mpcnc2.jpg'},
            {key: 4, text:`The most common issue was with electrical connectors, which were simple but painstaking to fix. Occasionally the tool could catch a wall it
            was not meant to engage and dove into the material.`, style: {gridColumn:"span 3"}},
            {key: 3, text:`At the end of this project I found myself not using the router particularly often because routing
            wood was messy and took a long time. However it has turned into my CNC plasma cutter which seems like a better fit for this machine.`, style: {gridColumn:"span 3"}}
        ],

        imageName:'./mpcnc1.jpg',
            
    }, 
    {
        key: 2,
        title: "Additive Lathe",
        description: "Our capstone engineering project. This multidisciplinary project heavily modifies Cura to generate gcode. It prints onto a custom machined drum rather than a flat bed.",
        longdescription: [
            {key: 1, text:`Our capstone engineering project. This multidisciplinary project heavily modifies Cura to generate gcode. It prints onto a custom machined drum rather than a flat bed.`},
            {key: 16, vimeo:'https://vimeo.com/692393001', style: {}},
            {key:5, img:'test img', style: {gridColumn:"span 2", gridRow:"span 3", margin: "20px 20px 20px 0px "}, className:"entry--img-inline", imageName:'./addlathe2.jpg'},
            {key: 3, text:`I designed the mathematical basis for the cylindrical slicer and also integrated it into a popular open source slicer, Cura. 
            I also rewrote part of the display shader to display print previews with cylindrical layers.`, style: {gridColumn:"span 3"}},
            {key: 2, text:`The project won first place in the 2019 Schulich School of Engineering Capstone Fair as well as 2019 CSME National Design Competition Best Overall Design.`, style: {gridColumn:"span 3"}},
            
            ],
            imageName:'./addlathe1.jpg',
    },
    {
        key: 4,
        title: "Wordle with React",
        description: "React is a nice library that can make your webpages /react/ to user inputs. User inputs such as playing wordle! You can even play it -right here (not yet)-",
        longdescription: [
            {key: 1, text:`React is a nice library that can make your webpages /react/ to user inputs. User inputs such as playing wordle! You can even play it -right here (not yet)-`},
        ],
        imageName:'./wordle1.png',
    },
    {
        key: 3,
        title: "Raytracer in Rust",
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
        longdescription: [
            {key: 1, text:`I’ve been using wood tools ever since I graduated from the box cutter and hot glue gun. 
            That being said I spent a very long time being bad at woodworking. Nowadays I can make some things passably. 
            I find it’s pretty nice to be surrounded by your own furniture.`},
            {key: 2, subtitle:`Chessboard`},
            {key:5, img:'test img', style: {gridColumn:"span 2", gridRow:"span 4", margin: "20px 20px 20px 0px "}, className:"entry--img-inline", imageName: './wood2.jpg'},
            {key:4, text:`I decided to do this chessboard out of red oak and black walnut and I was quite pleased with it. I honestly haven’t done many projects 
            out of hardwood since I haven’t had a planer until recently.`, style: {gridColumn:"span 3"}},
            {key:6, text:`It's really satisfying to square up your stock. That being said, now that I have the stock prep essentials, 
            now I have to square up all my wood.`, style: {gridColumn:"span 3"}},
            {key:7, img:'test img', style: {gridColumn:"1 / span 2",  marginBottom:"20px"}, className:"entry--img-inline", imageName:'./wood3.jpg' },
            {key:8, img:'test img', style: {gridColumn:"span 3",  marginBottom:"20px"}, className:"entry--img-inline", imageName:'./wood1.jpg' },
            {key:9, img:'test img', style: {gridColumn:"1 /span 2",  marginBottom:"20px"}, className:"entry--img-inline", imageName:'./wood5.jpg' },
            {key:9, img:'test img', style: {gridColumn:"span 3",  marginBottom:"20px"}, className:"entry--img-inline", imageName:'./wood9.jpg' },
            ],
        imageName:'./wood10.jpg',
    }
    
]