import { HomeIcon, UsersIcon, } from '@sanity/icons'

export default {
    name: 'pageContent',
    title: 'Landing Page Content',
    type: 'document',
    fields: [
        {
            name: 'mainHeading',
            title: 'Main Heading',
            type: 'string',
            description: 'The main heading for the page (e.g., "World-building Through Art:")',
        },
        {
            name: 'subHeading',
            title: 'Sub Heading',
            type: 'string',
            description: 'The sub-heading for the page (e.g., "Imagining Futures of Liberation")',
        },
        {
            name: 'description',
            title: 'Description Paragraph',
            type: 'text',
            description: 'The descriptive paragraph about the Project.',
        },
        {
            name: 'clickToEnterText',
            title: 'Click to Enter Text',
            type: 'string',
            description: 'The text for the "Click to Enter" link.',
        },
    ],
};
