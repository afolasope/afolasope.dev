import Profile from '@/components/Profile';
import ProjectCard, { ProjectProps } from '@/components/ProjectCard';

const projects: ProjectProps[] = [
    {
        name: 'Integraflow website',
        tech: 'NextJS, TypeScript, TailwindCSS',
        description:
            'Integraflow is a cutting-edge platform that specialises in in-product micro-surveys for SaaS and digital products.',
        sourceCode: 'https://github.com/IntegraflowHQ/website',
        liveUrl: 'https://www.useintegraflow.com/',
    },
    {
        name: 'Integraflow web SDK',
        tech: 'Preact, TypeScript, TailwindCSS, WebPack, Rollup, Babel',
        sourceCode: 'https://github.com/IntegraflowHQ/integraflow-web',
        liveUrl: 'https://www.npmjs.com/package/@integraflow/web',
    },
    {
        name: 'Integraflow dashboard',
        tech: 'React, TypeScript, TailwindCSS, Apollo',
        sourceCode: 'https://github.com/IntegraflowHQ/integraflow/tree/ENG-91/apps/frontend',
    },
    {
        name: 'Integraflow backend',
        tech: 'Python, Django, Celery, Graphene, PostgreSQL, Docker',
        sourceCode: 'https://github.com/IntegraflowHQ/integraflow/tree/ENG-91/backend',
    },
    {
        name: 'Amet',
        tech: 'React, Redux, Firebase',
        description: 'A concept cinema app',
        sourceCode: 'https://github.com/AfeezGL/ametmovie',
        liveUrl: 'https://ametmovie.web.app/',
    },
    {
        name: 'BucketList',
        tech: 'React, Firebase',
        description: 'A simple app for documenting your targets and achievements.',
        sourceCode: 'https://github.com/AfeezGL/bucketlist-firebase',
        liveUrl: 'https://bucketlist-24fcf.web.app/',
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
