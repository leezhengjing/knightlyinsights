import { pb } from '@/app/utils/pocketbase';

export default async function OpeningsPage() {
    const openings = await pb.collection('openings').getFullList({
        sort: '-created',
    });


    return (
        <div>
            <h1>Openings</h1>
            <div>
                {openings?.map((opening) => {
                    return <Opening key={opening._id} opening={opening} />;
                })}
            </div>
        </div>
    )
}

function Opening({ opening }: { opening: any }) {
    const { id, title, content, created } = opening || {};

    return (
        <div>
            <h2 className='text-red-900'>{title}</h2>
            <h5>{content}</h5>
        </div>
    )
}