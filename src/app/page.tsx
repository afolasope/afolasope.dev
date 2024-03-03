import Profile from '@/components/Profile';

export default function Home() {
    return (
        <main className='flex min-h-screen flex-col bg-bg lg:flex-row'>
            <Profile />
            <section className='flex-1 px-8 lg:max-h-screen lg:overflow-y-auto lg:px-0 lg:pt-8 lg:pr-8 xl:pt-20 xl:pr-20'>
                <p className='text-white'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque maxime culpa ut dolorem quasi fuga
                    quis aut nam cupiditate illum? Minima dolor accusantium architecto nisi sed quaerat animi eum
                    mollitia?
                </p>
            </section>
        </main>
    );
}
