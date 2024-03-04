import Profile from '@/components/Profile';
import ProjectCard, { ProjectProps } from '@/components/ProjectCard';

const projects: ProjectProps[] = [
    {
        name: 'Lorem, ipsum dolor sit amet',
        description:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime id eum commodi aperiam facilis earum!',
        tech: 'Lorem, ipsum, dolor, sit',
        sourceCode: 'https://fghjk.hj/hjk',
        liveUrl: 'https://fghjk.hj/hjk',
    },
    {
        name: 'Lorem, ipsum dolor sit amet',
        description:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime id eum commodi aperiam facilis earum!',
        tech: 'Lorem, ipsum, dolor, sit',
        sourceCode: 'https://fghjk.hj/hjk',
        liveUrl: 'https://fghjk.hj/hjk',
    },
    {
        name: 'Lorem, ipsum dolor sit amet',
        description:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime id eum commodi aperiam facilis earum!',
        tech: 'Lorem, ipsum, dolor, sit',
        sourceCode: 'https://fghjk.hj/hjk',
        liveUrl: 'https://fghjk.hj/hjk',
    },
    {
        name: 'Lorem, ipsum dolor sit amet',
        description:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime id eum commodi aperiam facilis earum!',
        tech: 'Lorem, ipsum, dolor, sit',
        sourceCode: 'https://fghjk.hj/hjk',
        liveUrl: 'https://fghjk.hj/hjk',
    },
    {
        name: 'Lorem, ipsum dolor sit amet',
        description:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime id eum commodi aperiam facilis earum!',
        tech: 'Lorem, ipsum, dolor, sit',
        sourceCode: 'https://fghjk.hj/hjk',
        liveUrl: 'https://fghjk.hj/hjk',
    },
    {
        name: 'Lorem, ipsum dolor sit amet',
        description:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime id eum commodi aperiam facilis earum!',
        tech: 'Lorem, ipsum, dolor, sit',
        sourceCode: 'https://fghjk.hj/hjk',
        liveUrl: 'https://fghjk.hj/hjk',
    },
    {
        name: 'Lorem, ipsum dolor sit amet',
        description:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime id eum commodi aperiam facilis earum!',
        tech: 'Lorem, ipsum, dolor, sit',
        sourceCode: 'https://fghjk.hj/hjk',
        liveUrl: 'https://fghjk.hj/hjk',
    },
    {
        name: 'Lorem, ipsum dolor sit amet',
        description:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime id eum commodi aperiam facilis earum!',
        tech: 'Lorem, ipsum, dolor, sit',
        sourceCode: 'https://fghjk.hj/hjk',
        liveUrl: 'https://fghjk.hj/hjk',
    },
    {
        name: 'Lorem, ipsum dolor sit amet',
        description:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime id eum commodi aperiam facilis earum!',
        tech: 'Lorem, ipsum, dolor, sit',
        sourceCode: 'https://fghjk.hj/hjk',
        liveUrl: 'https://fghjk.hj/hjk',
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
