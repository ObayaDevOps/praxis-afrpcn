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
            delay: 20
        }}
        onInit={(typewriter) => {
            typewriter
                .typeString('<p style="color: #27ae60; font-family:`var(--font-press-start-2P)`; font-size:5rem">𖨔𖨕𖨖𖨗𖨘-𖨙𖨚𖡼𖡽𖠀𖠁𖠂𖠃 𖠄𖡼𖡽𖠀𖠁𖠂𖠃 𖠁𖠂𖠃:</p>')
                .typeString('<p style="color: #27ae60; font-family:`var(--font-press-start-2P)`; font-size:5rem">𖨙𖨚𖡼𖡽𖠀𖠁𖠂𖠃𖠃 𖡼𖡽𖠀𖠁𖠂𖠃𖠃 𖠃𖠃 𖨙𖨚𖡼𖡽𖠀𖠁𖠂𖠃𖠃</p>')

                .pauseFor(40)
                .deleteAll(2)
                .changeDelay(50)
                .typeString('<p style="color: #27ae60; font-family:Silkscreen; font-size:5rem">World-building Through Art: </p>')
                .pauseFor(800)

                .typeString('<p style="color: #27ae60; font-family:Silkscreen; font-size:5rem">Imagining Futures of Liberation </p>')
                .start();
        }}
        />
)

