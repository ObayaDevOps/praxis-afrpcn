import Typewriter from 'typewriter-effect';

const textArray = [];




{/* <Text color='white' fontFamily='Silkscreen' fontSize='7xl'>
Worldbuilding Through Art: Imagining Futures of Liberation
</Text>

World-building Through Art:
𖨔𖨕𖨖𖨗𖨘-𖨙𖨚𖡼𖡽𖠀𖠁𖠂𖠃 𖠄𖡼𖡽𖠀𖠁𖠂𖠃 𖠁𖠂𖠃:


Imagining Futures of Liberation
𖨙𖨚𖡼𖡽𖠀𖠁𖠂𖠃𖠃 𖡼𖡽𖠀𖠁𖠂𖠃𖠃 𖠃𖠃 𖨙𖨚𖡼𖡽𖠀𖠁𖠂𖠃𖠃
<p style="color: #27ae60;" >Worldbuilding Through Art: </p> */}


export const TypewriterText = ({ mainHeading, subHeading, description }) => (
        <Typewriter
        options={{
            delay: 20,
        }}
        onInit={(typewriter) => {
            typewriter
                .changeCursor('<p style="color: #ffffff; font-family:Space Mono; font-size:4rem; font-weight:600">|</p>')

                .typeString(`<p style="color: #ffffff; font-family:Space Mono; font-size:5rem; font-weight:600">${mainHeading}</p>`)
                .pauseFor(600)
                .typeString(`<p style="color: #ffffff; font-family:Space Mono; font-size:4rem; font-weight:600">${subHeading}</p>`)
                
                .pauseFor(300)
                .typeString(`<p style="color: #ffffff; font-family:Space Mono; font-size:1.75rem; font-weight:600; padding-top:2rem">${description}</p>`)

                // .typeString('<p style="color: #ffffff; font-family:Space Mono; font-size:2rem; font-weight:500">Tracian Meikle</p>')
                // .typeString('<a href="/enter" style="color: #ffffff; font-family:Space Mono; font-size:2rem; font-weight:500 text-decoration:underline">Click here to Enter</a>')
                .changeCursor('  ')

                .start();
        }}
        />
)


export const TypewriterTextMobile = ({ mainHeading, subHeading, description }) => (
    <Typewriter
    options={{
        delay: 10
    }}
    onInit={(typewriter) => {
        typewriter
        .changeCursor('<p style="color: #ffffff; font-family:Space Mono; font-size:1.5rem; font-weight:600">|</p>')

            .typeString(`<p style="color: #ffffff; font-family:Space Mono; font-size:1.75rem; font-weight:600">${mainHeading}</p>`)
            .pauseFor(600)
            .typeString(`<p style="color: #ffffff; font-family:Space Mono; font-size:1.5rem; font-weight:600">${subHeading}</p>`)
            // The next line seems to be a duplicate and an extra line, removed it to match the TypewriterText logic.
            // .typeString('<p style="color: #ffffff; font-family:Space Mono; font-size:1.75rem; font-weight:600">Imagining Futures of LiberationXX </p>') 
            .typeString(`<p style="color: #ffffff; font-family:Space Mono; font-size:0.75rem; font-weight:600; padding-top:2rem">${description}</p>`)

            
            .changeCursor('  ')

            .start();
    }}
    />
)


