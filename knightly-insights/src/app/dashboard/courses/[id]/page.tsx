"use client"
import { useEffect, useState } from 'react';
import db from '@/db';
import { RecordModel } from 'pocketbase';
import ChessAnalysisBoard from '@/app/components/chessboard/ChessAnalysisBoard';

async function getOpening(openingId: string) {
    const opening = await db.client.collection('openings').getOne(openingId, { expand: 'image, pgn', requestKey: null })
    return opening;
}
export default function OpeningPage({ params }: any) {
    const [opening, setOpening] = useState<RecordModel | undefined>(undefined)
    const [url, setUrl] = useState('');

    useEffect(() => {
        async function fetchOpening() {
            const openingData = await getOpening(params.id);
            setOpening(openingData);

            // Assuming you want to load the ChessBoard after fetching the opening data
            // If ChessBoard has any async initialization, make sure to handle it appropriately
            setUrl(db.client.files.getUrl(openingData, openingData.image, { size: '300x300' }));
        }

        fetchOpening();
    }, [params.id]);
    // Render loading state while opening data is being fetched
    if (!opening) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen">
            <h1>{opening.title}</h1>
            <div>
                {/* <Image src={url} alt={opening.title} width={300} height={300} /> */}
                {typeof window !== 'undefined' && <ChessAnalysisBoard pgnString={opening.pgn} />}
                <h5>{opening.content}</h5>
            </div>
        </div>
    );
}