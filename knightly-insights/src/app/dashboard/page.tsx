import Link from 'next/link';
import Image from 'next/image';
import db from '@/db';
import styles from '../page.module.css'

async function getOpenings() {
    const openings = await db.client.collection('openings').getFullList({
        sort: '-created',
    });
    return openings;

}

async function getLectures() {
    const lectures = await db.client.collection('lectures').getFullList({
        sort: '-created',
    });
    return lectures;

}

export default async function DashboardPage() {
    const openings = await getOpenings();
    const lectures = await getLectures();
    return (
        <div>
            <h1 className='text-left font-bold text-4xl ml-8 py-4'>My Openings</h1>
            <div className='min-h-screen'>
                {openings?.map((opening) => {
                    return <div className='ml-8 '><Opening key={opening._id} opening={opening} /></div>;
                })}
            </div>

            <h1 className='text-left font-bold text-4xl ml-8 py-4'>My Lectures</h1>
            <div className='min-h-screen'>
                {lectures?.map((lecture) => {
                    return <div className='ml-8 '><Lecture key={lecture._id} lecture={lecture} /></div>;
                })}
            </div>
        </div>
    )
}

function Opening({ opening }: { opening: any }) {
    const { id, title, content, image, created } = opening || {};
    const url = db.client.files.getUrl(opening, image, { size: '400x400' })
    return (
        <Link href={`/dashboard/courses/${id}`} key={id}>
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

function Lecture({ lecture }: { lecture: any }) {
    const { id, title, body, image } = lecture || {};
    const url = db.client.files.getUrl(lecture, image, { size: '400x400' })
    return (
        <Link href={`/dashboard/lectures/${id}`} key={id}>
            <div className={`px-2 pb-2   mt-2 border border-solid transition-all duration-200 bg-white `}>
                <h2 className='text-blue-900 text-xl w-1/2 my-2 font-semibold'>{title}</h2>
                <div className='p-0 m-0 w-fit'>
                    <Image className='inline-block' src={url} alt={title} width={300} height={300} />
                    <h5 className="text-m w-2/3 inline-block text-center mt-6 ml-2 leading-relaxed">{body}</h5>
                </div>
            </div>
        </Link >
    )
}
