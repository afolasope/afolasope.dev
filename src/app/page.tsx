import Profile from '@/components/Profile';
import ProjectCard, { ProjectProps } from '@/components/ProjectCard';

const projects: ProjectProps[] = [
    {
        name: 'Integraflow playground',
        tech: 'React, TypeScript, TailwindCSS',
        description:
            'Integraflow is a cutting-edge platform that specialises in in-product micro-surveys for SaaS and digital products.',
        sourceCode: 'https://github.com/IntegraflowHQ/integraflow-playground',
        liveUrl: 'https://playground.useintegraflow.com/',
    },
    {
        name: 'Integraflow web SDK',
        tech: 'Preact, TypeScript, TailwindCSS, WebPack, Rollup, Babel',
        sourceCode: 'https://github.com/IntegraflowHQ/integraflow',
        liveUrl: 'https://www.npmjs.com/package/integraflow-js',
    },
    {
        name: 'Integraflow dashboard',
        tech: 'React, TypeScript, TailwindCSS, Apollo',
        sourceCode: 'https://github.com/IntegraflowHQ/integraflow/tree/main/apps/frontend',
        liveUrl: 'https://app.useintegraflow.com',
    },
    {
        name: 'Scrs',
        description: 'A url shortener',
        tech: 'React, TypeScript, TailwindCSS',
        sourceCode: 'https://github.com/afolasope/url-shortener-mern',
        liveUrl: 'https://scrs-io.onrender.com/',
    },
    {
        name: 'Weather Bolt',
        tech: 'Javascript, CSS',
        description:
            'Experience the weather in the most popular cities. The app also incorporates CRUD actions for a better user experience',
        sourceCode: 'https://github.com/afolasope/weatherBolt',
        liveUrl: 'https://weatherbolts.netlify.app',
    },
    {
        name: 'Folarooney',
        tech: 'Typescript, React, CSS',
        sourceCode: 'https://github.com/afolasope/Folarooney',
        liveUrl: 'https://folarooney.onrender.com/',
    },
    {
        name: 'Easybank',
        tech: 'SCSS, Html, Javascript',
        sourceCode: 'https://github.com/afolasope/easy-bank',
        liveUrl: 'https://enchanting-easy-banking.netlify.app/',
    },
    {
        name: 'Fancy todo list',
        tech: 'Javascript, Html, CSS',
        sourceCode: 'https://github.com/afolasope/task-manager',
        liveUrl: 'https://task-manager-fola.netlify.app',
    },
];

export default function Home() {
    return (
        <main className='flex min-h-screen overflow-x-hidden max-w-screen-2xl mx-auto flex-col lg:flex-row'>
            <Profile />

            <section className='flex-1 flex flex-col gap-3 group px-8 lg:right-0 lg:max-h-screen lg:max-w-[600px] lg:px-0 lg:pt-8 lg:pr-8 xl:pt-20 xl:pr-20 overflow-x-visible'>
                {projects.map((project) => (
                    <ProjectCard key={project.name} {...project} />
                ))}
            </section>
        </main>
    );
}
