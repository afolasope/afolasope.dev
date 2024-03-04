import Image from 'next/image';
import SocialLink from './SocialLink';
import { GitHub, Twitter } from './icons';

const links = [
    {
        url: 'https://github.com/afeezgl',
        name: 'GitHub',
        Icon: GitHub,
    },
    {
        url: 'https://twitter.com/afeezgl',
        name: 'Twitter',
        Icon: Twitter,
    },
];

export default function Profile() {
    return (
        <section className='flex-1 flex flex-col gap-8 p-8 lg:sticky lg:top-0 lg:bottom-0 lg:h-screen lg:justify-between xl:py-20 xl:pl-20 xl:pr-0'>
            <section className='space-y-8'>
                <header className='space-y-4'>
                    <h1 className='text-white text-5xl font-bold leading-tight xl:text-[64px] xl:leading-none'>
                        Afeez Lawal
                    </h1>
                    <p className='text-white text-2xl leading-tight font-semibold'>Software Engineer</p>
                </header>

                <p className='text-primary leading-loose text-sm xl:max-w-[634px]'>
                    Results-driven Software Engineer with a strong background in{' '}
                    <span className='text-white'>frontend</span> development and a passion for creating exceptional{' '}
                    <span className='text-white'>user experiences</span>. Proficient in TypeScript, React, NextJS,
                    Preact, and CSS, with a track record of designing and implementing innovative web applications.
                    Adept at collaborating with cross-functional teams to deliver{' '}
                    <span className='text-white'>high-quality solutions</span> that drive productivity and{' '}
                    <span className='text-white'>user satisfaction</span>.
                </p>
            </section>

            <div className='flex gap-4 items-center'>
                <Image src={'/gbolahan.jpg'} width={48} height={48} alt='Afeez Lawal' className='rounded-full' />

                {links.map((link) => (
                    <SocialLink {...link} key={link.name} />
                ))}
            </div>
        </section>
    );
}
