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


export const TypewriterText = () => (
        <Typewriter
        options={{
            delay: 20,
        }}
        onInit={(typewriter) => {
            typewriter
                .changeCursor('<p style="color: #ffffff; font-family:Space Mono; font-size:4rem; font-weight:600">|</p>')

                .typeString('<p style="color: #ffffff; font-family:Space Mono; font-size:5rem; font-weight:600">World-building Through Art: </p>')
                .pauseFor(600)
                .typeString('<p style="color: #ffffff; font-family:Space Mono; font-size:4rem; font-weight:600">Imagining Futures of Liberation </p>')
                
                .pauseFor(300)
                .typeString('<p style="color: #ffffff; font-family:Space Mono; font-size:1.75rem; font-weight:600; padding-top:20px">Our Praxis Lab at Afropocene StudioLab is in motion — a space where artists and thinkers gather to imagine and create liberated futures. Rooted in African ancestral knowledge and Black liberation theories, we’re exploring artistic purpose, radical imagination, and art as a tool for transformation. Facilitated by Tracian Meikle with guest mentors, this lab is a collective journey toward freedom.</p>')

                // .typeString('<p style="color: #ffffff; font-family:Space Mono; font-size:2rem; font-weight:500">Tracian Meikle</p>')
                // .typeString('<a href="/enter" style="color: #ffffff; font-family:Space Mono; font-size:2rem; font-weight:500 text-decoration:underline">Click here to Enter</a>')
                .changeCursor('  ')

                .start();
        }}
        />
)


export const TypewriterTextMobile = () => (
    <Typewriter
    options={{
        delay: 20
    }}
    onInit={(typewriter) => {
        typewriter
        .changeCursor('<p style="color: #ffffff; font-family:Space Mono; font-size:1.5rem; font-weight:600">|</p>')

            .typeString('<p style="color: #ffffff; font-family:Space Mono; font-size:2rem; font-weight:600">World-building Through Art: </p>')
            .pauseFor(600)
            .typeString('<p style="color: #ffffff; font-family:Space Mono; font-size:1.75rem; font-weight:600">Imagining Futures of Liberation! </p>')
            .typeString('<p style="color: #ffffff; font-family:Space Mono; font-size:1.75rem; font-weight:600">Imagining Futures of LiberationXX </p>')
            .typeString('<p style="color: #ffffff; font-family:Space Mono; font-size:1.75rem; font-weight:600">Our Praxis Lab at Afropocene StudioLab is in motion — a space where artists and thinkers gather to imagine and create liberated futures. Rooted in African ancestral knowledge and Black liberation theories, we’re exploring artistic purpose, radical imagination, and art as a tool for transformation. Facilitated by Tracian Meikle with guest mentors, this lab is a collective journey toward freedom.</p>')

            
            .changeCursor('  ')

            .start();
    }}
    />
)


