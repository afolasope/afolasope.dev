import SocialLink from './SocialLink';
import { GitHub, Twitter } from './icons';

const links = [
    {
        url: 'https://github.com/folasope',
        name: 'GitHub',
        Icon: GitHub,
    },
    {
        url: 'https://twitter.com/afolasope_',
        name: 'Twitter',
        Icon: Twitter,
    },
    {
        url: 'mailto:folasopeadebanjo@gmail.com',
        name: 'Gmail',
    },
];

export default function Profile() {
    return (
        <section className='flex-1 flex flex-col gap-8 p-8 lg:sticky lg:top-0 lg:bottom-0 lg:h-screen lg:justify-between xl:py-20 xl:pl-20 xl:pr-0'>
            <section className='space-y-8'>
                <header className='space-y-4'>
                    <h1 className='text-white text-5xl font-bold leading-tight xl:text-[64px] xl:leading-none'>
                        Adebanjo Afolasope
                    </h1>
                    <p className='text-white text-2xl leading-tight font-semibold'>Software Developer</p>
                </header>

                <p className='text-primary leading-loose text-sm xl:max-w-[634px]'>
                    Frontend Developer experienced in building responsive,{' '}
                    <span className='text-white'>high-performance</span>. {''} web applications using React.js,
                    JavaScript, Typescript, NextJS, Preact and CSS. Passionate about combining technical expertise with
                    user-centered design to{' '}
                    <span className='text-white'> deliver functional and engaging web solutions </span>. Strong
                    collaborator with experience delivering practical, user-centered solutions that improve
                    functionality and elevate
                    <span className='text-white'> user experience</span>.
                </p>
            </section>

            <div className='flex gap-4 items-center'>
                {links.map((link) => (
                    <SocialLink {...link} key={link.name} />
                ))}
            </div>
        </section>
    );
}
