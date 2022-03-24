import mpcnc from "../../imgs/mpcnc1.jpg"
import adlathe from "../../imgs/addlathe1.jpg"
import raytracer from "../../imgs/raytracer1.jpg"
import wordle from "../../imgs/wordle1.png"

export default [
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
        {key:5, img:'test img', style:{ }, className:"entry--img-inline"},
        {key: 3, text:`At the end of this project I found myself not using the router particularly often because routing
         wood was messy and took a long time. However it has turned into my CNC plasma cutter which seems like a better fit for this machine.`}
        ],

        imageNum: 0,
            
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
        imageNum: 1
    },
    {
        key: 4,
        title: "Wordle with React",
        tags: "Canada",
        description: "React is a nice library that can make your webpages /react/ to user inputs. User inputs such as playing wordle! You can even play it -right here (not yet)-",
        longdescription: [
            {key: 1, text:`React is a nice library that can make your webpages /react/ to user inputs. User inputs such as playing wordle! You can even play it -right here (not yet)-`},
        ],
        imageNum: 3
        },

    {
        key: 3,
        title: "Raytracer in Rust",
        tags: "Canada",
        description: "A computer graphics classic, now memory safe!",
        longdescription: [
            {key: 1, text:`I've always had an interest in 3D graphics and shaders, so I decided to give a raytracer a shot and also learn a new programming language, Rust.`},
            {key: 2, text:`Rust doesn't give any particular advantages in this case, given that there's no finnicky memory management.`},
            {key: 3, text:`It was quite nice to use the built in package manager though!`}
            ],
        imageNum: 2
    },

    
]