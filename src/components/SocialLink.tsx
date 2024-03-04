import { ElementType } from 'react';
import { ExternalLink } from './icons';

type Props = {
    Icon: ElementType;
    name: string;
    url: string;
};

export default function SocialLink({ Icon, name, url }: Props) {
    return (
        <a href={url} target='_blank' className='flex p-2 items-center gap-2 text-sm'>
            <Icon />
            <span className='text-white pl-2'>{name}</span>
            <ExternalLink />
        </a>
    );
}
