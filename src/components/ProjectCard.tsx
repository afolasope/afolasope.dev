import { Eye, GitBranch } from './icons';

export type ProjectProps = {
    name: string;
    tech: string;
    description?: string;
    sourceCode?: string;
    liveUrl?: string;
};

export default function ProjectCard({ name, tech, description, sourceCode, liveUrl }: ProjectProps) {
    return (
        <div className='transition bg-card w-full p-10 flex flex-col gap-3 lg:hover:scale-[1.2] lg:hover:mx-auto lg:group-hover:opacity-50 lg:hover:!opacity-100'>
            <header className='text-white'>
                <h4 className='text-2xl font-bold'>{name}</h4>
                <strong className='text-xs font-semibold'>{tech}</strong>
            </header>

            {description ? <p className='text-primary text-sm'>{description}</p> : null}

            <div className='flex gap-3'>
                {sourceCode ? (
                    <a
                        href={sourceCode}
                        target='_blank'
                        className='flex items-center gap-1  text-sm text-primary hover:text-white'
                    >
                        <GitBranch width={16} height={16} />
                        <span>Code</span>
                    </a>
                ) : null}

                {liveUrl ? (
                    <a
                        href={liveUrl}
                        target='_blank'
                        className='flex items-center gap-1  text-sm text-primary hover:text-white'
                    >
                        <Eye width={16} height={16} />
                        <span>Live</span>
                    </a>
                ) : null}
            </div>
        </div>
    );
}
