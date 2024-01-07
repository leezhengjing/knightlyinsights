import Link from 'next/link';
import Image from 'next/image';
import { pb } from '@/app/utils/pocketbase';
import styles from '../page.module.css'

async function getOpenings() {
    const openings = await pb.collection('openings').getFullList({
        sort: '-created',
    });
    return openings;

}

export default async function OpeningsPage() {
    const openings = await getOpenings();
    return (
        <div>
            <h1 className='text-left font-bold text-4xl ml-6 my-4'>My Openings</h1>
            <div className='min-h-screen'>
                {openings?.map((opening) => {
                    return <div className='ml-6 '><Opening key={opening._id} opening={opening} /></div>;
                })}
            </div>
        </div>
    )
}

function Opening({ opening }: { opening: any }) {
    const { id, title, content, image, created } = opening || {};
    const url = pb.files.getUrl(opening, image, { size: '400x400    ' })
    return (
        <Link href={`/openings/${id}`} key={id}>
            <div className={`px-2 pb-2   mt-2 border border-solid transition-all duration-200 bg-white `}>
                <h2 className='text-blue-900 text-xl w-1/2 my-2 font-semibold'>{title}</h2>
                <div className='p-0 m-0 w-fit'>
                    <Image className='inline-block' src={url} alt={title} width={300} height={300} />
                    <h5 className="text-m w-2/3 inline-block text-center mt-6 ml-2 leading-relaxed">{content}</h5>
                </div>
            </div>
        </Link >
    )
}